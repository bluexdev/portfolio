"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import PixelPreview from "@/components/fx/PixelPreview";
import { useTrack } from "@/components/layout/HorizontalTrack";
import type { Dict } from "@/lib/i18n";
import type { Project } from "@/lib/types";

const CHIP = "border border-blue/30 px-[7px] py-1 font-mono text-[10px] text-sky";

function drawerTarget() {
  return Math.min(1040, window.innerWidth * 0.86) + 16;
}

function openProjectTarget(sectionOffset: number, card: HTMLElement, drawer: HTMLElement | null) {
  if (window.innerWidth < 640 && drawer) {
    return sectionOffset + drawer.offsetLeft - 16;
  }

  return sectionOffset + card.offsetLeft - 40;
}

/**
 * Cards de proyectos + acordeón horizontal "VER MÁS".
 * El drawer anima `width` por rAF (lerp .16) — las transiciones CSS
 * del prototipo se congelaban con re-renders; aquí el ancho vive
 * fuera del render y solo se re-mide el track.
 */
export default function ProjectsRail({
  projects,
  sectionIndex,
  dict,
}: {
  projects: Project[];
  sectionIndex: number;
  dict: Dict;
}) {
  const { remeasure, getOffset, scrollToPx, reduced, playBlip } = useTrack();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const drawerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widths = useRef<number[]>(projects.map(() => 0));
  const openRef = useRef<number | null>(null);
  openRef.current = openIdx;

  // cerrar con ESC
  useEffect(() => {
    if (openIdx == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIdx]);

  // animación del acordeón
  useEffect(() => {
    let raf = 0;
    let settledFrames = 0;

    // fade-in del contenido del drawer que se abre
    if (openIdx != null && !reduced) {
      const inner = innerRefs.current[openIdx];
      if (inner) {
        inner.style.opacity = "0";
        inner.style.transform = "translateX(18px)";
        window.setTimeout(() => {
          inner.style.transition = "opacity .45s ease, transform .45s ease";
          inner.style.opacity = "1";
          inner.style.transform = "translateX(0)";
        }, 320);
      }
    }

    const step = () => {
      let changed = false;
      for (let i = 0; i < projects.length; i++) {
        const target = i === openIdx ? drawerTarget() : 0;
        let w = widths.current[i];
        w += (target - w) * (reduced ? 1 : 0.16);
        if (Math.abs(target - w) < 1) w = target;
        if (widths.current[i] !== w) {
          widths.current[i] = w;
          changed = true;
          const d = drawerRefs.current[i];
          if (d) d.style.width = `${Math.round(w)}px`;
        }
      }
      if (changed) {
        remeasure();
        settledFrames = 0;
        raf = requestAnimationFrame(step);
      } else if (settledFrames < 2) {
        settledFrames++;
        raf = requestAnimationFrame(step);
      } else {
        remeasure();
        // al asentarse, encuadrar la card + drawer abiertos
        const open = openRef.current;
        if (open != null) {
          const d = drawerRefs.current[open];
          const card = d?.previousElementSibling as HTMLElement | null;
          if (card) {
            scrollToPx(openProjectTarget(getOffset(sectionIndex), card, d));
          }
        }
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [openIdx, projects.length, reduced, remeasure, getOffset, scrollToPx, sectionIndex]);

  return (
    <>
      {projects.map((p, idx) => (
        <Fragment key={p.id}>
          {/* card */}
          <div className="flex w-[clamp(286px,80vw,372px)] flex-none flex-col overflow-hidden border border-blue/20 bg-panel shadow-pixel transition-[border-color,box-shadow] duration-[250ms] hover:border-sky/60 hover:shadow-[6px_6px_0_rgba(0,0,0,.5),0_0_34px_rgba(0,128,255,.2)]">
            <div className="relative h-[clamp(154px,22vh,200px)] flex-none border-b border-blue/20">
              {p.heroUrl ? (
                <Image
                  src={p.heroUrl}
                  alt={`Preview de ${p.name}`}
                  fill
                  className="object-cover"
                  sizes="372px"
                />
              ) : (
                <PixelPreview
                  hue={p.hue}
                  seed={p.seed}
                  variant={p.previewVariant}
                  className="block h-full w-full [image-rendering:pixelated]"
                />
              )}
              <span className="absolute left-3 top-3 border border-sky/40 bg-ink/85 px-[9px] py-[5px] font-mono text-[10px] tracking-[.14em] text-cyan">
                {p.tag}
              </span>
              <span className="absolute right-3 top-3 bg-sky px-2 py-[5px] font-mono text-[9px] font-bold tracking-[.12em] text-ink">
                {p.status}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-[22px]">
              <h3 className="mb-3.5 mt-0 font-display text-[15px] text-white">{p.name}</h3>
              <p className="mb-4 mt-0 text-sm leading-[1.7] text-white/60">{p.summary}</p>
              <div className="mb-[18px] flex flex-col gap-2">
                {p.bullets.map((b) => (
                  <div key={b} className="flex gap-[9px] text-[13px] leading-[1.55] text-white/50">
                    <span className="flex-none text-blue">▸</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className={CHIP}>
                      {t}
                    </span>
                  ))}
                </div>
                {p.hasDetail ? (
                  <button
                    onClick={() => {
                      playBlip("ok");
                      setOpenIdx(openIdx === idx ? null : idx);
                    }}
                    aria-expanded={openIdx === idx}
                    className="mt-4 w-full cursor-pointer border-none bg-sky p-[11px] font-mono text-[11px] font-bold tracking-[.14em] text-ink transition-all duration-200 hover:bg-cyan hover:shadow-[0_0_20px_rgba(0,255,255,.4)]"
                  >
                    {dict.proyectos.verMas}
                  </button>
                ) : (
                  <div className="mt-4 w-full border border-dashed border-white/14 p-2.5 text-center font-mono text-[10px] tracking-[.14em] text-white/30">
                    {dict.proyectos.resumen}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* drawer del acordeón */}
          <div
            ref={(el) => {
              drawerRefs.current[idx] = el;
            }}
            className="h-full w-0 flex-none overflow-hidden"
          >
            {p.hasDetail && (
              <div
                ref={(el) => {
                  innerRefs.current[idx] = el;
                }}
                className="ml-4 h-full w-[min(1040px,86vw)] overflow-y-auto border border-sky/45 bg-panel p-[clamp(20px,3vw,34px)] shadow-[8px_8px_0_rgba(0,0,0,.5),0_0_40px_rgba(0,128,255,.15)]"
              >
                <div className="mb-[22px] flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2.5 font-mono text-[11px] tracking-[.2em] text-blue">
                      {p.tag} · {p.status}
                    </div>
                    <h3 className="m-0 font-display text-[clamp(15px,2.4vw,24px)] text-white">
                      {p.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      playBlip("nav");
                      setOpenIdx(null);
                    }}
                    className="flex-none cursor-pointer border border-blue/40 bg-transparent px-[13px] py-[9px] font-mono text-[11px] tracking-[.1em] text-sky transition-colors hover:border-cyan hover:text-cyan"
                  >
                    {dict.proyectos.cerrar}
                  </button>
                </div>

                {/* hero */}
                {p.heroUrl ? (
                  <div className="relative mb-5 h-[clamp(170px,26vh,250px)] w-full">
                    <Image
                      src={p.heroUrl}
                      alt={`Imagen principal de ${p.name}`}
                      fill
                      className="rounded-[2px] object-cover"
                      sizes="(max-width: 1040px) 86vw, 1040px"
                    />
                  </div>
                ) : (
                  <div className="mb-5 flex h-[clamp(170px,26vh,250px)] w-full items-center justify-center rounded-[2px] border border-dashed border-blue/30 bg-panel-2">
                      <span className="font-mono text-[11px] tracking-[.14em] text-white/30">
                      {dict.proyectos.heroPlaceholder}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-6">
                  <div className="min-w-0 flex-[1_1_320px]">
                    <p className="mb-5 mt-0 text-[15px] leading-[1.8] text-white/70">{p.longDesc}</p>
                    {(p.visibleMetrics ?? []).length > 0 && (
                      <>
                        <div className="mb-3 font-mono text-[11px] tracking-[.18em] text-blue">
                          {dict.proyectos.impactLabel}
                        </div>
                        <div className="mb-[22px] flex flex-wrap gap-2.5">
                          {(p.visibleMetrics ?? []).map((m) => (
                            <div
                              key={m.k}
                              className="border border-blue/25 bg-panel-2 px-3.5 py-2.5"
                            >
                              <div className="mb-1.5 font-mono text-[9px] tracking-[.14em] text-white/40">
                                {m.k}
                              </div>
                              <div className="font-mono text-[13px] text-sky">{m.v}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <div className="mb-3 font-mono text-[11px] tracking-[.18em] text-blue">
                      {dict.proyectos.features}
                    </div>
                    <div className="mb-[22px] flex flex-col gap-[9px]">
                      {p.features.map((f) => (
                        <div key={f} className="flex gap-2.5 text-sm leading-[1.55] text-white/62">
                          <span className="text-cyan">▸</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mb-5 flex flex-wrap gap-[7px]">
                      {p.stack.map((t) => (
                        <span key={t} className={CHIP}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block border border-electric px-[18px] py-[11px] font-mono text-[11px] tracking-[.12em] text-cyan no-underline transition-all hover:border-cyan hover:shadow-[0_0_18px_rgba(0,255,255,.3)]"
                    >
                      {dict.proyectos.code}
                    </a>
                  </div>

                  <div className="min-w-0 flex-[1_1_240px]">
                    <div className="mb-3 font-mono text-[11px] tracking-[.18em] text-blue">
                      {dict.proyectos.gallery}
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(p.galleryUrls?.length ? p.galleryUrls : [null, null, null, null])
                        .slice(0, 4)
                        .map((url, i) =>
                          url ? (
                            <div key={i} className="relative h-[clamp(88px,13vh,128px)] w-full">
                              <Image
                                src={url}
                                alt={`${p.name} — captura ${i + 1}`}
                                fill
                                className="rounded-[2px] object-cover"
                                sizes="300px"
                              />
                            </div>
                          ) : (
                            <div
                              key={i}
                              className="flex h-[clamp(88px,13vh,128px)] w-full items-center justify-center rounded-[2px] border border-dashed border-blue/25 bg-panel-2"
                            >
                              <span className="font-mono text-[9px] tracking-[.12em] text-white/25">
                                {dict.proyectos.imgPlaceholder}
                              </span>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </>
  );
}
