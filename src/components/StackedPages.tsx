import type {
  QuartzComponent,
  QuartzComponentProps,
  QuartzComponentConstructor,
} from "@quartz-community/types";
import type { AndyModeOptions } from "../types";
import style from "./styles/stacked.scss";
// @ts-expect-error - inline script import handled by Quartz bundler
import script from "./scripts/stacked.inline.ts";

export default ((opts?: Partial<AndyModeOptions>) => {
  const {
    paneWidth = 650,
    maxPanes = 5,
    mobileBreakpoint = 800,
    animate = true,
    showSpines = true,
  } = opts ?? {};

  const Component: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div
        id="andy-container"
        data-pane-width={paneWidth}
        data-max-panes={maxPanes}
        data-mobile-breakpoint={mobileBreakpoint}
        data-animate={animate}
        data-show-spines={showSpines}
      />
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor<Partial<AndyModeOptions>>;
