import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MistakeNotebook } from "@/components/study/mistake-notebook";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "My GCSE Mistake Notebook", description: "Review wrong quiz answers, explanations and the topics that need another attempt.", path: "/my-revision/mistakes", noIndex: true });

export default function MistakesPage() {
  return <div className="min-h-screen bg-slate-50"><Navbar /><section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">My revision</p><h1 className="mt-3 text-4xl font-black">Turn every mistake into a mark.</h1><p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">Wrong quiz answers are saved automatically. Revisit the explanation, repair the gap, then mark it secure.</p></div></section><main className="mx-auto max-w-5xl px-4 py-10 sm:px-6"><MistakeNotebook /></main><Footer /></div>;
}
