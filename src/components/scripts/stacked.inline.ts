// ============================================================================
// Andy Mode (Sliding Panes) — Unified binder tabs + horizontal content panes
// ============================================================================

// --- Constants ---
const STATE_KEY = "andy-mode-state";

// --- Helpers ---

function getCurrentSlug(): string {
  let slug = window.location.pathname;
  if (slug.startsWith("/")) slug = slug.slice(1);
  if (slug.endsWith("/")) slug = slug.slice(0, -1);
  return slug || "index";
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

// --- State ---

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
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return { panes: [], activeIndex: -1 };
}

function saveState(state: AndyState): void {
  try {
    sessionStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

// --- Config ---

interface AndyConfig {
  paneWidth: number;
  maxPanes: number;
  mobileBreakpoint: number;
  animate: boolean;
  showSpines: boolean;
}

function readConfig(container: HTMLElement): AndyConfig {
  return {
    paneWidth: parseInt(container.dataset.paneWidth || "650", 10),
    maxPanes: parseInt(container.dataset.maxPanes || "5", 10),
    mobileBreakpoint: parseInt(container.dataset.mobileBreakpoint || "800", 10),
    animate: container.dataset.animate !== "false",
    showSpines: container.dataset.showSpines !== "false",
  };
}

// --- Content Fetching ---

async function fetchPageContent(slug: string): Promise<string | null> {
  try {
    const url = resolveUrl(slug);
    const resp = await fetch(url);
    if (!resp.ok) return null;

    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract the page body content
    const body = doc.querySelector("#quartz-body");
    if (body) return body.innerHTML;

    // Fallback: try main content area
    const main = doc.querySelector("article") || doc.querySelector("main");
    if (main) return main.innerHTML;

    return null;
  } catch {
    return null;
  }
}

// --- DOM Rendering ---

function renderBinderStrips(
  container: HTMLElement,
  state: AndyState,
  config: AndyConfig,
): void {
  // Remove old strips
  container.querySelectorAll(".andy-binder-strip").forEach((el) => el.remove());

  const leftPanes = state.panes.slice(0, state.activeIndex);
  const rightPanes = state.panes.slice(state.activeIndex + 1);

  // Left strip (panes before active)
  if (leftPanes.length > 0) {
    const strip = document.createElement("div");
    strip.className = "andy-binder-strip andy-binder-strip-left";

    for (let i = 0; i < leftPanes.length; i++) {
      strip.appendChild(createBinderTab(leftPanes[i], i, "left", state, config));
    }

    container.appendChild(strip);
  }

  // Right strip (panes after active)
  if (rightPanes.length > 0) {
    const strip = document.createElement("div");
    strip.className = "andy-binder-strip andy-binder-strip-right";

    for (let i = 0; i < rightPanes.length; i++) {
      const paneIndex = state.activeIndex + 1 + i;
      strip.appendChild(createBinderTab(rightPanes[i], paneIndex, "right", state, config));
    }

    container.appendChild(strip);
  }

  // Toggle body classes for page padding
  document.body.classList.toggle("has-andy-left", leftPanes.length > 0);
  document.body.classList.toggle("has-andy-right", rightPanes.length > 0);
}

function createBinderTab(
  pane: AndyPane,
  index: number,
  side: "left" | "right",
  state: AndyState,
  _config: AndyConfig,
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

  // Close button (only if more than 1 pane)
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

  tab.addEventListener("click", () => {
    navigateToPane(index);
  });

  return tab;
}

function renderPanes(
  container: HTMLElement,
  state: AndyState,
  config: AndyConfig,
): void {
  // Remove old track
  container.querySelectorAll(".andy-pane-track").forEach((el) => el.remove());

  if (state.panes.length <= 1) {
    container.classList.remove("active");
    return;
  }

  container.classList.add("active");

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

    // Set width from config
    paneEl.style.width = config.paneWidth + "px";

    // Spine label (shown on inactive panes)
    if (config.showSpines) {
      const spine = document.createElement("div");
      spine.className = "andy-pane-spine";
      spine.textContent = pane.title;
      paneEl.appendChild(spine);
    }

    // Content area
    const content = document.createElement("div");
    content.className = "andy-pane-content";

    if (pane.contentHTML) {
      content.innerHTML = pane.contentHTML;
    } else {
      // Loading state
      const loading = document.createElement("div");
      loading.className = "andy-pane-loading";
      loading.textContent = "Loading\u2026";
      content.appendChild(loading);

      // Fetch content asynchronously
      fetchPageContent(pane.slug).then((html) => {
        if (html) {
          pane.contentHTML = html;
          content.innerHTML = html;
          saveState(state);
        } else {
          loading.textContent = "Failed to load";
        }
      });
    }

    paneEl.appendChild(content);

    // Animate new panes
    if (config.animate && i === state.activeIndex) {
      paneEl.classList.add("andy-pane-animate");
    }

    track.appendChild(paneEl);
  }

  container.appendChild(track);

  // Scroll to active pane
  scrollToActivePane(track, state.activeIndex);
}

function scrollToActivePane(track: HTMLElement, activeIndex: number): void {
  const panes = track.querySelectorAll(".andy-pane");
  const activePane = panes[activeIndex] as HTMLElement | undefined;
  if (activePane) {
    // Use scrollIntoView for smooth scrolling
    activePane.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }
}

// --- Pane Operations ---

async function addPane(slug: string, title: string): Promise<void> {
  const container = document.getElementById("andy-container");
  if (!container) return;

  const config = readConfig(container);
  const state = loadState();

  // Check if this slug is already the active pane
  if (state.activeIndex >= 0 && state.panes[state.activeIndex]?.slug === slug) {
    // Just update the title if it changed
    state.panes[state.activeIndex].title = title;
    saveState(state);
    renderBinderStrips(container, state, config);
    return;
  }

  // Check if slug exists somewhere in the pane list
  const existingIndex = state.panes.findIndex((p) => p.slug === slug);
  if (existingIndex >= 0) {
    // Move it to active position: remove from current position and insert at active+1
    const [existing] = state.panes.splice(existingIndex, 1);
    const insertAt = state.activeIndex + 1;
    state.panes.splice(insertAt, 0, existing);
    state.activeIndex = insertAt;
  } else {
    // New pane: insert at active+1
    const insertAt = state.activeIndex + 1;
    state.panes.splice(insertAt, 0, { slug, title, contentHTML: null });
    state.activeIndex = insertAt;

    // Evict oldest panes if over max
    while (state.panes.length > config.maxPanes) {
      if (state.activeIndex > 0) {
        // Evict from the left (oldest)
        state.panes.shift();
        state.activeIndex--;
      } else {
        // Evict from the right
        state.panes.pop();
      }
    }
  }

  saveState(state);

  // Fetch content for the new pane if needed
  if (!state.panes[state.activeIndex].contentHTML) {
    const html = await fetchPageContent(slug);
    if (html) {
      state.panes[state.activeIndex].contentHTML = html;
      saveState(state);
    }
  }

  renderBinderStrips(container, state, config);
  renderPanes(container, state, config);
}

function closePane(index: number): void {
  const container = document.getElementById("andy-container");
  if (!container) return;

  const config = readConfig(container);
  const state = loadState();

  if (state.panes.length < 2) return;

  const wasActive = index === state.activeIndex;
  state.panes.splice(index, 1);

  if (wasActive) {
    // Navigate to the pane that's now at the same index (or the last one)
    state.activeIndex = Math.min(index, state.panes.length - 1);
    saveState(state);
    navigateToPane(state.activeIndex);
  } else {
    // Adjust active index if we removed something before it
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

// --- Resize Handler ---

function handleResize(): void {
  const container = document.getElementById("andy-container");
  if (!container) return;

  const config = readConfig(container);
  const state = loadState();

  if (window.innerWidth < config.mobileBreakpoint) {
    container.style.display = "none";
    document.body.classList.remove("has-andy-left", "has-andy-right");
  } else {
    container.style.display = "";
    if (state.panes.length > 1) {
      renderBinderStrips(container, state, config);
      renderPanes(container, state, config);
    }
  }
}

// --- Main Init ---

let lastSlug: string | null = null;

function init(): void {
  const container = document.getElementById("andy-container");
  if (!container) return;

  const config = readConfig(container);
  const currentSlug = getCurrentSlug();
  const currentTitle = getPageTitle();

  // If same page, just re-render
  if (currentSlug === lastSlug) {
    const state = loadState();
    if (state.panes.length > 1) {
      renderBinderStrips(container, state, config);
      renderPanes(container, state, config);
    }
    return;
  }

  lastSlug = currentSlug;
  addPane(currentSlug, currentTitle);
}

// --- Event Listeners ---

document.addEventListener("nav", () => {
  init();
});

document.addEventListener("render", () => {
  const container = document.getElementById("andy-container");
  if (!container) return;

  const config = readConfig(container);
  const state = loadState();
  if (state.panes.length > 1) {
    renderBinderStrips(container, state, config);
    renderPanes(container, state, config);
  }
});

// Resize handler with cleanup
let resizeHandler: (() => void) | null = null;

function setupResize(): void {
  if (resizeHandler) return;
  resizeHandler = () => handleResize();
  window.addEventListener("resize", resizeHandler);
  if (window.addCleanup) {
    window.addCleanup(() => {
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
        resizeHandler = null;
      }
    });
  }
}

setupResize();

// --- TypeScript Augmentation ---
declare global {
  interface Window {
    spaNavigate?: (url: URL,replace?: boolean) => void;
    addCleanup?: (fn: () => void) => void;
  }
}
