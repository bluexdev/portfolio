import AnalyticsLink from "@/components/analytics/AnalyticsLink";
import GoButton from "@/components/fx/GoButton";
import Scramble from "@/components/fx/Scramble";
import type { Dict } from "@/lib/i18n";
import { isCvDownloadEnabled } from "@/lib/portfolioConfig";
import type { SiteSettings } from "@/lib/types";

const FLOATERS = [
  { className: "left-[9%] top-[18%] size-[18px] bg-electric shadow-[0_0_18px_#0047FF]", anim: "cxd-float 5s ease-in-out infinite" },
  { className: "right-[12%] top-[30%] size-3 bg-cyan shadow-[0_0_16px_#00FFFF]", anim: "cxd-float 6.5s ease-in-out .6s infinite" },
  { className: "bottom-[24%] left-[16%] size-2.5 bg-sky shadow-[0_0_14px_#00BFFF]", anim: "cxd-float 7s ease-in-out 1.1s infinite" },
  { className: "bottom-[30%] right-[18%] size-3.5 bg-blue shadow-[0_0_16px_#0080FF]", anim: "cxd-float 5.5s ease-in-out .3s infinite" },
];

const CTA_BASE =
  "cursor-pointer px-6 py-[15px] font-mono text-xs tracking-[.16em] transition-all duration-200";

export default function Hero({ dict, settings }: { dict: Dict; settings: SiteSettings }) {
  const cvEnabled = isCvDownloadEnabled(settings);

  return (
    <section className="cx-section px-[clamp(20px,6vw,80px)]">
      {/* píxeles flotantes decorativos */}
      {FLOATERS.map((f, i) => (
        <div key={i} className={`absolute ${f.className}`} style={{ animation: f.anim }} aria-hidden />
      ))}

      <div className="m-auto w-full max-w-[900px] text-center">
        <div className="mb-[30px] pl-[.5em] font-mono text-[clamp(10px,1.4vw,13px)] tracking-[.5em] text-blue">
          {dict.hero.tag}
        </div>
        <h1 className="m-0 font-display text-[clamp(28px,5.8vw,64px)] leading-[1.42] text-white [text-shadow:0_0_30px_rgba(0,71,255,.5)]">
          <Scramble text="CARLXS" speed={55} className="text-white" />
          <Scramble
            text="DEV"
            speed={63}
            className="text-sky [text-shadow:0_0_36px_rgba(0,191,255,.7)]"
          />
          <span className="inline-block animate-blink text-cyan">_</span>
        </h1>
        <div className="mt-[34px] font-mono text-[clamp(10px,1.5vw,14px)] tracking-[.22em] text-white/55">
          {dict.hero.sub}
        </div>
        <div className="mt-[42px] flex flex-wrap justify-center gap-3.5">
          <GoButton
            section={dict.names.proyectos}
            eventLabel="projects"
            className={`${CTA_BASE} border border-cyan bg-cyan font-bold text-ink shadow-[0_0_24px_rgba(0,255,255,.42)] hover:bg-white hover:shadow-[0_0_34px_rgba(0,255,255,.62)]`}
          >
            {dict.hero.ctaProjects}
          </GoButton>
          {cvEnabled && (
            <AnalyticsLink
              href={settings.cvUrl}
              download
              event="CV Download"
              eventProps={{ place: "hero", file: "pdf" }}
              className={`${CTA_BASE} border border-electric bg-blue/10 text-sky no-underline hover:border-cyan hover:text-cyan hover:shadow-glow`}
            >
              {dict.hero.cv}
            </AnalyticsLink>
          )}
          <GoButton
            section={dict.names.arcade}
            eventLabel="arcade"
            className={`${CTA_BASE} border border-white/18 bg-transparent text-white/60 hover:border-cyan hover:text-cyan hover:shadow-glow`}
          >
            {dict.hero.ctaArcade}
          </GoButton>
          <GoButton
            section={dict.names.contacto}
            eventLabel="contact"
            className={`${CTA_BASE} border border-white/18 bg-transparent text-white/60 hover:border-cyan hover:text-cyan hover:shadow-glow`}
          >
            {dict.hero.ctaContact}
          </GoButton>
        </div>
      </div>
    </section>
  );
}
