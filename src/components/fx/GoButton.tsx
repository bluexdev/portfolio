"use client";

import type { ReactNode } from "react";
import { useTrack } from "@/components/layout/HorizontalTrack";
import { portfolioTrack } from "@/lib/analytics";

/** Botón que navega a una sección por nombre (los índices varían si hay secciones opcionales ocultas). */
export default function GoButton({
  section,
  className,
  children,
  eventLabel,
}: {
  section: string;
  className?: string;
  children: ReactNode;
  eventLabel?: string;
}) {
  const { goToSection, playBlip } = useTrack();
  return (
    <button
      onClick={() => {
        playBlip("nav");
        portfolioTrack("Hero CTA Click", { target: eventLabel ?? section, section });
        goToSection(section);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
