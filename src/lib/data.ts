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
  slugStr?: string;
  tag?: string;
  status?: Project["status"];
  summary?: string;
  bullets?: string[];
  stack?: string[];
  hasDetail?: boolean;
  longDesc?: string;
  features?: string[];
  metrics?: { k?: string; v?: string }[];
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
  slugStr?: string;
  glyph?: string;
  tag?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  publishedAt?: string;
  readingTime?: string;
}

interface RawSettings {
  availabilityText?: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  location?: string;
  photoUrl?: string | null;
  showBlog?: boolean;
  showTrayecto?: boolean;
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
  experience?: { role?: string; org?: string; location?: string; bullets?: string[] }[];
  achievements?: RawAchievement[];
  settings?: RawSettings | null;
}

function mapProject(p: RawProject): Project {
  const id = p.slugStr ?? p._id;
  return {
    id,
    name: p.title ?? "",
    tag: p.tag ?? "",
    status: p.status ?? "PERSONAL",
    summary: p.summary ?? "",
    bullets: p.bullets ?? [],
    stack: p.stack ?? [],
    hasDetail: p.hasDetail ?? false,
    longDesc: p.longDesc ?? "",
    features: p.features ?? [],
    metrics: (p.metrics ?? []).map((m) => ({ k: m.k ?? "", v: m.v ?? "" })),
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
    excerpt: p.excerpt ?? "",
    publishedAt: p.publishedAt ? formatPixelDate(p.publishedAt) : "",
    readingTime: p.readingTime ?? "",
    body: p.body,
  };
}

function mapSettings(s: RawSettings | null | undefined): SiteSettings {
  if (!s) return FALLBACK_SETTINGS;
  return {
    availabilityText: s.availabilityText ?? FALLBACK_SETTINGS.availabilityText,
    email: s.email ?? FALLBACK_SETTINGS.email,
    phone: (s.phone ?? FALLBACK_SETTINGS.phone).replace(/\s+/g, ""),
    phoneDisplay: s.phone ?? FALLBACK_SETTINGS.phoneDisplay,
    github: s.github ?? FALLBACK_SETTINGS.github,
    linkedin: s.linkedin ?? FALLBACK_SETTINGS.linkedin,
    location: s.location ?? FALLBACK_SETTINGS.location,
    showBlog: s.showBlog ?? true,
    showTrayecto: s.showTrayecto ?? true,
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
            org: e.org ?? "",
            location: e.location ?? "",
            bullets: e.bullets ?? [],
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
