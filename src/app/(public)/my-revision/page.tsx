import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MyRevisionDashboard } from "@/components/study/my-revision-dashboard";
import { getPublishedSubjects } from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "My Revision",
  description: "See your saved GCSE topic progress and get a clear next revision task on this device.",
  path: "/my-revision",
  noIndex: true,
});

export default function MyRevisionPage() {
  const subjects = getPublishedSubjects().map((subject) => ({ name: subject.name, slug: subject.slug, topics: subject.topics.map((topic) => ({ name: topic.name, slug: topic.slug, paper: topic.paper })) }));
  return <div><Navbar /><MyRevisionDashboard subjects={subjects} /><Footer /></div>;
}
