import type { Metadata } from "next";

export const SITE_NAME = "GCSERevise";
export const SITE_URL = "https://gcserevise.co.uk";
export const DEFAULT_DESCRIPTION =
  "Free GCSE revision for Maths, English, Science, Geography, History, Business, Computer Science and Religious Studies, with notes, quizzes, flashcards and exam practice.";
export const SOCIAL_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "GCSERevise — Know what to revise. Remember it.",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : undefined,
  };
}
