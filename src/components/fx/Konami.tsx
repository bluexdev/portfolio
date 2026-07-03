"use client";

import { useEffect, useRef, useState } from "react";
import { useTrack } from "@/components/layout/HorizontalTrack";

const SEQ = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

declare global {
  interface Window {
    __cxdConsoleHello?: boolean;
  }
}

/**
 * Konami (↑↑↓↓←→←→BA): toggle XBLUE MODE — confetti pixel, toast
 * y snake rainbow (via contexto). Incluye el easter egg de consola.
 */
export default function Konami() {
  const { toggleXblue, xblue } = useTrack();
  const [toast, setToast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buffer = useRef<string[]>([]);
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);
  const toastT = useRef<number | undefined>(undefined);
  const wasXblue = useRef(false);

  // banner de consola (una vez)
  useEffect(() => {
    if (window.__cxdConsoleHello) return;
    window.__cxdConsoleHello = true;
    console.log(
      "%c▚▚ CARLXSDEV ▚▚",
      "font-family:monospace;font-size:20px;font-weight:bold;color:#00FFFF;background:#05050c;padding:8px 14px;"
    );
    console.log(
      "%c¿Inspeccionando el código? Me gusta tu estilo.\n→ carmm41@gmail.com · github.com/bluexdev\nTip: prueba ↑↑↓↓←→←→BA",
      "font-family:monospace;color:#0080FF;font-size:12px;line-height:1.7;"
    );
  }, []);

  // detección de la secuencia
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const buf = buffer.current;
      buf.push(k);
      if (buf.length > SEQ.length) buf.shift();
      if (buf.length === SEQ.length && buf.every((v, i) => v === SEQ[i])) {
        buffer.current = [];
        toggleXblue();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleXblue]);

  // al activarse: toast + confetti
  useEffect(() => {
    if (xblue && !wasXblue.current) {
      setToast(true);
      clearTimeout(toastT.current);
      toastT.current = window.setTimeout(() => setToast(false), 2800);

      const c = canvasRef.current;
      if (c) {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        for (let i = 0; i < 90; i++) {
          const a = Math.random() * 6.283;
          const sp = 2 + Math.random() * 5;
          particles.current.push({
            x: c.width / 2,
            y: c.height / 2,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp - 2,
            life: 70 + Math.random() * 50,
            size: 3 + Math.random() * 5,
            hue: (Math.random() * 360) | 0,
          });
        }
        cancelAnimationFrame(raf.current);
        const loop = () => {
          const ctx = c.getContext("2d");
          if (!ctx) return;
          ctx.clearRect(0, 0, c.width, c.height);
          particles.current = particles.current.filter((p) => p.life > 0);
          for (const p of particles.current) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.08;
            p.life--;
            ctx.globalAlpha = Math.min(0.9, p.life / 40);
            ctx.fillStyle = `hsl(${p.hue},100%,60%)`;
            ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
          }
          ctx.globalAlpha = 1;
          if (particles.current.length) raf.current = requestAnimationFrame(loop);
          else ctx.clearRect(0, 0, c.width, c.height);
        };
        raf.current = requestAnimationFrame(loop);
      }
    }
    wasXblue.current = xblue;
    return () => cancelAnimationFrame(raf.current);
  }, [xblue]);

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[60]" aria-hidden />
      {toast && (
        <div className="absolute left-1/2 top-[72px] z-[70] -translate-x-1/2 whitespace-nowrap bg-cyan px-5 py-[13px] font-display text-[11px] text-ink shadow-[6px_6px_0_rgba(0,0,0,.5),0_0_30px_rgba(0,255,255,.6)]">
          ★ XBLUE MODE ACTIVADO ★
        </div>
      )}
    </>
  );
}
