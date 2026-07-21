import type { MetadataRoute } from "next";
import { getPublishedSubjects } from "@/data/revision-library";

const BASE_URL = "https://gcserevise.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/subjects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/past-papers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/my-revision`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
  for (const subject of getPublishedSubjects()) {
    pages.push({ url: `${BASE_URL}/subjects/aqa/${subject.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 });
    for (const topic of subject.topics) pages.push({ url: `${BASE_URL}/subjects/aqa/${subject.slug}/${topic.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 });
  }
  return pages;
}
