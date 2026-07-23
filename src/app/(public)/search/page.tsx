import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SiteSearch } from "@/components/study/site-search";
import { getSearchIndex } from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Search GCSE Revision Topics & Flashcards",
  description: "Search GCSERevise topic notes, quizzes, key terms and flashcards across Maths, Science, English, Geography and History.",
  path: "/search",
});

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <div className="min-h-screen bg-slate-50"><Navbar /><section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:py-16"><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Search the library</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Find exactly what you need to revise.</h1><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">Search topic packs and key definitions across the whole GCSERevise library.</p></div></section><main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14"><SiteSearch items={getSearchIndex()} initialQuery={q.slice(0, 100)} /></main><Footer /></div>;
}
