"use client";

import { track } from "@vercel/analytics";

const OWNER_KEY = "cxd_analytics_owner";
let ownerSession = false;

type EventProps = Record<string, string | number | boolean>;

export function isOwnerVisit(): boolean {
  if (typeof window === "undefined") return false;

  const url = new URL(window.location.href);
  if (url.searchParams.get("owner") === "0" || url.searchParams.get("analytics") === "on") {
    ownerSession = false;
    return false;
  }

  if (url.searchParams.get("owner") === "1" || url.searchParams.get("analytics") === "off") {
    ownerSession = true;
    return true;
  }

  if (ownerSession) return true;

  if (document.cookie.includes(`${OWNER_KEY}=1`)) return true;

  try {
    return window.localStorage.getItem(OWNER_KEY) === "1";
  } catch {
    return false;
  }
}

export function syncOwnerModeFromUrl(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const ownerOff = url.searchParams.get("owner") === "0" || url.searchParams.get("analytics") === "on";
  const ownerMode = url.searchParams.get("owner") === "1" || url.searchParams.get("analytics") === "off";

  if (ownerOff) {
    ownerSession = false;
    document.cookie = `${OWNER_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
    try {
      window.localStorage.removeItem(OWNER_KEY);
    } catch {
      /* analytics reset remains best-effort */
    }
    return;
  }

  if (!ownerMode) return;

  ownerSession = true;
  document.cookie = `${OWNER_KEY}=1; Path=/; Max-Age=31536000; SameSite=Lax`;

  try {
    window.localStorage.setItem(OWNER_KEY, "1");
  } catch {
    /* analytics remains enabled if storage is unavailable */
  }
}

export function portfolioTrack(name: string, props?: EventProps): void {
  if (isOwnerVisit()) return;
  track(name, props);
}
