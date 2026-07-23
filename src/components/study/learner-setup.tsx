"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, Clock3, GraduationCap } from "lucide-react";
import { useLearnerProfile } from "@/hooks/use-local-learning";
import { saveLearnerProfile } from "@/lib/local-learning";

interface SetupSubject { name: string; slug: string }

export function LearnerSetup({ subjects }: { subjects: SetupSubject[] }) {
  const current = useLearnerProfile();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(current.selectedSubjects);
  const [targetGrade, setTargetGrade] = useState(current.targetGrade);
  const [dailyMinutes, setDailyMinutes] = useState(current.dailyMinutes);
  const [examDate, setExamDate] = useState(current.examDate);

  function toggle(slug: string) {
    setSelectedSubjects((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]);
  }

  return (
    <form onSubmit={(event) => { event.preventDefault(); saveLearnerProfile({ selectedSubjects, targetGrade, dailyMinutes, examDate, completedSetup: true }); router.push("/my-revision"); }} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><GraduationCap className="h-5 w-5" /></div><div><h2 className="text-xl font-black">Your subjects</h2><p className="text-sm text-slate-500">Choose everything in your current GCSE programme.</p></div></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {subjects.map((subject) => {
            const active = selectedSubjects.includes(subject.slug);
            return <button key={subject.slug} type="button" onClick={() => toggle(subject.slug)} className={`flex items-center justify-between rounded-xl border-2 p-4 text-left text-sm font-extrabold transition ${active ? "border-indigo-500 bg-indigo-50 text-indigo-950" : "border-slate-200 hover:border-indigo-300"}`}><span>{subject.name}</span><span className={`flex h-6 w-6 items-center justify-center rounded-full ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>{active && <Check className="h-3.5 w-3.5" />}</span></button>;
          })}
        </div>
      </section>
      <section className="grid gap-6 sm:grid-cols-3">
        <label className="rounded-2xl border border-slate-200 bg-white p-5"><span className="flex items-center gap-2 text-sm font-black"><GraduationCap className="h-4 w-4 text-indigo-600" /> Target grade</span><select value={targetGrade} onChange={(event) => setTargetGrade(event.target.value)} className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-bold outline-none focus:border-indigo-500">{["4", "5", "6", "7", "8", "9"].map((grade) => <option key={grade}>{grade}</option>)}</select></label>
        <label className="rounded-2xl border border-slate-200 bg-white p-5"><span className="flex items-center gap-2 text-sm font-black"><Clock3 className="h-4 w-4 text-indigo-600" /> Minutes per day</span><select value={dailyMinutes} onChange={(event) => setDailyMinutes(Number(event.target.value))} className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-bold outline-none focus:border-indigo-500">{[15, 30, 45, 60, 90].map((minutes) => <option key={minutes} value={minutes}>{minutes} minutes</option>)}</select></label>
        <label className="rounded-2xl border border-slate-200 bg-white p-5"><span className="flex items-center gap-2 text-sm font-black"><CalendarDays className="h-4 w-4 text-indigo-600" /> First exam date</span><input type="date" value={examDate} onChange={(event) => setExamDate(event.target.value)} className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-bold outline-none focus:border-indigo-500" /></label>
      </section>
      <button disabled={!selectedSubjects.length} className="w-full rounded-xl bg-indigo-600 px-6 py-4 font-black text-white shadow-lg shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-40">Build my daily revision plan</button>
      <p className="text-center text-xs text-slate-400">These choices are stored on this device and can be changed at any time.</p>
    </form>
  );
}
