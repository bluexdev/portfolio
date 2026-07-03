import GoButton from "@/components/fx/GoButton";
import Scramble from "@/components/fx/Scramble";

const FLOATERS = [
  { className: "left-[9%] top-[18%] size-[18px] bg-electric shadow-[0_0_18px_#0047FF]", anim: "cxd-float 5s ease-in-out infinite" },
  { className: "right-[12%] top-[30%] size-3 bg-cyan shadow-[0_0_16px_#00FFFF]", anim: "cxd-float 6.5s ease-in-out .6s infinite" },
  { className: "bottom-[24%] left-[16%] size-2.5 bg-sky shadow-[0_0_14px_#00BFFF]", anim: "cxd-float 7s ease-in-out 1.1s infinite" },
  { className: "bottom-[30%] right-[18%] size-3.5 bg-blue shadow-[0_0_16px_#0080FF]", anim: "cxd-float 5.5s ease-in-out .3s infinite" },
];

const CTA_BASE =
  "cursor-pointer px-6 py-[15px] font-mono text-xs tracking-[.16em] transition-all duration-200";

export default function Hero() {
  return (
    <section className="cx-section px-[clamp(20px,6vw,80px)]">
      {/* píxeles flotantes decorativos */}
      {FLOATERS.map((f, i) => (
        <div key={i} className={`absolute ${f.className}`} style={{ animation: f.anim }} aria-hidden />
      ))}

      <div className="m-auto w-full max-w-[900px] text-center">
        <div className="mb-[30px] pl-[.5em] font-mono text-[clamp(10px,1.4vw,13px)] tracking-[.5em] text-blue">
          CARLOS ALVAREZ PONCE
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
          FULL STACK DEVELOPER · FOUNDER @ XBLUE · AI / AUTOMATION · LIMA, PE
        </div>
        <div className="mt-[42px] flex flex-wrap justify-center gap-3.5">
          <GoButton
            section="PROYECTOS"
            className={`${CTA_BASE} border border-electric bg-blue/6 text-sky hover:border-cyan hover:bg-blue/12 hover:text-cyan hover:shadow-glow`}
          >
            [ PROYECTOS ]
          </GoButton>
          <GoButton
            section="ARCADE"
            className={`${CTA_BASE} border border-white/18 bg-transparent text-white/60 hover:border-cyan hover:text-cyan hover:shadow-glow`}
          >
            [ ARCADE ]
          </GoButton>
          <GoButton
            section="CONTACTO"
            className={`${CTA_BASE} border border-white/18 bg-transparent text-white/60 hover:border-cyan hover:text-cyan hover:shadow-glow`}
          >
            [ CONTACTO ]
          </GoButton>
        </div>
      </div>
    </section>
  );
}
