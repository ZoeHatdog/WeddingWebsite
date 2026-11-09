import type { Metadata, Viewport } from "next";
import { Sorts_Mill_Goudy } from "next/font/google";
import "./tokens.css";
import "./globals.css";

const goudy = Sorts_Mill_Goudy({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-goudy",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "Javes & Janel · April 26, 2027",
  description:
    "Save the date: Javes and Janel are getting married on April 26, 2027 at Lakehall at Nena’s Sanctuary, Cabuyao, Laguna.",
  openGraph: {
    title: "Javes & Janel · Save the date",
    description: "April 26, 2027 · Lakehall at Nena’s Sanctuary, Cabuyao, Laguna",
    images: ["/assets/hero-art-sm.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#eef7fd",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={goudy.variable}>
      <body>{children}</body>
    </html>
  );
}
