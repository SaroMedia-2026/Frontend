import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SaroLoader } from "./components/SaroLoader";
import { CustomCursor } from "./components/CustomCursor";
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
    default: "Saro | Performance Marketing Agency",
    template: "%s | Saro",
  },
  description:
    "Saro helps brands scale with conversion-focused paid media, creative testing, and full-funnel growth strategy.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      </body>
    </html>
  );
}
