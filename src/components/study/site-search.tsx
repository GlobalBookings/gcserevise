"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Search, Tags } from "lucide-react";
import type { SearchItem } from "@/data/revision-library";
import { trackProductEvent } from "@/lib/product-analytics";

export function SiteSearch({ items, initialQuery = "" }: { items: SearchItem[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return items.filter((item) => item.type === "Topic").slice(0, 12);
    return items
      .map((item) => ({ item, score: terms.reduce((score, term) => score + (item.title.toLowerCase().includes(term) ? 5 : 0) + (item.keywords.includes(term) ? 1 : 0), 0) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map(({ item }) => item);
  }, [items, query]);

  return (
    <div>
      <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
        <Search className="h-5 w-5 text-slate-400" />
        <label htmlFor="revision-search" className="sr-only">Search revision resources</label>
        <input id="revision-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘photosynthesis’, ‘quadratic equations’ or ‘Macbeth ambition’…" className="w-full bg-transparent text-base font-medium outline-none placeholder:font-normal placeholder:text-slate-400" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-bold text-slate-500">{query ? `${results.length} best matches` : "Popular topic packs"}</p>
        {query && <button onClick={() => setQuery("")} className="text-sm font-bold text-indigo-600">Clear search</button>}
      </div>
      <div className="mt-4 grid gap-3">
        {results.map((item, index) => (
          <Link key={`${item.href}:${item.title}:${index}`} href={item.href} onClick={() => trackProductEvent("search_used", item.type.toLowerCase())} className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.type === "Topic" ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"}`}>
              {item.type === "Topic" ? <BookOpen className="h-5 w-5" /> : <Tags className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><h2 className="font-black group-hover:text-indigo-600">{item.title}</h2><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{item.type}</span></div>
              <p className="mt-1 text-xs font-bold text-indigo-600">{item.subject}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{item.description}</p>
            </div>
            <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-slate-300 group-hover:text-indigo-600" />
          </Link>
        ))}
      </div>
      {!results.length && <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-black">No exact match yet.</p><p className="mt-2 text-sm text-slate-500">Try a shorter topic, key term or subject name.</p></div>}
    </div>
  );
}
