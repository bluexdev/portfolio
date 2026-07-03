"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const LINES: Array<{ text: React.ReactNode; delay: number; className?: string }> = [
  { text: "CARLXS BIOS v2.6 — PIXEL CORE", delay: 0, className: "text-cyan" },
  {
    text: (
      <>
        MEM CHECK ........ 64K <span className="text-success">OK</span>
      </>
    ),
    delay: 0.45,
  },
  {
    text: (
      <>
        STACK ............ NEXT·TS·PG <span className="text-success">OK</span>
      </>
    ),
    delay: 0.9,
  },
  { text: "LOADING PORTFOLIO.EXE ██████████ 100%", delay: 1.35 },
  {
    text: (
      <>
        <span className="inline-block animate-blink">▸</span> PRESS ANY KEY / TOCA PARA CONTINUAR
      </>
    ),
    delay: 1.9,
    className: "text-white/50",
  },
];

/** Overlay BIOS: se muestra una vez por sesión (sessionStorage). */
export default function BootScreen() {
  const [show, setShow] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem("cxd_boot_seen", "1");
    } catch {
      /* sin sessionStorage no persiste, pero se cierra igual */
    }
    clearTimeout(timer.current);
    setShow(false);
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("cxd_boot_seen")) return;
    } catch {
      return;
    }
    setShow(true);
    timer.current = window.setTimeout(dismiss, 3400);
    window.addEventListener("keydown", dismiss);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("keydown", dismiss);
    };
  }, [dismiss]);

  if (!show) return null;

  return (
    <div
      onClick={dismiss}
      className="absolute inset-0 z-[80] flex cursor-pointer items-center justify-center bg-ink"
    >
      <div className="font-mono text-[clamp(11px,1.6vw,14px)] leading-[2.4] tracking-[.06em] text-sky">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={line.className}
            style={{ animation: `cxd-bootline .05s ${line.delay}s both` }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}
