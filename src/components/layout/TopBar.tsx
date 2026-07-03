"use client";

import { useTrack } from "./HorizontalTrack";
import { cn } from "@/lib/utils";

export default function TopBar() {
  const { names, activeIdx, goTo } = useTrack();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[38] flex items-center justify-between px-[clamp(18px,4vw,40px)] py-4">
      <div className="pointer-events-auto flex items-center gap-3.5">
        <div className="flex gap-[7px]">
          <span className="size-[11px] rounded-full bg-[#ff5f56]" />
          <span className="size-[11px] rounded-full bg-[#ffbd2e]" />
          <span className="size-[11px] rounded-full bg-success" />
        </div>
        <span className="font-mono text-xs tracking-[.18em] text-white/55">carlxsdev.com</span>
        <span className="hidden items-center gap-1.5 border border-white/12 px-2 py-[3px] font-mono text-[10px] tracking-[.1em] text-white/30 nav:inline-flex">
          <span className="size-1.5 rounded-full bg-success" />
          main · v2.6
        </span>
      </div>

      <div className="pointer-events-auto hidden gap-1 nav:flex">
        {names.map((label, idx) => (
          <button
            key={label}
            onClick={() => goTo(idx)}
            className={cn(
              "px-2 py-1.5 font-mono text-[11px] tracking-[.1em] transition-colors duration-200 hover:text-cyan",
              idx === activeIdx ? "text-cyan" : "text-white/45"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
