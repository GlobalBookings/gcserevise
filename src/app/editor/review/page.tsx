import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { EditorialReviewQueue } from "@/components/editor/editorial-review-queue";
import { getPublishedSubjects, getRevisionContent } from "@/data/revision-library";
import { hasEditorAccess } from "@/lib/editor-access";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Content Review | GCSERevise", robots: { index: false, follow: false } };

export default async function EditorReviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  if (!hasEditorAccess(user)) notFound();
  const items = getPublishedSubjects().flatMap((subject) => subject.topics.map((topic) => ({ subjectName: subject.name, subjectSlug: subject.slug, topicName: topic.name, topicSlug: topic.slug, reviewedAt: getRevisionContent(subject.slug, topic.slug)!.reviewedAt })));
  return <div className="min-h-screen bg-slate-50"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6"><Link href="/" className="text-lg font-black">GCSERevise <span className="text-indigo-600">Editor</span></Link><nav className="flex gap-4 text-sm font-bold"><Link href="/editor/review" className="text-indigo-600">Content review</Link><Link href="/editor/analytics">Analytics</Link></nav></div></header><main className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><h1 className="text-4xl font-black">Editorial review queue</h1><p className="mt-3 max-w-2xl text-slate-600">Review specification alignment, accuracy, clarity, question validity and worked-answer quality. Decisions are stored separately from version-controlled content.</p><div className="mt-8"><EditorialReviewQueue items={items} /></div></main></div>;
}
