import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/seo/json-ld";
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
  title: {
    default: "GCSERevise - Notes, Quizzes, Flashcards & AI Tutor",
    template: "%s | GCSERevise",
  },
  description:
    "GCSE revision notes, quizzes, flashcards, past papers and an AI tutor for Maths, Biology, Chemistry, Physics, Geography and History.",
  keywords: [
    "GCSE revision",
    "GCSE notes",
    "AQA GCSE",
    "Edexcel GCSE",
    "OCR GCSE",
    "GCSE past papers",
    "GCSE AI tutor",
    "GCSE planner",
  ],
  openGraph: {
    title: "GCSERevise - Smarter GCSE Revision",
    description:
      "Notes, quizzes, flashcards, past papers and an AI tutor, organised around your GCSE topics.",
    url: "https://gcserevise.co.uk",
    siteName: "GCSERevise",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "GCSERevise - Smarter GCSE Revision",
    description: "Notes, quizzes, flashcards, past papers and an AI tutor for six core GCSE subjects.",
  },
  metadataBase: new URL("https://gcserevise.co.uk"),
  alternates: {
    canonical: "https://gcserevise.co.uk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebsiteJsonLd />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
