"use client";

import { useEffect, useState } from "react";

const GLYPHS = "█▓▒░<>/#@$%&";

/**
 * Efecto scramble: revela el texto carácter a carácter sustituyendo
 * el resto por glyphs. SSR renderiza el texto final (SEO) y el efecto
 * corre al montar o cambiar `text`. Respeta prefers-reduced-motion.
 */
export default function Scramble({
  text,
  speed = 30,
  delay = 0,
  className,
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    let i = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i++;
        setDisplay(
          text
            .split("")
            .map((c, j) => (j < i ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
            .join("")
        );
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return <span className={className}>{display}</span>;
}
