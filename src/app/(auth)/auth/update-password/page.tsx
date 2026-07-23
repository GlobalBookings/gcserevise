"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLogo } from "@/components/brand/brand-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    if (password.length < 8) { setError("Use at least 8 characters."); setLoading(false); return; }
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) { setError(updateError.message); setLoading(false); return; }
    router.push("/my-revision");
  }
  return <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4"><div className="w-full max-w-md"><div className="mb-8 text-center"><Link href="/"><BrandLogo /></Link></div><Card><CardHeader className="text-center"><CardTitle>Choose a new password</CardTitle><CardDescription>Use at least eight characters and avoid a password used elsewhere.</CardDescription></CardHeader><CardContent><form onSubmit={submit} className="space-y-4">{error && <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}<label className="block text-sm font-bold" htmlFor="new-password">New password</label><Input id="new-password" type="password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} /><Button className="w-full" disabled={loading}>{loading ? "Updating…" : "Update password"}</Button></form></CardContent></Card></div></div>;
}
