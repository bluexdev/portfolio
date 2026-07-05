import type {
  Achievement,
  Experience,
  HomeData,
  Post,
  Project,
  SiteSettings,
  SkillCategory,
  Stat,
} from "./types";

/**
 * Contenido de respaldo (idéntico a la referencia de diseño).
 * Cuando Sanity está configurado, estos datos se migran a documentos
 * y este archivo queda solo como fallback para desarrollo local.
 */

export const COMPETENCIES = [
  "Pensamiento Analítico",
  "Resolución de Problemas",
  "Aprendizaje Autónomo",
  "Trabajo en Equipo",
  "Comunicación Efectiva",
  "Atención al Detalle",
  "Adaptabilidad",
  "Orientación a Resultados",
];

export const STATS: Stat[] = [
  { n: "7mo", l: "CICLO · ING. SOFTWARE · UPC" },
  { n: "~2 años", l: "EXPERIENCIA CON PYTHON" },
  { n: "PROD", l: "BLUJOY EN PRODUCCIÓN" },
  { n: "LIMA", l: "PERÚ · DISPONIBLE REMOTO" },
];

/** Techs core: borde cyan + texto #9FEFFF en la sección STACK */
export const CORE_TECHS = ["Next.js", "TypeScript", "PostgreSQL", "Python", "FastAPI", "Docker"];

export const SKILLS: SkillCategory[] = [
  {
    title: "BACKEND",
    items: [
      { label: "Python", icon: "python" },
      { label: "FastAPI", icon: "fastapi" },
      { label: "Node.js", icon: "nodedotjs" },
      { label: "NestJS", icon: "nestjs" },
      { label: "TypeScript", icon: "typescript" },
    ],
  },
  {
    title: "FRONTEND",
    items: [
      { label: "Next.js", icon: "nextdotjs" },
      { label: "React", icon: "react" },
      { label: "Vue.js", icon: "vuedotjs" },
      { label: "Angular", icon: "angular" },
      { label: "Tailwind v4", icon: "tailwindcss" },
    ],
  },
  {
    title: "DATABASES",
    items: [
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "MySQL", icon: "mysql" },
      { label: "Prisma", icon: "prisma" },
      { label: "Redis", icon: "redis" },
      { label: "Supabase", icon: "supabase" },
    ],
  },
  {
    title: "DEVOPS",
    items: [
      { label: "Docker", icon: "docker" },
      { label: "Nginx", icon: "nginx" },
      { label: "GitHub Actions", icon: "githubactions" },
      { label: "Vercel", icon: "vercel" },
      { label: "Railway", icon: "railway" },
    ],
  },
  {
    title: "TESTING",
    items: [
      { label: "Vitest", icon: "vitest" },
      { label: "Jest", icon: "jest" },
      { label: "Postman", icon: "postman" },
      { label: "TDD", icon: "" },
      { label: "BDD", icon: "" },
    ],
  },
  {
    title: "IA / AUTO",
    items: [
      { label: "OpenAI API", icon: "" },
      { label: "N8N", icon: "n8n" },
      { label: "Make", icon: "make" },
      { label: "Google Apps Script", icon: "googleappsscript" },
      { label: "AppSheet", icon: "google" },
      { label: "Google Sheets", icon: "googlesheets" },
      { label: "Webhooks", icon: "" },
      { label: "WhatsApp", icon: "whatsapp" },
    ],
  },
  {
    title: "ARQUITECTURA",
    items: [
      { label: "SOLID", icon: "" },
      { label: "POO", icon: "" },
      { label: "Clean Arch", icon: "" },
      { label: "DDD", icon: "" },
      { label: "UML", icon: "" },
    ],
  },
  {
    title: "LENGUAJES",
    items: [
      { label: "TypeScript", icon: "typescript" },
      { label: "Python", icon: "python" },
      { label: "Java", icon: "openjdk" },
      { label: "C#", icon: "dotnet" },
      { label: "PHP", icon: "php" },
    ],
  },
];

export const FALLBACK_EXPERIENCE: Experience[] = [
  {
    role: "Soluciones Tecnológicas y Transformación Digital",
    org: "Karina Import",
    location: "Lima, Perú",
    bullets: [
      "Automatización de procesos comerciales y de atención al cliente",
      "Análisis de requerimientos funcionales y técnicos para soluciones internas",
      "Integración de APIs externas: WhatsApp Cloud, Facebook Graph y Bsale",
      "Flujos de automatización con N8N (self-hosted en DigitalOcean) y Make",
      "Documentación técnica y funcional de cada solución implementada",
    ],
  },
  {
    role: "Consultor de Sistemas de TI",
    org: "Fertigyn",
    location: "Miraflores, Perú · Híbrido",
    bullets: [
      "Análisis de requisitos e identificación de necesidades del cliente",
      "Elaboración de análisis funcionales y técnicos",
      "Desarrollo, programación y configuración de soluciones tecnológicas",
      "Participación en la ejecución de proyectos y su correcta implementación",
      "Soporte técnico, documentación y manuales de usuario; calidad mediante pruebas y revisiones",
    ],
  },
];

export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  {
    name: "Cybersecurity Professional",
    issuer: "Google",
    tier: "legend",
    category: "SEC",
    inProgress: true,
    progress: 60,
  },
  { name: "AI Skills Fest 2026", issuer: "Microsoft", tier: "epic", category: "IA" },
  { name: "Foundations of Cybersecurity", issuer: "Google", tier: "epic", category: "SEC" },
  { name: "Google UX Design", issuer: "Google", tier: "epic", category: "UX" },
  { name: "Python", issuer: "Platzi", tier: "epic", category: "CODE" },
  { name: "Intro to Threat Modeling", issuer: "Microsoft", tier: "epic", category: "SEC" },
  { name: "Computational Social Science", issuer: "UC Davis", tier: "std", category: "DATA" },
  { name: "Intro to Cybersecurity", issuer: "Cisco", tier: "std", category: "SEC" },
  { name: "Networking Basics", issuer: "Cisco", tier: "std", category: "NET" },
  { name: "NDG Linux Unhatched", issuer: "Cisco NetAcad", tier: "std", category: "OPS" },
  { name: "Introduction to MongoDB", issuer: "MongoDB", tier: "std", category: "DB" },
  { name: "Scrum Fundamentals Certified", issuer: "VMEdu", tier: "std", category: "AGILE" },
  { name: "Six Sigma Yellow Belt", issuer: "6sigmastudy", tier: "std", category: "AGILE" },
  { name: "Pruebas de Software", issuer: "Código Facilito", tier: "std", category: "QA" },
  { name: "Programming with MATLAB", issuer: "Vanderbilt", tier: "std", category: "CODE" },
  { name: "Excel Skills for Business", issuer: "Macquarie", tier: "std", category: "DATA" },
  { name: "Frontend Developer", issuer: "Platzi", tier: "std", category: "CODE" },
  { name: "HTML y CSS", issuer: "Platzi", tier: "std", category: "CODE" },
  { name: "ECMAScript 6+", issuer: "Platzi", tier: "std", category: "CODE" },
  { name: "JavaScript Engine V8", issuer: "Platzi", tier: "std", category: "CODE" },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "blujoy",
    name: "BluJoy",
    tag: "E-COMMERCE",
    status: "PRODUCCIÓN",
    hue: 222,
    seed: 7,
    previewVariant: "shop",
    summary:
      "Plataforma de e-commerce de regalos digitales, diseñada y desplegada en producción sobre Vercel.",
    bullets: [
      "Checkout, órdenes y fulfillment automático vía API Routes",
      "Pagos Culqi en vivo con webhooks idempotentes + Zod",
      "JWT y tokens HMAC para endpoints sensibles",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Culqi", "Cloudflare R2"],
    hasDetail: true,
    repoUrl: "https://github.com/bluexdev",
    longDesc:
      "BluJoy es una tienda de regalos digitales que diseñé de extremo a extremo: modelo de datos relacional en Supabase, flujo de pago con Culqi en modo live y generación automática de assets tras la compra. Todo corre en Vercel Production con un pipeline de build y deploy probado.",
    metrics: [
      { k: "ROL", v: "Full-stack" },
      { k: "AÑO", v: "2025" },
      { k: "ESTADO", v: "Producción" },
    ],
    impactMetrics: [
      { k: "LCP", v: "~1.2s" },
      { k: "ÓRDENES", v: "300+" },
      { k: "COBROS DUP.", v: "0" },
    ],
    features: [
      "APIs REST para checkout, órdenes, webhooks y fulfillment",
      "Webhooks idempotentes y validación de datos con Zod",
      "Rate limiting con Upstash Redis",
      "Pruebas con Vitest dentro del pipeline de deploy",
    ],
  },
  {
    id: "reparaflow",
    name: "ReparaFlow",
    tag: "SaaS",
    status: "EN DESARROLLO",
    hue: 205,
    seed: 13,
    previewVariant: "kanban",
    summary:
      "SaaS de gestión para centros de reparación, con la arquitectura diseñada por completo desde cero.",
    bullets: [
      "Backend NestJS + Prisma + PostgreSQL",
      "Dockerizado con Nginx como reverse proxy",
      "CI/CD con GitHub Actions y deploy en Railway",
    ],
    stack: ["NestJS", "React", "Prisma", "Docker", "Railway"],
    hasDetail: true,
    repoUrl: "https://github.com/bluexdev",
    longDesc:
      "ReparaFlow es un SaaS personal en desarrollo activo donde diseñé la arquitectura completa: API NestJS con Prisma sobre PostgreSQL, frontend React + Vite + Tailwind 4, contenerización con Docker y un pipeline CI/CD con despliegue en Railway.",
    metrics: [
      { k: "ROL", v: "Arquitecto" },
      { k: "AÑO", v: "2026" },
      { k: "ESTADO", v: "En desarrollo" },
    ],
    features: [
      "Autenticación JWT y control de acceso a la API",
      "Nginx como reverse proxy sobre contenedores",
      "Pruebas unitarias e integración en módulos críticos",
      "Documentación técnica de arquitectura y endpoints",
    ],
  },
  {
    id: "asistente",
    name: "Asistente IA",
    tag: "IA / API",
    status: "EMPRESA",
    hue: 190,
    seed: 21,
    previewVariant: "chat",
    summary:
      "API REST que conecta inventario empresarial con consultas en lenguaje natural en tiempo real.",
    bullets: [
      "FastAPI + OpenAI para stock, precios y disponibilidad",
      "Memoria conversacional con Redis",
      "Integración Web, Facebook e Instagram",
    ],
    stack: ["Python", "FastAPI", "OpenAI", "PostgreSQL", "Redis"],
    hasDetail: true,
    repoUrl: "https://github.com/bluexdev",
    longDesc:
      "Asistente inteligente empresarial: una API REST en Python con FastAPI conectada al sistema de inventario, que responde consultas en lenguaje natural sobre stock, precios y disponibilidad en tiempo real usando OpenAI, con memoria de sesión en Redis.",
    metrics: [
      { k: "ROL", v: "Backend" },
      { k: "CANALES", v: "Web/FB/IG" },
      { k: "ESTADO", v: "En empresa" },
    ],
    features: [
      "Consultas en lenguaje natural vía OpenAI API",
      "Memoria conversacional y sesiones con Redis",
      "Integración con WhatsApp, Facebook e Instagram",
      "Caché y consultas eficientes a PostgreSQL",
    ],
  },
  {
    id: "cotizaciones",
    name: "Cotizaciones",
    tag: "DASHBOARD",
    status: "EMPRESA",
    hue: 172,
    seed: 33,
    previewVariant: "dash",
    summary:
      "Plataforma de gestión de clientes, productos y cotizaciones con panel administrativo.",
    bullets: [
      "Exportación e impresión de cotizaciones en PDF",
      "WhatsApp Cloud API para comunicación automática",
      "Dashboard administrativo completo",
    ],
    stack: ["Node.js", "PostgreSQL", "WhatsApp API"],
    hasDetail: false,
    repoUrl: "https://github.com/bluexdev",
    longDesc: "",
    metrics: [],
    features: [],
  },
  {
    id: "multijugador",
    name: "MultiJugador",
    tag: "REALTIME",
    status: "PERSONAL",
    hue: 248,
    seed: 42,
    previewVariant: "rooms",
    summary:
      "Juego tipo Ahorcado online con salas privadas y sincronización de estado en tiempo real.",
    bullets: [
      "WebSockets para estado sincronizado entre jugadores",
      "Chat en tiempo real dentro de cada sala",
      "Autenticación JWT para proteger salas privadas",
    ],
    stack: ["React", "Node.js", "WebSockets", "JWT"],
    hasDetail: true,
    repoUrl: "https://github.com/bluexdev",
    longDesc:
      "Un juego multijugador tipo Ahorcado con salas privadas, chat en vivo y sincronización de estado entre usuarios mediante WebSockets. La autenticación JWT identifica a cada jugador y protege el acceso a las salas.",
    metrics: [
      { k: "ROL", v: "Full-stack" },
      { k: "TIPO", v: "Realtime" },
      { k: "ESTADO", v: "Personal" },
    ],
    features: [
      "Sincronización de estado en tiempo real con WebSockets",
      "Salas privadas protegidas con JWT",
      "Chat en vivo por sala",
      "Lógica de juego y turnos en el servidor",
    ],
  },
  {
    id: "automatizacion",
    name: "Automatización",
    tag: "WORKFLOWS",
    status: "EMPRESA",
    hue: 210,
    seed: 55,
    previewVariant: "flow",
    summary:
      "Flujos automatizados de integración entre plataformas, self-hosted en la nube.",
    bullets: [
      "N8N self-hosted en DigitalOcean",
      "Google Sheets + Apps Script para flujos operativos",
      "Webhooks/API para sincronizar CRM y oportunidades",
    ],
    stack: ["N8N", "Make", "Google Apps Script", "AppSheet", "Webhooks"],
    hasDetail: false,
    repoUrl: "https://github.com/bluexdev",
    longDesc: "",
    metrics: [],
    features: [],
  },
];

export const FALLBACK_POSTS: Post[] = [
  {
    slug: "webhooks-idempotentes-culqi",
    glyph: "▚",
    tag: "PAGOS",
    publishedAt: "2026.05.18",
    readingTime: "6 min",
    title: "Webhooks idempotentes con Culqi",
    excerpt:
      "Cómo evité cobros duplicados validando firmas HMAC y deduplicando eventos antes de tocar la base de datos.",
    body: [
      "Un webhook de pagos que se procesa dos veces significa un cobro duplicado, un fulfillment doble o un inventario roto. Culqi —como casi todas las pasarelas— reintenta la entrega cuando no recibe un 200 a tiempo, así que la idempotencia no es opcional: es parte del contrato.",
      "El primer paso es validar la firma HMAC de cada evento antes de hacer cualquier otra cosa. Si la firma no coincide con el secreto compartido, el evento se descarta con un 401 y se registra el intento. Esto elimina de raíz los eventos falsificados.",
      "El segundo paso es deduplicar: cada evento trae un identificador único que guardo en una tabla de eventos procesados con un índice único. Si el insert falla por conflicto, el evento ya fue procesado y respondo 200 sin tocar nada más. Solo después de pasar ambos filtros el evento llega a la lógica de negocio.",
      "Con este patrón, los reintentos de Culqi se vuelven inofensivos y el sistema puede procesar el mismo evento N veces con exactamente un efecto.",
    ],
  },
  {
    slug: "fastapi-openai-inventario",
    glyph: "◆",
    tag: "IA",
    publishedAt: "2026.04.02",
    readingTime: "8 min",
    title: "FastAPI + OpenAI sobre tu inventario",
    excerpt:
      "Consultas en lenguaje natural a stock y precios reales, con memoria conversacional en Redis.",
    body: [
      "«¿Cuántas unidades quedan del producto X y a qué precio?» es una pregunta que cualquier vendedor hace decenas de veces al día. Conectar un modelo de lenguaje directamente al inventario convierte esa pregunta en una consulta de un segundo, desde la web, Facebook o Instagram.",
      "La arquitectura es una API REST en FastAPI que expone un endpoint de conversación. Cada mensaje pasa por OpenAI con function calling: el modelo decide si necesita consultar stock, precios o disponibilidad, y la API ejecuta la consulta real contra PostgreSQL con parámetros validados.",
      "La memoria conversacional vive en Redis con TTL por sesión: el contexto de los últimos mensajes se serializa y se recupera en cada turno, lo que permite preguntas de seguimiento («¿y en color azul?») sin repetir toda la consulta.",
      "El resultado: los canales de atención responden con datos reales en tiempo real, y el equipo humano solo interviene cuando la conversación lo requiere.",
    ],
  },
  {
    slug: "cicd-github-actions-railway",
    glyph: "⚙",
    tag: "DEVOPS",
    publishedAt: "2026.02.21",
    readingTime: "5 min",
    title: "CI/CD real con GitHub Actions y Railway",
    excerpt:
      "Pipeline de build, test y deploy con ramas organizadas y rollback rápido en proyectos contenerizados.",
    body: [
      "Un pipeline de CI/CD no tiene que ser complejo para ser real: build, test y deploy automáticos en cada push a main, y previews por rama cuando el proyecto lo amerita.",
      "En GitHub Actions el workflow construye la imagen Docker, corre las pruebas (Vitest o Jest según el proyecto) y solo si todo pasa dispara el deploy en Railway. Las ramas siguen un flujo organizado: feature → develop → main, con PRs revisados antes de mezclar.",
      "El rollback es la parte que casi nadie prepara: en Railway basta con redeployar la imagen anterior, así que el pipeline etiqueta cada build con el SHA del commit. Volver a la versión estable toma menos de un minuto.",
      "Con esto, cada cambio llega a producción por el mismo camino probado, y ningún deploy depende de pasos manuales.",
    ],
  },
];

export const FALLBACK_SETTINGS: SiteSettings = {
  availabilityText: "DISPONIBLE — ROLES FULL STACK · BACKEND · AUTOMATIZACIÓN",
  availabilityTextEn: "AVAILABLE — FULL STACK · BACKEND · AUTOMATION ROLES",
  email: "carmm41@gmail.com",
  phone: "+51938847564",
  phoneDisplay: "+51 938 847 564",
  github: "https://github.com/bluexdev",
  linkedin: "https://linkedin.com/in/carlos-alvarez-ponce",
  location: "Lima, Perú",
  locationEn: "Lima, Peru",
  showBlog: false,
  showTrayecto: true,
  showCv: true,
  cvUrl: "/carlos-alvarez-ponce-cv.pdf",
  showProjectMetrics: false,
  soundEnabled: false,
  photoUrl: null,
};

export const FALLBACK_HOME: HomeData = {
  projects: FALLBACK_PROJECTS,
  posts: FALLBACK_POSTS,
  experience: FALLBACK_EXPERIENCE,
  achievements: FALLBACK_ACHIEVEMENTS,
  settings: FALLBACK_SETTINGS,
};
