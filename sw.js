// Al-Ibadah service worker.
//
// The app shell is precached so the site opens without a connection. Content
// uses stale-while-revalidate: the cached copy renders immediately and is
// refreshed in the background. Prayer times are deliberately excluded —
// a stale prayer time is worse than no prayer time.

// Stamped by scripts/stamp-service-worker.mjs after the build, from a hash of
// the build output. It must change whenever the output does: the activate
// handler drops every cache that does not match, and a frozen version means a
// returning visitor is never given anything newer than their first visit.
const BUILD_ID = 'e42c540c80e2';
const VERSION = `al-ibadah-${BUILD_ID.startsWith('__') ? 'dev' : BUILD_ID}`;
const SHELL_CACHE = `${VERSION}-shell`;
const DATA_CACHE = `${VERSION}-data`;

const SHELL = ['/', '/index.html', '/favicon.svg', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  // No skipWaiting here. Activating over a live tab deletes the caches holding
  // the assets that tab is still using, and its next lazily-loaded route chunk
  // 404s. The new worker waits; main.tsx tells it when to take over.
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => !key.startsWith(VERSION)).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

/** Times and mosque lookups must never be served stale. */
const isLiveEndpoint = (url) =>
  url.pathname.startsWith('/api/prayers') || url.pathname.startsWith('/api/mosques');

// Anything whose filename is stable across builds is content, not an asset:
// `surahs.json`, `content.json` and every file under /images/ keep the same
// name every build, so the cache-first branch below would pin a visitor to
// whatever they downloaded on their first visit and no correction — a fixed
// translation, a replaced photograph — would ever reach them.
const isContent = (url) =>
  url.pathname.startsWith('/api/') ||
  url.pathname.startsWith('/data/') ||
  url.pathname.startsWith('/images/') ||
  url.pathname === '/og-image.jpg' ||
  url.pathname === '/manifest.webmanifest';

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isLiveEndpoint(url)) return;

  // Content — stale-while-revalidate.
  if (isContent(url)) {
    const revalidate = caches.open(DATA_CACHE).then(async (cache) => {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    });

    // waitUntil is what makes this stale-WHILE-REVALIDATE rather than just
    // stale: once the cached copy is returned the worker is free to be killed,
    // and the refresh would be cancelled before it ever reached the cache.
    event.waitUntil(revalidate.catch(() => {}));

    event.respondWith(
      caches
        .open(DATA_CACHE)
        .then((cache) => cache.match(request))
        .then((cached) => cached ?? revalidate),
    );
    return;
  }

  // Navigations — fall back to the cached shell so routes work offline.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/index.html')));
    return;
  }

  // Static assets — cache first. Safe only because Vite content-hashes these
  // filenames; anything with a stable name belongs in isContent above.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ??
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
