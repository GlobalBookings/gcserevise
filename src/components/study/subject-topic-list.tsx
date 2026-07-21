"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpenCheck, Brain, CheckCircle2, Clock3, Search, Target } from "lucide-react";
import { calculateTopicProgress, isTopicMastered } from "@/lib/local-progress";
import { useLocalProgress } from "@/hooks/use-local-progress";

interface TopicItem {
  paper: string;
  name: string;
  slug: string;
  specRef: string;
  tier: string;
  estimatedMinutes: number;
  orderIndex: number;
}

export function SubjectTopicList({ board, subjectSlug, topics }: { board: string; subjectSlug: string; topics: TopicItem[] }) {
  const store = useLocalProgress();
  const [query, setQuery] = useState("");

  const visibleTopics = useMemo(() => topics.filter((topic) => topic.name.toLowerCase().includes(query.toLowerCase())), [query, topics]);
  const papers = [...new Set(visibleTopics.map((topic) => topic.paper))];
  const completed = topics.filter((topic) => isTopicMastered(store[`${subjectSlug}:${topic.slug}`])).length;

  return (
    <div>
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-3"><BookOpenCheck className="h-5 w-5 text-indigo-600" /><div><p className="text-2xl font-black">{topics.length}</p><p className="text-xs font-medium text-slate-500">Complete study packs</p></div></div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-3"><Brain className="h-5 w-5 text-violet-600" /><div><p className="text-2xl font-black">{topics.length * 5}</p><p className="text-xs font-medium text-slate-500">Auto-marked questions</p></div></div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-3"><Target className="h-5 w-5 text-emerald-600" /><div><p className="text-2xl font-black">{completed}/{topics.length}</p><p className="text-xs font-medium text-slate-500">Topics mastered</p></div></div></div>
      </div>

      <div className="mb-8 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <label htmlFor="topic-search" className="sr-only">Search topics</label>
        <input id="topic-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a topic…" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
      </div>

      <div className="space-y-10">
        {papers.map((paper) => (
          <section key={paper}>
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">{paper}</h2><span className="text-xs font-bold text-slate-400">{visibleTopics.filter((topic) => topic.paper === paper).length} topics</span></div>
            <div className="space-y-3">
              {visibleTopics.filter((topic) => topic.paper === paper).map((topic) => {
                const progress = store[`${subjectSlug}:${topic.slug}`];
                const percentage = calculateTopicProgress(progress);
                const mastered = isTopicMastered(progress);
                return (
                  <Link key={topic.slug} href={`/subjects/${board}/${subjectSlug}/${topic.slug}`} className="group grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-5">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${mastered ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{mastered ? <CheckCircle2 className="h-5 w-5" /> : topic.orderIndex}</div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold group-hover:text-indigo-600">{topic.name}</h3>{topic.tier !== "both" && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">{topic.tier} only</span>}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400"><span>Spec {topic.specRef}</span><span className="flex items-center gap-1"><Clock3 className="h-3 w-3" /> {topic.estimatedMinutes} min</span><span>Notes · Quiz · Flashcards · Tutor</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24"><div className="flex justify-between text-[10px] font-bold text-slate-400"><span>Progress</span><span>{percentage}%</span></div><div className="mt-1 h-1.5 rounded-full bg-slate-100"><div className={`h-1.5 rounded-full ${mastered ? "bg-emerald-500" : "bg-indigo-500"}`} style={{ width: `${percentage}%` }} /></div></div>
                      <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {visibleTopics.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No topics match “{query}”.</div>}
    </div>
  );
}
