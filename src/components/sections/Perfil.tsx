import Image from "next/image";
import PixelAvatar from "@/components/fx/PixelAvatar";
import RevealStagger from "@/components/fx/RevealStagger";
import type { Dict } from "@/lib/i18n";

export default function Perfil({
  index,
  photoUrl,
  dict,
}: {
  index: number;
  photoUrl?: string | null;
  dict: Dict;
}) {
  return (
    <section className="cx-section">
      <RevealStagger
        index={index}
        className="m-auto flex w-full max-w-[1180px] flex-wrap items-center gap-[clamp(28px,5vw,70px)]"
      >
        <div className="min-w-0 flex-[1_1_360px]">
          <div className="cx-label mb-[18px]">{dict.perfil.label}</div>
          <h2 className="mb-[26px] mt-0 font-display text-[clamp(20px,3.4vw,40px)] leading-normal text-white">
            {dict.perfil.title}
          </h2>
          <p className="mb-5 mt-0 text-[clamp(14px,1.4vw,18px)] leading-[1.85] text-white/72">
            {dict.perfil.p1}
          </p>
          <p className="mb-7 mt-0 text-[clamp(14px,1.4vw,18px)] leading-[1.85] text-white/55">
            {dict.perfil.p2}
          </p>
          <div className="flex flex-wrap gap-[9px]">
            {dict.perfil.competencies.map((c) => (
              <span
                key={c}
                className="border border-blue/22 bg-blue/4 px-[11px] py-[7px] font-mono text-[11px] tracking-[.05em] text-white/55"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-[1_1_300px] flex-col items-center gap-[22px]">
          {photoUrl ? (
            <div className="flex size-[clamp(230px,24vw,320px)] items-center justify-center border border-sky/45 bg-panel-2 p-2 shadow-[0_0_32px_rgba(0,128,255,.25)]">
              <Image
                src={photoUrl}
                alt={dict.perfil.photoAlt}
                width={320}
                height={320}
                className="size-full object-contain [image-rendering:pixelated]"
                priority
              />
            </div>
          ) : (
            <div className="flex size-[clamp(230px,24vw,320px)] items-end justify-center overflow-hidden border border-sky/40 bg-panel-2 shadow-[0_0_28px_rgba(0,128,255,.25)]">
              <PixelAvatar className="size-[88%] [filter:drop-shadow(0_0_10px_rgba(0,191,255,.25))]" />
            </div>
          )}
          <div className="grid w-full grid-cols-2 gap-4">
            {dict.perfil.stats.map((s) => (
              <div
                key={s.l}
                className="border border-blue/22 bg-panel-2 px-[18px] py-[22px] shadow-pixel-sm"
              >
                <div className="mb-3 font-display text-[clamp(14px,2vw,22px)] leading-[1.3] text-sky [text-shadow:0_0_18px_rgba(0,191,255,.4)]">
                  {s.n}
                </div>
                <div className="font-mono text-[10px] leading-[1.6] tracking-[.1em] text-white/45">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealStagger>
    </section>
  );
}
