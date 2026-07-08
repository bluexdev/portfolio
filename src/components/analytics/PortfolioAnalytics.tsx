"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { useEffect } from "react";
import { isOwnerVisit, syncOwnerModeFromUrl } from "@/lib/analytics";

export default function PortfolioAnalytics() {
  useEffect(() => {
    syncOwnerModeFromUrl();
  }, []);

  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        if (isOwnerVisit()) return null;
        return event;
      }}
    />
  );
}
