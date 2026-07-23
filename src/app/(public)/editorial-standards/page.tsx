import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "Editorial Standards & Content Method", description: "How GCSERevise creates, checks and updates GCSE revision notes, quizzes, flashcards and tutor guidance.", path: "/editorial-standards" });

export default function EditorialStandardsPage() {
  return <div className="min-h-screen bg-slate-50"><Navbar /><main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20"><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Trust and accuracy</p><h1 className="mt-3 text-4xl font-black tracking-tight">How GCSERevise content is built and reviewed.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Our aim is to turn exam-board subject content into clear retrieval practice without pretending that a short revision pack replaces lessons, textbooks or official specifications.</p><div className="mt-10 space-y-8">{[
    ["Specification alignment", "Every published topic is mapped to an AQA specification reference and links to the official subject-content page. Topic scope and terminology are checked against that source."],
    ["Learning design", "Each pack combines an overview, learning objectives, structured notes, common mistakes, active-recall prompts, flashcards and an auto-marked quiz. The sequence is designed to move from understanding to retrieval."],
    ["Question quality", "Questions must have one defensible answer, four distinct options and an explanation. Automated checks catch missing resources, duplicate options and invalid answer keys before deployment."],
    ["AI tutor boundaries", "Tutor answers are grounded in the selected topic pack. Learners are reminded to check important facts against notes and the linked specification. The tutor does not predict grades or replace a teacher."],
    ["Corrections and updates", "Topic pages display a review date. Annual exam-resource pages link to official sources because timetables, formula sheets and assessment materials can change. Material corrections are prioritised for the next release."],
  ].map(([title, text]) => <section key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">{title}</h2><p className="mt-3 leading-7 text-slate-600">{text}</p></section>)}</div><p className="mt-10 text-sm leading-7 text-slate-500">GCSERevise is independent and is not affiliated with or endorsed by AQA or another exam board. Official exam-board documents remain the authority.</p></main><Footer /></div>;
}
