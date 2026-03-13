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
    default: "GCSERevise - Free GCSE Revision for All UK Students",
    template: "%s | GCSERevise",
  },
  description:
    "Free GCSE revision planner, notes, quizzes and flashcards for every exam board and subject. Track your progress and ace your exams.",
  keywords: [
    "GCSE revision",
    "GCSE notes",
    "AQA GCSE",
    "Edexcel GCSE",
    "OCR GCSE",
    "GCSE past papers",
    "free revision",
    "GCSE planner",
  ],
  openGraph: {
    title: "GCSERevise - Free Revision for All UK Students",
    description:
      "Free personalised GCSE revision planner with notes, quizzes and progress tracking.",
    url: "https://gcserevise.co.uk",
    siteName: "GCSERevise",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "GCSERevise - Free GCSE Revision for All UK Students",
    description: "Free personalised GCSE revision planner with notes, quizzes and progress tracking.",
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
