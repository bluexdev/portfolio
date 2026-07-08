"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { portfolioTrack } from "@/lib/analytics";

type AnchorProps = Omit<ComponentProps<"a">, "href" | "onClick">;
type LinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick">;

type AnalyticsLinkProps = (AnchorProps | LinkProps) & {
  href: string;
  event: string;
  eventProps?: Record<string, string | number | boolean>;
  children: ReactNode;
  useNextLink?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function AnalyticsLink({
  href,
  event,
  eventProps,
  children,
  useNextLink = false,
  onClick,
  ...props
}: AnalyticsLinkProps) {
  const handleClick = (clickEvent: MouseEvent<HTMLAnchorElement>) => {
    portfolioTrack(event, eventProps);
    onClick?.(clickEvent);
  };

  if (useNextLink) {
    return (
      <Link href={href} onClick={handleClick} {...(props as LinkProps)}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...(props as AnchorProps)}>
      {children}
    </a>
  );
}
