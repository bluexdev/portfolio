"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTrack } from "@/components/layout/HorizontalTrack";

/**
 * Primera visita a la sección → stagger fade + translateY(10px),
 * 90ms entre elementos hijos directos. Desactivado con reduced-motion.
 */
export default function RevealStagger({
  index,
  children,
  className,
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const { activeIdx, reduced } = useTrack();
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current || reduced || activeIdx !== index) return;
    done.current = true;
    const root = ref.current;
    if (!root) return;
    const els = (Array.from(root.children) as HTMLElement[]).slice(0, 8);
    els.forEach((el, i) => {
      if (el.tagName === "CANVAS") return;
      el.style.opacity = "0";
      window.setTimeout(() => {
        el.style.transition = "opacity .5s ease, transform .5s ease";
        el.style.transform = "translateY(10px)";
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      }, 60 + i * 90);
    });
  }, [activeIdx, index, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
