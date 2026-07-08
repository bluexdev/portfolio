"use client";

import { useEffect, useRef } from "react";
import { portfolioTrack } from "@/lib/analytics";

export default function TrackView({
  activeIdx,
  names,
  locale,
}: {
  activeIdx: number;
  names: string[];
  locale: string;
}) {
  const seen = useRef(new Set<string>());

  useEffect(() => {
    const section = names[activeIdx];
    if (!section || seen.current.has(section)) return;

    seen.current.add(section);
    portfolioTrack("Section Viewed", {
      section,
      locale,
    });
  }, [activeIdx, locale, names]);

  useEffect(() => {
    const timers = [30, 60, 120].map((seconds) =>
      window.setTimeout(() => {
        portfolioTrack("Engaged Visit", {
          seconds,
          locale,
        });
      }, seconds * 1000)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [locale]);

  return null;
}
