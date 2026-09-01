import{j as e}from"./query-Dqvp_yA-.js";import{c as r,u as n}from"./index-CKtiUT8-.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=r("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=r("SearchX",[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=r("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),x=({rows:t=6})=>e.jsx("div",{className:"grid gap-3","aria-busy":"true",children:Array.from({length:t}).map((s,a)=>e.jsx("div",{className:"h-20 rounded-lg bg-parchment-deep/60 animate-pulse"},a))}),p=()=>{const{t,fontClass:s}=n();return e.jsxs("p",{className:`flex items-center gap-2 ${s} text-ink-soft text-sm py-8 justify-center`,children:[e.jsx(c,{className:"w-4 h-4 animate-spin"}),t("common.loading")]})},h=({message:t,action:s})=>{const{t:a,fontClass:o}=n();return e.jsxs("div",{className:"text-center py-16",children:[e.jsx(m,{className:"w-7 h-7 text-ink-soft/40 mx-auto mb-3"}),e.jsx("p",{className:`${o} text-ink-soft text-sm`,children:t??a("common.empty")}),s&&e.jsx("div",{className:"mt-4",children:s})]})},u=({onRetry:t})=>{const{t:s,fontClass:a}=n();return e.jsxs("div",{className:"text-center py-16",children:[e.jsx(l,{className:"w-7 h-7 text-vermilion/70 mx-auto mb-3"}),e.jsx("p",{className:`${a} text-ink-soft text-sm`,children:s("common.error")}),t&&e.jsx("button",{onClick:t,className:`mt-4 ${a} text-sm text-gold-dark hover:text-gold border border-rule hover:border-gold rounded-full px-4 py-2 transition-colors`,children:s("common.retry")})]})};export{u as E,p as I,x as L,h as a,c as b};
