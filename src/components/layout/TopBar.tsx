"use client";

import Link from "next/link";
import { useTrack } from "./HorizontalTrack";
import { portfolioTrack } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/portfolioConfig";

export default function TopBar({ locale }: { locale: Locale }) {
  const { names, activeIdx, goTo, soundOn, toggleSound, playBlip } = useTrack();
  const nextLocale = locale === "en" ? "ES" : "EN";
  const nextHref = locale === "en" ? "/" : "/en";

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[38] flex items-center justify-between px-[clamp(18px,4vw,40px)] py-4">
      <div className="pointer-events-auto flex items-center gap-3.5">
        <div className="flex gap-[7px]">
          <span className="size-[11px] rounded-full bg-[#ff5f56]" />
          <span className="size-[11px] rounded-full bg-[#ffbd2e]" />
          <span className="size-[11px] rounded-full bg-success" />
        </div>
        <span className="hidden items-center gap-1.5 border border-white/12 px-2 py-[3px] font-mono text-[10px] tracking-[.1em] text-white/30 nav:inline-flex">
          <span className="size-1.5 rounded-full bg-success" />
          main · v2.6
        </span>
      </div>

      <div className="pointer-events-auto hidden gap-1 nav:flex">
        {names.map((label, idx) => (
          <button
            key={label}
            onClick={() => {
              playBlip("nav");
              portfolioTrack("Top Nav Click", { section: label, locale });
              goTo(idx);
            }}
            className={cn(
              "px-2 py-1.5 font-mono text-[11px] tracking-[.1em] transition-colors duration-200 hover:text-cyan",
              idx === activeIdx ? "text-cyan" : "text-white/45"
            )}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            portfolioTrack("Sound Toggle", { state: soundOn ? "off" : "on", locale });
            toggleSound();
          }}
          aria-label={soundOn ? "Desactivar sonido" : "Activar sonido"}
          title={soundOn ? "Sonido activado" : "Sonido apagado"}
          className={cn(
            "ml-2 border px-2 py-1.5 font-mono text-[11px] transition-colors",
            soundOn ? "border-cyan/55 text-cyan" : "border-white/14 text-white/45"
          )}
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
        <Link
          href={nextHref}
          onClick={() => portfolioTrack("Language Toggle", { to: nextLocale, locale })}
          className="border border-white/14 px-2 py-1.5 font-mono text-[11px] text-white/50 no-underline transition-colors hover:border-cyan/55 hover:text-cyan"
        >
          {nextLocale}
        </Link>
      </div>
    </div>
  );
}
