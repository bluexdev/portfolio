import RevealStagger from "@/components/fx/RevealStagger";
import type { Dict } from "@/lib/i18n";
import { isCvDownloadEnabled, whatsappUrl } from "@/lib/portfolioConfig";
import type { SiteSettings } from "@/lib/types";

const LINK_HOVER = "text-cyan no-underline hover:underline";

export default function Contacto({
  index,
  settings,
  dict,
}: {
  index: number;
  settings: SiteSettings;
  dict: Dict;
}) {
  const year = new Date().getFullYear();
  const linkedinUser = settings.linkedin.replace(/\/$/, "").split("/").pop() ?? settings.linkedin;
  const githubUser = settings.github.replace(/\/$/, "").split("/").pop() ?? settings.github;
  const waUrl = whatsappUrl(settings);
  const waDisplay = waUrl.replace("https://", "");
  const cvEnabled = isCvDownloadEnabled(settings);

  return (
    <section className="cx-section py-[clamp(82px,11vh,104px)]">
      <RevealStagger index={index} className="m-auto w-full max-w-[920px]">
        <div className="cx-label mb-4">{dict.contacto.label}</div>
        <h2 className="mb-8 mt-0 font-display text-[clamp(18px,3.2vw,38px)] leading-normal text-white">
          {dict.contacto.title}
        </h2>

        {/* terminal */}
        <div className="mb-8 border border-blue/25 bg-[#08081244] font-mono text-[clamp(11px,1.4vw,15px)] leading-[2.3] shadow-pixel-sm">
          <div className="flex items-center gap-2 border-b border-blue/18 px-4 py-[11px]">
            <span className="size-[11px] rounded-full bg-[#ff5f56]" />
            <span className="size-[11px] rounded-full bg-[#ffbd2e]" />
            <span className="size-[11px] rounded-full bg-success" />
            <span className="ml-3 text-white/40">carlos@contact.sh</span>
          </div>
          <div className="overflow-x-auto px-[22px] py-5">
            <div className="text-white/45">$ cat contacto.json</div>
            <div className="text-white/75">{"{"}</div>
            <div className="pl-[22px]">
              <span className="text-blue">&quot;email&quot;</span>:{" "}
              <a href={`mailto:${settings.email}`} className={LINK_HOVER}>
                &quot;{settings.email}&quot;
              </a>
              ,
            </div>
            <div className="pl-[22px]">
              <span className="text-blue">&quot;phone&quot;</span>:{" "}
              <a href={waUrl} target="_blank" rel="noreferrer" className={LINK_HOVER}>
                &quot;{settings.phoneDisplay}&quot;
              </a>
              ,
            </div>
            <div className="pl-[22px]">
              <span className="text-blue">&quot;linkedin&quot;</span>:{" "}
              <a href={settings.linkedin} target="_blank" rel="noreferrer" className={LINK_HOVER}>
                &quot;{linkedinUser}&quot;
              </a>
              ,
            </div>
            <div className="pl-[22px]">
              <span className="text-blue">&quot;github&quot;</span>:{" "}
              <a href={settings.github} target="_blank" rel="noreferrer" className={LINK_HOVER}>
                &quot;{githubUser}&quot;
              </a>
              ,
            </div>
            <div className="pl-[22px]">
              <span className="text-blue">&quot;whatsapp&quot;</span>:{" "}
              <a href={waUrl} target="_blank" rel="noreferrer" className={LINK_HOVER}>
                &quot;{waDisplay}&quot;
              </a>
              ,
            </div>
            <div className="pl-[22px]">
              <span className="text-blue">&quot;location&quot;</span>:{" "}
              <span className="text-sky">&quot;{settings.location}&quot;</span>
            </div>
            <div className="text-white/75">{"}"}</div>
            <div className="text-white/45">
              $ <span className="inline-block animate-blink">_</span>
            </div>
          </div>
        </div>

        {/* CTA disponible */}
        <div className="mb-[26px] inline-flex items-center gap-2.5 border border-success/45 bg-success/6 px-4 py-[11px] font-mono text-[11px] tracking-[.14em] text-success">
          <span className="size-2 animate-pulse-soft rounded-full bg-success shadow-[0_0_10px_#27c93f]" />
          {settings.availabilityText}
        </div>

        <div className="mb-7 flex flex-wrap gap-3.5">
          <a
            href={`mailto:${settings.email}`}
            className="bg-cyan px-[22px] py-3.5 font-mono text-xs font-bold tracking-[.14em] text-ink no-underline shadow-[0_0_22px_rgba(0,255,255,.35)] transition-all duration-200 hover:shadow-[0_0_32px_rgba(0,255,255,.6)]"
          >
            {dict.contacto.write}
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-success/55 bg-success/7 px-[22px] py-3.5 font-mono text-xs font-bold tracking-[.14em] text-success no-underline transition-all duration-200 hover:border-cyan hover:text-cyan hover:shadow-[0_0_22px_rgba(0,255,255,.35)]"
          >
            {dict.contacto.whatsapp}
          </a>
          {cvEnabled && (
            <a
              href={settings.cvUrl}
              download
              className="border border-electric bg-transparent px-[22px] py-3.5 font-mono text-xs tracking-[.14em] text-sky no-underline transition-all duration-200 hover:border-cyan hover:text-cyan hover:shadow-[0_0_22px_rgba(0,255,255,.35)]"
            >
              {dict.hero.cv}
            </a>
          )}
          <a
            href={settings.github}
            target="_blank"
            rel="noreferrer"
            className="border border-electric bg-transparent px-[22px] py-3.5 font-mono text-xs tracking-[.14em] text-sky no-underline transition-all duration-200 hover:border-cyan hover:text-cyan hover:shadow-[0_0_22px_rgba(0,255,255,.35)]"
          >
            ⌥ GITHUB
          </a>
          <a
            href={settings.linkedin}
            target="_blank"
            rel="noreferrer"
            className="border border-electric bg-transparent px-[22px] py-3.5 font-mono text-xs tracking-[.14em] text-sky no-underline transition-all duration-200 hover:border-cyan hover:text-cyan hover:shadow-[0_0_22px_rgba(0,255,255,.35)]"
          >
            in LINKEDIN
          </a>
        </div>

        <div className="font-mono text-[10px] tracking-[.16em] text-white/30">
          © {year} {dict.contacto.footer}
        </div>
      </RevealStagger>
    </section>
  );
}
