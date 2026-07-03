"use client";

import { useEffect, useRef } from "react";

/**
 * Flecha pixel SVG 1:1 con el mouse. Solo pointer:fine y sin
 * prefers-reduced-motion; escala 1.25 sobre elementos interactivos.
 */
export default function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.setAttribute("data-cursor", "pixel");
    let x = -100;
    let y = -100;
    let interactive = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = document.elementFromPoint(x, y);
      interactive = Boolean(el?.closest("button,a,[role='button']"));
    };
    const loop = () => {
      const cur = ref.current;
      if (cur) {
        cur.style.transform = `translate(${x - 2}px,${y - 1}px)${interactive ? " scale(1.25)" : ""}`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.removeAttribute("data-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[90] h-[26px] w-[19px]"
      style={{ transform: "translate(-100px,-100px)" }}
      aria-hidden
    >
      <svg
        width="19"
        height="26"
        viewBox="0 0 13 18"
        className="block [shape-rendering:crispEdges]"
        style={{ filter: "drop-shadow(0 0 6px rgba(0,191,255,.55))" }}
      >
        <path
          d="M1 1 L1 15 L4 12 L6 17 L9 16 L7 11 L11 11 Z"
          fill="#ffffff"
          stroke="#0047FF"
          strokeWidth="1.4"
        />
        <rect x="2.5" y="3.5" width="2" height="2" fill="#00FFFF" />
      </svg>
    </div>
  );
}
