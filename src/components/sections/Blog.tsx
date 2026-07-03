import Link from "next/link";
import RevealStagger from "@/components/fx/RevealStagger";
import type { Post } from "@/lib/types";

export default function Blog({ index, posts }: { index: number; posts: Post[] }) {
  return (
    <section className="cx-section py-[clamp(82px,11vh,104px)]">
      <RevealStagger index={index} className="m-auto w-full max-w-[1200px]">
        <div className="mb-[30px]">
          <div className="cx-label mb-4">{"// BLOG"}</div>
          <h2 className="m-0 font-display text-[clamp(20px,3.4vw,40px)] text-white">
            DEV<span className="text-sky">_</span>LOG
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex cursor-pointer flex-col border border-blue/20 bg-panel p-6 no-underline shadow-pixel transition-all duration-200 hover:border-sky/55 hover:shadow-[6px_6px_0_rgba(0,0,0,.5),0_0_28px_rgba(0,128,255,.18)]"
            >
              <div className="mb-[18px] flex items-center gap-2.5 font-mono text-[10px] tracking-[.1em] text-white/55">
                <span className="text-[15px] text-cyan">{post.glyph}</span>
                <span className="bg-sky px-[7px] py-[3px] font-bold text-ink">{post.tag}</span>
                <span>{post.publishedAt}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mb-4 mt-0 font-display text-xs leading-[1.7] text-white">
                {post.title}
              </h3>
              <p className="mb-[22px] mt-0 flex-1 text-sm leading-[1.75] text-white/58">
                {post.excerpt}
              </p>
              <div className="font-mono text-[11px] tracking-[.14em] text-cyan">LEER →</div>
            </Link>
          ))}
        </div>
      </RevealStagger>
    </section>
  );
}
