import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, Dna, ExternalLink, FlaskConical, Microscope } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BreadcrumbJsonLd, LearningResourceJsonLd } from "@/components/seo/json-ld";
import { getSubject } from "@/data/revision-library";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AQA GCSE Combined Science: Trilogy Revision",
  description: "Revise AQA GCSE Combined Science: Trilogy with Biology, Chemistry and Physics topic packs, quizzes, flashcards, required-practical guidance and progress tracking.",
  path: "/subjects/aqa/combined-science",
});

const sciences = [
  { slug: "biology", label: "Biology", icon: Dna, tone: "bg-emerald-100 text-emerald-700" },
  { slug: "chemistry", label: "Chemistry", icon: FlaskConical, tone: "bg-amber-100 text-amber-700" },
  { slug: "physics", label: "Physics", icon: Atom, tone: "bg-violet-100 text-violet-700" },
];

export default function CombinedSciencePage() {
  const baseUrl = "https://gcserevise.co.uk";
  return <div className="min-h-screen bg-slate-50"><Navbar /><BreadcrumbJsonLd items={[{ name: "Home", url: baseUrl }, { name: "Subjects", url: `${baseUrl}/subjects` }, { name: "AQA", url: `${baseUrl}/subjects/aqa` }, { name: "Combined Science: Trilogy", url: `${baseUrl}/subjects/aqa/combined-science` }]} /><LearningResourceJsonLd name="AQA GCSE Combined Science: Trilogy revision" description="Biology, Chemistry and Physics topic revision for AQA GCSE Combined Science: Trilogy." provider="GCSERevise" url={`${baseUrl}/subjects/aqa/combined-science`} /><section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700"><Microscope className="h-7 w-7" /></div><p className="mt-5 text-xs font-black uppercase tracking-[.16em] text-indigo-600">AQA 8464 · Trilogy</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">GCSE Combined Science revision</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">One route through Biology, Chemistry and Physics. Open a topic pack, learn the core knowledge, test it and let your revision dashboard track the result.</p><div className="mt-6 flex flex-wrap gap-3"><a href="https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold">Official AQA Trilogy specification <ExternalLink className="h-4 w-4" /></a><Link href="/diagnostic" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white">Take a science diagnostic <ArrowRight className="h-4 w-4" /></Link></div></div></section><main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"><div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950"><strong>Check your exact specification:</strong> Combined Science content is taught across the same three sciences, but separate-science courses can include additional depth. Use the linked AQA 8464 specification and your teacher&apos;s topic list as the final scope.</div><div className="space-y-12">{sciences.map((science) => { const subject = getSubject(science.slug)!; return <section key={science.slug}><div className="mb-5 flex items-center gap-3"><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${science.tone}`}><science.icon className="h-5 w-5" /></div><div><h2 className="text-2xl font-black">{science.label}</h2><p className="text-sm text-slate-500">{subject.topics.length} structured topic packs</p></div></div><div className="grid gap-3 md:grid-cols-2">{subject.topics.map((topic) => <Link key={topic.slug} href={`/subjects/aqa/${science.slug}/${topic.slug}`} className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black ${science.tone}`}>{topic.orderIndex}</span><div className="min-w-0 flex-1"><h3 className="font-extrabold group-hover:text-indigo-600">{topic.name}</h3><p className="mt-1 text-xs text-slate-400">{topic.paper} · Spec {topic.specRef}</p></div><ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600" /></Link>)}</div></section>; })}</div></main><Footer /></div>;
}
