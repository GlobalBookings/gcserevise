import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { LearnerSetup } from "@/components/study/learner-setup";
import { getPublishedSubjects } from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Set Up My GCSE Revision Plan", description: "Choose your subjects, target grade and available time to create a focused GCSE revision plan.", path: "/my-revision/setup", noIndex: true });

export default function SetupPage() {
  const subjects = getPublishedSubjects().map(({ name, slug }) => ({ name, slug }));
  return <div className="min-h-screen bg-slate-50"><Navbar /><section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-4 py-12 sm:px-6"><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Personalise GCSERevise</p><h1 className="mt-3 text-4xl font-black">Build a plan you can actually follow.</h1><p className="mt-3 text-lg text-slate-600">Tell us what you study and how much time you have. We&apos;ll prioritise weak, unfinished and overdue topics.</p></div></section><main className="mx-auto max-w-4xl px-4 py-10 sm:px-6"><LearnerSetup subjects={subjects} /></main><Footer /></div>;
}
