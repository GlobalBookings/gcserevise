import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductAnalyticsDashboard } from "@/components/editor/product-analytics-dashboard";
import { hasEditorAccess } from "@/lib/editor-access";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Product Analytics | GCSERevise", robots: { index: false, follow: false } };

export default async function EditorAnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  if (!hasEditorAccess(user)) notFound();
  return <div className="min-h-screen bg-slate-50"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6"><Link href="/" className="text-lg font-black">GCSERevise <span className="text-indigo-600">Editor</span></Link><nav className="flex gap-4 text-sm font-bold"><Link href="/editor/review">Content review</Link><Link href="/editor/analytics" className="text-indigo-600">Analytics</Link></nav></div></header><main className="mx-auto max-w-7xl px-4 py-10 sm:px-6"><h1 className="text-4xl font-black">Privacy-conscious product analytics</h1><p className="mt-3 max-w-2xl text-slate-600">Thirty-day aggregate usage shows which learning routes help students without storing cookies, IP addresses, emails or individual histories.</p><div className="mt-8"><ProductAnalyticsDashboard /></div></main></div>;
}
