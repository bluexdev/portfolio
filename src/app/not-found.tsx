import Link from "next/link";

export default function NotFound() {
  return (
    <main className="cx-ambient flex min-h-screen items-center justify-center px-5 text-center text-white">
      <div className="cx-grid-bg pointer-events-none fixed inset-0" />
      <section className="relative max-w-[720px]">
        <div className="mb-5 font-mono text-[11px] tracking-[.35em] text-danger">ERROR 404</div>
        <h1 className="m-0 font-display text-[clamp(24px,6vw,54px)] leading-[1.45] text-white">
          GAME OVER
        </h1>
        <p className="mx-auto mb-8 mt-5 max-w-[560px] font-mono text-sm leading-[1.9] text-white/58">
          PAGINA NO ENCONTRADA
        </p>
        <Link
          href="/"
          className="inline-block border border-cyan bg-cyan px-6 py-4 font-mono text-xs font-bold tracking-[.16em] text-ink no-underline shadow-glow"
        >
          [ CONTINUE? ]
        </Link>
      </section>
    </main>
  );
}
