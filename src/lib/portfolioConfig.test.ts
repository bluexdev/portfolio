import { describe, expect, it } from "vitest";
import type { HomeData } from "./types";
import {
  getVisibleSections,
  isCvDownloadEnabled,
  localizeHomeData,
  normalizeSiteSettings,
  whatsappUrl,
} from "./portfolioConfig";

const baseHome: HomeData = {
  projects: [
    {
      id: "blujoy",
      name: "BluJoy",
      tag: "E-COMMERCE",
      status: "PRODUCCIÓN",
      summary: "Resumen ES",
      summaryEn: "English summary",
      bullets: ["Uno"],
      bulletsEn: ["One"],
      stack: ["Next.js"],
      hasDetail: true,
      longDesc: "Detalle ES",
      longDescEn: "English detail",
      features: ["Característica"],
      featuresEn: ["Feature"],
      metrics: [{ k: "ROL", v: "Full-stack" }],
      impactMetrics: [{ k: "LCP", v: "1.2s" }],
      repoUrl: "https://github.com/bluexdev",
      previewVariant: "shop",
      hue: 222,
      seed: 7,
    },
  ],
  posts: [],
  experience: [],
  achievements: [],
  settings: {
    availabilityText: "Disponible",
    availabilityTextEn: "Available",
    email: "carlos@example.com",
    phone: "+51 938 847 564",
    phoneDisplay: "+51 938 847 564",
    github: "https://github.com/bluexdev",
    linkedin: "https://linkedin.com/in/carlos",
    location: "Lima, Perú",
    locationEn: "Lima, Peru",
    showBlog: false,
    showTrayecto: true,
    showCv: true,
    cvUrl: "/carlos-alvarez-ponce-cv.pdf",
    showProjectMetrics: false,
    soundEnabled: false,
  },
};

describe("portfolioConfig", () => {
  it("normalizes feature flags to safe conversion defaults", () => {
    const settings = normalizeSiteSettings({
      email: "carlos@example.com",
      phone: "+51 938 847 564",
      github: "https://github.com/bluexdev",
      linkedin: "https://linkedin.com/in/carlos",
      location: "Lima, Perú",
    });

    expect(settings.phone).toBe("+51938847564");
    expect(settings.phoneDisplay).toBe("+51 938 847 564");
    expect(settings.showBlog).toBe(false);
    expect(settings.showProjectMetrics).toBe(false);
    expect(settings.soundEnabled).toBe(false);
    expect(isCvDownloadEnabled(settings)).toBe(false);
  });

  it("builds direct WhatsApp and CV actions only when enabled", () => {
    expect(whatsappUrl(baseHome.settings)).toBe(
      "https://wa.me/51938847564?text=Hola%20Carlos%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20conversar%20contigo%20sobre%20una%20oportunidad%20o%20proyecto."
    );
    expect(isCvDownloadEnabled(baseHome.settings)).toBe(true);
    expect(
      isCvDownloadEnabled({ ...baseHome.settings, showCv: false, cvUrl: "/cv.pdf" })
    ).toBe(false);
    expect(isCvDownloadEnabled({ ...baseHome.settings, showCv: true, cvUrl: "" })).toBe(false);
  });

  it("keeps optional sections and project impact metrics hidden by default", () => {
    expect(getVisibleSections(baseHome.settings, "es")).toEqual([
      "INICIO",
      "PERFIL",
      "TRAYECTO",
      "STACK",
      "PROYECTOS",
      "ARCADE",
      "CONTACTO",
    ]);
    expect(localizeHomeData(baseHome, "es").projects[0].visibleMetrics).toEqual([]);
  });

  it("localizes section names and content when English fields exist", () => {
    const localized = localizeHomeData(baseHome, "en");

    expect(getVisibleSections(localized.settings, "en")).toContain("PROJECTS");
    expect(localized.settings.availabilityText).toBe("Available");
    expect(localized.settings.location).toBe("Lima, Peru");
    expect(localized.projects[0].summary).toBe("English summary");
    expect(localized.projects[0].bullets).toEqual(["One"]);
    expect(localized.projects[0].visibleMetrics).toEqual([]);
  });
});
