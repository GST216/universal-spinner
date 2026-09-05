import type {
    MountableSpinner,
    SpinnerController,
    SpinnerOptions,
} from "./types.js";
import type {SpinnerRenderer} from "../renderer/renderer.js";

const DEFAULT_OPTIONS: Required<SpinnerOptions> = {
    size: 24,
    color: "currentColor",
    variant: 'pulse',
}

export class Spinner implements SpinnerController, MountableSpinner {
    private readonly options: Required<SpinnerOptions>;
    private readonly renderer: SpinnerRenderer;

    private running =  false;
    private mounted =  false;

    constructor(renderer: SpinnerRenderer, options: SpinnerOptions={}){
        this.renderer = renderer;
        this.options = {
            ...DEFAULT_OPTIONS, ...options
        }
    }
    start(): void {
        if(this.running){
            return;
        }
        this.running = true;
        if(this.mounted){
            this.renderer.update(this.options,true);
        }
    }

    stop(): void {
        if(!this.running){
            return;
        }
        this.running = false;
        if(this.mounted){
            this.renderer.update(this.options, false);
        }
    }
    isRunning(): boolean {
        return this.running;
    }

    mount(container:HTMLElement):void {
        if(this.mounted){
            return;
        }
        this.renderer.mount(container);
        this.mounted = true;
        this.renderer.update(this.options, this.running);
    }

    unmount(): void {
        if(!this.mounted){
            return;
        }
        this.renderer.unmount();
        this.mounted = false;
    }

}
