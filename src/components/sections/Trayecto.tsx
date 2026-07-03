import RevealStagger from "@/components/fx/RevealStagger";
import type { Achievement, AchievementCategory, AchievementTier, Experience } from "@/lib/types";

const GOLD = "#ffd75e";

const CAT_GLYPH: Record<AchievementCategory, string> = {
  SEC: "▲",
  IA: "◆",
  UX: "✦",
  CODE: "▞",
  DATA: "▦",
  NET: "⌗",
  OPS: "⚙",
  DB: "▤",
  QA: "✚",
  AGILE: "↻",
};

const TIER_STYLE: Record<
  AchievementTier,
  { border: string; glyph: string; glyphBg: string; glyphBorder: string; hover: string }
> = {
  legend: {
    border: "rgba(255,215,94,.45)",
    glyph: GOLD,
    glyphBg: "rgba(255,215,94,.08)",
    glyphBorder: "rgba(255,215,94,.5)",
    hover: "0 0 22px rgba(255,215,94,.22)",
  },
  epic: {
    border: "rgba(0,255,255,.35)",
    glyph: "#00FFFF",
    glyphBg: "rgba(0,128,255,.1)",
    glyphBorder: "rgba(0,255,255,.45)",
    hover: "0 0 20px rgba(0,255,255,.18)",
  },
  std: {
    border: "rgba(0,128,255,.18)",
    glyph: "#00BFFF",
    glyphBg: "rgba(0,128,255,.08)",
    glyphBorder: "rgba(0,191,255,.3)",
    hover: "0 0 18px rgba(0,128,255,.15)",
  },
};

const TIER_ORDER: AchievementTier[] = ["legend", "epic", "std"];

function AchievementTile({ a }: { a: Achievement }) {
  const t = TIER_STYLE[a.tier];
  return (
    <div
      className="cx-ach flex items-center gap-2.5 bg-panel px-3 py-[11px] transition-all duration-200"
      style={
        {
          border: `1px solid ${t.border}`,
          "--ach-glow": t.hover,
          "--ach-glyph": t.glyph,
        } as React.CSSProperties
      }
      title={`${a.name} — ${a.issuer}`}
    >
      <span
        className="flex size-[26px] flex-none items-center justify-center text-[13px]"
        style={{ background: t.glyphBg, border: `1px solid ${t.glyphBorder}`, color: t.glyph }}
      >
        {CAT_GLYPH[a.category] ?? "▣"}
      </span>
      <div className="min-w-0 flex-1">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] leading-[1.4] text-white/85">
          {a.name}
        </div>
        {a.inProgress ? (
          <div className="mt-1 flex items-center gap-1.5">
            <div className="h-[5px] flex-1 border border-blue/30 bg-ink">
              <div
                className="h-full animate-pulse-soft bg-gradient-to-r from-electric to-cyan"
                style={{ width: `${a.progress ?? 50}%` }}
              />
            </div>
            <span className="flex-none font-mono text-[8px] tracking-[.08em] text-cyan">
              {a.issuer} · {a.progress ?? 50}%
            </span>
          </div>
        ) : (
          <div className="font-mono text-[9px] tracking-[.08em] text-white/45">{a.issuer}</div>
        )}
      </div>
    </div>
  );
}

export default function Trayecto({
  index,
  experience,
  achievements,
}: {
  index: number;
  experience: Experience[];
  achievements: Achievement[];
}) {
  return (
    <section className="cx-section px-[clamp(20px,6vw,72px)] py-[clamp(84px,11vh,104px)]">
      <RevealStagger index={index} className="m-auto w-full max-w-[1320px]">
        <div className="mb-7">
          <div className="cx-label mb-4">{"// TRAYECTO"}</div>
          <h2 className="m-0 font-display text-[clamp(20px,3.2vw,38px)] text-white">
            QUEST<span className="text-sky">_</span>LOG
          </h2>
        </div>

        <div className="flex flex-wrap items-start gap-[26px]">
          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-[18px]">
            {experience.map((q) => (
              <div key={q.org} className="border border-blue/22 bg-panel p-6 shadow-pixel">
                <div className="mb-3.5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="mb-2 mt-0 font-display text-xs leading-[1.7] text-white">
                      {q.role}
                    </h3>
                    <div className="font-mono text-[11px] tracking-[.1em] text-sky">
                      {q.org} <span className="text-white/45">· {q.location}</span>
                    </div>
                  </div>
                  <span className="whitespace-nowrap border border-success/45 px-2 py-[5px] font-mono text-[9px] tracking-[.12em] text-success">
                    ✓ MISIÓN COMPLETADA
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {q.bullets.map((b) => (
                    <div key={b} className="flex gap-[9px] text-[13px] leading-[1.6] text-white/62">
                      <span className="flex-none text-blue">▸</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="min-w-0 flex-[1.3_1_460px]">
            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="font-mono text-[11px] tracking-[.24em] text-cyan">
                🏆 LOGROS DESBLOQUEADOS{" "}
                <span className="text-white/45">— {achievements.length}</span>
              </div>
              {/* leyenda de rareza arcade */}
              <div className="flex items-center gap-3.5 font-mono text-[9px] tracking-[.12em]">
                <span className="flex items-center gap-1.5" style={{ color: GOLD }}>
                  <span className="size-2" style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
                  LEGENDARIO
                </span>
                <span className="flex items-center gap-1.5 text-cyan">
                  <span className="size-2 bg-cyan shadow-[0_0_8px_#00FFFF]" />
                  ÉPICO
                </span>
                <span className="flex items-center gap-1.5 text-white/45">
                  <span className="size-2 bg-sky/60" />
                  COMÚN
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-2.5">
              {TIER_ORDER.flatMap((tier) =>
                achievements.filter((a) => a.tier === tier)
              ).map((a) => (
                <AchievementTile key={a.name} a={a} />
              ))}
            </div>
          </div>
        </div>
      </RevealStagger>
    </section>
  );
}
