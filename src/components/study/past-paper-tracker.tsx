"use client";

import { Check, ExternalLink, FileText } from "lucide-react";
import { logPastPaper, usePaperProgress } from "@/hooks/use-local-progress";

interface PaperSubject { name: string; slug: string; description: string; url: string }

export function PastPaperTracker({ subjects }: { subjects: PaperSubject[] }) {
  const completed = usePaperProgress();
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{subjects.map((subject) => <article key={subject.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><FileText className="h-5 w-5" /></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{completed[subject.slug] || 0} logged</span></div><h2 className="mt-5 text-xl font-black">{subject.name}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{subject.description}</p><div className="mt-5 grid gap-2"><a href={subject.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white">Open official papers <ExternalLink className="h-4 w-4" /></a><button onClick={() => logPastPaper(subject.slug)} className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700"><Check className="h-4 w-4" /> I completed a paper</button></div></article>)}</div>;
}
