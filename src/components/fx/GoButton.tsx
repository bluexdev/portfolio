"use client";

import type { ReactNode } from "react";
import { useTrack } from "@/components/layout/HorizontalTrack";

/** Botón que navega a una sección por nombre (los índices varían si hay secciones opcionales ocultas). */
export default function GoButton({
  section,
  className,
  children,
}: {
  section: string;
  className?: string;
  children: ReactNode;
}) {
  const { goToSection } = useTrack();
  return (
    <button onClick={() => goToSection(section)} className={className}>
      {children}
    </button>
  );
}
