"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import BootScreen from "./BootScreen";
import BottomHud from "./BottomHud";
import MobileMenu from "./MobileMenu";
import PixelCursor from "./PixelCursor";
import TopBar from "./TopBar";
import Grain from "@/components/fx/Grain";
import Konami from "@/components/fx/Konami";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/portfolioConfig";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export interface TrackContextValue {
  names: string[];
  activeIdx: number;
  goTo: (i: number) => void;
  goToSection: (name: string) => void;
  /** desplaza el track a un offset absoluto en px */
  scrollToPx: (px: number) => void;
  /** offset izquierdo (px) de la sección i dentro del track */
  getOffset: (i: number) => number;
  /** re-mide el track (necesario al animar el acordeón de proyectos) */
  remeasure: () => void;
  /** bloquea ←/→ del track (mientras se juega Snake) */
  setKeysLocked: (locked: boolean) => void;
  soundOn: boolean;
  toggleSound: () => void;
  playBlip: (kind?: "nav" | "ok" | "fail") => void;
  xblue: boolean;
  toggleXblue: () => void;
  reduced: boolean;
}

const TrackContext = createContext<TrackContextValue | null>(null);

export function useTrack(): TrackContextValue {
  const ctx = useContext(TrackContext);
  if (!ctx) throw new Error("useTrack debe usarse dentro de <HorizontalTrack>");
  return ctx;
}

const LERP = 0.1;

export default function HorizontalTrack({
  names,
  locale,
  dict,
  soundInitiallyEnabled = false,
  children,
}: {
  names: string[];
  locale: Locale;
  dict: Dict;
  soundInitiallyEnabled?: boolean;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scroll = useRef({ target: 0, current: 0, max: 0, offsets: [] as number[] });
  const touch = useRef<{ x: number; y: number; base: number; axis: "x" | "y" | null } | null>(null);
  const keysLocked = useRef(false);
  const activeRef = useRef(0);
  const reducedRef = useRef(false);
  const exploredRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const namesRef = useRef(names);
  namesRef.current = names;

  const [activeIdx, setActiveIdx] = useState(0);
  const [xblue, setXblue] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [soundOn, setSoundOn] = useState(soundInitiallyEnabled);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const markExplored = useCallback(() => {
    if (exploredRef.current) return;
    exploredRef.current = true;
    setShowSwipeHint(false);
    try {
      localStorage.setItem("cxd_swipe_hint_seen", "1");
    } catch {
      /* sin persistencia */
    }
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    const offs: number[] = [];
    for (const child of Array.from(track.children) as HTMLElement[]) {
      offs.push(x);
      x += child.offsetWidth;
    }
    scroll.current.offsets = offs;
    scroll.current.max = Math.max(0, track.scrollWidth - window.innerWidth);
  }, []);

  const clamp = useCallback((v: number) => {
    return Math.max(0, Math.min(scroll.current.max, v));
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const o = scroll.current.offsets[i];
      if (o != null) {
        markExplored();
        scroll.current.target = clamp(o);
      }
    },
    [clamp, markExplored]
  );

  const goToSection = useCallback(
    (name: string) => goTo(namesRef.current.indexOf(name)),
    [goTo]
  );

  const scrollToPx = useCallback((px: number) => {
    scroll.current.target = clamp(px);
  }, [clamp]);

  const getOffset = useCallback((i: number) => scroll.current.offsets[i] ?? 0, []);

  const setKeysLocked = useCallback((locked: boolean) => {
    keysLocked.current = locked;
  }, []);

  const toggleXblue = useCallback(() => setXblue((v) => !v), []);
  const toggleSound = useCallback(() => setSoundOn((v) => !v), []);

  const playBlip = useCallback(
    (kind: "nav" | "ok" | "fail" = "nav") => {
      if (!soundOn || reducedRef.current) return;
      const AudioCtor = window.AudioContext ?? window.webkitAudioContext;
      if (!AudioCtor) return;
      const ctx = audioRef.current ?? new AudioCtor();
      audioRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      const freq = kind === "ok" ? 880 : kind === "fail" ? 160 : 520;
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    },
    [soundOn]
  );

  useEffect(() => {
    const red = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = red;
    setReduced(red);

    const vp = viewportRef.current;
    if (!vp) return;

    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      scroll.current.target = clamp(scroll.current.target + d);
      markExplored();
      e.preventDefault();
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touch.current = { x: t.clientX, y: t.clientY, base: scroll.current.target, axis: null };
    };
    const onTouchMove = (e: TouchEvent) => {
      const tc = touch.current;
      if (!tc) return;
      const t = e.touches[0];
      const dx = t.clientX - tc.x;
      const dy = t.clientY - tc.y;
      if (!tc.axis) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) tc.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        else return;
      }
      // lock de eje: los gestos verticales scrollean dentro de la sección
      if (tc.axis === "x") {
        scroll.current.target = clamp(tc.base - dx * 1.5);
        markExplored();
        e.preventDefault();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (keysLocked.current) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") {
        goTo(Math.min(namesRef.current.length - 1, activeRef.current + 1));
        markExplored();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        goTo(Math.max(0, activeRef.current - 1));
        markExplored();
        e.preventDefault();
      }
    };
    const onResize = () => {
      measure();
      scroll.current.target = clamp(scroll.current.target);
    };

    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    // medir tras montar y cuando carguen las fuentes (cambian anchos)
    const setup = () => {
      measure();
      // deep-link por hash: #proyectos, #arcade, …
      const hash = window.location.hash.replace("#", "").toUpperCase();
      const idx = namesRef.current.indexOf(hash);
      if (idx > 0) {
        const o = scroll.current.offsets[idx] ?? 0;
        scroll.current.target = clamp(o);
        scroll.current.current = scroll.current.target;
      }
    };
    const raf1 = requestAnimationFrame(() => requestAnimationFrame(setup));
    document.fonts?.ready?.then(() => measure()).catch(() => {});

    try {
      setShowSwipeHint(localStorage.getItem("cxd_swipe_hint_seen") !== "1");
    } catch {
      setShowSwipeHint(true);
    }

    // nudge inicial: a los 1.8s el track avanza 80px y regresa
    const nudgeT = window.setTimeout(() => {
      if (scroll.current.target === 0 && !reducedRef.current) {
        scroll.current.target = 80;
        window.setTimeout(() => {
          if (scroll.current.target === 80) scroll.current.target = 0;
        }, 620);
      }
    }, 1800);

    // loop principal: lerp + progreso + sección activa
    let raf = 0;
    const loop = () => {
      const s = scroll.current;
      s.current += (s.target - s.current) * LERP;
      if (Math.abs(s.target - s.current) < 0.4) s.current = s.target;
      const track = trackRef.current;
      if (track) track.style.transform = `translate3d(${-s.current}px,0,0)`;
      if (progressRef.current) {
        progressRef.current.style.width = (s.max > 0 ? (s.current / s.max) * 100 : 0) + "%";
      }
      const center = s.current + window.innerWidth / 2;
      let idx = 0;
      for (let i = 0; i < s.offsets.length; i++) {
        if (center >= s.offsets[i]) idx = i;
      }
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActiveIdx(idx);
        const slug = namesRef.current[idx]?.toLowerCase();
        if (slug) {
          const base = window.location.pathname + window.location.search;
          history.replaceState(null, "", idx === 0 ? base : `${base}#${slug}`);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf1);
      clearTimeout(nudgeT);
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [clamp, goTo, markExplored, measure]);

  const value = useMemo<TrackContextValue>(
    () => ({
      names,
      activeIdx,
      goTo,
      goToSection,
      scrollToPx,
      getOffset,
      remeasure: measure,
      setKeysLocked,
      soundOn,
      toggleSound,
      playBlip,
      xblue,
      toggleXblue,
      reduced,
    }),
    [
      names,
      activeIdx,
      goTo,
      goToSection,
      scrollToPx,
      getOffset,
      measure,
      setKeysLocked,
      soundOn,
      toggleSound,
      playBlip,
      xblue,
      toggleXblue,
      reduced,
    ]
  );

  return (
    <TrackContext.Provider value={value}>
      <div className="fixed inset-0 overflow-hidden bg-void font-body text-white">
        {/* fondo ambiente */}
        <div className="cx-ambient absolute inset-0 z-0" />
        <div className="cx-grid-bg absolute inset-0 z-0" />

        {/* viewport / track */}
        <div ref={viewportRef} className="absolute inset-0 z-[1] overflow-hidden">
          <div ref={trackRef} className="flex h-screen will-change-transform">
            {children}
          </div>
        </div>

        <Grain />

        {/* corner brackets */}
        <div className="pointer-events-none absolute left-4 top-4 z-[35] size-6 border-l-2 border-t-2 border-blue/55" />
        <div className="pointer-events-none absolute right-4 top-4 z-[35] size-6 border-r-2 border-t-2 border-blue/55" />
        <div className="pointer-events-none absolute bottom-4 left-4 z-[35] size-6 border-b-2 border-l-2 border-blue/55" />
        <div className="pointer-events-none absolute bottom-4 right-4 z-[35] size-6 border-b-2 border-r-2 border-blue/55" />

        {showSwipeHint && (
          <div className="pointer-events-none absolute bottom-[74px] left-1/2 z-[41] -translate-x-1/2 border border-cyan/55 bg-ink/88 px-4 py-3 text-center font-display text-[9px] leading-[1.8] text-cyan shadow-glow nav:bottom-[86px]">
            {dict.hud.swipeHint}
          </div>
        )}

        <TopBar locale={locale} />
        <BottomHud dict={dict} />

        {/* barra de progreso */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 z-[39] h-0.5 w-0 bg-gradient-to-r from-electric to-cyan shadow-[0_0_10px_rgba(0,255,255,.6)]"
        />

        <MobileMenu dict={dict} locale={locale} />
        <PixelCursor />
        <Konami />
        <BootScreen />
      </div>
    </TrackContext.Provider>
  );
}
