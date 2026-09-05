import { describe, expect, it } from "vitest";
import { Spinner } from "../../src/core/spinner.js";
import type { SpinnerOptions } from "../../src/core/types.js";
import type { SpinnerRenderer } from "../../src/renderer/renderer.js";

class FakeRenderer implements SpinnerRenderer {
  mountCalls = 0;
  updateCalls: Array<{
    options: SpinnerOptions;
    isRunning: boolean;
  }> = [];
  unmountCalls = 0;

  mount(): void {
    this.mountCalls++;
  }

  update(options: SpinnerOptions, isRunning: boolean): void {
    this.updateCalls.push({
      options,
      isRunning,
    });
  }

  unmount(): void {
    this.unmountCalls++;
  }
}

describe("Spinner", () => {
  it("starts and stops correctly", () => {
    const renderer = new FakeRenderer();
    const spinner = new Spinner(renderer);

    expect(spinner.isRunning()).toBe(false);

    spinner.start();

    expect(spinner.isRunning()).toBe(true);

    spinner.stop();

    expect(spinner.isRunning()).toBe(false);
  });

  it("does not duplicate start or stop operations", () => {
    const renderer = new FakeRenderer();
    const spinner = new Spinner(renderer);

    spinner.start();
    spinner.start();

    expect(spinner.isRunning()).toBe(true);

    spinner.stop();
    spinner.stop();

    expect(spinner.isRunning()).toBe(false);
  });

  it("allows start before mount", () => {
    const renderer = new FakeRenderer();
    const spinner = new Spinner(renderer);

    spinner.start();

    expect(spinner.isRunning()).toBe(true);
    expect(renderer.updateCalls).toHaveLength(0);

    spinner.mount({} as HTMLElement);

    expect(renderer.mountCalls).toBe(1);
    expect(renderer.updateCalls).toHaveLength(1);
    expect(renderer.updateCalls[0]?.isRunning).toBe(true);
  });

  it("updates the renderer when started after mount", () => {
    const renderer = new FakeRenderer();
    const spinner = new Spinner(renderer);

    spinner.mount({} as HTMLElement);
    spinner.start();

    expect(renderer.updateCalls).toHaveLength(2);
    expect(renderer.updateCalls[1]?.isRunning).toBe(true);
  });

  it("updates the renderer when stopped after mount", () => {
    const renderer = new FakeRenderer();
    const spinner = new Spinner(renderer);

    spinner.mount({} as HTMLElement);
    spinner.start();
    spinner.stop();

    expect(renderer.updateCalls).toHaveLength(3);
    expect(renderer.updateCalls[2]?.isRunning).toBe(false);
  });

  it("unmounts without changing the running state", () => {
    const renderer = new FakeRenderer();
    const spinner = new Spinner(renderer);

    spinner.start();
    spinner.mount({} as HTMLElement);
    spinner.unmount();

    expect(renderer.unmountCalls).toBe(1);
    expect(spinner.isRunning()).toBe(true);
  });

  it("keeps spinner instances independent", () => {
    const renderer1 = new FakeRenderer();
    const renderer2 = new FakeRenderer();

    const spinner1 = new Spinner(renderer1);
    const spinner2 = new Spinner(renderer2);

    spinner1.start();

    expect(spinner1.isRunning()).toBe(true);
    expect(spinner2.isRunning()).toBe(false);
  });
});
