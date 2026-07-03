import Image from "next/image";
import PixelAvatar from "@/components/fx/PixelAvatar";
import RevealStagger from "@/components/fx/RevealStagger";
import { COMPETENCIES, STATS } from "@/lib/content";

export default function Perfil({ index, photoUrl }: { index: number; photoUrl?: string | null }) {
  return (
    <section className="cx-section">
      <RevealStagger
        index={index}
        className="m-auto flex w-full max-w-[1180px] flex-wrap items-center gap-[clamp(28px,5vw,70px)]"
      >
        <div className="min-w-0 flex-[1_1_360px]">
          <div className="cx-label mb-[18px]">{"// PERFIL"}</div>
          <h2 className="mb-[26px] mt-0 font-display text-[clamp(20px,3.4vw,40px)] leading-normal text-white">
            QUIÉN<span className="text-sky">_</span>SOY
          </h2>
          <p className="mb-5 mt-0 text-[clamp(14px,1.4vw,18px)] leading-[1.85] text-white/72">
            Estudiante de 7mo ciclo de{" "}
            <strong className="font-semibold text-white">Ingeniería de Software en la UPC</strong>,
            con ~2 años construyendo soluciones reales: desde una API en FastAPI conectada a
            inventario empresarial, hasta{" "}
            <strong className="font-semibold text-sky">BluJoy</strong>, un e-commerce desplegado en
            producción con autenticación JWT, APIs REST y pagos en vivo.
          </p>
          <p className="mb-7 mt-0 text-[clamp(14px,1.4vw,18px)] leading-[1.85] text-white/55">
            Aplico principios SOLID y POO, trabajo con Git en flujos organizados y contenerizo con
            Docker. Autónomo, comunicación clara y orientado a resultados.
          </p>
          <div className="flex flex-wrap gap-[9px]">
            {COMPETENCIES.map((c) => (
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
            <Image
              src={photoUrl}
              alt="Foto de Carlos Alvarez Ponce"
              width={180}
              height={180}
              className="size-[clamp(130px,14vw,180px)] rounded-full border border-sky/40 object-cover shadow-[0_0_28px_rgba(0,128,255,.25)]"
            />
          ) : (
            <div className="flex size-[clamp(130px,14vw,180px)] items-end justify-center overflow-hidden rounded-full border border-sky/40 bg-panel-2 shadow-[0_0_28px_rgba(0,128,255,.25)]">
              <PixelAvatar className="size-[88%] [filter:drop-shadow(0_0_10px_rgba(0,191,255,.25))]" />
            </div>
          )}
          <div className="grid w-full grid-cols-2 gap-4">
            {STATS.map((s) => (
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
