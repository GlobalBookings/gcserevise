"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Cloud, CloudOff, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MISTAKES_KEY, PROFILE_KEY, type LearnerProfile, type MistakeRecord } from "@/lib/local-learning";
import type { ProgressStore } from "@/lib/local-progress";

type CloudStatus = "signed-out" | "syncing" | "synced" | "unavailable";
let cloudStatus: CloudStatus = "signed-out";

function setStatus(status: CloudStatus) {
  cloudStatus = status;
  window.dispatchEvent(new Event("gcserevise-cloud-status"));
}

function subscribe(callback: () => void) {
  window.addEventListener("gcserevise-cloud-status", callback);
  return () => window.removeEventListener("gcserevise-cloud-status", callback);
}

function mergeProgress(local: ProgressStore, cloud: ProgressStore) {
  const merged: ProgressStore = { ...cloud };
  for (const [key, value] of Object.entries(local)) {
    if (!merged[key] || (value.lastStudied || "") >= (merged[key].lastStudied || "")) merged[key] = value;
  }
  return merged;
}

function mergeMistakes(local: MistakeRecord[], cloud: MistakeRecord[]) {
  const byId = new Map<string, MistakeRecord>();
  for (const item of [...cloud, ...local]) {
    const existing = byId.get(item.id);
    if (!existing || item.createdAt >= existing.createdAt) byId.set(item.id, item);
  }
  return [...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 200);
}

function readLocalState() {
  let progress: ProgressStore = {};
  let profile: Partial<LearnerProfile> = {};
  let mistakes: MistakeRecord[] = [];
  try { progress = JSON.parse(localStorage.getItem("gcserevise-progress-v1") || "{}"); } catch { progress = {}; }
  try { profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"); } catch { profile = {}; }
  try { mistakes = JSON.parse(localStorage.getItem(MISTAKES_KEY) || "[]"); } catch { mistakes = []; }
  return { progress, profile, mistakes };
}

export function CloudProgressSync() {
  useEffect(() => {
    const supabase = createClient();
    let userId = "";
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function save() {
      if (!userId) return;
      const state = readLocalState();
      const { error } = await supabase.from("learner_states").upsert({
        user_id: userId,
        progress: state.progress,
        profile: state.profile,
        mistakes: state.mistakes,
        updated_at: new Date().toISOString(),
      });
      setStatus(error ? "unavailable" : "synced");
    }

    function scheduleSave() {
      if (!userId) return;
      setStatus("syncing");
      if (timer) clearTimeout(timer);
      timer = setTimeout(save, 700);
    }

    async function connect(nextUserId: string) {
      userId = nextUserId;
      if (!userId) { setStatus("signed-out"); return; }
      setStatus("syncing");
      const local = readLocalState();
      const { data, error } = await supabase.from("learner_states").select("progress, profile, mistakes").eq("user_id", userId).maybeSingle();
      if (error) { setStatus("unavailable"); return; }
      if (data) {
        const progress = mergeProgress(local.progress, (data.progress || {}) as ProgressStore);
        const profile = Object.keys(local.profile).length ? local.profile : ((data.profile || {}) as Partial<LearnerProfile>);
        const mistakes = mergeMistakes(local.mistakes, (data.mistakes || []) as MistakeRecord[]);
        localStorage.setItem("gcserevise-progress-v1", JSON.stringify(progress));
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
        window.dispatchEvent(new Event("gcserevise-progress"));
        window.dispatchEvent(new Event("gcserevise-learning"));
      }
      await save();
    }

    supabase.auth.getUser().then(({ data }) => connect(data.user?.id || ""));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => connect(session?.user.id || ""));
    window.addEventListener("gcserevise-progress", scheduleSave);
    window.addEventListener("gcserevise-learning", scheduleSave);
    return () => {
      if (timer) clearTimeout(timer);
      listener.subscription.unsubscribe();
      window.removeEventListener("gcserevise-progress", scheduleSave);
      window.removeEventListener("gcserevise-learning", scheduleSave);
    };
  }, []);
  return null;
}

export function CloudSyncStatus() {
  const status = useSyncExternalStore(subscribe, () => cloudStatus, () => "signed-out" as CloudStatus);
  if (status === "signed-out") return <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400"><CloudOff className="h-3.5 w-3.5" /> Saved on this device</span>;
  if (status === "syncing") return <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-500"><LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Syncing</span>;
  if (status === "unavailable") return <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600"><CloudOff className="h-3.5 w-3.5" /> Device saved</span>;
  return <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600"><Cloud className="h-3.5 w-3.5" /> Progress synced</span>;
}
