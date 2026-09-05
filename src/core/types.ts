export type SpinnerVariant = 'pulse';

export interface SpinnerOptions {
    size?:number | string;
    color?: string;
    variant?: SpinnerVariant;
}

export interface SpinnerController {
    start(): void;
    stop(): void;
    isRunning(): void;
}

export interface MountableSpinner {
    mount(container: HTMLElement): void;
    unmount(): void;
  }