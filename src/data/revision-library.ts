import generatedContent from "./revision-content.generated.json";
import { AQA_SUBJECTS } from "./aqa-seed";
import { extendedRevisionContent, type RevisionFlashcard, type RevisionQuestion } from "./revision-extensions";

export type { RevisionFlashcard, RevisionQuestion };

export const PUBLISHED_SUBJECT_SLUGS = ["maths", "biology", "chemistry", "physics", "geography", "history"] as const;

export interface RevisionContent {
  summary: string;
  examTip: string;
  flashcards: RevisionFlashcard[];
  questions: RevisionQuestion[];
}

const subjectSummaries: Record<string, string> = {
  maths: "Build fluency with the method, then apply it to unfamiliar and multi-step problems.",
  biology: "Connect structures to their functions and explain biological processes as clear causal sequences.",
  chemistry: "Link particles, structure and energy changes to the observations and calculations you may be given.",
  physics: "Choose the right model or equation, track units carefully and connect calculations to physical meaning.",
};

const subjectExamTips: Record<string, string> = {
  maths: "Write every stage of your method. Method marks can still be earned when the final answer is wrong.",
  biology: "Use precise scientific vocabulary and make each link in an explanation explicit.",
  chemistry: "Balance equations, show units in calculations and connect macroscopic observations to particles.",
  physics: "Write the equation, substitute with units, calculate, then round only at the end.",
};

const generated = generatedContent as Record<string, { flashcards: RevisionFlashcard[]; questions: RevisionQuestion[] }>;

export function getPublishedSubjects() {
  return AQA_SUBJECTS.filter((subject) => PUBLISHED_SUBJECT_SLUGS.includes(subject.slug as typeof PUBLISHED_SUBJECT_SLUGS[number]));
}

export function getSubject(subjectSlug: string) {
  return getPublishedSubjects().find((subject) => subject.slug === subjectSlug);
}

export function getTopic(subjectSlug: string, topicSlug: string) {
  const subject = getSubject(subjectSlug);
  const topic = subject?.topics.find((item) => item.slug === topicSlug);
  return subject && topic ? { subject, topic } : null;
}

export function getRevisionContent(subjectSlug: string, topicSlug: string): RevisionContent | null {
  const extension = extendedRevisionContent[topicSlug] as RevisionContent | undefined;
  if (extension) return extension;

  const content = generated[topicSlug];
  if (!content) return null;

  const topic = getTopic(subjectSlug, topicSlug)?.topic;
  const leadingFacts = content.flashcards.slice(0, 3).map((card) => card.definition).join(" ");
  return {
    summary: `${topic?.name ?? "This topic"} is a key part of GCSE ${getSubject(subjectSlug)?.name ?? subjectSlug}. ${subjectSummaries[subjectSlug] ?? "Learn the key knowledge, then apply it in exam-style questions."} ${leadingFacts}`,
    examTip: subjectExamTips[subjectSlug] ?? "Use specific evidence, explain each link in your reasoning and answer the command word directly.",
    flashcards: content.flashcards,
    questions: content.questions,
  };
}

export function getAdjacentTopics(subjectSlug: string, topicSlug: string) {
  const subject = getSubject(subjectSlug);
  if (!subject) return { previous: null, next: null };
  const index = subject.topics.findIndex((topic) => topic.slug === topicSlug);
  return {
    previous: index > 0 ? subject.topics[index - 1] : null,
    next: index >= 0 && index < subject.topics.length - 1 ? subject.topics[index + 1] : null,
  };
}

export const OFFICIAL_SPEC_URLS: Record<string, string> = {
  maths: "https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification/subject-content",
  biology: "https://www.aqa.org.uk/subjects/biology/gcse/biology-8461/specification/subject-content",
  chemistry: "https://www.aqa.org.uk/subjects/chemistry/gcse/chemistry-8462/specification/subject-content",
  physics: "https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/specification/subject-content",
  geography: "https://www.aqa.org.uk/subjects/geography/gcse/geography-8035/specification/subject-content",
  history: "https://www.aqa.org.uk/subjects/history/gcse/history-8145/specification/subject-content",
};
