import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiGithubactions,
  SiJest,
  SiMake,
  SiMysql,
  SiN8n,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiRailway,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVitest,
  SiVuedotjs,
  SiWhatsapp,
  type IconType,
} from "@icons-pack/react-simple-icons";
import RevealStagger from "@/components/fx/RevealStagger";
import { CORE_TECHS, SKILLS } from "@/lib/content";
import type { Dict } from "@/lib/i18n";

const ICON_COLOR = "5FB8FF";
const ICONS: Record<string, IconType> = {
  angular: SiAngular,
  docker: SiDocker,
  dotnet: SiDotnet,
  fastapi: SiFastapi,
  githubactions: SiGithubactions,
  jest: SiJest,
  make: SiMake,
  mysql: SiMysql,
  n8n: SiN8n,
  nestjs: SiNestjs,
  nextdotjs: SiNextdotjs,
  nginx: SiNginx,
  nodedotjs: SiNodedotjs,
  openjdk: SiOpenjdk,
  php: SiPhp,
  postgresql: SiPostgresql,
  postman: SiPostman,
  prisma: SiPrisma,
  python: SiPython,
  railway: SiRailway,
  react: SiReact,
  redis: SiRedis,
  supabase: SiSupabase,
  tailwindcss: SiTailwindcss,
  typescript: SiTypescript,
  vercel: SiVercel,
  vitest: SiVitest,
  vuedotjs: SiVuedotjs,
  whatsapp: SiWhatsapp,
};

export default function Stack({ index, dict }: { index: number; dict: Dict }) {
  return (
    <section className="cx-section py-[clamp(84px,11vh,104px)]">
      <RevealStagger index={index} className="m-auto w-full max-w-[1280px]">
        <div className="mb-[30px]">
          <div className="cx-label mb-4">{dict.stack.label}</div>
          <h2 className="m-0 font-display text-[clamp(20px,3.4vw,40px)] text-white">
            {dict.stack.title}
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {SKILLS.map((cat) => (
            <div
              key={cat.title}
              className="border border-blue/20 bg-panel p-5 shadow-pixel-sm transition-all duration-200 hover:border-sky/55 hover:shadow-[5px_5px_0_rgba(0,0,0,.45),0_0_26px_rgba(0,128,255,.18)]"
            >
              <div className="mb-4 font-display text-[10px] tracking-[.02em] text-sky">
                {cat.title}
              </div>
              <div className="flex flex-wrap gap-[7px]">
                {cat.items.map((item) => {
                  const core = CORE_TECHS.includes(item.label);
                  const Icon = item.icon ? ICONS[item.icon] : null;
                  return (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-[7px] px-[9px] py-[5px] font-mono text-[11px]"
                      style={{
                        color: core ? "#9FEFFF" : "rgba(255,255,255,.68)",
                        border: `1px solid ${core ? "rgba(0,255,255,.5)" : "rgba(255,255,255,.12)"}`,
                      }}
                    >
                      <span className="relative inline-flex size-[15px] flex-none items-center justify-center">
                        <span className="text-[10px] leading-none text-blue">▪</span>
                        {Icon && (
                          <Icon
                            aria-hidden
                            color={`#${ICON_COLOR}`}
                            size={15}
                            className="absolute inset-0 size-full"
                          />
                        )}
                      </span>
                      {item.label}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </RevealStagger>
    </section>
  );
}
