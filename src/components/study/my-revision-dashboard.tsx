"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, BarChart3, BookOpenCheck, Brain, CheckCircle2, Clock3, Flame, Sparkles, Target, Trophy } from "lucide-react";
import { calculateTopicProgress, isTopicMastered } from "@/lib/local-progress";
import { useLocalProgress } from "@/hooks/use-local-progress";

interface DashboardSubject {
  name: string;
  slug: string;
  topics: Array<{ name: string; slug: string; paper: string }>;
}

export function MyRevisionDashboard({ subjects }: { subjects: DashboardSubject[] }) {
  const store = useLocalProgress();

  const allTopics = useMemo(() => subjects.flatMap((subject) => subject.topics.map((topic) => ({ ...topic, subjectName: subject.name, subjectSlug: subject.slug, progress: store[`${subject.slug}:${topic.slug}`] }))), [store, subjects]);
  const started = allTopics.filter((topic) => calculateTopicProgress(topic.progress) > 0);
  const mastered = allTopics.filter((topic) => isTopicMastered(topic.progress));
  const average = started.length ? Math.round(started.reduce((total, topic) => total + calculateTopicProgress(topic.progress), 0) / started.length) : 0;
  const recent = [...started].sort((a, b) => (b.progress?.lastStudied || "").localeCompare(a.progress?.lastStudied || "")).slice(0, 4);
  const recommended = (started.length
    ? [...started].filter((topic) => !isTopicMastered(topic.progress)).sort((a, b) => calculateTopicProgress(a.progress) - calculateTopicProgress(b.progress))
    : subjects.map((subject) => ({ ...subject.topics[0], subjectName: subject.name, subjectSlug: subject.slug, progress: undefined }))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-xs font-black uppercase tracking-[.16em] text-indigo-600">My revision</p><h1 className="mt-2 text-4xl font-black tracking-tight">Keep the momentum going.</h1><p className="mt-3 text-slate-600">Your activity on this device is saved automatically.</p></div>
            <Link href="/subjects" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200">Revise a new topic <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpenCheck, value: started.length, label: "Topics started", tone: "bg-blue-100 text-blue-600" },
            { icon: Trophy, value: mastered.length, label: "Topics mastered", tone: "bg-emerald-100 text-emerald-600" },
            { icon: BarChart3, value: `${average}%`, label: "Average progress", tone: "bg-violet-100 text-violet-600" },
            { icon: Flame, value: recent.length ? "Active" : "Start", label: "Revision habit", tone: "bg-orange-100 text-orange-600" },
          ].map((stat) => <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.tone}`}><stat.icon className="h-5 w-5" /></div><p className="mt-4 text-3xl font-black">{stat.value}</p><p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p></div>)}
        </div>

        {started.length === 0 ? (
          <section className="mt-8 overflow-hidden rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
            <div className="max-w-2xl"><Sparkles className="h-8 w-8 text-indigo-300" /><h2 className="mt-4 text-3xl font-black">Your revision plan starts with one topic.</h2><p className="mt-3 leading-7 text-slate-300">Choose a subject below. Read the key knowledge, complete the five-question quiz, then use the flashcards. Your dashboard will fill itself in as you work.</p><Link href="/subjects" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold">Choose a subject <ArrowRight className="h-4 w-4" /></Link></div>
          </section>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <DashboardList title="Continue revising" subtitle="Your most recently studied topics" topics={recent} icon={Clock3} />
            <DashboardList title="Focus next" subtitle="Your least secure active topics" topics={recommended} icon={Target} />
          </div>
        )}

        <section className="mt-10">
          <div className="mb-5"><h2 className="text-2xl font-black">Progress by subject</h2><p className="mt-1 text-sm text-slate-500">Open a subject to continue or start another topic.</p></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => {
              const subjectTopics = subject.topics.map((topic) => store[`${subject.slug}:${topic.slug}`]);
              const subjectStarted = subjectTopics.filter((progress) => calculateTopicProgress(progress) > 0);
              const subjectMastered = subjectTopics.filter(isTopicMastered).length;
              const subjectAverage = subjectStarted.length ? Math.round(subjectStarted.reduce((sum, progress) => sum + calculateTopicProgress(progress), 0) / subjectStarted.length) : 0;
              return <Link key={subject.slug} href={`/subjects/aqa/${subject.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg"><div className="flex items-center justify-between"><h3 className="text-lg font-black group-hover:text-indigo-600">{subject.name}</h3><span className="text-xs font-bold text-slate-400">{subjectMastered}/{subject.topics.length} mastered</span></div><div className="mt-5 h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-indigo-600" style={{ width: `${subjectAverage}%` }} /></div><div className="mt-3 flex items-center justify-between text-xs font-bold"><span className="text-slate-400">{subjectStarted.length ? `${subjectAverage}% average` : "Not started"}</span><span className="flex items-center gap-1 text-indigo-600">View topics <ArrowRight className="h-3 w-3" /></span></div></Link>;
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

function DashboardList({ title, subtitle, topics, icon: Icon }: { title: string; subtitle: string; topics: Array<{ name: string; slug: string; subjectName: string; subjectSlug: string; progress?: { lastStudied: string; notesRead: boolean; bestQuiz: number; flashcardsKnown: number } }>; icon: typeof Brain }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Icon className="h-5 w-5" /></div><div><h2 className="font-black">{title}</h2><p className="text-xs text-slate-400">{subtitle}</p></div></div><div className="mt-5 space-y-3">{topics.map((topic) => { const value = calculateTopicProgress(topic.progress); return <Link key={`${topic.subjectSlug}:${topic.slug}`} href={`/subjects/aqa/${topic.subjectSlug}/${topic.slug}`} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:border-indigo-200 hover:bg-indigo-50/30"><div className={`flex h-9 w-9 items-center justify-center rounded-full ${isTopicMastered(topic.progress) ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>{isTopicMastered(topic.progress) ? <CheckCircle2 className="h-4 w-4" /> : `${value}%`}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-extrabold">{topic.name}</p><p className="text-xs text-slate-400">{topic.subjectName}</p></div><ArrowRight className="h-4 w-4 text-slate-300" /></Link>; })}</div></section>;
}
