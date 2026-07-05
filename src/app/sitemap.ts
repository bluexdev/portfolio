import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlxs.dev";
  const slugs = await getPostSlugs();
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/en`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...slugs.flatMap((slug) => [
      {
        url: `${base}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
      {
        url: `${base}/en/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      },
    ]),
  ];
}
