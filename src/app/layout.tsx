import type { Metadata, Viewport } from "next";
import { Syne, Noto_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const noto = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin", "greek"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Northbound — Crew trip board",
  description:
    "Shared itinerary for the crew: where we are each day, flights, and notes.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${noto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
