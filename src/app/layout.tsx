import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlxs.dev"),
  title: "CARLXSDEV — Carlos Alvarez Ponce · Full Stack Developer",
  description:
    "Portfolio de Carlos Alvarez Ponce (bluexdev). Full Stack Developer · Founder @ XBLUE · AI / Automation · Lima, PE.",
  keywords: ["Carlos Alvarez Ponce", "bluexdev", "full stack", "Next.js", "FastAPI", "Lima"],
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "CARLXSDEV — Carlos Alvarez Ponce",
    description: "Full Stack Developer · Founder @ XBLUE · AI / Automation · Lima, PE.",
    url: "/",
    siteName: "CARLXSDEV",
    images: [{ url: "/og-carlxsdev-preview.png", width: 864, height: 504 }],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CARLXSDEV — Carlos Alvarez Ponce",
    description: "Full Stack Developer · Founder @ XBLUE · AI / Automation · Lima, PE.",
    images: ["/og-carlxsdev-preview.png"],
  },
  icons: {
    icon: "/icon",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Carlos Alvarez Ponce",
  alternateName: "CARLXSDEV",
  jobTitle: "Full Stack Developer",
  email: "mailto:carmm41@gmail.com",
  telephone: "+51938847564",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  url: "https://carlxs.dev",
  sameAs: ["https://github.com/bluexdev", "https://linkedin.com/in/carlos-alvarez-ponce"],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Automation",
    "AI APIs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${pressStart.variable} ${jetbrains.variable} ${geist.variable} antialiased`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
