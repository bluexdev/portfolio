import ProjectsRail from "./ProjectsRail";
import type { Project } from "@/lib/types";

export default function Proyectos({ index, projects }: { index: number; projects: Project[] }) {
  return (
    <section className="relative flex h-screen flex-none items-stretch gap-[clamp(16px,2vw,26px)] px-[clamp(20px,5vw,48px)] py-[clamp(82px,11vh,104px)]">
      {/* intro fija a la izquierda */}
      <div className="flex w-[clamp(260px,30vw,360px)] flex-none flex-col justify-center">
        <div className="cx-label mb-4">{"// PROYECTOS"}</div>
        <h2 className="mb-[22px] mt-0 font-display text-[clamp(20px,3vw,38px)] leading-normal text-white">
          OBRA
          <br />
          <span className="text-sky">SELECT.</span>
        </h2>
        <p className="mb-6 mt-0 text-[clamp(14px,1.3vw,16px)] leading-[1.8] text-white/55">
          Seis sistemas en producción, en desarrollo y en empresa. Pulsa{" "}
          <span className="text-cyan">VER MÁS</span> para desplegar el detalle.
        </p>
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[.2em] text-cyan">
          DESPLAZA<span className="text-base">→</span>
        </div>
      </div>

      <ProjectsRail projects={projects} sectionIndex={index} />
    </section>
  );
}
