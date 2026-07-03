"use client";

import { useEffect, useRef } from "react";
import type { PreviewVariant } from "@/lib/types";

/** RNG determinista (mulberry32) para que cada preview sea estable por seed */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mosaic(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  hue: number,
  seed: number,
  variant: PreviewVariant
) {
  const rnd = rng(seed);
  ctx.fillStyle = "#07070f";
  ctx.fillRect(0, 0, w, h);
  const cell = Math.max(6, Math.round(w / 42));

  // ruido pixel de fondo
  for (let y = 0; y < h; y += cell)
    for (let x = 0; x < w; x += cell) {
      const r = rnd();
      if (r > 0.9) {
        ctx.fillStyle = `hsla(${hue},90%,${22 + r * 28}%,0.16)`;
        ctx.fillRect(x, y, cell - 1, cell - 1);
      }
    }

  // barra de título estilo mac
  ctx.fillStyle = `hsla(${hue},80%,55%,0.14)`;
  ctx.fillRect(0, 0, w, cell * 1.7);
  ["#ff5f56", "#ffbd2e", "#27c93f"].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.globalAlpha = 0.8;
    ctx.fillRect(cell * 0.7 + i * cell, cell * 0.6, cell * 0.5, cell * 0.5);
  });
  ctx.globalAlpha = 1;

  const top = cell * 2.6;
  const H = (l: number, a: number) => `hsla(${hue},85%,${l}%,${a})`;

  if (variant === "shop") {
    ctx.fillStyle = H(55, 0.18);
    ctx.fillRect(cell * 0.6, top, w - cell * 1.2, cell * 0.9);
    const gw = (w - cell * 1.8) / 3;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 2; j++) {
        const x = cell * 0.6 + i * (gw + cell * 0.3);
        const y = top + cell * 1.4 + j * ((h - top - cell * 2) / 2);
        const hh = (h - top - cell * 2.2) / 2;
        ctx.fillStyle = H(50, 0.14);
        ctx.fillRect(x, y, gw, hh);
        ctx.fillStyle = H(60 + rnd() * 10, 0.4);
        ctx.fillRect(x + 2, y + 2, gw - 4, hh * 0.55);
        ctx.fillStyle = `hsla(${hue + 20},95%,65%,0.85)`;
        ctx.fillRect(x + 3, y + hh * 0.68, gw * (0.3 + rnd() * 0.3), cell * 0.4);
      }
  } else if (variant === "kanban") {
    const colw = (w - cell * 2.4) / 3;
    for (let i = 0; i < 3; i++) {
      const x = cell * 0.8 + i * (colw + cell * 0.4);
      ctx.fillStyle = H(45, 0.1);
      ctx.fillRect(x, top, colw, h - top - cell * 0.6);
      ctx.fillStyle = H(62, 0.55);
      ctx.fillRect(x + 3, top + 3, colw * 0.5, cell * 0.4);
      const nCards = 2 + ((rnd() * 3) | 0);
      let y = top + cell;
      for (let k = 0; k < nCards; k++) {
        const chh = cell * (1 + rnd() * 1.4);
        if (y + chh > h - cell) break;
        ctx.fillStyle = H(52 + rnd() * 14, 0.28 + rnd() * 0.25);
        ctx.fillRect(x + 3, y, colw - 6, chh);
        y += chh + cell * 0.35;
      }
    }
  } else if (variant === "chat") {
    let y = top + cell * 0.3;
    for (let i = 0; i < 5; i++) {
      const left = i % 2 === 0;
      const bw = w * (0.3 + rnd() * 0.22);
      const bh = cell * (0.9 + rnd() * 0.7);
      if (y + bh > h - cell * 1.6) break;
      ctx.fillStyle = left ? H(40, 0.22) : `hsla(${hue + 15},95%,60%,0.5)`;
      ctx.fillRect(left ? cell * 0.8 : w - cell * 0.8 - bw, y, bw, bh);
      y += bh + cell * 0.45;
    }
    ctx.fillStyle = H(50, 0.16);
    ctx.fillRect(cell * 0.8, h - cell * 1.3, w - cell * 1.6, cell * 0.8);
    ctx.fillStyle = `hsla(${hue + 15},95%,60%,0.8)`;
    ctx.fillRect(w - cell * 2.2, h - cell * 1.2, cell * 1.2, cell * 0.6);
  } else if (variant === "rooms") {
    const nodes: { x: number; y: number }[] = [];
    for (let i = 0; i < 5; i++)
      nodes.push({ x: cell + rnd() * (w - cell * 3.5), y: top + rnd() * (h - top - cell * 2.5) });
    ctx.strokeStyle = H(55, 0.35);
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const b = nodes[(i + 1) % nodes.length];
      ctx.beginPath();
      ctx.moveTo(a.x + cell, a.y + cell * 0.7);
      ctx.lineTo(b.x + cell, b.y + cell * 0.7);
      ctx.stroke();
    }
    for (const n of nodes) {
      ctx.fillStyle = H(50, 0.3);
      ctx.fillRect(n.x, n.y, cell * 2, cell * 1.4);
      ctx.fillStyle = `hsla(${hue + 20},95%,65%,0.9)`;
      ctx.fillRect(n.x + cell * 0.3, n.y + cell * 0.35, cell * 0.5, cell * 0.5);
      ctx.fillStyle = H(70, 0.7);
      ctx.fillRect(n.x + cell, n.y + cell * 0.35, cell * 0.6, cell * 0.2);
    }
  } else if (variant === "flow") {
    const n = 4;
    const y = top + (h - top) / 2 - cell;
    const nw = cell * 2.2;
    const gap = (w - cell * 1.6 - n * nw) / (n - 1);
    for (let i = 0; i < n; i++) {
      const x = cell * 0.8 + i * (nw + gap);
      if (i > 0) {
        ctx.strokeStyle = H(60, 0.5);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - gap, y + cell);
        ctx.lineTo(x, y + cell);
        ctx.stroke();
      }
      ctx.fillStyle = i === n - 1 ? `hsla(${hue + 20},95%,60%,0.6)` : H(50, 0.3);
      ctx.fillRect(x, y, nw, cell * 2);
      ctx.fillStyle = H(75, 0.8);
      ctx.fillRect(x + cell * 0.4, y + cell * 0.4, nw - cell * 0.8, cell * 0.3);
    }
    ctx.fillStyle = H(55, 0.35);
    ctx.fillRect(cell * 0.8 + nw + gap * 0.5 - cell * 0.4, y - cell * 1.6, cell * 0.8, cell * 0.8);
    ctx.strokeStyle = H(60, 0.4);
    ctx.beginPath();
    ctx.moveTo(cell * 0.8 + nw + gap * 0.5, y - cell * 0.8);
    ctx.lineTo(cell * 0.8 + nw + gap * 0.5, y);
    ctx.stroke();
  } else {
    // dash (default)
    ctx.fillStyle = `hsla(${hue},70%,50%,0.10)`;
    ctx.fillRect(cell * 0.6, top, w * 0.22, h - top - cell * 0.6);
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = `hsla(${hue},80%,62%,${0.25 + rnd() * 0.4})`;
      ctx.fillRect(cell, top + cell * 0.8 + i * cell * 1.5, w * 0.15, cell * 0.5);
    }
    const mx = w * 0.27;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 2; j++) {
        const cx = mx + i * ((w - mx) / 3);
        const cy = top + j * ((h - top) / 2);
        ctx.fillStyle = `hsla(${hue + rnd() * 30 - 15},85%,${46 + rnd() * 18}%,${0.12 + rnd() * 0.24})`;
        ctx.fillRect(cx + cell * 0.4, cy + cell * 0.4, (w - mx) / 3 - cell * 0.9, (h - top) / 2 - cell * 0.9);
      }
    const bx = w * 0.6;
    const by = h - cell * 0.7;
    const bw = (w * 0.36) / 7;
    for (let i = 0; i < 7; i++) {
      const bh = cell * (1 + rnd() * 5);
      ctx.fillStyle = `hsla(${hue + 10},95%,62%,0.7)`;
      ctx.fillRect(bx + i * bw, by - bh, bw - cell * 0.3, bh);
    }
  }

  // scanlines del preview
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  for (let y = 0; y < h; y += 3) ctx.fillRect(0, y, w, 1);
}

/** Preview procedural pixel-art de un proyecto (reemplazable por screenshot real vía Sanity). */
export default function PixelPreview({
  hue,
  seed,
  variant,
  className,
}: {
  hue: number;
  seed: number;
  variant: PreviewVariant;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const draw = () => {
      const c = ref.current;
      if (!c) return;
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = w * dpr;
      c.height = h * dpr;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mosaic(ctx, w, h, hue, seed, variant);
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [hue, seed, variant]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
