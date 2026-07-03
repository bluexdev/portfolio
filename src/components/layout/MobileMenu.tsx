"use client";

import { useEffect, useState } from "react";
import { useTrack } from "./HorizontalTrack";

export default function MobileMenu() {
  const { names, goTo } = useTrack();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="pointer-events-auto absolute right-[clamp(18px,4vw,40px)] top-4 z-[40] border border-sky/50 bg-ink/70 px-[11px] py-[9px] font-display text-[9px] text-cyan nav:hidden"
      >
        MENU
      </button>

      {open && (
        <div className="absolute inset-0 z-[75] flex flex-col items-center justify-center gap-1.5 bg-ink/96">
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="absolute right-[18px] top-[18px] border border-sky/50 bg-transparent px-3 py-2.5 font-display text-xs text-cyan"
          >
            ✕
          </button>
          {names.map((label, idx) => (
            <button
              key={label}
              onClick={() => {
                setOpen(false);
                goTo(idx);
              }}
              className="min-h-12 bg-transparent px-[22px] py-3.5 font-display text-[13px] tracking-[.05em] text-white/80 transition-colors hover:text-cyan"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
