"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTrack } from "@/components/layout/HorizontalTrack";

const COLS = 22;
const ROWS = 16;
const START_SPEED = 130;
const MIN_SPEED = 72;
const TOKENS = ["TS", "PY", "JS", "DB", "AI", "{}", "SQL", "npm"];
const BEST_KEY = "cxd_snake_best";

interface Cell {
  x: number;
  y: number;
}

interface GameState {
  snake: Cell[];
  dir: Cell;
  nd: Cell;
  food: (Cell & { t: string }) | null;
  speed: number;
}

type Status = "idle" | "playing" | "over";

const DPAD_BTN =
  "cursor-pointer border border-blue/30 bg-panel-2 font-mono text-lg text-sky active:bg-electric active:text-white";

/**
 * SNAKE//DEV — tablero 22×16, comida = tokens de stack (+10 pts,
 * acelera cada 50). Flechas/WASD/D-pad; SPACE inicia, ESC sale.
 * BEST persistido en localStorage.
 */
export default function SnakeGame({ index }: { index: number }) {
  const { activeIdx, xblue, setKeysLocked, reduced } = useTrack();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const game = useRef<GameState | null>(null);
  const grid = useRef({ cols: COLS, rows: ROWS, cell: 20 });
  const timer = useRef<number | undefined>(undefined);
  const scoreRef = useRef(0);
  const statusRef = useRef<Status>("idle");
  const xblueRef = useRef(false);
  const activeRef = useRef(activeIdx);
  statusRef.current = status;
  xblueRef.current = xblue;
  activeRef.current = activeIdx;

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const { cell, cols, rows } = grid.current;
    const W = c.width;
    const H = c.height;
    ctx.fillStyle = "#05050c";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(0,128,255,0.07)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cell + 0.5, 0);
      ctx.lineTo(x * cell + 0.5, H);
      ctx.stroke();
    }
    for (let y = 0; y <= rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cell + 0.5);
      ctx.lineTo(W, y * cell + 0.5);
      ctx.stroke();
    }
    const g = game.current;
    if (!g) return;
    if (g.food) {
      ctx.save();
      ctx.shadowColor = "#00FFFF";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#00FFFF";
      ctx.fillRect(g.food.x * cell + cell * 0.16, g.food.y * cell + cell * 0.16, cell * 0.68, cell * 0.68);
      ctx.restore();
      ctx.fillStyle = "#05050c";
      // ctx.font no acepta var(): se lee la familia real de next/font desde el body
      const fam =
        getComputedStyle(document.body).getPropertyValue("--font-jb").trim() ||
        '"JetBrains Mono", monospace';
      ctx.font = `700 ${Math.floor(cell * 0.34)}px ${fam}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(g.food.t, g.food.x * cell + cell / 2, g.food.y * cell + cell / 2 + 1);
    }
    g.snake.forEach((s, i) => {
      const head = i === 0;
      ctx.save();
      if (head) {
        ctx.shadowColor = "#00BFFF";
        ctx.shadowBlur = 12;
      }
      const t = i / g.snake.length;
      ctx.fillStyle = xblueRef.current
        ? `hsl(${(performance.now() / 12 + i * 24) % 360 | 0},100%,60%)`
        : head
          ? "#7CF6FF"
          : `hsl(${200 - t * 40},100%,${58 - t * 16}%)`;
      ctx.fillRect(s.x * cell + 1, s.y * cell + 1, cell - 2, cell - 2);
      ctx.restore();
    });
  }, []);

  const spawnFood = useCallback(() => {
    const g = game.current;
    if (!g) return;
    const { cols, rows } = grid.current;
    let p: Cell;
    do {
      p = { x: (Math.random() * cols) | 0, y: (Math.random() * rows) | 0 };
    } while (g.snake.some((s) => s.x === p.x && s.y === p.y));
    g.food = { ...p, t: TOKENS[(Math.random() * TOKENS.length) | 0] };
  }, []);

  const endGame = useCallback(() => {
    clearInterval(timer.current);
    timer.current = undefined;
    setKeysLocked(false);
    // juice: shake del tablero + flash rojo (240ms aprox)
    if (!reduced) {
      const c = canvasRef.current;
      const ctx = c?.getContext("2d");
      if (c && ctx) {
        ctx.fillStyle = "rgba(255,77,109,0.28)";
        ctx.fillRect(0, 0, c.width, c.height);
      }
      const box = frameRef.current;
      if (box) {
        let n = 0;
        const sh = window.setInterval(() => {
          n++;
          box.style.transform =
            n >= 6 ? "" : `translate(${(Math.random() - 0.5) * 9}px,${(Math.random() - 0.5) * 9}px)`;
          if (n >= 6) clearInterval(sh);
        }, 40);
      }
    }
    setBest((prev) => {
      const b = Math.max(prev, scoreRef.current);
      try {
        localStorage.setItem(BEST_KEY, String(b));
      } catch {
        /* sin persistencia */
      }
      return b;
    });
    setStatus("over");
  }, [reduced, setKeysLocked]);

  const step = useCallback(() => {
    const g = game.current;
    if (!g) return;
    const { cols, rows } = grid.current;
    g.dir = g.nd;
    const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= cols ||
      head.y >= rows ||
      g.snake.some((s) => s.x === head.x && s.y === head.y)
    ) {
      endGame();
      return;
    }
    g.snake.unshift(head);
    if (g.food && head.x === g.food.x && head.y === g.food.y) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      spawnFood();
      // acelera cada 50 pts
      if (g.speed > MIN_SPEED && scoreRef.current % 50 === 0) {
        g.speed -= 8;
        clearInterval(timer.current);
        timer.current = window.setInterval(step, g.speed);
      }
    } else {
      g.snake.pop();
    }
    draw();
  }, [draw, endGame, spawnFood]);

  const setDir = useCallback((x: number, y: number) => {
    const g = game.current;
    if (!g) return;
    if (g.dir.x === -x && g.dir.y === -y) return; // no reversa
    g.nd = { x, y };
  }, []);

  const start = useCallback(() => {
    game.current = {
      snake: [
        { x: 6, y: 8 },
        { x: 5, y: 8 },
        { x: 4, y: 8 },
      ],
      dir: { x: 1, y: 0 },
      nd: { x: 1, y: 0 },
      food: null,
      speed: START_SPEED,
    };
    spawnFood();
    scoreRef.current = 0;
    setScore(0);
    setStatus("playing");
    setKeysLocked(true);
    clearInterval(timer.current);
    timer.current = window.setInterval(step, START_SPEED);
    draw();
  }, [draw, setKeysLocked, spawnFood, step]);

  // best desde localStorage
  useEffect(() => {
    try {
      const b = parseInt(localStorage.getItem(BEST_KEY) ?? "0", 10);
      if (b) setBest(b);
    } catch {
      /* sin localStorage */
    }
  }, []);

  // dimensionar el tablero
  useEffect(() => {
    const size = () => {
      const c = canvasRef.current;
      const box = boardRef.current;
      if (!c || !box) return;
      const cw = box.clientWidth - 40;
      const ch = box.clientHeight - 130;
      const cell = Math.max(11, Math.floor(Math.min(cw / COLS, ch / ROWS)));
      grid.current = { cols: COLS, rows: ROWS, cell };
      c.width = COLS * cell;
      c.height = ROWS * cell;
      c.style.width = `${COLS * cell}px`;
      c.style.height = `${ROWS * cell}px`;
      draw();
    };
    const raf = requestAnimationFrame(size);
    window.addEventListener("resize", size);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, [draw]);

  // teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeRef.current !== index) return;
      const k = e.key;
      if (statusRef.current === "playing") {
        if (k === "ArrowUp" || k === "w" || k === "W") {
          setDir(0, -1);
          e.preventDefault();
        } else if (k === "ArrowDown" || k === "s" || k === "S") {
          setDir(0, 1);
          e.preventDefault();
        } else if (k === "ArrowLeft" || k === "a" || k === "A") {
          setDir(-1, 0);
          e.preventDefault();
        } else if (k === "ArrowRight" || k === "d" || k === "D") {
          setDir(1, 0);
          e.preventDefault();
        } else if (k === "Escape") {
          endGame();
        }
        return;
      }
      if (k === " " || k === "Enter") {
        start();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, setDir, endGame, start]);

  // limpiar al desmontar
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
      setKeysLocked(false);
    };
  }, [setKeysLocked]);

  return (
    <div className="m-auto flex w-full max-w-[1160px] flex-wrap items-center justify-center gap-[clamp(28px,5vw,70px)]">
      {/* columna de info */}
      <div className="min-w-0 max-w-[400px] flex-[1_1_300px]">
        <div className="cx-label mb-4">{"// ARCADE.EXE"}</div>
        <h2 className="mb-[22px] mt-0 font-display text-[clamp(18px,3vw,34px)] leading-normal text-white">
          SNAKE<span className="text-sky">{"//"}</span>DEV
        </h2>
        <p className="mb-[26px] mt-0 text-[15px] leading-[1.8] text-white/60">
          La culebra come <strong className="font-semibold text-cyan">tokens de stack</strong>. Cada
          uno suma 10 pts y acelera el juego. No choques con los muros ni contigo mismo.
        </p>
        <div className="mb-6 flex gap-3.5">
          <div className="flex-1 border border-blue/25 bg-panel-2 px-4 py-3.5">
            <div className="mb-2 font-mono text-[10px] tracking-[.16em] text-white/40">SCORE</div>
            <div className="font-display text-xl text-cyan [text-shadow:0_0_16px_rgba(0,255,255,.5)]">
              {score}
            </div>
          </div>
          <div className="flex-1 border border-blue/25 bg-panel-2 px-4 py-3.5">
            <div className="mb-2 font-mono text-[10px] tracking-[.16em] text-white/40">BEST</div>
            <div className="font-display text-xl text-blue">{best}</div>
          </div>
        </div>
        <div className="font-mono text-[11px] leading-loose tracking-[.08em] text-white/40">
          <div>↑ ↓ ← →&nbsp;&nbsp;/&nbsp;&nbsp;W A S D&nbsp;&nbsp;·&nbsp;&nbsp;D-PAD MÓVIL</div>
          <div>SPACE&nbsp;&nbsp;INICIAR&nbsp;&nbsp;·&nbsp;&nbsp;ESC&nbsp;&nbsp;SALIR</div>
        </div>
      </div>

      {/* tablero */}
      <div
        ref={boardRef}
        className="flex min-h-[54vh] flex-[1_1_360px] flex-col items-center justify-center gap-[18px]"
      >
        <div
          ref={frameRef}
          className="relative border border-blue/30 bg-ink p-3.5 shadow-[8px_8px_0_rgba(0,0,0,.5),0_0_40px_rgba(0,128,255,.12)]"
        >
          <canvas ref={canvasRef} className="block [image-rendering:pixelated]" />
          {status === "idle" && (
            <div className="absolute inset-3.5 flex flex-col items-center justify-center gap-[22px] bg-ink/82 text-center">
              <div className="font-display text-[13px] leading-[1.7] text-sky">
                INSERT
                <br />
                COIN
              </div>
              <button
                onClick={start}
                className="animate-pulse-cta cursor-pointer border-none bg-cyan px-[26px] py-3.5 font-mono text-[13px] font-bold tracking-[.16em] text-ink shadow-[0_0_24px_rgba(0,255,255,.5)]"
              >
                ▶ PRESS START
              </button>
            </div>
          )}
          {status === "over" && (
            <div className="absolute inset-3.5 flex flex-col items-center justify-center gap-[18px] bg-ink/85 text-center">
              <div className="font-display text-[15px] leading-[1.6] text-danger [text-shadow:0_0_18px_rgba(255,77,109,.5)]">
                GAME
                <br />
                OVER
              </div>
              <div className="font-mono text-xs text-white">
                SCORE <span className="text-cyan">{score}</span>&nbsp;·&nbsp;BEST{" "}
                <span className="text-blue">{best}</span>
              </div>
              <button
                onClick={start}
                className="cursor-pointer border-none bg-cyan px-[22px] py-3 font-mono text-xs font-bold tracking-[.14em] text-ink shadow-[0_0_22px_rgba(0,255,255,.5)]"
              >
                ↻ REINTENTAR
              </button>
            </div>
          )}
        </div>

        {/* D-pad táctil (48px, touch target AA) */}
        <div className="grid grid-cols-[repeat(3,48px)] grid-rows-[repeat(2,48px)] gap-1.5">
          <span />
          <button onClick={() => setDir(0, -1)} aria-label="Arriba" className={DPAD_BTN}>
            ↑
          </button>
          <span />
          <button onClick={() => setDir(-1, 0)} aria-label="Izquierda" className={DPAD_BTN}>
            ←
          </button>
          <button onClick={() => setDir(0, 1)} aria-label="Abajo" className={DPAD_BTN}>
            ↓
          </button>
          <button onClick={() => setDir(1, 0)} aria-label="Derecha" className={DPAD_BTN}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
