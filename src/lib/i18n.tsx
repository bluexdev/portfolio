import type { ReactNode } from "react";

export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];

/** prefijo de ruta por locale: es = raíz, en = /en */
export function localePath(locale: Locale, path = ""): string {
  const base = locale === "en" ? "/en" : "";
  return `${base}${path}` || "/";
}

export interface Dict {
  /** nombres de las 8 secciones, en orden (la page filtra opcionales) */
  names: {
    inicio: string;
    perfil: string;
    trayecto: string;
    stack: string;
    proyectos: string;
    arcade: string;
    blog: string;
    contacto: string;
  };
  hud: { scroll: string; swipeHint: string; menuLabel: string; closeMenu: string };
  hero: {
    tag: string;
    sub: string;
    ctaProjects: string;
    ctaArcade: string;
    ctaContact: string;
    cv: string;
  };
  perfil: {
    label: string;
    title: ReactNode;
    p1: ReactNode;
    p2: string;
    photoAlt: string;
    stats: { n: string; l: string }[];
    competencies: string[];
  };
  trayecto: {
    label: string;
    title: ReactNode;
    mission: string;
    unlocked: string;
    tierLegend: string;
    tierEpic: string;
    tierCommon: string;
  };
  stack: { label: string; title: ReactNode };
  proyectos: {
    label: string;
    title: ReactNode;
    intro: ReactNode;
    scroll: string;
    verMas: string;
    resumen: string;
    cerrar: string;
    features: string;
    gallery: string;
    code: string;
    heroPlaceholder: string;
    imgPlaceholder: string;
    impactLabel: string;
  };
  arcade: {
    label: string;
    title: ReactNode;
    copy: ReactNode;
    score: string;
    best: string;
    controls1: string;
    controls2: string;
    insert: ReactNode;
    press: string;
    overTitle: ReactNode;
    retry: string;
    up: string;
    down: string;
    left: string;
    right: string;
  };
  blog: { label: string; title: ReactNode; read: string; back: string; by: string };
  contacto: {
    label: string;
    title: ReactNode;
    write: string;
    whatsapp: string;
    footer: string;
  };
}

const es: Dict = {
  names: {
    inicio: "INICIO",
    perfil: "PERFIL",
    trayecto: "TRAYECTO",
    stack: "STACK",
    proyectos: "PROYECTOS",
    arcade: "ARCADE",
    blog: "BLOG",
    contacto: "CONTACTO",
  },
  hud: {
    scroll: "DESPLAZA",
    swipeHint: "► DESLIZA PARA EXPLORAR",
    menuLabel: "MENU",
    closeMenu: "Cerrar menú",
  },
  hero: {
    tag: "CARLOS ALVAREZ PONCE",
    sub: "FULL STACK DEVELOPER · FOUNDER @ XBLUE · AI / AUTOMATION · LIMA, PE",
    ctaProjects: "[ PROYECTOS ]",
    ctaArcade: "[ ARCADE ]",
    ctaContact: "[ CONTACTO ]",
    cv: "[ ⇩ CV.PDF ]",
  },
  perfil: {
    label: "// PERFIL",
    title: (
      <>
        QUIÉN<span className="text-sky">_</span>SOY
      </>
    ),
    p1: (
      <>
        Desarrollador Full Stack con ~3 años de experiencia en entornos reales, especializado en{" "}
        <strong className="font-semibold text-white">Next.js, NestJS y JavaScript</strong>. Desarrollo
        y mantengo <strong className="font-semibold text-sky">BluJoy</strong>, un e-commerce en
        producción con autenticación JWT, pagos live vía Culqi y webhooks idempotentes, y{" "}
        <strong className="font-semibold text-sky">ReparaFlow</strong>, un SaaS multi-tenant con
        arquitectura completa (NestJS, Prisma, Docker, CI/CD) actualmente en evolución activa.
        Trabajo con principios SOLID, Clean Architecture y Git en flujos organizados.
      </>
    ),
    p2: "",
    photoAlt: "Foto de Carlos Alvarez Ponce",
    stats: [
      { n: "FULL STACK", l: "Next.js · NestJS · JavaScript" },
      { n: "~3 AÑOS", l: "en desarrollo de software" },
      { n: "PROD", l: "BluJoy · ReparaFlow" },
      { n: "LIMA", l: "Perú · Disponible remoto" },
    ],
    competencies: [
      "Pensamiento Analítico",
      "Resolución de Problemas",
      "Aprendizaje Autónomo",
      "Trabajo en Equipo",
      "Comunicación Efectiva",
      "Atención al Detalle",
      "Adaptabilidad",
      "Orientación a Resultados",
    ],
  },
  trayecto: {
    label: "// TRAYECTO",
    title: (
      <>
        QUEST<span className="text-sky">_</span>LOG
      </>
    ),
    mission: "✓ MISIÓN COMPLETADA",
    unlocked: "🏆 LOGROS DESBLOQUEADOS",
    tierLegend: "LEGENDARIO",
    tierEpic: "ÉPICO",
    tierCommon: "COMÚN",
  },
  stack: {
    label: "// STACK_TÉCNICO",
    title: (
      <>
        EL <span className="text-sky">ARSENAL</span>
      </>
    ),
  },
  proyectos: {
    label: "// PROYECTOS",
    title: (
      <>
        OBRA
        <br />
        <span className="text-sky">SELECT.</span>
      </>
    ),
    intro: (
      <>
        Siete sistemas entre producción, evolución activa y proyectos culminados. Pulsa{" "}
        <span className="text-cyan">VER MÁS</span> para desplegar el detalle.
      </>
    ),
    scroll: "DESPLAZA",
    verMas: "VER MÁS →",
    resumen: "RESUMEN",
    cerrar: "× CERRAR",
    features: "// CARACTERÍSTICAS",
    gallery: "// GALERÍA",
    code: "⌥ VER CÓDIGO ↗",
    heroPlaceholder: "IMAGEN PRINCIPAL · SANITY CDN",
    imgPlaceholder: "IMAGEN",
    impactLabel: "// IMPACTO",
  },
  arcade: {
    label: "// ARCADE.EXE",
    title: (
      <>
        SNAKE<span className="text-sky">{"//"}</span>DEV
      </>
    ),
    copy: (
      <>
        La culebra come <strong className="font-semibold text-cyan">tokens de stack</strong>. Cada
        uno suma 10 pts y acelera el juego. No choques con los muros ni contigo mismo.
      </>
    ),
    score: "SCORE",
    best: "BEST",
    controls1: "↑ ↓ ← →  /  W A S D  ·  D-PAD MÓVIL",
    controls2: "SPACE  INICIAR  ·  ESC  SALIR",
    insert: (
      <>
        INSERT
        <br />
        COIN
      </>
    ),
    press: "▶ PRESS START",
    overTitle: (
      <>
        GAME
        <br />
        OVER
      </>
    ),
    retry: "↻ REINTENTAR",
    up: "Arriba",
    down: "Abajo",
    left: "Izquierda",
    right: "Derecha",
  },
  blog: {
    label: "// BLOG",
    title: (
      <>
        DEV<span className="text-sky">_</span>LOG
      </>
    ),
    read: "LEER →",
    back: "← VOLVER A DEV_LOG",
    by: "por",
  },
  contacto: {
    label: "// CONTACTO",
    title: (
      <>
        INICIAR<span className="text-sky">_</span>CONEXIÓN
      </>
    ),
    write: "✉ ESCRÍBEME",
    whatsapp: "✆ WHATSAPP",
    footer: "CARLOS ALVAREZ PONCE · BUILT WITH PIXELS & ELECTRIC BLUE",
  },
};

const en: Dict = {
  names: {
    inicio: "HOME",
    perfil: "PROFILE",
    trayecto: "JOURNEY",
    stack: "STACK",
    proyectos: "PROJECTS",
    arcade: "ARCADE",
    blog: "BLOG",
    contacto: "CONTACT",
  },
  hud: {
    scroll: "SCROLL",
    swipeHint: "► SWIPE TO EXPLORE",
    menuLabel: "MENU",
    closeMenu: "Close menu",
  },
  hero: {
    tag: "CARLOS ALVAREZ PONCE",
    sub: "FULL STACK DEVELOPER · FOUNDER @ XBLUE · AI / AUTOMATION · LIMA, PE",
    ctaProjects: "[ PROJECTS ]",
    ctaArcade: "[ ARCADE ]",
    ctaContact: "[ CONTACT ]",
    cv: "[ ⇩ RESUME.PDF ]",
  },
  perfil: {
    label: "// PROFILE",
    title: (
      <>
        WHO<span className="text-sky">_</span>AM_I
      </>
    ),
    p1: (
      <>
        Full Stack Developer with ~3 years of real-world experience, specialized in{" "}
        <strong className="font-semibold text-white">Next.js, NestJS and JavaScript</strong>. I build
        and maintain <strong className="font-semibold text-sky">BluJoy</strong>, a production
        e-commerce product with JWT authentication, live Culqi payments and idempotent webhooks, and{" "}
        <strong className="font-semibold text-sky">ReparaFlow</strong>, a multi-tenant SaaS with a
        complete architecture (NestJS, Prisma, Docker, CI/CD) currently in active evolution. I work
        with SOLID principles, Clean Architecture and organized Git flows.
      </>
    ),
    p2: "",
    photoAlt: "Photo of Carlos Alvarez Ponce",
    stats: [
      { n: "FULL STACK", l: "Next.js · NestJS · JavaScript" },
      { n: "~3 YRS", l: "building software" },
      { n: "PROD", l: "BluJoy · ReparaFlow" },
      { n: "LIMA", l: "Peru · Remote available" },
    ],
    competencies: [
      "Analytical Thinking",
      "Problem Solving",
      "Self-Directed Learning",
      "Teamwork",
      "Effective Communication",
      "Attention to Detail",
      "Adaptability",
      "Results-Driven",
    ],
  },
  trayecto: {
    label: "// JOURNEY",
    title: (
      <>
        QUEST<span className="text-sky">_</span>LOG
      </>
    ),
    mission: "✓ MISSION COMPLETE",
    unlocked: "🏆 ACHIEVEMENTS UNLOCKED",
    tierLegend: "LEGENDARY",
    tierEpic: "EPIC",
    tierCommon: "COMMON",
  },
  stack: {
    label: "// TECH_STACK",
    title: (
      <>
        THE <span className="text-sky">ARSENAL</span>
      </>
    ),
  },
  proyectos: {
    label: "// PROJECTS",
    title: (
      <>
        SELECT
        <br />
        <span className="text-sky">WORKS.</span>
      </>
    ),
    intro: (
      <>
        Seven systems across production, active evolution and completed projects. Press{" "}
        <span className="text-cyan">SEE MORE</span> to expand the details.
      </>
    ),
    scroll: "SCROLL",
    verMas: "SEE MORE →",
    resumen: "SUMMARY",
    cerrar: "× CLOSE",
    features: "// FEATURES",
    gallery: "// GALLERY",
    code: "⌥ VIEW CODE ↗",
    heroPlaceholder: "HERO IMAGE · SANITY CDN",
    imgPlaceholder: "IMAGE",
    impactLabel: "// IMPACT",
  },
  arcade: {
    label: "// ARCADE.EXE",
    title: (
      <>
        SNAKE<span className="text-sky">{"//"}</span>DEV
      </>
    ),
    copy: (
      <>
        The snake eats <strong className="font-semibold text-cyan">stack tokens</strong>. Each one
        is worth 10 pts and speeds up the game. Don&apos;t hit the walls or yourself.
      </>
    ),
    score: "SCORE",
    best: "BEST",
    controls1: "↑ ↓ ← →  /  W A S D  ·  TOUCH D-PAD",
    controls2: "SPACE  START  ·  ESC  QUIT",
    insert: (
      <>
        INSERT
        <br />
        COIN
      </>
    ),
    press: "▶ PRESS START",
    overTitle: (
      <>
        GAME
        <br />
        OVER
      </>
    ),
    retry: "↻ RETRY",
    up: "Up",
    down: "Down",
    left: "Left",
    right: "Right",
  },
  blog: {
    label: "// BLOG",
    title: (
      <>
        DEV<span className="text-sky">_</span>LOG
      </>
    ),
    read: "READ →",
    back: "← BACK TO DEV_LOG",
    by: "by",
  },
  contacto: {
    label: "// CONTACT",
    title: (
      <>
        START<span className="text-sky">_</span>CONNECTION
      </>
    ),
    write: "✉ EMAIL ME",
    whatsapp: "✆ WHATSAPP",
    footer: "CARLOS ALVAREZ PONCE · BUILT WITH PIXELS & ELECTRIC BLUE",
  },
};

const DICTS: Record<Locale, Dict> = { es, en };

export function getDict(locale: Locale): Dict {
  return DICTS[locale] ?? DICTS.es;
}
