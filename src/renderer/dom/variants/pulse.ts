export interface PulseElements {
    svg: SVGSVGElement;
    circles: SVGCircleElement[];
  }
  
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  
  export function createPulseElements(): PulseElements {
    const svg = document.createElementNS(SVG_NAMESPACE, "svg");
  
    svg.setAttribute("viewBox", "0 0 48 16");
  
    const circles = [8, 24, 40].map((cx, index) => {
      const circle = document.createElementNS(
        SVG_NAMESPACE,
        "circle",
      );
  
      circle.setAttribute("cx", String(cx));
      circle.setAttribute("cy", "8");
      circle.setAttribute("r", "4");
      circle.setAttribute("fill", "currentColor");
  
      circle.setAttribute(
        "class",
        `spinner-pulse spinner-pulse--${index + 1}`,
      );
  
      return circle;
    });
  
    for (const circle of circles) {
      svg.appendChild(circle);
    }
  
    return {
      svg,
      circles,
    };
  }
