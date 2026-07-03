/** Overlays retro: viñeta, grano y scanlines (estáticos, sin JS). */
export default function Grain() {
  return (
    <>
      <div className="cx-vignette pointer-events-none absolute inset-0 z-30" />
      <div className="cx-noise pointer-events-none absolute inset-0 z-30" />
      <div className="cx-scanlines pointer-events-none absolute inset-0 z-30" />
    </>
  );
}
