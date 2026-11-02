import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/ui/motion-provider";
import { profile, site } from "@/data/portfolio";
import "./globals.css";

const plex = localFont({ src: "./fonts/ibm-plex-sans-latin-wght-normal.woff2", variable: "--font-plex", weight: "100 700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Derick Boado" },
  description: site.description,
  applicationName: "Derick Boado Portfolio",
  authors: [{ name: profile.name }],
  keywords: ["Mark Frederick Boado", "Derick Boado", "web developer", "software developer", "Power BI", "business analytics", "video editor", "Caloocan City", "Philippines", "portfolio"],
  openGraph: { title: site.title, description: site.description, type: "website", locale: "en_PH", siteName: profile.displayName, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Derick Boado — Code, Data & Creativity" }] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B0F19" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={plex.variable}><body><MotionProvider>{children}</MotionProvider></body></html>;
}
