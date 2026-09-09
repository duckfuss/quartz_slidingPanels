import { createRequire } from 'module';

createRequire(import.meta.url);

// src/util/lang.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/styles/example.scss
var example_default = ".example-component {\n  padding: 8px 16px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border-radius: 4px;\n  font-weight: 600;\n  display: inline-block;\n}";

// src/components/scripts/example.inline.ts
var example_inline_default = 'function l(){let e=window.location.pathname;return e.startsWith("/")&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e||"index"}function r(){let e=document.querySelectorAll(".example-component");if(e.length===0)return;let t=[];function o(n){(n.ctrlKey||n.metaKey)&&n.shiftKey&&n.key.toLowerCase()==="e"&&(n.preventDefault(),console.log("[ExampleComponent] Keyboard shortcut triggered!"))}document.addEventListener("keydown",o),t.push(()=>document.removeEventListener("keydown",o));for(let n of e){let i=()=>{console.log("[ExampleComponent] Clicked!")};n.addEventListener("click",i),t.push(()=>n.removeEventListener("click",i))}typeof window<"u"&&window.addCleanup&&window.addCleanup(()=>{t.forEach(n=>n())}),console.log("[ExampleComponent] Initialized with",e.length,"component(s)")}document.addEventListener("nav",e=>{let t=e.detail?.url||l();console.log("[ExampleComponent] Navigation to:",t),r()});document.addEventListener("render",()=>{console.log("[ExampleComponent] Render event - re-initializing"),r()});document.addEventListener("prenav",()=>{let e=document.querySelector(".example-component");e&&sessionStorage.setItem("exampleScrollTop",e.scrollTop?.toString()||"0")});\n';
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  return l.vnode && l.vnode(l2), l2;
}

// src/components/ExampleComponent.tsx
var ExampleComponent_default = ((opts) => {
  const { prefix = "", suffix = "", className = "example-component" } = opts ?? {};
  const Component = (props) => {
    const frontmatter = props.fileData?.frontmatter;
    const title = frontmatter?.title ?? "Untitled";
    const fullText = `${prefix}${title}${suffix}`;
    return /* @__PURE__ */ u2("div", { class: classNames(className), children: fullText });
  };
  Component.css = example_default;
  Component.afterDOMLoaded = example_inline_default;
  return Component;
});

// src/components/styles/stacked.scss
var stacked_default = '.andy-mode-toggle {\n  position: fixed;\n  bottom: 1.5rem;\n  right: 1.5rem;\n  z-index: 200;\n  width: 40px;\n  height: 40px;\n  padding: 0;\n  border: 1px solid var(--lightgray);\n  border-radius: 8px;\n  background: var(--light);\n  color: var(--gray);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n.andy-mode-toggle svg {\n  width: 20px;\n  height: 20px;\n}\n.andy-mode-toggle:hover {\n  background: var(--lightgray);\n  color: var(--darkgray);\n  border-color: var(--gray);\n}\n.andy-mode-toggle.andy-mode-active {\n  background: var(--secondary);\n  color: var(--light);\n  border-color: var(--secondary);\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);\n}\n.andy-mode-toggle.andy-mode-active:hover {\n  opacity: 0.9;\n}\n\n#andy-container {\n  display: none;\n  pointer-events: none;\n  z-index: 90;\n}\n#andy-container.active {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: var(--light);\n}\n\nhtml.andy-active,\nhtml.andy-active body {\n  overflow: hidden !important;\n}\n\n.andy-pane-track {\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: row;\n  overflow-x: auto;\n  overflow-y: hidden;\n  scroll-behavior: smooth;\n  scroll-snap-type: x mandatory;\n  gap: 0;\n  z-index: 95;\n  scrollbar-width: none;\n}\n.andy-pane-track::-webkit-scrollbar {\n  display: none;\n}\n\n.andy-pane {\n  flex: 0 0 auto;\n  height: 100%;\n  scroll-snap-align: start;\n  position: relative;\n  background: var(--light);\n  border-left: 1px solid var(--lightgray);\n  overflow: hidden;\n}\n.andy-pane:first-child {\n  border-left: none;\n}\n\n.andy-pane-active {\n  z-index: 96;\n}\n\n.andy-pane-content {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  padding: 2rem;\n  box-sizing: border-box;\n}\n.andy-pane-content .page {\n  max-width: none;\n  margin: 0;\n  padding: 0;\n}\n.andy-pane-content {\n  color: var(--dark);\n  background: var(--light);\n}\n\n.andy-pane-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  color: var(--gray);\n  font-size: 0.9rem;\n}\n\n.andy-pane-loading::after {\n  content: "";\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--lightgray);\n  border-top-color: var(--secondary);\n  border-radius: 50%;\n  animation: andy-spin 0.8s linear infinite;\n  margin-left: 8px;\n}\n\n@keyframes andy-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes andy-slide-in {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.andy-pane-animate {\n  animation: andy-slide-in 0.3s ease-out;\n}';

// src/components/scripts/stacked.inline.ts
var stacked_inline_default = 'var C="andy-mode-enabled",I="andy-mode-state";function b(){let e=window.location.pathname,n=e;e.startsWith("/")&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1));let i=e||"index";return console.log("[AndyDebug] getCurrentSlug:",{raw:n,result:i}),i}function w(){return document.querySelector("h1")?.textContent?.trim()||document.title||b()}function k(){return document.body?.dataset?.basepath??""}function T(e){let n=k(),i=e.startsWith("/")?e:"/"+e;return n+i}function p(){let e=document.getElementById("andy-mode-slot");return e?{paneWidth:parseInt(e.dataset.paneWidth||"650",10),maxPanes:parseInt(e.dataset.maxPanes||"5",10),mobileBreakpoint:parseInt(e.dataset.mobileBreakpoint||"800",10),animate:e.dataset.animate!=="false"}:{paneWidth:650,maxPanes:5,mobileBreakpoint:800,animate:!0}}function y(){try{return localStorage.getItem(C)==="true"}catch{return!1}}function H(e){try{localStorage.setItem(C,e?"true":"false")}catch{}}function m(){try{let e=sessionStorage.getItem(I);if(e){let n=JSON.parse(e);if(Array.isArray(n.panes)&&typeof n.activeIndex=="number")return console.log("[AndyDebug] loadState:",JSON.parse(JSON.stringify(n))),n}}catch{}return console.log("[AndyDebug] loadState: returning default { panes: [], activeIndex: -1 }"),{panes:[],activeIndex:-1}}function u(e){try{console.log("[AndyDebug] saveState:",JSON.parse(JSON.stringify(e))),sessionStorage.setItem(I,JSON.stringify(e))}catch{}}function D(){let e=document.querySelector(".center");if(e)return e.innerHTML;let n=document.querySelector("#quartz-body");return n?n.innerHTML:null}async function M(e){try{let n=T(e),i=await fetch(n);if(!i.ok)return null;let a=await i.text(),s=new DOMParser().parseFromString(a,"text/html"),o=s.querySelector(".center");if(o)return o.innerHTML;let d=s.querySelector("#quartz-body");return d?d.innerHTML:null}catch{return null}}function W(){if(document.getElementById("andy-mode-toggle"))return;let e=document.createElement("button");e.id="andy-mode-toggle",e.className="andy-mode-toggle",e.setAttribute("aria-label","Toggle Andy Mode"),e.title="Sliding Panes",e.innerHTML=\'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="5" rx="1"/></svg>\',y()&&e.classList.add("andy-mode-active"),e.addEventListener("click",()=>{let n=!y();H(n),n?(sessionStorage.removeItem(I),e.classList.add("andy-mode-active"),z()):(e.classList.remove("andy-mode-active"),S())}),document.body.appendChild(e)}function E(){let e=document.getElementById("andy-container");if(e)return e;let n=p();return e=document.createElement("div"),e.id="andy-container",e.dataset.paneWidth=String(n.paneWidth),e.dataset.maxPanes=String(n.maxPanes),e.dataset.mobileBreakpoint=String(n.mobileBreakpoint),e.dataset.animate=String(n.animate),document.body.appendChild(e),e}var x=null;function g(e,n,i){if(e.querySelectorAll(".andy-pane-track").forEach(t=>t.remove()),n.panes.length===0){e.classList.remove("active"),document.documentElement.classList.remove("andy-active");return}e.classList.add("active"),document.documentElement.classList.add("andy-active");let a=document.createElement("div");a.className="andy-pane-track";for(let t=0;t<n.panes.length;t++){let s=n.panes[t],o=document.createElement("div");o.className="andy-pane",o.dataset.index=String(t),t===n.activeIndex&&o.classList.add("andy-pane-active"),o.style.width=i.paneWidth+"px";let d=document.createElement("div");if(d.className="andy-pane-content",s.contentHTML)d.innerHTML=s.contentHTML;else{let r=document.createElement("div");r.className="andy-pane-loading",r.textContent="Loading\\u2026",d.appendChild(r),M(s.slug).then(l=>{if(l){let c=m(),A=c.panes.findIndex(v=>v.slug===s.slug);if(A>=0){c.panes[A].contentHTML=l,u(c);let v=document.getElementById("andy-container");v&&g(v,c,i)}}else r.textContent="Failed to load"})}o.appendChild(d),d.addEventListener("click",r=>{r.target.closest("a")&&(x=t)}),i.animate&&t===n.activeIndex&&o.classList.add("andy-pane-animate"),a.appendChild(o)}e.appendChild(a),q(a,n.activeIndex)}function q(e,n){let a=e.querySelectorAll(".andy-pane")[n];a&&a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})}function N(e,n){if(!y()){console.log("[AndyDebug] addPane: disabled, returning");return}let i=E(),a=p(),t=m(),s=x??t.activeIndex;if(x=null,console.log("[AndyDebug] addPane called:",{slug:e,title:n,activeIndex:t.activeIndex,sourceIndex:s,paneSlugs:t.panes.map(d=>d.slug)}),s>=0&&t.panes[s]?.slug===e){console.log("[AndyDebug] addPane: SAME PAGE branch (sourceIndex="+s+", slug="+e+")"),t.panes[s].title=n,t.activeIndex=s,u(t),f(i,t,a),g(i,t,a);return}let o=t.panes.findIndex(d=>d.slug===e);if(o>=0)console.log("[AndyDebug] addPane: EXISTING branch (existingIndex="+o+", will truncate after it)"),t.panes.splice(o+1),t.activeIndex=o;else{let d=s+1;console.log("[AndyDebug] addPane: NEW branch (insertAt="+d+", sourceIndex="+s+")");let l=e===b()?D():null;t.panes.splice(d,0,{slug:e,title:n,contentHTML:l}),console.log("[AndyDebug] addPane: after insert, panes:",t.panes.map(c=>c.slug)),t.panes.splice(d+1),console.log("[AndyDebug] addPane: after truncate, panes:",t.panes.map(c=>c.slug)),t.activeIndex=d,t.panes.length>a.maxPanes&&(t.panes.shift(),t.activeIndex--)}console.log("[AndyDebug] addPane: final state:",{panes:t.panes.map(d=>d.slug),activeIndex:t.activeIndex}),u(t),f(i,t,a),g(i,t,a),t.activeIndex>=0&&!t.panes[t.activeIndex].contentHTML&&M(e).then(d=>{if(d){let r=m(),l=r.panes.findIndex(c=>c.slug===e);if(l>=0){r.panes[l].contentHTML=d,u(r);let c=document.getElementById("andy-container");c&&(f(c,r,a),g(c,r,a))}}})}function f(e,n,i){e.querySelectorAll(".andy-binder-strip").forEach(s=>s.remove());let a=n.panes.slice(0,n.activeIndex),t=n.panes.slice(n.activeIndex+1);if(a.length>0){let s=document.createElement("div");s.className="andy-binder-strip andy-binder-strip-left";for(let o=0;o<a.length;o++)s.appendChild(L(a[o],o,"left",n));e.appendChild(s)}if(t.length>0){let s=document.createElement("div");s.className="andy-binder-strip andy-binder-strip-right";for(let o=0;o<t.length;o++){let d=n.activeIndex+1+o;s.appendChild(L(t[o],d,"right",n))}e.appendChild(s)}document.body.classList.toggle("has-andy-left",a.length>0),document.body.classList.toggle("has-andy-right",t.length>0)}function L(e,n,i,a){let t=document.createElement("div");t.className=`andy-binder-tab andy-binder-tab-${i}`,t.dataset.index=String(n),n===a.activeIndex&&t.classList.add("andy-binder-tab-active");let s=document.createElement("span");if(s.className="andy-binder-label",s.textContent=e.title,t.appendChild(s),a.panes.length>=2){let o=document.createElement("button");o.className="andy-binder-close",o.textContent="\\xD7",o.setAttribute("aria-label","Close "+e.title),o.addEventListener("click",d=>{d.stopPropagation(),O(n)}),t.appendChild(o)}return t.addEventListener("click",()=>B(n)),t}function O(e){let n=document.getElementById("andy-container");if(!n)return;let i=p(),a=m();if(a.panes.length<1)return;let t=e===a.activeIndex;a.panes.splice(e,1),t?(a.activeIndex=Math.min(e,a.panes.length-1),u(a),B(a.activeIndex)):(e<a.activeIndex&&a.activeIndex--,u(a),f(n,a,i),g(n,a,i))}function B(e){let n=m();if(e<0||e>=n.panes.length)return;let i=n.panes[e];if(!i)return;n.activeIndex=e,u(n);let a=new URL(T(i.slug),window.location.origin);window.spaNavigate?window.spaNavigate(a,!1):window.location.href=a.toString()}function z(){console.log("[AndyDebug] activateAndyMode called");let e=E(),n=p(),i=b(),a=w();N(i,a)}function S(){let e=document.getElementById("andy-container");e&&(e.classList.remove("active"),e.remove());let n=document.getElementById("andy-mode-toggle");n&&n.classList.remove("andy-mode-active"),document.documentElement.classList.remove("andy-active"),document.body.classList.remove("has-andy-left","has-andy-right")}var h=null;function J(){if(W(),F(),!y()){console.log("[AndyDebug] onNav: disabled, deactivate"),S();return}let e=b(),n=w();if(console.log("[AndyDebug] onNav:",{slug:e,lastSlug:h,isSamePage:e===h}),e===h){console.log("[AndyDebug] onNav: SAME SLUG as last, re-rendering");let i=E(),a=p(),t=m();t.panes.length>=1&&(f(i,t,a),g(i,t,a));return}console.log("[AndyDebug] onNav: DIFFERENT slug, calling addPane"),h=e,N(e,n)}var P=null;function F(){if(P)return;let e=()=>{let n=p();window.innerWidth<n.mobileBreakpoint&&S()};window.addEventListener("resize",e),P=()=>window.removeEventListener("resize",e)}document.addEventListener("nav",J);document.addEventListener("render",()=>{if(!y())return;let e=document.getElementById("andy-container");if(!e)return;let n=p(),i=m();i.panes.length>=1&&(f(e,i,n),g(e,i,n))});\n';

// src/components/StackedPages.tsx
var StackedPages_default = ((opts) => {
  const config = {
    paneWidth: opts?.paneWidth ?? 650,
    maxPanes: opts?.maxPanes ?? 5,
    mobileBreakpoint: opts?.mobileBreakpoint ?? 800,
    animate: opts?.animate ?? true
  };
  const Component = (_props) => {
    return /* @__PURE__ */ u2(
      "div",
      {
        id: "andy-mode-slot",
        "data-pane-width": config.paneWidth,
        "data-max-panes": config.maxPanes,
        "data-mobile-breakpoint": config.mobileBreakpoint,
        "data-animate": config.animate,
        style: "display:none"
      }
    );
  };
  Component.css = stacked_default;
  Component.afterDOMLoaded = stacked_inline_default;
  return Component;
});

export { ExampleComponent_default as ExampleComponent, StackedPages_default as StackedPages };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map