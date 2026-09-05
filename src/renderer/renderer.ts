import type { SpinnerOptions } from "../core/types.js";

export interface SpinnerRenderer {
  mount(container: HTMLElement): void;
  update(options: SpinnerOptions, isRunning: boolean): void;
  unmount(): void;
}