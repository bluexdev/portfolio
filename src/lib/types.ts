import type { PortableTextBlock } from "@portabletext/react";

export type PreviewVariant = "shop" | "kanban" | "chat" | "dash" | "rooms" | "flow";

export type ProjectStatus =
  | "PRODUCCIÓN"
  | "EN EVOLUCIÓN"
  | "COMPLETADO"
  | "EN DESARROLLO"
  | "EMPRESA"
  | "PERSONAL";

export interface Metric {
  k: string;
  v: string;
}

export interface Project {
  id: string;
  name: string;
  nameEn?: string;
  tag: string;
  status: ProjectStatus;
  summary: string;
  summaryEn?: string;
  bullets: string[];
  bulletsEn?: string[];
  stack: string[];
  hasDetail: boolean;
  longDesc: string;
  longDescEn?: string;
  features: string[];
  featuresEn?: string[];
  metrics: Metric[];
  impactMetrics?: Metric[];
  visibleMetrics?: Metric[];
  repoUrl: string;
  demoUrl?: string;
  heroUrl?: string | null;
  galleryUrls?: string[];
  previewVariant: PreviewVariant;
  hue: number;
  seed: number;
}

export interface Post {
  slug: string;
  glyph: string;
  tag: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  publishedAt: string; // formato AAAA.MM.DD para el diseño
  readingTime: string;
  coverUrl?: string | null;
  body?: PortableTextBlock[] | string[];
}

export interface Experience {
  role: string;
  roleEn?: string;
  org: string;
  location: string;
  locationEn?: string;
  bullets: string[];
  bulletsEn?: string[];
}

export type AchievementTier = "legend" | "epic" | "std";

export type AchievementCategory =
  | "SEC"
  | "IA"
  | "UX"
  | "CODE"
  | "DATA"
  | "NET"
  | "OPS"
  | "DB"
  | "QA"
  | "AGILE";

export interface Achievement {
  name: string;
  issuer: string;
  /** rareza arcade: legendario (dorado) / épico (cyan) / común */
  tier: AchievementTier;
  category: AchievementCategory;
  /** certificación en curso → barra de progreso en el tile */
  inProgress?: boolean;
  /** 0-100, solo si inProgress */
  progress?: number;
}

export interface SkillItem {
  label: string;
  /** slug de simple-icons; vacío = sin logo (se muestra ▪) */
  icon: string;
}

export interface SkillCategory {
  title: string;
  items: SkillItem[];
}

export interface Stat {
  n: string;
  l: string;
}

export interface SiteSettings {
  availabilityText: string;
  availabilityTextEn?: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  github: string;
  linkedin: string;
  location: string;
  locationEn?: string;
  showBlog: boolean;
  showTrayecto: boolean;
  showCv: boolean;
  cvUrl: string;
  showProjectMetrics: boolean;
  soundEnabled: boolean;
  photoUrl?: string | null;
}

export interface HomeData {
  projects: Project[];
  posts: Post[];
  experience: Experience[];
  achievements: Achievement[];
  settings: SiteSettings;
}
