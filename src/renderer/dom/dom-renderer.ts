import type { SpinnerOptions } from "../../core/types.js";
import type { SpinnerRenderer } from "../renderer.js";
import {
    createPulseElements,
    type PulseElements,
} from "./variants/pulse.js";

export class DomRenderer implements SpinnerRenderer {
    private elements: PulseElements | null = null;
    mount(container:HTMLElement): void {
        if (this.elements !== null) {
            return;        
        }
        this.elements = createPulseElements();
        container.appendChild(this.elements.svg);
    }

    update(options: SpinnerOptions, isRunning:boolean): void {
        if(this.elements==null){
            return;
        }
        const {svg, circles} = this.elements;
        const size =
  typeof options.size === "number"
    ? `${options.size}px`
    : options.size ?? "24px";
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.style.color = options.color ?? "currentColor";
        for (const circle of circles) {
            circle.classList.toggle("spinner-pulse--running", isRunning);
          }
    }

    unmount(): void {
        if(this.elements=== null){
            return;
        }
        this.elements.svg.remove();
        this.elements = null;
    }
}