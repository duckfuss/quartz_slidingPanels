// ============================================================================
// Andy Mode (Sliding Panes) — Toggle-activated horizontal pane navigation
// ============================================================================

const TOGGLE_KEY = "andy-mode-enabled";
const STATE_KEY = "andy-mode-state";

// --- Helpers ---

function getCurrentSlug(): string {
  let slug = window.location.pathname;
  const raw = slug;
  if (slug.startsWith("/")) slug = slug.slice(1);
  if (slug.endsWith("/")) slug = slug.slice(0, -1);
  const result = slug || "index";
  console.log("[AndyDebug] getCurrentSlug:", { raw, result });
  return result;
}

function getPageTitle(): string {
  return (
    document.querySelector("h1")?.textContent?.trim() ||
    document.title ||
    getCurrentSlug()
  );
}

function getBasePath(): string {
  return document.body?.dataset?.basepath ?? "";
}

function resolveUrl(slug: string): string {
  const base = getBasePath();
  const path = slug.startsWith("/") ? slug : "/" + slug;
  return base + path;
}

// --- Config ---

interface AndyConfig {
  paneWidth: number;
  maxPanes: number;
  mobileBreakpoint: number;
  animate: boolean;
}

function readConfig(): AndyConfig {
  const slot = document.getElementById("andy-mode-slot");
  if (!slot) {
    return {
      paneWidth: 650,
      maxPanes: 5,
      mobileBreakpoint: 800,
      animate: true,
    };
  }
  return {
    paneWidth: parseInt(slot.dataset.paneWidth || "650", 10),
    maxPanes: parseInt(slot.dataset.maxPanes || "5", 10),
    mobileBreakpoint: parseInt(slot.dataset.mobileBreakpoint || "800", 10),
    animate: slot.dataset.animate !== "false",
  };
}

// --- Enabled state ---

function isEnabled(): boolean {
  try {
    return localStorage.getItem(TOGGLE_KEY) === "true";
  } catch {
    return false;
  }
}

function setEnabled(val: boolean): void {
  try {
    localStorage.setItem(TOGGLE_KEY, val ? "true" : "false");
  } catch {
    // ignore
  }
}

// --- Pane state ---

interface AndyPane {
  slug: string;
  title: string;
  contentHTML: string | null;
}

interface AndyState {
  panes: AndyPane[];
  activeIndex: number;
}

function loadState(): AndyState {
  try {
    const raw = sessionStorage.getItem(STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.panes) && typeof parsed.activeIndex === "number") {
        console.log("[AndyDebug] loadState:", JSON.parse(JSON.stringify(parsed)));
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  console.log("[AndyDebug] loadState: returning default { panes: [], activeIndex: -1 }");
  return { panes: [], activeIndex: -1 };
}

function saveState(state: AndyState): void {
  try {
    console.log("[AndyDebug] saveState:", JSON.parse(JSON.stringify(state)));
    sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

// --- Content fetching ---

function extractCurrentPageContent(): string | null {
  const center = document.querySelector(".center");
  if (center) return center.innerHTML;
  const body = document.querySelector("#quartz-body");
  if (body) return body.innerHTML;
  return null;
}

async function fetchPageContent(slug: string): Promise<string | null> {
  try {
    const url = resolveUrl(slug);
    const resp = await fetch(url);
    if (!resp.ok) return null;

    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const center = doc.querySelector(".center");
    if (center) return center.innerHTML;

    const body = doc.querySelector("#quartz-body");
    if (body) return body.innerHTML;

    return null;
  } catch {
    return null;
  }
}

// --- DOM: Toggle button ---

function ensureToggleButton(): void {
  if (document.getElementById("andy-mode-toggle")) return;

  const btn = document.createElement("button");
  btn.id = "andy-mode-toggle";
  btn.className = "andy-mode-toggle";
  btn.setAttribute("aria-label", "Toggle Andy Mode");
  btn.title = "Sliding Panes";

  // Horizontal panels icon
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="3" y="3" width="18" height="5" rx="1"/>' +
    '<rect x="3" y="10" width="18" height="5" rx="1"/>' +
    '<rect x="3" y="17" width="18" height="5" rx="1"/>' +
    "</svg>";

  if (isEnabled()) {
    btn.classList.add("andy-mode-active");
  }

  btn.addEventListener("click", () => {
    const newState = !isEnabled();
    setEnabled(newState);

    if (newState) {
      sessionStorage.removeItem(STATE_KEY);
      btn.classList.add("andy-mode-active");
      activateAndyMode();
    } else {
      btn.classList.remove("andy-mode-active");
      deactivateAndyMode();
    }
  });

  document.body.appendChild(btn);
}

// --- DOM: Container ---

function ensureContainer(): HTMLElement {
  let container = document.getElementById("andy-container");
  if (container) return container;

  const config = readConfig();
  container = document.createElement("div");
  container.id = "andy-container";
  container.dataset.paneWidth = String(config.paneWidth);
  container.dataset.maxPanes = String(config.maxPanes);
  container.dataset.mobileBreakpoint = String(config.mobileBreakpoint);
  container.dataset.animate = String(config.animate);
  document.body.appendChild(container);
  return container;
}

// --- Pane click tracking ---

let clickedFromPaneIndex: number | null = null;

// --- Pane rendering ---

function renderPanes(
  container: HTMLElement,
  state: AndyState,
  config: AndyConfig,
): void {
  container.querySelectorAll(".andy-pane-track").forEach((el) => el.remove());

  if (state.panes.length === 0) {
    container.classList.remove("active");
    document.documentElement.classList.remove("andy-active");
    return;
  }

  container.classList.add("active");
  document.documentElement.classList.add("andy-active");

  const track = document.createElement("div");
  track.className = "andy-pane-track";

  for (let i = 0; i < state.panes.length; i++) {
    const pane = state.panes[i];
    const paneEl = document.createElement("div");
    paneEl.className = "andy-pane";
    paneEl.dataset.index = String(i);
    if (i === state.activeIndex) {
      paneEl.classList.add("andy-pane-active");
    }

    // Pane width
    paneEl.style.width = config.paneWidth + "px";

    const content = document.createElement("div");
    content.className = "andy-pane-content";

    if (pane.contentHTML) {
      content.innerHTML = pane.contentHTML;
    } else {
      const loading = document.createElement("div");
      loading.className = "andy-pane-loading";
      loading.textContent = "Loading\u2026";
      content.appendChild(loading);

      // Fetch in background (don't block render)
      fetchPageContent(pane.slug).then((html) => {
        if (html) {
          const freshState = loadState();
          const idx = freshState.panes.findIndex((p) => p.slug === pane.slug);
          if (idx >= 0) {
            freshState.panes[idx].contentHTML = html;
            saveState(freshState);
            const c = document.getElementById("andy-container");
            if (c) {
              renderPanes(c, freshState, config);
            }
          }
        } else {
          loading.textContent = "Failed to load";
        }
      });
    }

    paneEl.appendChild(content);

    // Track which pane a link was clicked from
    content.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) {
        clickedFromPaneIndex = i;
      }
    });

    if (config.animate && i === state.activeIndex) {
      paneEl.classList.add("andy-pane-animate");
    }

    track.appendChild(paneEl);
  }

  container.appendChild(track);
  scrollToActivePane(track, state.activeIndex);
}

function scrollToActivePane(track: HTMLElement, activeIndex: number): void {
  const panes = track.querySelectorAll(".andy-pane");
  const activePane = panes[activeIndex] as HTMLElement | undefined;
  if (activePane) {
    activePane.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }
}

// --- Pane operations ---

function addPane(slug: string, title: string): void {
  if (!isEnabled()) {
    console.log("[AndyDebug] addPane: disabled, returning");
    return;
  }

  const container = ensureContainer();
  const config = readConfig();
  const state = loadState();

  // Use the pane the user actually clicked from, not just activeIndex
  const sourceIndex = clickedFromPaneIndex ?? state.activeIndex;
  clickedFromPaneIndex = null;

  console.log("[AndyDebug] addPane called:", { slug, title, activeIndex: state.activeIndex, sourceIndex, paneSlugs: state.panes.map(p => p.slug) });

  // Same page as source — just update title
  if (sourceIndex >= 0 && state.panes[sourceIndex]?.slug === slug) {
    console.log("[AndyDebug] addPane: SAME PAGE branch (sourceIndex=" + sourceIndex + ", slug=" + slug + ")");
    state.panes[sourceIndex].title = title;
    state.activeIndex = sourceIndex;
    saveState(state);
    renderBinderStrips(container, state, config);
    renderPanes(container, state, config);
    return;
  }

  // Page exists in list — truncate to it (path backtracking)
  const existingIndex = state.panes.findIndex((p) => p.slug === slug);
  if (existingIndex >= 0) {
    console.log("[AndyDebug] addPane: EXISTING branch (existingIndex=" + existingIndex + ", will truncate after it)");
    state.panes.splice(existingIndex + 1);
    state.activeIndex = existingIndex;
  } else {
    // New page — insert after the source pane, then remove everything after it
    const insertAt = sourceIndex + 1;
    console.log("[AndyDebug] addPane: NEW branch (insertAt=" + insertAt + ", sourceIndex=" + sourceIndex + ")");
    const isCurrentPage = slug === getCurrentSlug();
    const contentHTML = isCurrentPage ? extractCurrentPageContent() : null;
    state.panes.splice(insertAt, 0, { slug, title, contentHTML });
    console.log("[AndyDebug] addPane: after insert, panes:", state.panes.map(p => p.slug));
    state.panes.splice(insertAt + 1); // remove everything after new pane
    console.log("[AndyDebug] addPane: after truncate, panes:", state.panes.map(p => p.slug));
    state.activeIndex = insertAt;

    if (state.panes.length > config.maxPanes) {
      state.panes.shift();
      state.activeIndex--;
    }
  }

  console.log("[AndyDebug] addPane: final state:", { panes: state.panes.map(p => p.slug), activeIndex: state.activeIndex });
  saveState(state);
  renderBinderStrips(container, state, config);
  renderPanes(container, state, config);

  // Fetch content in background for non-current pages
  if (state.activeIndex >= 0 && !state.panes[state.activeIndex].contentHTML) {
    fetchPageContent(slug).then((html) => {
      if (html) {
        const freshState = loadState();
        const idx = freshState.panes.findIndex((p) => p.slug === slug);
        if (idx >= 0) {
          freshState.panes[idx].contentHTML = html;
          saveState(freshState);
          const c = document.getElementById("andy-container");
          if (c) {
            renderBinderStrips(c, freshState, config);
            renderPanes(c, freshState, config);
          }
        }
      }
    });
  }
}

// --- Binder strip rendering (left/right tabs on edges) ---

function renderBinderStrips(
  container: HTMLElement,
  state: AndyState,
  config: AndyConfig,
): void {
  container.querySelectorAll(".andy-binder-strip").forEach((el) => el.remove());

  const leftPanes = state.panes.slice(0, state.activeIndex);
  const rightPanes = state.panes.slice(state.activeIndex + 1);

  if (leftPanes.length > 0) {
    const strip = document.createElement("div");
    strip.className = "andy-binder-strip andy-binder-strip-left";
    for (let i = 0; i < leftPanes.length; i++) {
      strip.appendChild(createBinderTab(leftPanes[i], i, "left", state));
    }
    container.appendChild(strip);
  }

  if (rightPanes.length > 0) {
    const strip = document.createElement("div");
    strip.className = "andy-binder-strip andy-binder-strip-right";
    for (let i = 0; i < rightPanes.length; i++) {
      const idx = state.activeIndex + 1 + i;
      strip.appendChild(createBinderTab(rightPanes[i], idx, "right", state));
    }
    container.appendChild(strip);
  }

  document.body.classList.toggle("has-andy-left", leftPanes.length > 0);
  document.body.classList.toggle("has-andy-right", rightPanes.length > 0);
}

function createBinderTab(
  pane: AndyPane,
  index: number,
  side: "left" | "right",
  state: AndyState,
): HTMLElement {
  const tab = document.createElement("div");
  tab.className = `andy-binder-tab andy-binder-tab-${side}`;
  tab.dataset.index = String(index);
  if (index === state.activeIndex) {
    tab.classList.add("andy-binder-tab-active");
  }

  const label = document.createElement("span");
  label.className = "andy-binder-label";
  label.textContent = pane.title;
  tab.appendChild(label);

  if (state.panes.length >= 2) {
    const closeBtn = document.createElement("button");
    closeBtn.className = "andy-binder-close";
    closeBtn.textContent = "\u00d7";
    closeBtn.setAttribute("aria-label", "Close " + pane.title);
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closePane(index);
    });
    tab.appendChild(closeBtn);
  }

  tab.addEventListener("click", () => navigateToPane(index));
  return tab;
}

function closePane(index: number): void {
  const container = document.getElementById("andy-container");
  if (!container) return;

  const config = readConfig();
  const state = loadState();
  if (state.panes.length < 1) return;

  const wasActive = index === state.activeIndex;
  state.panes.splice(index, 1);

  if (wasActive) {
    state.activeIndex = Math.min(index, state.panes.length - 1);
    saveState(state);
    navigateToPane(state.activeIndex);
  } else {
    if (index < state.activeIndex) {
      state.activeIndex--;
    }
    saveState(state);
    renderBinderStrips(container, state, config);
    renderPanes(container, state, config);
  }
}

function navigateToPane(index: number): void {
  const state = loadState();
  if (index < 0 || index >= state.panes.length) return;

  const pane = state.panes[index];
  if (!pane) return;

  state.activeIndex = index;
  saveState(state);

  const url = new URL(resolveUrl(pane.slug), window.location.origin);
  if (window.spaNavigate) {
    window.spaNavigate(url, false);
  } else {
    window.location.href = url.toString();
  }
}

// --- Activate / Deactivate ---

function activateAndyMode(): void {
  console.log("[AndyDebug] activateAndyMode called");
  const container = ensureContainer();
  setupPaneCallouts();
  const config = readConfig();
  const slug = getCurrentSlug();
  const title = getPageTitle();
  addPane(slug, title);
}

function deactivateAndyMode(): void {
  const container = document.getElementById("andy-container");
  if (container) {
    container.classList.remove("active");
    container.remove();
  }
  const toggle = document.getElementById("andy-mode-toggle");
  if (toggle) {
    toggle.classList.remove("andy-mode-active");
  }
  document.documentElement.classList.remove("andy-active");
  document.body.classList.remove("has-andy-left", "has-andy-right");
}

// --- Navigation handler ---

let lastSlug: string | null = null;

function onNav(): void {
  ensureToggleButton();
  setupResize();
  setupPaneCallouts();

  if (!isEnabled()) {
    console.log("[AndyDebug] onNav: disabled, deactivate");
    deactivateAndyMode();
    return;
  }

  const slug = getCurrentSlug();
  const title = getPageTitle();

  console.log("[AndyDebug] onNav:", { slug, lastSlug, isSamePage: slug === lastSlug });

  if (slug === lastSlug) {
    // Same page — just re-render if needed
    console.log("[AndyDebug] onNav: SAME SLUG as last, re-rendering");
    const container = ensureContainer();
    const config = readConfig();
    const state = loadState();
    if (state.panes.length >= 1) {
      renderBinderStrips(container, state, config);
      renderPanes(container, state, config);
    }
    return;
  }

  console.log("[AndyDebug] onNav: DIFFERENT slug, calling addPane");
  lastSlug = slug;
  addPane(slug, title);
}

// --- Resize handler ---

let resizeCleanup: (() => void) | null = null;

function setupResize(): void {
  if (resizeCleanup) return;

  const handler = () => {
    const config = readConfig();
    if (window.innerWidth < config.mobileBreakpoint) {
      deactivateAndyMode();
    }
  };

  window.addEventListener("resize", handler);
  resizeCleanup = () => window.removeEventListener("resize", handler);
}

// --- Callout fold/unfold for dynamically injected pane content ---

function setupPaneCallouts(): void {
  const container = document.getElementById("andy-container");
  if (!container) return;
  if (container.dataset.calloutListener === "true") return;

  container.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const title = target.closest(".callout-title");
    if (!title) return;
    const callout = title.closest(".callout");
    if (!callout || !callout.classList.contains("is-collapsible")) return;
    callout.classList.toggle("is-collapsed");
    const content = callout.querySelector(".callout-content") as HTMLElement;
    if (content) {
      content.style.gridTemplateRows = callout.classList.contains("is-collapsed") ? "0fr" : "1fr";
    }
  });
  container.dataset.calloutListener = "true";
}

// --- Init ---
document.addEventListener("nav", onNav);
document.addEventListener("render", () => {
  if (!isEnabled()) return;
  const container = document.getElementById("andy-container");
  if (!container) return;
  const config = readConfig();
  const state = loadState();
  if (state.panes.length >= 1) {
    renderBinderStrips(container, state, config);
    renderPanes(container, state, config);
  }
});

// --- TypeScript Augmentation ---
declare global {
  interface Window {
    spaNavigate?: (url: URL, replace?: boolean) => void;
    addCleanup?: (fn: () => void) => void;
  }
}
