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
var stacked_default = '#andy-container {\n  display: none;\n  pointer-events: none;\n  z-index: 90;\n}\n#andy-container.active {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\nhtml.andy-active,\nhtml.andy-active body {\n  overflow: hidden !important;\n}\n\nbody.has-andy-left .page,\nbody.has-andy-right .page {\n  transition: padding 0.2s ease;\n}\n\nbody.has-andy-left .page {\n  padding-left: 40px;\n}\n\nbody.has-andy-right .page {\n  padding-right: 40px;\n}\n\n.andy-binder-strip {\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  z-index: 100;\n  width: 40px;\n}\n\n.andy-binder-strip-left {\n  left: 0;\n}\n\n.andy-binder-strip-right {\n  right: 0;\n}\n\n.andy-binder-tab {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  padding: 8px 0;\n  cursor: pointer;\n  background: var(--lightgray);\n  border: 1px solid var(--lightgray);\n  transition: background 0.15s ease, transform 0.15s ease, border-color 0.15s ease;\n  width: 100%;\n  flex: 1;\n  position: relative;\n  writing-mode: vertical-lr;\n  overflow: hidden;\n}\n\n.andy-binder-tab:hover {\n  background: var(--light);\n}\n\n.andy-binder-tab-active {\n  background: var(--light);\n  z-index: 101;\n  cursor: default;\n}\n\n.andy-binder-tab-active.andy-binder-tab-left {\n  border-right: none;\n  border-left: 3px solid var(--secondary);\n  border-radius: 6px 0 0 6px;\n}\n\n.andy-binder-tab-active.andy-binder-tab-right {\n  border-left: none;\n  border-right: 3px solid var(--secondary);\n  border-radius: 0 6px 6px 0;\n}\n\n.andy-binder-tab:not(.andy-binder-tab-active) {\n  color: var(--gray);\n}\n\n.andy-binder-tab:not(.andy-binder-tab-active).andy-binder-tab-left {\n  border-radius: 6px 0 0 6px;\n  border-right: 2px solid var(--secondary);\n  border-left: 1px solid var(--lightgray);\n}\n\n.andy-binder-tab:not(.andy-binder-tab-active).andy-binder-tab-left:hover {\n  transform: translateX(4px);\n}\n\n.andy-binder-tab:not(.andy-binder-tab-active).andy-binder-tab-right {\n  border-radius: 0 6px 6px 0;\n  border-left: 2px solid var(--secondary);\n  border-right: 1px solid var(--lightgray);\n}\n\n.andy-binder-tab:not(.andy-binder-tab-active).andy-binder-tab-right:hover {\n  transform: translateX(-4px);\n}\n\n.andy-binder-label {\n  font-size: 1rem;\n  line-height: 1.2;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: var(--darkgray);\n  user-select: none;\n  transform: rotate(180deg);\n  text-align: left;\n}\n\n.andy-binder-tab-active .andy-binder-label {\n  font-weight: bold;\n  color: var(--dark);\n}\n\n.andy-binder-close {\n  appearance: none;\n  background: none;\n  border: none;\n  cursor: pointer;\n  font-size: 1rem;\n  line-height: 1;\n  color: var(--gray);\n  padding: 2px;\n  flex-shrink: 0;\n  opacity: 0;\n  transition: opacity 0.15s ease, color 0.15s ease;\n  transform: rotate(180deg);\n}\n\n.andy-binder-close:hover {\n  color: var(--dark);\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: 4px;\n}\n\n.andy-binder-tab:hover .andy-binder-close {\n  opacity: 1;\n}\n\n.andy-pane-track {\n  pointer-events: auto;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  flex-direction: row;\n  overflow-x: auto;\n  overflow-y: hidden;\n  scroll-behavior: smooth;\n  scroll-snap-type: x mandatory;\n  gap: 0;\n  z-index: 95;\n  scrollbar-width: none;\n}\n.andy-pane-track::-webkit-scrollbar {\n  display: none;\n}\n\n.andy-pane {\n  flex: 0 0 auto;\n  height: 100%;\n  scroll-snap-align: start;\n  position: relative;\n  background: var(--light);\n  border-left: 1px solid var(--lightgray);\n  overflow: hidden;\n  transition: opacity 0.2s ease;\n}\n.andy-pane:first-child {\n  border-left: none;\n}\n\n.andy-pane-active {\n  z-index: 96;\n}\n\n.andy-pane:not(.andy-pane-active) {\n  opacity: 1;\n  border-right: 2px solid var(--lightgray);\n}\n\n.andy-pane-content {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n  padding: 2rem;\n  box-sizing: border-box;\n}\n.andy-pane-content .page {\n  max-width: none;\n  margin: 0;\n  padding: 0;\n}\n.andy-pane-content {\n  color: var(--dark);\n  background: var(--light);\n}\n\n.andy-pane-spine {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  writing-mode: vertical-lr;\n  text-orientation: mixed;\n  transform: rotate(180deg);\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--secondary);\n  background: var(--light);\n  border-right: 2px solid var(--secondary);\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  pointer-events: none;\n  user-select: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.andy-pane:not(.andy-pane-active) .andy-pane-spine {\n  opacity: 1;\n}\n\n.andy-pane-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  color: var(--gray);\n  font-size: 0.9rem;\n}\n\n.andy-pane-loading::after {\n  content: "";\n  width: 24px;\n  height: 24px;\n  border: 3px solid var(--lightgray);\n  border-top-color: var(--secondary);\n  border-radius: 50%;\n  animation: andy-spin 0.8s linear infinite;\n  margin-left: 8px;\n}\n\n@keyframes andy-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes andy-slide-in {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.andy-pane-animate {\n  animation: andy-slide-in 0.3s ease-out;\n}';

// src/components/scripts/stacked.inline.ts
var stacked_inline_default = 'var h="andy-mode-state";function b(){let e=window.location.pathname;return e.startsWith("/")&&(e=e.slice(1)),e.endsWith("/")&&(e=e.slice(0,-1)),e||"index"}function w(){return document.querySelector("h1")?.textContent?.trim()||document.title||b()}function E(){return document.body?.dataset?.basepath??""}function I(e){let n=E(),i=e.startsWith("/")?e:"/"+e;return n+i}function u(){try{let e=sessionStorage.getItem(h);if(e){let n=JSON.parse(e);if(Array.isArray(n.panes)&&typeof n.activeIndex=="number")return n}}catch{}return{panes:[],activeIndex:-1}}function r(e){try{sessionStorage.setItem(h,JSON.stringify(e))}catch{}}function m(e){return{paneWidth:parseInt(e.dataset.paneWidth||"650",10),maxPanes:parseInt(e.dataset.maxPanes||"5",10),mobileBreakpoint:parseInt(e.dataset.mobileBreakpoint||"800",10),animate:e.dataset.animate!=="false",showSpines:e.dataset.showSpines!=="false"}}async function x(e){try{let n=I(e),i=await fetch(n);if(!i.ok)return null;let a=await i.text(),o=new DOMParser().parseFromString(a,"text/html"),s=o.querySelector("#quartz-body");if(s)return s.innerHTML;let d=o.querySelector("article")||o.querySelector("main");return d?d.innerHTML:null}catch{return null}}function p(e,n,i){e.querySelectorAll(".andy-binder-strip").forEach(o=>o.remove());let a=n.panes.slice(0,n.activeIndex),t=n.panes.slice(n.activeIndex+1);if(a.length>0){let o=document.createElement("div");o.className="andy-binder-strip andy-binder-strip-left";for(let s=0;s<a.length;s++)o.appendChild(v(a[s],s,"left",n,i));e.appendChild(o)}if(t.length>0){let o=document.createElement("div");o.className="andy-binder-strip andy-binder-strip-right";for(let s=0;s<t.length;s++){let d=n.activeIndex+1+s;o.appendChild(v(t[s],d,"right",n,i))}e.appendChild(o)}document.body.classList.toggle("has-andy-left",a.length>0),document.body.classList.toggle("has-andy-right",t.length>0),document.documentElement.classList.toggle("andy-active",n.panes.length>1)}function v(e,n,i,a,t){let o=document.createElement("div");o.className=`andy-binder-tab andy-binder-tab-${i}`,o.dataset.index=String(n),n===a.activeIndex&&o.classList.add("andy-binder-tab-active");let s=document.createElement("span");if(s.className="andy-binder-label",s.textContent=e.title,o.appendChild(s),a.panes.length>=2){let d=document.createElement("button");d.className="andy-binder-close",d.textContent="\\xD7",d.setAttribute("aria-label","Close "+e.title),d.addEventListener("click",c=>{c.stopPropagation(),A(n)}),o.appendChild(d)}return o.addEventListener("click",()=>{L(n)}),o}function f(e,n,i){if(e.querySelectorAll(".andy-pane-track").forEach(t=>t.remove()),n.panes.length<=1){e.classList.remove("active");return}e.classList.add("active");let a=document.createElement("div");a.className="andy-pane-track";for(let t=0;t<n.panes.length;t++){let o=n.panes[t],s=document.createElement("div");if(s.className="andy-pane",s.dataset.index=String(t),t===n.activeIndex&&s.classList.add("andy-pane-active"),s.style.width=i.paneWidth+"px",i.showSpines){let c=document.createElement("div");c.className="andy-pane-spine",c.textContent=o.title,s.appendChild(c)}let d=document.createElement("div");if(d.className="andy-pane-content",o.contentHTML)d.innerHTML=o.contentHTML;else{let c=document.createElement("div");c.className="andy-pane-loading",c.textContent="Loading\\u2026",d.appendChild(c),x(o.slug).then(g=>{g?(o.contentHTML=g,d.innerHTML=g,r(n)):c.textContent="Failed to load"})}s.appendChild(d),i.animate&&t===n.activeIndex&&s.classList.add("andy-pane-animate"),a.appendChild(s)}e.appendChild(a),S(a,n.activeIndex)}function S(e,n){let a=e.querySelectorAll(".andy-pane")[n];a&&a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})}async function C(e,n){let i=document.getElementById("andy-container");if(!i)return;let a=m(i),t=u();if(t.activeIndex>=0&&t.panes[t.activeIndex]?.slug===e){t.panes[t.activeIndex].title=n,r(t),p(i,t,a);return}let o=t.panes.findIndex(s=>s.slug===e);if(o>=0){let[s]=t.panes.splice(o,1),d=t.activeIndex+1;t.panes.splice(d,0,s),t.activeIndex=d}else{let s=t.activeIndex+1;for(t.panes.splice(s,0,{slug:e,title:n,contentHTML:null}),t.activeIndex=s;t.panes.length>a.maxPanes;)t.activeIndex>0?(t.panes.shift(),t.activeIndex--):t.panes.pop()}if(r(t),!t.panes[t.activeIndex].contentHTML){let s=await x(e);s&&(t.panes[t.activeIndex].contentHTML=s,r(t))}p(i,t,a),f(i,t,a)}function A(e){let n=document.getElementById("andy-container");if(!n)return;let i=m(n),a=u();if(a.panes.length<2)return;let t=e===a.activeIndex;a.panes.splice(e,1),t?(a.activeIndex=Math.min(e,a.panes.length-1),r(a),L(a.activeIndex)):(e<a.activeIndex&&a.activeIndex--,r(a),p(n,a,i),f(n,a,i))}function L(e){let n=u();if(e<0||e>=n.panes.length)return;let i=n.panes[e];if(!i)return;n.activeIndex=e,r(n);let a=new URL(I(i.slug),window.location.origin);window.spaNavigate?window.spaNavigate(a,!1):window.location.href=a.toString()}function T(){let e=document.getElementById("andy-container");if(!e)return;let n=m(e),i=u();window.innerWidth<n.mobileBreakpoint?(e.style.display="none",document.body.classList.remove("has-andy-left","has-andy-right"),document.documentElement.classList.remove("andy-active")):(e.style.display="",i.panes.length>1&&(p(e,i,n),f(e,i,n)))}var y=null;function P(){let e=document.getElementById("andy-container");if(!e)return;let n=m(e),i=b(),a=w();if(i===y){let t=u();t.panes.length>1&&(p(e,t,n),f(e,t,n));return}y=i,C(i,a)}document.addEventListener("nav",()=>{P()});document.addEventListener("render",()=>{let e=document.getElementById("andy-container");if(!e)return;let n=m(e),i=u();i.panes.length>1&&(p(e,i,n),f(e,i,n))});var l=null;function M(){l||(l=()=>T(),window.addEventListener("resize",l),window.addCleanup&&window.addCleanup(()=>{l&&(window.removeEventListener("resize",l),l=null)}))}M();\n';

// src/components/StackedPages.tsx
var StackedPages_default = ((opts) => {
  const {
    paneWidth = 650,
    maxPanes = 5,
    mobileBreakpoint = 800,
    animate = true,
    showSpines = true
  } = opts ?? {};
  const Component = (_props) => {
    return /* @__PURE__ */ u2(
      "div",
      {
        id: "andy-container",
        "data-pane-width": paneWidth,
        "data-max-panes": maxPanes,
        "data-mobile-breakpoint": mobileBreakpoint,
        "data-animate": animate,
        "data-show-spines": showSpines
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