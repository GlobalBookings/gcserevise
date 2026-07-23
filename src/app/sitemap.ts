import type { MetadataRoute } from "next";
import { getPublishedSubjects } from "@/data/revision-library";

const BASE_URL = "https://gcserevise.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentReviewed = new Date("2026-07-23T12:00:00Z");
  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: contentReviewed, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/subjects`, lastModified: contentReviewed, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/past-papers`, lastModified: contentReviewed, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/search`, lastModified: contentReviewed, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/diagnostic`, lastModified: contentReviewed, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/exam-resources`, lastModified: contentReviewed, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/premium`, lastModified: contentReviewed, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/editorial-standards`, lastModified: contentReviewed, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/subjects/aqa/combined-science`, lastModified: contentReviewed, changeFrequency: "weekly", priority: 0.95 },
  ];
  for (const subject of getPublishedSubjects()) {
    pages.push({ url: `${BASE_URL}/subjects/aqa/${subject.slug}`, lastModified: contentReviewed, changeFrequency: "weekly", priority: 0.9 });
    for (const topic of subject.topics) pages.push({ url: `${BASE_URL}/subjects/aqa/${subject.slug}/${topic.slug}`, lastModified: contentReviewed, changeFrequency: "monthly", priority: 0.8 });
  }
  return pages;
}
