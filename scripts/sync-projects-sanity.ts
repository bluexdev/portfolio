import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { FALLBACK_PROJECTS } from "../src/lib/content";

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

const portfolioScreens = [
  {
    path: "public/projects/portfolio/home.png",
    filename: "carlxsdev-portfolio-home.png",
    alt: "Home del portfolio CARLXSDEV",
  },
  {
    path: "public/projects/portfolio/projects.png",
    filename: "carlxsdev-portfolio-projects.png",
    alt: "Seccion proyectos del portfolio CARLXSDEV",
  },
  {
    path: "public/projects/portfolio/contact.png",
    filename: "carlxsdev-portfolio-contact.png",
    alt: "Seccion contacto del portfolio CARLXSDEV",
  },
];

function imageField(assetId: string, key?: string, alt?: string) {
  return {
    _type: "image",
    ...(key ? { _key: key } : {}),
    asset: {
      _type: "reference",
      _ref: assetId,
    },
    ...(alt ? { alt } : {}),
  };
}

async function uploadPortfolioImages() {
  const assets = [];

  for (const item of portfolioScreens) {
    const asset = await client.assets.upload("image", createReadStream(resolve(item.path)), {
      filename: item.filename,
    });
    assets.push({ ...item, asset });
  }

  return assets;
}

async function main() {
  const uploadedPortfolioImages = await uploadPortfolioImages();

  for (const [order, project] of FALLBACK_PROJECTS.entries()) {
    const docId = `project.${project.id}`;
    const basePatch = {
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
    };

    await client.createIfNotExists({
      _id: docId,
      ...basePatch,
    });

    await client.patch(docId).set(basePatch).commit();
  }

  const portfolioDocId = "project.portfolio";
  const [hero, ...gallery] = uploadedPortfolioImages;

  await client
    .patch(portfolioDocId)
    .set({
      heroImage: imageField(hero.asset._id, undefined, hero.alt),
      gallery: gallery.map((item, index) =>
        imageField(item.asset._id, `portfolio-gallery-${index + 1}`, item.alt)
      ),
    })
    .commit();

  console.log("Proyectos sincronizados en Sanity.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
