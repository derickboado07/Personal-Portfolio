import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/ui/motion-provider";
import { StartupLoader } from "@/components/ui/startup-loader";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { themeInitScript } from "@/lib/theme";
import { profile, site } from "@/data/portfolio";
import { brandingAssets } from "@/lib/branding";
import "./globals.css";
import "@/components/ui/app-experience.css";
import "@/components/ui/theme.css";
import "@/components/ui/readability.css";

const plex = localFont({ src: "./fonts/ibm-plex-sans-latin-wght-normal.woff2", variable: "--font-plex", weight: "100 700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | DBCreates" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: profile.name }],
  keywords: ["DBCreates", "Mark Frederick Boado", "Derick Boado", "web developer", "software developer", "Power BI", "business analytics", "video editor", "Caloocan City", "Philippines", "portfolio"],
  openGraph: { title: site.title, description: site.description, url: "/", type: "website", locale: "en_PH", siteName: site.name, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Derick Boado — Code, Data & Creativity" }] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      ...(brandingAssets.faviconPng ? [{ url: brandingAssets.faviconPng, type: "image/png" }] : []),
      ...(brandingAssets.faviconIco ? [{ url: brandingAssets.faviconIco, type: "image/x-icon" }] : []),
      ...(!brandingAssets.faviconPng && !brandingAssets.faviconIco ? [{ url: "/assets/legacy-icon.svg", type: "image/svg+xml" }] : []),
    ],
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B1220" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={plex.variable} suppressHydrationWarning>
    <body>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <noscript><style>{`
        .app-loader, .loading-screen, .theme-toggle, .menu-toggle { display: none !important; }
        @layer base { body > div[hidden][id^="S:"] { display: contents !important; } }
        .identity-role > span { opacity: 1 !important; transform: none !important; }
      `}</style></noscript>
      <StartupLoader><LoadingScreen /></StartupLoader>
      <MotionProvider>{children}</MotionProvider>
    </body>
  </html>;
}
