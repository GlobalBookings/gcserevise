import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { DiagnosticCheck } from "@/components/study/diagnostic-check";
import { getPublishedSubjects, getRevisionContent } from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Free GCSE Revision Diagnostic", description: "Take a quick GCSE subject diagnostic to identify knowledge gaps and choose the highest-value topics to revise next.", path: "/diagnostic" });

export default function DiagnosticPage() {
  const subjects = getPublishedSubjects().map((subject) => ({ name: subject.name, slug: subject.slug, questions: subject.topics.slice(0, 5).map((topic) => ({ topicName: topic.name, topicSlug: topic.slug, question: getRevisionContent(subject.slug, topic.slug)!.questions[0] })) }));
  return <div className="min-h-screen bg-slate-50"><Navbar /><section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:py-16"><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Free five-minute diagnostic</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Find the gaps worth fixing first.</h1><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Answer five representative questions. You&apos;ll get a short, practical starting list—not a predicted grade.</p></div></section><main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14"><DiagnosticCheck subjects={subjects} /></main><Footer /></div>;
}
