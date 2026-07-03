import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import {
  FALLBACK_ACHIEVEMENTS,
  FALLBACK_EXPERIENCE,
  FALLBACK_POSTS,
  FALLBACK_PROJECTS,
  FALLBACK_SETTINGS,
} from "../src/lib/content";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
const apiVersion = "2026-01-01";

if (!projectId) {
  throw new Error("Falta SANITY_STUDIO_PROJECT_ID o NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local");
}

const client = token
  ? createClient({
      projectId,
      dataset,
      token,
      apiVersion,
      useCdn: false,
    })
  : getCliClient({ apiVersion, useCdn: false });

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function textToBlocks(paragraphs: string[]) {
  return paragraphs.map((paragraph, index) => ({
    _type: "block",
    _key: `p${index}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `s${index}`,
        marks: [],
        text: paragraph,
      },
    ],
  }));
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function pixelDateToIso(value: string) {
  const [year, month, day] = value.split(".");
  return `${year}-${month}-${day}T12:00:00.000Z`;
}

async function main() {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    availabilityText: FALLBACK_SETTINGS.availabilityText,
    availabilityTextEn: FALLBACK_SETTINGS.availabilityTextEn,
    email: FALLBACK_SETTINGS.email,
    phone: FALLBACK_SETTINGS.phone,
    phoneDisplay: FALLBACK_SETTINGS.phoneDisplay,
    github: FALLBACK_SETTINGS.github,
    linkedin: FALLBACK_SETTINGS.linkedin,
    location: FALLBACK_SETTINGS.location,
    locationEn: FALLBACK_SETTINGS.locationEn,
    showBlog: FALLBACK_SETTINGS.showBlog,
    showTrayecto: FALLBACK_SETTINGS.showTrayecto,
    showCv: FALLBACK_SETTINGS.showCv,
    cvUrl: FALLBACK_SETTINGS.cvUrl,
    showProjectMetrics: FALLBACK_SETTINGS.showProjectMetrics,
    soundEnabled: FALLBACK_SETTINGS.soundEnabled,
  });

  for (const [order, project] of FALLBACK_PROJECTS.entries()) {
    await client.createOrReplace({
      _id: `project.${project.id}`,
      _type: "project",
      title: project.name,
      slug: { _type: "slug", current: project.id },
      tag: project.tag,
      status: project.status,
      summary: project.summary,
      bullets: project.bullets,
      stack: project.stack,
      hasDetail: project.hasDetail,
      longDesc: project.longDesc,
      features: project.features,
      metrics: project.metrics,
      impactMetrics: project.impactMetrics ?? [],
      repoUrl: project.repoUrl,
      demoUrl: project.demoUrl,
      previewVariant: project.previewVariant,
      hue: project.hue,
      order,
    });
  }

  for (const [order, item] of FALLBACK_EXPERIENCE.entries()) {
    await client.createOrReplace({
      _id: `experience.${slugify(item.org)}`,
      _type: "experience",
      role: item.role,
      org: item.org,
      location: item.location,
      bullets: item.bullets,
      order,
    });
  }

  for (const [order, achievement] of FALLBACK_ACHIEVEMENTS.entries()) {
    await client.createOrReplace({
      _id: `achievement.${slugify(achievement.name)}`,
      _type: "achievement",
      ...achievement,
      order,
    });
  }

  for (const [order, post] of FALLBACK_POSTS.entries()) {
    await client.createOrReplace({
      _id: `post.${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      glyph: post.glyph,
      tag: post.tag,
      excerpt: post.excerpt,
      body: isStringArray(post.body) ? textToBlocks(post.body) : post.body ?? [],
      publishedAt: pixelDateToIso(post.publishedAt),
      readingTime: post.readingTime,
      order,
    });
  }

  console.log("Seed de Sanity completado.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
