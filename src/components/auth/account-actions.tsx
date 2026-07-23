"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cloud, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AccountActions({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    return () => data.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await createClient().auth.signOut();
    onNavigate?.();
    window.location.href = "/";
  }

  if (user) {
    return <div className={`flex items-center gap-2 ${mobile ? "flex-col" : ""}`}><Link href="/my-revision" onClick={onNavigate} className={`inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-bold text-white ${mobile ? "w-full" : ""}`}><Cloud className="h-4 w-4" /> My synced revision</Link><button onClick={signOut} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 ${mobile ? "w-full" : ""}`}><LogOut className="h-4 w-4" /> Sign out</button></div>;
  }

  return <div className={`flex items-center gap-3 ${mobile ? "flex-col" : ""}`}><Link href="/auth/login" onClick={onNavigate}><Button variant="ghost" size="sm" className={mobile ? "w-full" : ""}>Log in</Button></Link><Link href="/auth/signup" onClick={onNavigate}><Button size="sm" className={`rounded-lg bg-indigo-600 ${mobile ? "w-full" : ""}`}>Create free account</Button></Link></div>;
}
