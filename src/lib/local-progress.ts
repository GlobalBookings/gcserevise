export interface TopicProgress {
  notesRead: boolean;
  bestQuiz: number;
  flashcardsKnown: number;
  lastStudied: string;
}

export type ProgressStore = Record<string, TopicProgress>;

export const EMPTY_TOPIC_PROGRESS: TopicProgress = {
  notesRead: false,
  bestQuiz: 0,
  flashcardsKnown: 0,
  lastStudied: "",
};

export function calculateTopicProgress(progress: TopicProgress | undefined) {
  if (!progress) return 0;
  return Math.round((progress.notesRead ? 25 : 0) + progress.bestQuiz * 0.5 + progress.flashcardsKnown * 0.25);
}

export function isTopicMastered(progress: TopicProgress | undefined) {
  return Boolean(progress?.notesRead && progress.bestQuiz >= 80 && progress.flashcardsKnown >= 75);
}

export function readProgressStore(): ProgressStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("gcserevise-progress-v1") || "{}");
  } catch {
    return {};
  }
}
