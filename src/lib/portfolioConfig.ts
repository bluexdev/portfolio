import { FALLBACK_SETTINGS } from "./content";
import type { HomeData, Project, SiteSettings } from "./types";

type PartialSettings = Partial<SiteSettings>;
export type Locale = "es" | "en";

const PROJECT_EN: Record<
  string,
  Partial<Pick<Project, "summary" | "bullets" | "longDesc" | "features">>
> = {
  blujoy: {
    summary: "Digital-gift e-commerce platform designed and deployed to production on Vercel.",
    bullets: [
      "Checkout, orders, and automated fulfillment through API Routes",
      "Live Culqi payments with idempotent webhooks and Zod validation",
      "JWT and HMAC tokens for sensitive endpoints",
    ],
    longDesc:
      "BluJoy is a digital gift store I designed end to end: relational data model in Supabase, live Culqi payment flow, and automatic asset generation after purchase. It runs in Vercel Production with a tested build and deploy pipeline.",
    features: [
      "REST APIs for checkout, orders, webhooks, and fulfillment",
      "Idempotent webhooks and data validation with Zod",
      "Rate limiting with Upstash Redis",
      "Vitest checks in the deployment pipeline",
    ],
  },
  reparaflow: {
    summary: "Repair-center management SaaS with architecture designed from scratch.",
    bullets: [
      "NestJS backend with Prisma and PostgreSQL",
      "Dockerized stack with Nginx reverse proxy",
      "CI/CD through GitHub Actions and Railway deploys",
    ],
    longDesc:
      "ReparaFlow is an active personal SaaS where I designed the full architecture: NestJS API with Prisma over PostgreSQL, React + Vite + Tailwind 4 frontend, Docker containers, and a CI/CD pipeline deployed to Railway.",
    features: [
      "JWT authentication and API access control",
      "Nginx reverse proxy over containers",
      "Unit and integration tests for critical modules",
      "Technical architecture and endpoint documentation",
    ],
  },
  portfolio: {
    summary:
      "Personal pixel-art portfolio deployed on carlxs.dev and designed as a recruiter conversion funnel.",
    bullets: [
      "Next.js App Router with horizontal navigation, ES/EN content and Sanity Studio",
      "Downloadable resume, direct WhatsApp, analytics and SEO metadata",
      "Production deploy on Vercel with the carlxs.dev domain",
    ],
    longDesc:
      "CARLXSDEV Portfolio is my personal site shipped as a functional pixel-art experience: horizontal navigation, bilingual content, Sanity integration, resume download, WhatsApp contact and conversion events to measure real recruiter interest.",
    features: [
      "Responsive pixel-art visual system with section-based navigation",
      "Custom Sanity Studio for managing content and images",
      "Analytics events for resume downloads, WhatsApp, projects and viewed sections",
      "Metadata, sitemap, JSON-LD, OG image and custom favicon",
    ],
  },
  asistente: {
    summary:
      "REST API connecting business inventory with real-time natural-language queries.",
    bullets: [
      "FastAPI + OpenAI for stock, price, and availability answers",
      "Conversational memory with Redis",
      "Web, Facebook, and Instagram integration",
    ],
    longDesc:
      "Business AI assistant: a Python FastAPI REST API connected to inventory data, answering natural-language questions about stock, prices, and availability in real time with OpenAI and Redis-backed session memory.",
    features: [
      "Natural-language queries through the OpenAI API",
      "Conversational sessions and memory with Redis",
      "WhatsApp, Facebook, and Instagram integrations",
      "Efficient PostgreSQL queries and caching",
    ],
  },
  cotizaciones: {
    summary: "Customer, product, and quotation management platform with an admin dashboard.",
    bullets: [
      "Quotation export and print-ready PDFs",
      "WhatsApp Cloud API for automated communication",
      "Complete administrative dashboard",
    ],
  },
  multijugador: {
    summary: "Online Hangman-style game with private rooms and real-time state sync.",
    bullets: [
      "WebSockets for synchronized player state",
      "Real-time chat inside each room",
      "JWT authentication for private rooms",
    ],
    longDesc:
      "A multiplayer Hangman-style game with private rooms, live chat, and synchronized state through WebSockets. JWT authentication identifies each player and protects room access.",
    features: [
      "Real-time state synchronization with WebSockets",
      "JWT-protected private rooms",
      "Live room chat",
      "Server-side game and turn logic",
    ],
  },
  automatizacion: {
    summary: "Automated integration workflows between platforms, self-hosted in the cloud.",
    bullets: [
      "Self-hosted N8N on DigitalOcean",
      "Google Apps Script automation",
      "APIs and webhooks across multiple services",
    ],
  },
};

const EXPERIENCE_EN: Record<
  string,
  { role: string; location: string; bullets: string[] }
> = {
  "Karina Import": {
    role: "Technology Solutions and Digital Transformation",
    location: "Lima, Peru",
    bullets: [
      "Automation of commercial and customer-support processes",
      "Functional and technical requirements analysis for internal solutions",
      "External API integrations: WhatsApp Cloud, Facebook Graph, and Bsale",
      "Automation workflows with self-hosted N8N on DigitalOcean and Make",
      "Technical and functional documentation for each delivered solution",
    ],
  },
  Fertigyn: {
    role: "IT Systems Consultant",
    location: "Miraflores, Peru · Hybrid",
    bullets: [
      "Requirements analysis and client-need discovery",
      "Functional and technical analysis documentation",
      "Development, programming, and configuration of technology solutions",
      "Participation in project execution and implementation",
      "Technical support, user manuals, and quality checks through testing",
    ],
  },
};

export function normalizeSiteSettings(settings: PartialSettings | null | undefined): SiteSettings {
  const source = settings ?? {};
  const fallbackPhone = FALLBACK_SETTINGS.phone;
  const rawPhone = source.phone ?? fallbackPhone;
  const phone = rawPhone.replace(/\s+/g, "");

  return {
    availabilityText: source.availabilityText ?? FALLBACK_SETTINGS.availabilityText,
    availabilityTextEn: source.availabilityTextEn ?? FALLBACK_SETTINGS.availabilityTextEn,
    email: source.email ?? FALLBACK_SETTINGS.email,
    phone,
    phoneDisplay: source.phoneDisplay ?? rawPhone,
    github: source.github ?? FALLBACK_SETTINGS.github,
    linkedin: source.linkedin ?? FALLBACK_SETTINGS.linkedin,
    location: source.location ?? FALLBACK_SETTINGS.location,
    locationEn: source.locationEn ?? FALLBACK_SETTINGS.locationEn,
    showBlog: source.showBlog ?? false,
    showTrayecto: source.showTrayecto ?? true,
    showCv: source.showCv ?? false,
    cvUrl: source.cvUrl ?? "",
    showProjectMetrics: source.showProjectMetrics ?? false,
    soundEnabled: source.soundEnabled ?? false,
    photoUrl: source.photoUrl ?? null,
  };
}

export function whatsappUrl(settings: Pick<SiteSettings, "phone">): string {
  const digits = settings.phone.replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hola Carlos, vi tu portfolio y me gustaría conversar contigo sobre una oportunidad o proyecto."
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function isCvDownloadEnabled(settings: Pick<SiteSettings, "showCv" | "cvUrl">): boolean {
  return Boolean(settings.showCv && settings.cvUrl?.trim());
}

export function getVisibleSections(settings: SiteSettings, locale: Locale): string[] {
  const names =
    locale === "en"
      ? {
          inicio: "HOME",
          perfil: "PROFILE",
          trayecto: "JOURNEY",
          stack: "STACK",
          proyectos: "PROJECTS",
          arcade: "ARCADE",
          blog: "BLOG",
          contacto: "CONTACT",
        }
      : {
          inicio: "INICIO",
          perfil: "PERFIL",
          trayecto: "TRAYECTO",
          stack: "STACK",
          proyectos: "PROYECTOS",
          arcade: "ARCADE",
          blog: "BLOG",
          contacto: "CONTACTO",
        };
  return [
    names.inicio,
    names.perfil,
    ...(settings.showTrayecto ? [names.trayecto] : []),
    names.stack,
    names.proyectos,
    names.arcade,
    ...(settings.showBlog ? [names.blog] : []),
    names.contacto,
  ];
}

function localizeProject(project: Project, locale: Locale, showProjectMetrics: boolean): Project {
  if (locale !== "en") {
    return {
      ...project,
      visibleMetrics: showProjectMetrics ? project.impactMetrics ?? project.metrics : [],
    };
  }

  return {
    ...project,
    name: project.nameEn ?? project.name,
    summary: project.summaryEn ?? PROJECT_EN[project.id]?.summary ?? project.summary,
    bullets: project.bulletsEn ?? PROJECT_EN[project.id]?.bullets ?? project.bullets,
    longDesc: project.longDescEn ?? PROJECT_EN[project.id]?.longDesc ?? project.longDesc,
    features: project.featuresEn ?? PROJECT_EN[project.id]?.features ?? project.features,
    visibleMetrics: showProjectMetrics ? project.impactMetrics ?? project.metrics : [],
  };
}

export function localizeHomeData(data: HomeData, locale: Locale): HomeData {
  const settings = normalizeSiteSettings(data.settings);
  const localizedSettings =
    locale === "en"
      ? {
          ...settings,
          availabilityText: settings.availabilityTextEn ?? settings.availabilityText,
          location: settings.locationEn ?? settings.location,
        }
      : settings;

  return {
    ...data,
    settings: localizedSettings,
    projects: data.projects.map((project) =>
      localizeProject(project, locale, localizedSettings.showProjectMetrics)
    ),
    experience: data.experience.map((item) =>
      locale === "en"
        ? {
            ...item,
            role: item.roleEn ?? EXPERIENCE_EN[item.org]?.role ?? item.role,
            location: item.locationEn ?? EXPERIENCE_EN[item.org]?.location ?? item.location,
            bullets: item.bulletsEn ?? EXPERIENCE_EN[item.org]?.bullets ?? item.bullets,
          }
        : item
    ),
    posts: data.posts.map((post) =>
      locale === "en"
        ? {
            ...post,
            title: post.titleEn ?? post.title,
            excerpt: post.excerptEn ?? post.excerpt,
          }
        : post
    ),
  };
}
