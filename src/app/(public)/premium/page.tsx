import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Crown, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({ title: "GCSERevise Premium Revision Membership", description: "Explore GCSERevise Premium: adaptive revision planning, deeper practice, cloud progress and focused AI tutoring built around GCSE specifications.", path: "/premium" });

const free = ["All published topic notes", "Topic quizzes and flashcards", "On-device progress tracking", "Mistake notebook", "Quick subject diagnostic"];
const premium = ["Everything in Free", "Cloud progress across devices", "Adaptive spaced-repetition queue", "Expanded exam-style question practice", "Detailed strengths and gaps reports", "Higher AI tutor allowance"];

export default function PremiumPage() {
  return <div className="min-h-screen bg-slate-50"><Navbar /><section className="bg-slate-950 text-white"><div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-24"><Crown className="mx-auto h-10 w-10 text-amber-300" /><p className="mt-5 text-xs font-black uppercase tracking-[.18em] text-indigo-300">Premium revision membership</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">More direction. More practice. Less wasted time.</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">GCSERevise Premium is being prepared for learners who want their daily plan, practice and tutor to adapt across every device. The free revision library remains useful without a subscription.</p></div></section><main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16"><div className="grid gap-6 lg:grid-cols-2"><Plan title="Free" description="Start revising immediately" features={free} /><Plan title="Premium" description="Founding access opens after billing and parent controls are ready" features={premium} premium /></div><section className="mt-10 rounded-3xl border border-indigo-200 bg-indigo-50 p-7 text-center sm:p-10"><ShieldCheck className="mx-auto h-8 w-8 text-indigo-600" /><h2 className="mt-4 text-2xl font-black text-indigo-950">No fake checkout, no surprise charge.</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-indigo-800">Payments are not live yet. Create a free account to use the current platform; pricing and purchase will only appear when subscriptions, cancellation and safeguarding controls are fully operational.</p><Link href="/auth/signup" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white">Create a free account <ArrowRight className="h-4 w-4" /></Link></section></main><Footer /></div>;
}

function Plan({ title, description, features, premium = false }: { title: string; description: string; features: string[]; premium?: boolean }) {
  return <article className={`rounded-3xl border p-7 sm:p-9 ${premium ? "border-indigo-400 bg-white shadow-xl shadow-indigo-100" : "border-slate-200 bg-white"}`}><div className="flex items-center justify-between"><h2 className="text-3xl font-black">{title}</h2>{premium && <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">In development</span>}</div><p className="mt-2 text-sm text-slate-500">{description}</p><ul className="mt-7 space-y-4">{features.map((feature) => <li key={feature} className="flex gap-3 text-sm font-medium text-slate-700"><span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${premium ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600"}`}><Check className="h-3 w-3" /></span>{feature}</li>)}</ul></article>;
}
