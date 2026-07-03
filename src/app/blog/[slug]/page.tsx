import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { getPost, getPostSlugs } from "@/lib/data";

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
  const post = await getPost(slug);
  if (!post) return { title: "Post no encontrado — CARLXSDEV" };
  return {
    title: `${post.title} — DEV_LOG · CARLXSDEV`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const body = post.body ?? [];
  const isPlainText = body.length > 0 && typeof body[0] === "string";

  return (
    <div className="cx-ambient min-h-screen">
      <div className="cx-grid-bg pointer-events-none fixed inset-0" />

      <main className="relative mx-auto max-w-[760px] px-5 py-[clamp(48px,8vh,80px)]">
        <Link
          href="/#blog"
          className="mb-10 inline-block font-mono text-[11px] tracking-[.16em] text-sky no-underline transition-colors hover:text-cyan"
        >
          ← VOLVER A DEV_LOG
        </Link>

        <div className="mb-5 flex flex-wrap items-center gap-2.5 font-mono text-[10px] tracking-[.1em] text-white/55">
          <span className="text-[15px] text-cyan">{post.glyph}</span>
          <span className="bg-sky px-[7px] py-[3px] font-bold text-ink">{post.tag}</span>
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mb-9 mt-0 font-display text-[clamp(17px,3.4vw,26px)] leading-[1.7] text-white">
          {post.title}
        </h1>

        <article className="flex flex-col gap-5 text-[15px] leading-[1.9] text-white/72">
          {isPlainText ? (
            (body as string[]).map((paragraph, i) => <p key={i} className="m-0">{paragraph}</p>)
          ) : (
            <PortableText value={body as PortableTextBlock[]} />
          )}
        </article>

        <div className="mt-14 border-t border-blue/18 pt-6 font-mono text-[10px] tracking-[.16em] text-white/30">
          © {new Date().getFullYear()} CARLOS ALVAREZ PONCE · CARLXSDEV
        </div>
      </main>
    </div>
  );
}
