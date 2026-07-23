"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const { error: resetError } = await createClient().auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/update-password` });
    if (resetError) setError(resetError.message); else setSent(true);
    setLoading(false);
  }
  return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><div className="w-full max-w-md"><div className="mb-8 text-center"><Link href="/"><BrandLogo /></Link></div><Card><CardHeader className="text-center"><CardTitle>Reset your password</CardTitle><CardDescription>We&apos;ll send a secure recovery link to your account email.</CardDescription></CardHeader><CardContent>{sent ? <div className="rounded-xl bg-emerald-50 p-5 text-center text-emerald-900"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" /><p className="mt-3 font-black">Check your inbox</p><p className="mt-1 text-sm">If an account exists, a recovery link is on its way.</p></div> : <form onSubmit={submit} className="space-y-4">{error && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}<label className="block text-sm font-bold" htmlFor="reset-email">Email</label><Input id="reset-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /><Button className="w-full" disabled={loading}>{loading ? "Sending…" : "Send recovery link"}</Button></form>}<p className="mt-6 text-center text-sm"><Link href="/auth/login" className="font-bold text-indigo-600">Back to sign in</Link></p></CardContent></Card></div></div>;
}
