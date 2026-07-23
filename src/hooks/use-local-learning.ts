"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_LEARNER_PROFILE,
  MISTAKES_KEY,
  PROFILE_KEY,
  type LearnerProfile,
  type MistakeRecord,
} from "@/lib/local-learning";

let profileRaw = "";
let profileCache = DEFAULT_LEARNER_PROFILE;
let mistakesRaw = "";
let mistakesCache: MistakeRecord[] = [];

function subscribe(callback: () => void) {
  window.addEventListener("gcserevise-learning", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("gcserevise-learning", callback);
    window.removeEventListener("storage", callback);
  };
}

function getProfileSnapshot(): LearnerProfile {
  const raw = localStorage.getItem(PROFILE_KEY) || "";
  if (raw === profileRaw) return profileCache;
  profileRaw = raw;
  try { profileCache = { ...DEFAULT_LEARNER_PROFILE, ...JSON.parse(raw || "{}") }; } catch { profileCache = DEFAULT_LEARNER_PROFILE; }
  return profileCache;
}

function getMistakesSnapshot(): MistakeRecord[] {
  const raw = localStorage.getItem(MISTAKES_KEY) || "[]";
  if (raw === mistakesRaw) return mistakesCache;
  mistakesRaw = raw;
  try { mistakesCache = JSON.parse(raw); } catch { mistakesCache = []; }
  return mistakesCache;
}

export function useLearnerProfile() {
  return useSyncExternalStore(subscribe, getProfileSnapshot, () => DEFAULT_LEARNER_PROFILE);
}

export function useMistakes() {
  return useSyncExternalStore(subscribe, getMistakesSnapshot, () => []);
}
