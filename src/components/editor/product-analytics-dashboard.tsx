"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart3, CircleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface EventCount { event_date: string; event_name: string; event_key: string; event_count: number }

export function ProductAnalyticsDashboard() {
  const [events, setEvents] = useState<EventCount[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const from = new Date(Date.now() - 29 * 86_400_000).toISOString().slice(0, 10);
    createClient().from("product_event_counts").select("event_date, event_name, event_key, event_count").gte("event_date", from).order("event_date", { ascending: false }).then(({ data, error: loadError }) => {
      if (loadError) setError("Analytics storage is not ready. Apply migration 004_learning_platform.sql.");
      else setEvents((data || []) as EventCount[]);
    });
  }, []);
  const totals = useMemo(() => events.reduce<Record<string, number>>((result, event) => {
    result[event.event_name] = (result[event.event_name] || 0) + Number(event.event_count);
    return result;
  }, {}), [events]);
  const topPages = useMemo(() => events.filter((event) => event.event_name === "page_view").reduce<Record<string, number>>((result, event) => {
    result[event.event_key] = (result[event.event_key] || 0) + Number(event.event_count);
    return result;
  }, {}), [events]);
  return <div>{error && <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><CircleAlert className="h-5 w-5 shrink-0" />{error}</div>}<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{["page_view", "quiz_complete", "diagnostic_complete", "plan_created"].map((name) => <div key={name} className="rounded-2xl border border-slate-200 bg-white p-5"><BarChart3 className="h-5 w-5 text-indigo-600" /><p className="mt-4 text-3xl font-black">{totals[name] || 0}</p><p className="mt-1 text-sm font-bold capitalize text-slate-500">{name.replaceAll("_", " ")}</p><p className="mt-1 text-xs text-slate-400">Last 30 days</p></div>)}</div><section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-xl font-black">Most-used routes</h2><p className="mt-1 text-sm text-slate-500">Aggregate page counts only—no cookies, IP addresses or learner identities.</p><div className="mt-5 space-y-3">{Object.entries(topPages).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([path, count]) => <div key={path} className="flex items-center gap-3"><p className="min-w-0 flex-1 truncate text-sm font-bold">{path}</p><div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.min(100, (count / Math.max(1, ...Object.values(topPages))) * 100)}%` }} /></div><span className="w-10 text-right text-sm font-black">{count}</span></div>)}</div>{!Object.keys(topPages).length && <p className="mt-6 text-sm text-slate-400">No aggregate events recorded yet.</p>}</section></div>;
}
