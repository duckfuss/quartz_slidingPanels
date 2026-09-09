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
  const config = {
    paneWidth: opts?.paneWidth ?? 650,
    maxPanes: opts?.maxPanes ?? 5,
    mobileBreakpoint: opts?.mobileBreakpoint ?? 800,
    animate: opts?.animate ?? true,
  };

  const Component: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div
        id="andy-mode-slot"
        data-pane-width={config.paneWidth}
        data-max-panes={config.maxPanes}
        data-mobile-breakpoint={config.mobileBreakpoint}
        data-animate={config.animate}
        style="display:none"
      />
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor<Partial<AndyModeOptions>>;
