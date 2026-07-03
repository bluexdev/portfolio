import ProjectsRail from "./ProjectsRail";
import type { Dict } from "@/lib/i18n";
import type { Project } from "@/lib/types";

export default function Proyectos({
  index,
  projects,
  dict,
}: {
  index: number;
  projects: Project[];
  dict: Dict;
}) {
  return (
    <section className="relative flex h-screen flex-none items-stretch gap-[clamp(16px,2vw,26px)] px-[clamp(20px,5vw,48px)] py-[clamp(82px,11vh,104px)]">
      {/* intro fija a la izquierda */}
      <div className="flex w-[clamp(260px,30vw,360px)] flex-none flex-col justify-center">
        <div className="cx-label mb-4">{dict.proyectos.label}</div>
        <h2 className="mb-[22px] mt-0 font-display text-[clamp(20px,3vw,38px)] leading-normal text-white">
          {dict.proyectos.title}
        </h2>
        <p className="mb-6 mt-0 text-[clamp(14px,1.3vw,16px)] leading-[1.8] text-white/55">
          {dict.proyectos.intro}
        </p>
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[.2em] text-cyan">
          {dict.proyectos.scroll}
          <span className="text-base">→</span>
        </div>
      </div>

      <ProjectsRail projects={projects} sectionIndex={index} dict={dict} />
    </section>
  );
}
