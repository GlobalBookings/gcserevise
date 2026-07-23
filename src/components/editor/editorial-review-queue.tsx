"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, ExternalLink, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type ReviewStatus = "pending" | "approved" | "changes_requested";
interface ReviewItem { subjectName: string; subjectSlug: string; topicName: string; topicSlug: string; reviewedAt: string }
interface ReviewRecord { subject_slug: string; topic_slug: string; status: ReviewStatus; notes: string; reviewed_at: string | null }

export function EditorialReviewQueue({ items }: { items: ReviewItem[] }) {
  const [reviews, setReviews] = useState<Record<string, ReviewRecord>>({});
  const [subject, setSubject] = useState("all");
  const [filter, setFilter] = useState<"all" | ReviewStatus>("pending");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.from("content_reviews").select("subject_slug, topic_slug, status, notes, reviewed_at").then(({ data, error: loadError }) => {
      if (loadError) setError("The review database is not available yet. Apply migration 004_learning_platform.sql.");
      else setReviews(Object.fromEntries((data as ReviewRecord[]).map((review) => [`${review.subject_slug}:${review.topic_slug}`, review])));
    });
  }, []);

  const subjects = [...new Map(items.map((item) => [item.subjectSlug, item.subjectName])).entries()];
  const visible = useMemo(() => items.filter((item) => {
    const status = reviews[`${item.subjectSlug}:${item.topicSlug}`]?.status || "pending";
    return (subject === "all" || subject === item.subjectSlug) && (filter === "all" || filter === status);
  }), [filter, items, reviews, subject]);

  async function save(item: ReviewItem, status: ReviewStatus, notes: string) {
    const key = `${item.subjectSlug}:${item.topicSlug}`;
    setSaving(key); setError("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const record = { subject_slug: item.subjectSlug, topic_slug: item.topicSlug, status, notes, reviewer_id: user?.id, reviewed_at: status === "pending" ? null : new Date().toISOString(), updated_at: new Date().toISOString() };
    const { error: saveError } = await supabase.from("content_reviews").upsert(record);
    if (saveError) setError(saveError.message);
    else setReviews((current) => ({ ...current, [key]: record }));
    setSaving("");
  }

  const counts = items.reduce((result, item) => {
    const status = reviews[`${item.subjectSlug}:${item.topicSlug}`]?.status || "pending";
    result[status]++;
    return result;
  }, { pending: 0, approved: 0, changes_requested: 0 });

  return <div><div className="grid gap-4 sm:grid-cols-3">{[
    ["Pending", counts.pending, "text-amber-600"],
    ["Approved", counts.approved, "text-emerald-600"],
    ["Changes requested", counts.changes_requested, "text-rose-600"],
  ].map(([label, value, tone]) => <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-5"><p className={`text-3xl font-black ${tone}`}>{value}</p><p className="mt-1 text-sm font-bold text-slate-500">{label}</p></div>)}</div>{error && <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><CircleAlert className="h-5 w-5 shrink-0" />{error}</div>}<div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row"><select value={subject} onChange={(event) => setSubject(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"><option value="all">All subjects</option>{subjects.map(([slug, name]) => <option key={slug} value={slug}>{name}</option>)}</select><select value={filter} onChange={(event) => setFilter(event.target.value as typeof filter)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold"><option value="all">All statuses</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="changes_requested">Changes requested</option></select><span className="self-center text-sm font-bold text-slate-400">{visible.length} topics</span></div><div className="mt-6 space-y-4">{visible.map((item) => { const key = `${item.subjectSlug}:${item.topicSlug}`; const review = reviews[key]; const status = review?.status || "pending"; return <article key={key} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div><p className="text-xs font-black uppercase tracking-wider text-indigo-600">{item.subjectName}</p><h2 className="mt-1 text-lg font-black">{item.topicName}</h2><p className="mt-1 text-xs text-slate-400">Content pack reviewed in code: {item.reviewedAt}</p></div><Link href={`/subjects/aqa/${item.subjectSlug}/${item.topicSlug}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600">Open pack <ExternalLink className="h-4 w-4" /></Link></div><textarea defaultValue={review?.notes || ""} id={`notes-${key}`} placeholder="Reviewer notes, factual corrections or follow-up…" className="mt-4 min-h-24 w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-indigo-500" /><div className="mt-4 flex flex-wrap items-center gap-3"><button disabled={saving === key} onClick={() => save(item, "approved", (document.getElementById(`notes-${key}`) as HTMLTextAreaElement).value)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"><CheckCircle2 className="h-4 w-4" /> Approve</button><button disabled={saving === key} onClick={() => save(item, "changes_requested", (document.getElementById(`notes-${key}`) as HTMLTextAreaElement).value)} className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white"><CircleAlert className="h-4 w-4" /> Request changes</button><button disabled={saving === key} onClick={() => save(item, status, (document.getElementById(`notes-${key}`) as HTMLTextAreaElement).value)} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold"><Save className="h-4 w-4" /> Save notes</button><span className={`rounded-full px-3 py-1 text-xs font-black ${status === "approved" ? "bg-emerald-100 text-emerald-700" : status === "changes_requested" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{status.replace("_", " ")}</span></div></article>; })}</div></div>;
}
