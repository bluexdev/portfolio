import type { Metadata } from "next";
import { getPostSlugs } from "@/lib/data";
import PostScreen, { buildPostMetadata } from "../../../blog/[slug]/PostScreen";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildPostMetadata(slug, "en");
}

export default async function EnglishPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostScreen slug={slug} locale="en" />;
}
