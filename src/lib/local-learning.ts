export interface LearnerProfile {
  selectedSubjects: string[];
  targetGrade: string;
  dailyMinutes: number;
  examDate: string;
  completedSetup: boolean;
}

export interface MistakeRecord {
  id: string;
  subjectSlug: string;
  subjectName: string;
  topicSlug: string;
  topicName: string;
  question: string;
  chosenAnswer: string;
  correctAnswer: string;
  explanation: string;
  createdAt: string;
  attempts: number;
  resolved: boolean;
}

export const DEFAULT_LEARNER_PROFILE: LearnerProfile = {
  selectedSubjects: [],
  targetGrade: "7",
  dailyMinutes: 30,
  examDate: "2027-05-17",
  completedSetup: false,
};

export const PROFILE_KEY = "gcserevise-profile-v1";
export const MISTAKES_KEY = "gcserevise-mistakes-v1";

export function saveLearnerProfile(profile: LearnerProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event("gcserevise-learning"));
}

export function addMistake(mistake: Omit<MistakeRecord, "id" | "createdAt" | "attempts" | "resolved">) {
  let current: MistakeRecord[] = [];
  try { current = JSON.parse(localStorage.getItem(MISTAKES_KEY) || "[]"); } catch { current = []; }
  const id = `${mistake.subjectSlug}:${mistake.topicSlug}:${mistake.question}`;
  const previous = current.find((item) => item.id === id);
  const next: MistakeRecord = {
    ...mistake,
    id,
    createdAt: new Date().toISOString(),
    attempts: (previous?.attempts || 0) + 1,
    resolved: false,
  };
  localStorage.setItem(MISTAKES_KEY, JSON.stringify([next, ...current.filter((item) => item.id !== id)].slice(0, 200)));
  window.dispatchEvent(new Event("gcserevise-learning"));
}

export function setMistakeResolved(id: string, resolved: boolean) {
  let current: MistakeRecord[] = [];
  try { current = JSON.parse(localStorage.getItem(MISTAKES_KEY) || "[]"); } catch { current = []; }
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(current.map((item) => item.id === id ? { ...item, resolved } : item)));
  window.dispatchEvent(new Event("gcserevise-learning"));
}

export function daysUntil(date: string) {
  const target = new Date(`${date}T12:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  return Math.max(0, Math.ceil((target.getTime() - Date.now()) / 86_400_000));
}
