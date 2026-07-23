import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, GraduationCap, PenLine, Timer, Trophy } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PastPaperTracker } from "@/components/study/past-paper-tracker";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AQA GCSE Past Papers & Mark Schemes",
  description: "Find official AQA GCSE past papers and mark schemes for Maths, Science, English, Geography and History, with a simple practice tracker.",
  path: "/past-papers",
});

const subjects = [
  { name: "Combined Science", slug: "combined-science", description: "Six Trilogy papers across Biology, Chemistry and Physics, with Foundation and Higher resources.", url: "https://www.aqa.org.uk/subjects/science/gcse/science-8464/assessment-resources" },
  { name: "Maths", slug: "maths", description: "Foundation and Higher papers 1, 2 and 3, with official mark schemes.", url: "https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/assessment-resources" },
  { name: "Biology", slug: "biology", description: "Paper 1 and Paper 2 resources for Foundation and Higher tiers.", url: "https://www.aqa.org.uk/subjects/biology/gcse/biology-8461/assessment-resources" },
  { name: "Chemistry", slug: "chemistry", description: "Paper 1 and Paper 2 question papers, mark schemes and reports.", url: "https://www.aqa.org.uk/subjects/chemistry/gcse/chemistry-8462/assessment-resources" },
  { name: "Physics", slug: "physics", description: "Paper 1 and Paper 2 practice across Foundation and Higher tiers.", url: "https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/assessment-resources" },
  { name: "Geography", slug: "geography", description: "Living world, human environment and geographical applications papers.", url: "https://www.aqa.org.uk/subjects/geography/gcse/geography-8035/assessment-resources" },
  { name: "History", slug: "history", description: "Understanding the modern world and shaping the nation resources.", url: "https://www.aqa.org.uk/subjects/history/gcse/history-8145/assessment-resources" },
  { name: "English Language", slug: "english-language", description: "Paper 1 and Paper 2 question papers, inserts and mark schemes.", url: "https://www.aqa.org.uk/subjects/english/gcse/english-8700/assessment-resources" },
  { name: "English Literature", slug: "english-literature", description: "Shakespeare, modern texts, nineteenth-century novels and poetry papers.", url: "https://www.aqa.org.uk/subjects/english/gcse/english-8702/assessment-resources" },
];

export default function PastPapersPage() {
  return <div className="min-h-screen bg-slate-50 text-slate-950"><Navbar /><section className="border-b border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">Official AQA resources</span><h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Past papers that improve your grade.</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">Open the official question paper and mark scheme, practise under timed conditions, then log the attempt so the work turns into progress.</p></div></section><main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"><section className="mb-12 grid gap-4 md:grid-cols-4">{[
    { icon: Timer, title: "1. Time it", text: "Use the real time limit and remove distractions." },
    { icon: PenLine, title: "2. Attempt it", text: "Show full working and answer every question." },
    { icon: CheckCircle2, title: "3. Mark it", text: "Use a different colour and be strict with the scheme." },
    { icon: Trophy, title: "4. Fix gaps", text: "Return to the topics behind every lost mark." },
  ].map((step) => <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5"><step.icon className="h-5 w-5 text-indigo-600" /><h2 className="mt-3 font-black">{step.title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{step.text}</p></div>)}</section><div className="mb-6"><h2 className="text-2xl font-black">Choose a subject</h2><p className="mt-1 text-sm text-slate-500">Links open AQA&apos;s latest available assessment resources.</p></div><PastPaperTracker subjects={subjects} /><section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-slate-950 p-8 text-white sm:flex-row sm:items-center"><div className="flex gap-4"><GraduationCap className="h-8 w-8 shrink-0 text-indigo-300" /><div><h2 className="text-xl font-black">Use your result properly</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-400">For every lost mark, write the topic and the reason: knowledge gap, misunderstood command word, method error or timing. Then revise that exact weakness.</p></div></div><a href="/my-revision" className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold">View my revision <ArrowRight className="h-4 w-4" /></a></section></main><Footer /></div>;
}
