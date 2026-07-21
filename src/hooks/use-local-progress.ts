"use client";

import { useSyncExternalStore } from "react";
import type { ProgressStore, TopicProgress } from "@/lib/local-progress";

const EMPTY_PROGRESS_STORE: ProgressStore = {};
const EMPTY_PAPER_STORE: Record<string, number> = {};
let progressRaw = "";
let progressCache: ProgressStore = EMPTY_PROGRESS_STORE;
let paperRaw = "";
let paperCache: Record<string, number> = EMPTY_PAPER_STORE;

function subscribeProgress(callback: () => void) {
  window.addEventListener("gcserevise-progress", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("gcserevise-progress", callback);
    window.removeEventListener("storage", callback);
  };
}

function getProgressSnapshot() {
  const raw = localStorage.getItem("gcserevise-progress-v1") || "{}";
  if (raw === progressRaw) return progressCache;
  progressRaw = raw;
  try { progressCache = JSON.parse(raw); } catch { progressCache = EMPTY_PROGRESS_STORE; }
  return progressCache;
}

export function useLocalProgress() {
  return useSyncExternalStore(subscribeProgress, getProgressSnapshot, () => EMPTY_PROGRESS_STORE);
}

export function writeTopicProgress(key: string, update: Partial<TopicProgress>) {
  const current = getProgressSnapshot();
  const base = current[key] || { notesRead: false, bestQuiz: 0, flashcardsKnown: 0, lastStudied: "" };
  const next = {
    ...current,
    [key]: { ...base, ...update, lastStudied: new Date().toISOString() },
  };
  localStorage.setItem("gcserevise-progress-v1", JSON.stringify(next));
  window.dispatchEvent(new Event("gcserevise-progress"));
}

function subscribePapers(callback: () => void) {
  window.addEventListener("gcserevise-papers", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("gcserevise-papers", callback);
    window.removeEventListener("storage", callback);
  };
}

function getPaperSnapshot() {
  const raw = localStorage.getItem("gcserevise-papers-v1") || "{}";
  if (raw === paperRaw) return paperCache;
  paperRaw = raw;
  try { paperCache = JSON.parse(raw); } catch { paperCache = EMPTY_PAPER_STORE; }
  return paperCache;
}

export function usePaperProgress() {
  return useSyncExternalStore(subscribePapers, getPaperSnapshot, () => EMPTY_PAPER_STORE);
}

export function logPastPaper(slug: string) {
  const current = getPaperSnapshot();
  localStorage.setItem("gcserevise-papers-v1", JSON.stringify({ ...current, [slug]: (current[slug] || 0) + 1 }));
  window.dispatchEvent(new Event("gcserevise-papers"));
}
