"use client";

import { useTrack } from "./HorizontalTrack";
import Scramble from "@/components/fx/Scramble";
import { pad2 } from "@/lib/utils";

export default function BottomHud() {
  const { names, activeIdx, goTo } = useTrack();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[38] flex items-center justify-between gap-3 px-[clamp(18px,4vw,40px)] pb-5 pt-4">
      <div className="whitespace-nowrap font-mono text-[11px] tracking-[.16em] text-white/50">
        <span className="text-sky">
          {pad2(activeIdx + 1)} / {pad2(names.length)}
        </span>
        <span className="pl-3.5">
          <Scramble text={names[activeIdx] ?? ""} speed={30} />
        </span>
      </div>

      <div className="pointer-events-auto flex gap-[9px]">
        {names.map((label, idx) => (
          <button
            key={label}
            onClick={() => goTo(idx)}
            aria-label={label}
            className="size-[11px] border border-blue/40 p-0 transition-all duration-200"
            style={
              idx === activeIdx
                ? { background: "#00FFFF", boxShadow: "0 0 10px #00FFFF" }
                : { background: "rgba(255,255,255,.16)" }
            }
          />
        ))}
      </div>

      <div className="hidden whitespace-nowrap font-mono text-[11px] tracking-[.16em] text-white/60 nav:block">
        DESPLAZA <span className="text-cyan">→</span>
      </div>
    </div>
  );
}
