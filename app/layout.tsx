import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SaroLoader } from "./components/SaroLoader";
import { CustomCursor } from "./components/CustomCursor";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saromedia.com.np"),
  title: {
    default: "Saro Media | Premier Performance Marketing & Creative Production Agency",
    template: "%s | Saro Media",
  },
  description:
    "Saro Media is a full-service performance marketing and creative production agency in Nepal. We scale brands through high-converting paid media, visual storytelling, and digital growth strategy.",
  keywords: [
    "Saro Media",
    "Digital Marketing Agency Nepal",
    "Performance Marketing Kathmandu",
    "Creative Production",
    "Social Media Advertising",
    "Video Production Nepal",
    "Brand Strategy",
    "Paid Media Management",
  ],
  authors: [{ name: "Saro Media", url: "https://saromedia.com.np" }],
  creator: "Saro Media",
  publisher: "Saro Media",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saromedia.com.np",
    siteName: "Saro Media",
    title: "Saro Media | Performance Marketing & Creative Production",
    description:
      "Transforming brands into digital legacies. Data-driven growth marketing, premium video production, and high-converting campaigns.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Saro Media Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saro Media | Performance Marketing & Creative Production",
    description: "Scale your brand with conversion-focused paid media, creative testing, and full-funnel digital growth.",
    images: ["/logo.png"],
  },
  verification: {
    google: "google4680079702dca3d1",
  },
  other: {
    "google-site-verification": "google4680079702dca3d1",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full bg-white text-slate-900">
        <SaroLoader />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
