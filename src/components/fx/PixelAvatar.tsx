/**
 * Avatar pixel-art de Carlos: pelo oscuro con flequillo texturizado,
 * cejas gruesas, piel canela, mandíbula marcada, polo negro y un
 * AirPod como guiño (siempre en el gym). Parpadea cada ~5s
 * (desactivado con prefers-reduced-motion via .cxd-lids en globals).
 */

const GRID = [
  "......HHHHHHHH......",
  "....HHHHHHHHHHHH....",
  "...HHHHhHHHHhHHHH...",
  "..HHhHHHHHHHHHHhHH..",
  "..HHHHHhHHhHHHHHHH..",
  "..HHSSShHSShHSSSHH..",
  "..HSSSSSSSSSSSSSSH..",
  "..HSSSSSSSSSSSSSSH..",
  ".sHSBBBSSSSSSBBBSHs.",
  ".PHSSSSSSSSSSSSSSHC.",
  ".sHSBWBSSSSSSBWBSHs.",
  "..HSSSSSsSSsSSSSSH..",
  "..HsSSSSsSSsSSSSsH..",
  "..HsSSSSSssSSSSSsH..",
  "...sSSSSMMMMSSSSs...",
  "...sSSssssssssSSs...",
  "....sSSSSSSSSSSs....",
  ".....sSSSSSSSSs.....",
  "......TTSSSSTT......",
  "....TTTTSSSSTTTT....",
  "..TTTTTTTTTTTTTTTT..",
  ".TTTTTTtTTTTTTtTTT..",
];

const COLORS: Record<string, string> = {
  H: "#16110c", // pelo
  h: "#2c2115", // brillo del pelo
  S: "#c98a5e", // piel
  s: "#9c6741", // sombra de piel / barba incipiente
  B: "#171310", // cejas y ojos
  W: "#ffffff", // brillo del ojo
  M: "#9c5a45", // labios
  T: "#0d0d16", // polo negro
  t: "#1b1b2a", // brillo del polo
  P: "#f2f2f2", // AirPod
  C: "#00FFFF", // arete pixel (acento cyan)
};

const COLS = GRID[0].length;
const ROWS = GRID.length;

// celdas de los ojos (fila 10) que cubren los párpados al parpadear
const EYES: Array<[number, number]> = [
  [4, 10],
  [5, 10],
  [6, 10],
  [13, 10],
  [14, 10],
  [15, 10],
];

export default function PixelAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${COLS} ${ROWS}`}
      className={className}
      role="img"
      aria-label="Avatar pixel-art de Carlos Alvarez Ponce"
      style={{ shapeRendering: "crispEdges" }}
    >
      {GRID.flatMap((row, y) =>
        row.split("").map((ch, x) => {
          const fill = COLORS[ch];
          if (!fill) return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />;
        })
      )}
      {/* párpados: se muestran un instante durante el parpadeo */}
      <g className="cxd-lids">
        {EYES.map(([x, y]) => (
          <rect key={`lid-${x}-${y}`} x={x} y={y} width={1} height={1} fill={COLORS.S} />
        ))}
      </g>
    </svg>
  );
}
