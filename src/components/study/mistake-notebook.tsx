"use client";

import Link from "next/link";
import { CheckCircle2, CircleAlert, RotateCcw } from "lucide-react";
import { useMistakes } from "@/hooks/use-local-learning";
import { setMistakeResolved } from "@/lib/local-learning";

export function MistakeNotebook() {
  const mistakes = useMistakes();
  const unresolved = mistakes.filter((mistake) => !mistake.resolved);
  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-3xl font-black text-rose-600">{unresolved.length}</p><p className="mt-1 text-sm font-bold text-slate-500">Ready to review</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-3xl font-black text-emerald-600">{mistakes.length - unresolved.length}</p><p className="mt-1 text-sm font-bold text-slate-500">Marked secure</p></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-3xl font-black text-indigo-600">{mistakes.reduce((sum, item) => sum + item.attempts, 0)}</p><p className="mt-1 text-sm font-bold text-slate-500">Learning moments</p></div>
      </div>
      {!mistakes.length ? <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><CircleAlert className="mx-auto h-9 w-9 text-indigo-500" /><h2 className="mt-4 text-2xl font-black">Your mistake notebook is ready.</h2><p className="mx-auto mt-2 max-w-xl text-slate-500">Wrong quiz answers will appear here automatically with the correct answer and explanation.</p><Link href="/subjects" className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white">Take a topic quiz</Link></div> : <div className="space-y-4">{mistakes.map((mistake) => <article key={mistake.id} className={`rounded-2xl border bg-white p-6 ${mistake.resolved ? "border-emerald-200 opacity-70" : "border-slate-200"}`}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wider text-indigo-600">{mistake.subjectName} · {mistake.topicName}</p><h2 className="mt-2 font-black leading-7">{mistake.question}</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">Seen {mistake.attempts}×</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-xl bg-rose-50 p-4"><p className="text-xs font-black uppercase text-rose-600">Your answer</p><p className="mt-1 text-sm text-rose-950">{mistake.chosenAnswer}</p></div><div className="rounded-xl bg-emerald-50 p-4"><p className="text-xs font-black uppercase text-emerald-600">Correct answer</p><p className="mt-1 text-sm text-emerald-950">{mistake.correctAnswer}</p></div></div><p className="mt-4 text-sm leading-7 text-slate-600">{mistake.explanation}</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/subjects/aqa/${mistake.subjectSlug}/${mistake.topicSlug}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold"><RotateCcw className="h-4 w-4" /> Revisit topic</Link><button onClick={() => setMistakeResolved(mistake.id, !mistake.resolved)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${mistake.resolved ? "bg-slate-100 text-slate-700" : "bg-emerald-600 text-white"}`}><CheckCircle2 className="h-4 w-4" /> {mistake.resolved ? "Move back to review" : "I can explain this now"}</button></div></article>)}</div>}
    </div>
  );
}
