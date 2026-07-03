import type { Metadata } from "next";
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
  title: "CARLXSDEV — Carlos Alvarez Ponce · Full Stack Developer",
  description:
    "Portfolio de Carlos Alvarez Ponce (bluexdev). Full Stack Developer · Founder @ XBLUE · AI / Automation · Lima, PE.",
  keywords: ["Carlos Alvarez Ponce", "bluexdev", "full stack", "Next.js", "FastAPI", "Lima"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${pressStart.variable} ${jetbrains.variable} ${geist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
