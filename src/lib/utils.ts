/** Une clases condicionales sin dependencia externa */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** 1 → "01" */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Hash determinista de string → entero (para seeds de previews) */
export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** "2026-05-18T…" → "2026.05.18" */
export function formatPixelDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getUTCFullYear()}.${pad2(d.getUTCMonth() + 1)}.${pad2(d.getUTCDate())}`;
}
