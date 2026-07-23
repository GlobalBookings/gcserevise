"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Target, X } from "lucide-react";
import type { RevisionQuestion } from "@/data/revision-library";

interface DiagnosticSubject {
  name: string;
  slug: string;
  questions: Array<{ topicName: string; topicSlug: string; question: RevisionQuestion }>;
}

export function DiagnosticCheck({ subjects }: { subjects: DiagnosticSubject[] }) {
  const [subjectSlug, setSubjectSlug] = useState(subjects[0]?.slug || "");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Array<{ correct: boolean; topicName: string; topicSlug: string }>>([]);
  const subject = useMemo(() => subjects.find((item) => item.slug === subjectSlug) || subjects[0], [subjectSlug, subjects]);
  const finished = index >= subject.questions.length;

  function answer() {
    if (selected === null) return;
    const current = subject.questions[index];
    setAnswers((items) => [...items, { correct: selected === current.question.correct_answer, topicName: current.topicName, topicSlug: current.topicSlug }]);
    setIndex((value) => value + 1);
    setSelected(null);
  }

  function reset(nextSubject = subjectSlug) {
    setSubjectSlug(nextSubject); setIndex(0); setSelected(null); setAnswers([]);
  }

  if (finished) {
    const score = answers.filter((answer) => answer.correct).length;
    const gaps = answers.filter((answer) => !answer.correct);
    return <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><div className="text-center"><Target className="mx-auto h-11 w-11 text-indigo-600" /><p className="mt-4 text-xs font-black uppercase tracking-[.16em] text-indigo-600">Diagnostic complete</p><h2 className="mt-2 text-3xl font-black">{score}/{answers.length} secure</h2><p className="mt-3 text-slate-500">{gaps.length ? "Start with the gaps below. They are now your highest-value revision tasks." : "Excellent start. Use the full topic list to extend and maintain your knowledge."}</p></div><div className="mt-7 space-y-3">{gaps.map((gap) => <Link key={gap.topicSlug} href={`/subjects/aqa/${subject.slug}/${gap.topicSlug}`} className="flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4"><X className="h-5 w-5 text-rose-500" /><div className="flex-1"><p className="font-black text-rose-950">{gap.topicName}</p><p className="text-xs text-rose-700">Revise notes, then retake the full quiz</p></div><ArrowRight className="h-4 w-4 text-rose-500" /></Link>)}</div><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={() => reset()} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold"><RotateCcw className="h-4 w-4" /> Retake</button><Link href="/my-revision/setup" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white">Build my daily plan</Link></div></div>;
  }

  const current = subject.questions[index];
  return <div><div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-black">Choose a subject</p><p className="text-xs text-slate-500">Five representative knowledge checks</p></div><select value={subject.slug} onChange={(event) => reset(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold">{subjects.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">Question {index + 1} of {subject.questions.length}</p><p className="text-xs font-bold text-slate-400">{current.topicName}</p></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-600" style={{ width: `${((index + 1) / subject.questions.length) * 100}%` }} /></div><h2 className="mt-7 text-xl font-black leading-8">{current.question.question}</h2><div className="mt-6 space-y-3">{current.question.options.map((option, optionIndex) => <button key={option} onClick={() => setSelected(optionIndex)} className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-medium ${selected === optionIndex ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-300"}`}><span className="flex h-7 w-7 items-center justify-center rounded-full border border-current text-xs font-black">{String.fromCharCode(65 + optionIndex)}</span>{option}{selected === optionIndex && <CheckCircle2 className="ml-auto h-5 w-5 text-indigo-600" />}</button>)}</div><button disabled={selected === null} onClick={answer} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white disabled:opacity-40">Lock in answer <ArrowRight className="h-4 w-4" /></button></div></div>;
}
