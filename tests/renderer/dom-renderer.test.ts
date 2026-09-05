import { describe, expect, it } from "vitest";
import { DomRenderer } from "../../src/renderer/dom/dom-renderer.js";

describe("DomRenderer", () => {
  it("mounts the pulse SVG", () => {
    const renderer = new DomRenderer();
    const container = document.createElement("div");

    renderer.mount(container);

    const svg = container.querySelector("svg");

    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 48 16");
  });

  it("renders three pulse circles", () => {
    const renderer = new DomRenderer();
    const container = document.createElement("div");

    renderer.mount(container);

    const circles = container.querySelectorAll("circle");

    expect(circles).toHaveLength(3);
  });

  it("applies size and color", () => {
    const renderer = new DomRenderer();
    const container = document.createElement("div");

    renderer.mount(container);

    renderer.update(
      {
        size: 48,
        color: "royalblue",
        variant: "pulse",
      },
      true,
    );

    const svg = container.querySelector("svg");

    expect(svg?.getAttribute("width")).toBe("48px");
    expect(svg?.getAttribute("height")).toBe("48px");
    expect(svg?.style.color).toBe("royalblue");
  });

  it("starts all pulse circles", () => {
    const renderer = new DomRenderer();
    const container = document.createElement("div");

    renderer.mount(container);

    renderer.update(
      {
        size: 24,
        color: "red",
        variant: "pulse",
      },
      true,
    );

    const circles = container.querySelectorAll("circle");

    for (const circle of circles) {
      expect(circle.classList.contains("spinner-pulse--running")).toBe(true);
    }
  });

  it("stops all pulse circles", () => {
    const renderer = new DomRenderer();
    const container = document.createElement("div");

    renderer.mount(container);

    renderer.update(
      {
        size: 24,
        color: "red",
        variant: "pulse",
      },
      true,
    );

    renderer.update(
      {
        size: 24,
        color: "red",
        variant: "pulse",
      },
      false,
    );

    const circles = container.querySelectorAll("circle");

    for (const circle of circles) {
      expect(circle.classList.contains("spinner-pulse--running")).toBe(false);
    }
  });

  it("unmounts the SVG", () => {
    const renderer = new DomRenderer();
    const container = document.createElement("div");

    renderer.mount(container);

    expect(container.querySelector("svg")).not.toBeNull();

    renderer.unmount();

    expect(container.querySelector("svg")).toBeNull();
  });

  it("does not mount twice", () => {
    const renderer = new DomRenderer();
    const container = document.createElement("div");

    renderer.mount(container);
    renderer.mount(container);

    expect(container.querySelectorAll("svg")).toHaveLength(1);
  });
});
