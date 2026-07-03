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
        Estudiante de 7mo ciclo de{" "}
        <strong className="font-semibold text-white">Ingeniería de Software en la UPC</strong>, con
        ~2 años construyendo soluciones reales: desde una API en FastAPI conectada a inventario
        empresarial, hasta <strong className="font-semibold text-sky">BluJoy</strong>, un
        e-commerce desplegado en producción con autenticación JWT, APIs REST y pagos en vivo.
      </>
    ),
    p2: "Aplico principios SOLID y POO, trabajo con Git en flujos organizados y contenerizo con Docker. Autónomo, comunicación clara y orientado a resultados.",
    photoAlt: "Foto de Carlos Alvarez Ponce",
    stats: [
      { n: "7mo", l: "CICLO · ING. SOFTWARE · UPC" },
      { n: "~2 años", l: "EXPERIENCIA CON PYTHON" },
      { n: "PROD", l: "BLUJOY EN PRODUCCIÓN" },
      { n: "LIMA", l: "PERÚ · DISPONIBLE REMOTO" },
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
        Seis sistemas en producción, en desarrollo y en empresa. Pulsa{" "}
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
        7th-semester{" "}
        <strong className="font-semibold text-white">Software Engineering student at UPC</strong>,
        with ~2 years building real-world solutions: from a FastAPI service wired to a company
        inventory, to <strong className="font-semibold text-sky">BluJoy</strong>, an e-commerce
        running in production with JWT auth, REST APIs and live payments.
      </>
    ),
    p2: "I apply SOLID and OOP principles, work with organized Git flows and containerize with Docker. Self-driven, clear communication, results-oriented.",
    photoAlt: "Photo of Carlos Alvarez Ponce",
    stats: [
      { n: "7th", l: "SEMESTER · SOFTWARE ENG · UPC" },
      { n: "~2 yrs", l: "PYTHON EXPERIENCE" },
      { n: "PROD", l: "BLUJOY IN PRODUCTION" },
      { n: "LIMA", l: "PERU · REMOTE READY" },
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
        Six systems in production, in development and in-company. Press{" "}
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
