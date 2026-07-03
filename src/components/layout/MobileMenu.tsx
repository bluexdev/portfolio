"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTrack } from "./HorizontalTrack";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/portfolioConfig";

export default function MobileMenu({ dict, locale }: { dict: Dict; locale: Locale }) {
  const { names, goTo, soundOn, toggleSound, playBlip } = useTrack();
  const [open, setOpen] = useState(false);
  const nextLocale = locale === "en" ? "ES" : "EN";
  const nextHref = locale === "en" ? "/" : "/en";

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
        {dict.hud.menuLabel}
      </button>

      {open && (
        <div className="absolute inset-0 z-[75] flex flex-col items-center justify-center gap-1.5 bg-ink/96">
          <button
            onClick={() => setOpen(false)}
            aria-label={dict.hud.closeMenu}
            className="absolute right-[18px] top-[18px] border border-sky/50 bg-transparent px-3 py-2.5 font-display text-xs text-cyan"
          >
            ✕
          </button>
          {names.map((label, idx) => (
            <button
              key={label}
              onClick={() => {
                setOpen(false);
                playBlip("nav");
                goTo(idx);
              }}
              className="min-h-12 bg-transparent px-[22px] py-3.5 font-display text-[13px] tracking-[.05em] text-white/80 transition-colors hover:text-cyan"
            >
              {label}
            </button>
          ))}
          <div className="mt-7 flex gap-3">
            <button
              type="button"
              onClick={toggleSound}
              className="border border-white/16 px-4 py-3 font-mono text-xs text-white/65"
              aria-label={soundOn ? "Desactivar sonido" : "Activar sonido"}
            >
              {soundOn ? "🔊" : "🔇"}
            </button>
            <Link
              href={nextHref}
              className="border border-white/16 px-4 py-3 font-mono text-xs text-white/65 no-underline"
            >
              {nextLocale}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
