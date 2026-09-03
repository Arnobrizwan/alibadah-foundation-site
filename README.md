# alibadahfoundation.com — deployed build

This repository is the **built static output** of Al-Ibadah, a Bangla-first Islamic
reference site for Bangladesh. It is what GitHub Pages serves at
**[alibadahfoundation.com](https://alibadahfoundation.com)**.

The application source lives in a separate private repository; this repo is the
deploy target, so nothing here should be edited by hand.

Free, ad-free, funded by sadaqah.

## What the site has

| | |
|---|---|
| Quran | 114 surahs, 6,236 ayahs in Arabic; five Bangla translations and three Bangla tafsirs; ten reciters, search, bookmarks, hifz mode |
| Hadith | 36,432 narrations across 8 collections and 395 books |
| Duas | Morning and evening adhkar and the duas of daily life, by category |
| Prayer | Times for all 64 districts (Karachi method, Hanafi Asr), qibla, monthly timetable, Ramadan sehri and iftar |
| Assistant | `/ask` — worship, fiqh and daily-life answers retrieved on-device, no model and no API key |
| Tools | Zakat calculator, tasbih, Hijri calendar, mosque finder, quiz, planner, charity tracker |
| Guides | Learn salah, learn Quran, hajj and umrah, marriage, janazah |

Bangla is the default language throughout; English is a toggle.

## How it is built and served

React 18, Vite, TypeScript, Tailwind, React Query and react-router — exported to a
**fully static build with no runtime backend**. The corpus ships as JSON under
`data/`; prayer times and qibla come from Aladhan, mosque search from OpenStreetMap,
and the extra Bangla translations and tafsir from the Quran Foundation API, all
straight from the browser. Each degrades to nothing rather than to an error — the
bundled Muhiuddin Khan translation and the Arabic are always present, so the reader
works with no connection at all.

All 141 sitemap routes are **prerendered** to real HTML files, each with its own
title, description, canonical and JSON-LD, rather than relying on the Pages 404
fallback.

Pages is configured with `build_type: workflow` — `.github/workflows/pages.yml`
runs `configure-pages` → `upload-pages-artifact` → `deploy-pages`. The legacy Pages
builder fails on a tree this size.

Three files are not part of the build output and must survive every deploy:

| File | Why |
|---|---|
| `CNAME` | binds the custom domain — deleting it unbinds `alibadahfoundation.com` |
| `404.html` | copy of `index.html`, the SPA fallback (Pages ignores `.htaccess`) |
| `.nojekyll` | stops Jekyll from processing the build |
