import { QuartzComponent } from '@quartz-community/types';
import { AndyModeOptions } from '../types.js';

interface ExampleComponentOptions {
    prefix?: string;
    suffix?: string;
    className?: string;
}
declare const _default$1: (opts?: ExampleComponentOptions) => QuartzComponent;

declare const _default: (opts?: Partial<AndyModeOptions>) => QuartzComponent;

export { AndyModeOptions, _default$1 as ExampleComponent, type ExampleComponentOptions, _default as StackedPages };
