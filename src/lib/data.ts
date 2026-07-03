import type { PortableTextBlock } from "@portabletext/react";
import { FALLBACK_HOME, FALLBACK_POSTS, FALLBACK_SETTINGS } from "./content";
import type { Achievement, HomeData, Post, Project, SiteSettings } from "./types";
import { formatPixelDate, hashSeed } from "./utils";
import { getClient, sanityEnabled } from "@/sanity/lib/client";
import { HOME, POST_BY_SLUG, POST_SLUGS } from "@/sanity/lib/queries";

/* — shapes crudos que devuelve GROQ — */
interface RawProject {
  _id: string;
  title?: string;
  titleEn?: string;
  slugStr?: string;
  tag?: string;
  status?: Project["status"];
  summary?: string;
  summaryEn?: string;
  bullets?: string[];
  bulletsEn?: string[];
  stack?: string[];
  hasDetail?: boolean;
  longDesc?: string;
  longDescEn?: string;
  features?: string[];
  featuresEn?: string[];
  metrics?: { k?: string; v?: string }[];
  impactMetrics?: { k?: string; v?: string }[];
  repoUrl?: string;
  demoUrl?: string;
  heroUrl?: string | null;
  galleryUrls?: string[];
  previewVariant?: Project["previewVariant"];
  hue?: number;
}

interface RawPost {
  _id: string;
  title?: string;
  titleEn?: string;
  slugStr?: string;
  glyph?: string;
  tag?: string;
  excerpt?: string;
  excerptEn?: string;
  body?: PortableTextBlock[];
  publishedAt?: string;
  readingTime?: string;
  coverUrl?: string | null;
}

interface RawSettings {
  availabilityText?: string;
  availabilityTextEn?: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  github?: string;
  linkedin?: string;
  location?: string;
  locationEn?: string;
  photoUrl?: string | null;
  showBlog?: boolean;
  showTrayecto?: boolean;
  showCv?: boolean;
  cvUrl?: string;
  cvFileUrl?: string;
  showProjectMetrics?: boolean;
  soundEnabled?: boolean;
}

interface RawAchievement {
  name?: string;
  issuer?: string;
  tier?: Achievement["tier"];
  category?: Achievement["category"];
  inProgress?: boolean;
  progress?: number;
}

interface RawHome {
  projects?: RawProject[];
  posts?: RawPost[];
  experience?: {
    role?: string;
    roleEn?: string;
    org?: string;
    location?: string;
    locationEn?: string;
    bullets?: string[];
    bulletsEn?: string[];
  }[];
  achievements?: RawAchievement[];
  settings?: RawSettings | null;
}

function mapProject(p: RawProject): Project {
  const id = p.slugStr ?? p._id;
  return {
    id,
    name: p.title ?? "",
    nameEn: p.titleEn,
    tag: p.tag ?? "",
    status: p.status ?? "PERSONAL",
    summary: p.summary ?? "",
    summaryEn: p.summaryEn,
    bullets: p.bullets ?? [],
    bulletsEn: p.bulletsEn,
    stack: p.stack ?? [],
    hasDetail: p.hasDetail ?? false,
    longDesc: p.longDesc ?? "",
    longDescEn: p.longDescEn,
    features: p.features ?? [],
    featuresEn: p.featuresEn,
    metrics: (p.metrics ?? []).map((m) => ({ k: m.k ?? "", v: m.v ?? "" })),
    impactMetrics: (p.impactMetrics ?? []).map((m) => ({ k: m.k ?? "", v: m.v ?? "" })),
    repoUrl: p.repoUrl ?? "#",
    demoUrl: p.demoUrl,
    heroUrl: p.heroUrl ?? null,
    galleryUrls: p.galleryUrls ?? [],
    previewVariant: p.previewVariant ?? "dash",
    hue: p.hue ?? 210,
    seed: hashSeed(id) % 97,
  };
}

function mapPost(p: RawPost): Post {
  return {
    slug: p.slugStr ?? p._id,
    glyph: p.glyph ?? "▚",
    tag: p.tag ?? "",
    title: p.title ?? "",
    titleEn: p.titleEn,
    excerpt: p.excerpt ?? "",
    excerptEn: p.excerptEn,
    publishedAt: p.publishedAt ? formatPixelDate(p.publishedAt) : "",
    readingTime: p.readingTime ?? "",
    coverUrl: p.coverUrl ?? null,
    body: p.body,
  };
}

function mapSettings(s: RawSettings | null | undefined): SiteSettings {
  if (!s) return FALLBACK_SETTINGS;
  return {
    availabilityText: s.availabilityText ?? FALLBACK_SETTINGS.availabilityText,
    availabilityTextEn: s.availabilityTextEn ?? FALLBACK_SETTINGS.availabilityTextEn,
    email: s.email ?? FALLBACK_SETTINGS.email,
    phone: (s.phone ?? FALLBACK_SETTINGS.phone).replace(/\s+/g, ""),
    phoneDisplay: s.phoneDisplay ?? s.phone ?? FALLBACK_SETTINGS.phoneDisplay,
    github: s.github ?? FALLBACK_SETTINGS.github,
    linkedin: s.linkedin ?? FALLBACK_SETTINGS.linkedin,
    location: s.location ?? FALLBACK_SETTINGS.location,
    locationEn: s.locationEn ?? FALLBACK_SETTINGS.locationEn,
    showBlog: s.showBlog ?? false,
    showTrayecto: s.showTrayecto ?? true,
    showCv: s.showCv ?? FALLBACK_SETTINGS.showCv,
    cvUrl: s.cvFileUrl ?? s.cvUrl ?? FALLBACK_SETTINGS.cvUrl,
    showProjectMetrics: s.showProjectMetrics ?? false,
    soundEnabled: s.soundEnabled ?? false,
    photoUrl: s.photoUrl ?? null,
  };
}

/**
 * Datos de la home: Sanity si está configurado, si no el contenido
 * de respaldo (idéntico a la referencia de diseño).
 */
export async function getHomeData(): Promise<HomeData> {
  if (!sanityEnabled) return FALLBACK_HOME;
  try {
    const raw = await getClient().fetch<RawHome>(HOME);
    const projects = (raw.projects ?? []).map(mapProject);
    return {
      projects: projects.length ? projects : FALLBACK_HOME.projects,
      posts: raw.posts?.length ? raw.posts.map(mapPost) : FALLBACK_HOME.posts,
      experience: raw.experience?.length
        ? raw.experience.map((e) => ({
            role: e.role ?? "",
            roleEn: e.roleEn,
            org: e.org ?? "",
            location: e.location ?? "",
            locationEn: e.locationEn,
            bullets: e.bullets ?? [],
            bulletsEn: e.bulletsEn,
          }))
        : FALLBACK_HOME.experience,
      achievements: raw.achievements?.length
        ? raw.achievements.map(
            (a): Achievement => ({
              name: a.name ?? "",
              issuer: a.issuer ?? "",
              tier: a.tier ?? "std",
              category: a.category ?? "CODE",
              inProgress: a.inProgress ?? false,
              progress: a.progress,
            })
          )
        : FALLBACK_HOME.achievements,
      settings: mapSettings(raw.settings),
    };
  } catch {
    return FALLBACK_HOME;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  if (!sanityEnabled) return FALLBACK_POSTS.map((p) => p.slug);
  try {
    const slugs = await getClient().fetch<string[]>(POST_SLUGS);
    return slugs.length ? slugs : FALLBACK_POSTS.map((p) => p.slug);
  } catch {
    return FALLBACK_POSTS.map((p) => p.slug);
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  if (sanityEnabled) {
    try {
      const raw = await getClient().fetch<RawPost | null>(POST_BY_SLUG, { slug });
      if (raw) return mapPost(raw);
    } catch {
      /* cae al fallback */
    }
  }
  return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;
}
