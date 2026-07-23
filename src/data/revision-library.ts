import generatedContent from "./revision-content.generated.json";
import { AQA_SUBJECTS } from "./aqa-seed";
import { extendedRevisionContent, type RevisionFlashcard, type RevisionQuestion } from "./revision-extensions";
import { englishRevisionContent } from "./english-revision-content";

export type { RevisionFlashcard, RevisionQuestion };

export const PUBLISHED_SUBJECT_SLUGS = ["maths", "biology", "chemistry", "physics", "geography", "history", "english-language", "english-literature"] as const;

export interface RevisionSection {
  heading: string;
  explanation: string;
  bullets: string[];
}

export interface RevisionContent {
  summary: string;
  examTip: string;
  flashcards: RevisionFlashcard[];
  questions: RevisionQuestion[];
  objectives: string[];
  sections: RevisionSection[];
  commonMistakes: string[];
  retrievalPractice: string[];
  reviewedAt: string;
}

const subjectSummaries: Record<string, string> = {
  maths: "Build fluency with the method, then apply it to unfamiliar and multi-step problems.",
  biology: "Connect structures to their functions and explain biological processes as clear causal sequences.",
  chemistry: "Link particles, structure and energy changes to the observations and calculations you may be given.",
  physics: "Choose the right model or equation, track units carefully and connect calculations to physical meaning.",
  geography: "Connect physical and human processes to named evidence, then weigh impacts and management choices.",
  history: "Build precise causal chains, use accurate evidence and reach a supported judgement about significance and change.",
  "english-language": "Read the task precisely, select purposeful evidence and explain how choices shape meaning for the reader.",
  "english-literature": "Develop a clear interpretation, analyse concise evidence and connect moments across the whole text.",
};

const subjectExamTips: Record<string, string> = {
  maths: "Write every stage of your method. Method marks can still be earned when the final answer is wrong.",
  biology: "Use precise scientific vocabulary and make each link in an explanation explicit.",
  chemistry: "Balance equations, show units in calculations and connect macroscopic observations to particles.",
  physics: "Write the equation, substitute with units, calculate, then round only at the end.",
  geography: "Use named evidence accurately and finish extended answers with a judgement that follows from the evidence.",
  history: "Use specific evidence to prove each claim, then compare factors before reaching your judgement.",
  "english-language": "Answer the exact focus of the question and analyse specific choices rather than listing techniques.",
  "english-literature": "Begin with a conceptual argument, use short quotations and show how the idea develops across the text.",
};

const generated = generatedContent as Record<string, { flashcards: RevisionFlashcard[]; questions: RevisionQuestion[] }>;
const english = englishRevisionContent as Record<string, { summary: string; examTip: string; flashcards: RevisionFlashcard[]; questions: RevisionQuestion[] }>;
const REVIEWED_AT = "2026-07-23";

const commonMistakes: Record<string, string[]> = {
  maths: ["Skipping working and losing method marks.", "Rounding before the final step.", "Using a remembered method without checking what the question asks."],
  biology: ["Describing a process without linking cause and effect.", "Using everyday words where precise biological vocabulary is required.", "Ignoring units, variables or controls in practical questions."],
  chemistry: ["Confusing observations with particle-level explanations.", "Using an unbalanced equation in a calculation.", "Leaving out units or significant figures."],
  physics: ["Choosing an equation before identifying the quantities given.", "Mixing units such as grams and kilograms.", "Giving a calculation without explaining its physical meaning."],
  geography: ["Using a vague or invented case-study fact.", "Listing impacts without explaining why they happened.", "Giving a judgement that is not supported by the preceding evidence."],
  history: ["Narrating events instead of answering the factor or claim.", "Using evidence without explaining how it proves the point.", "Reaching a judgement without comparing relative importance."],
  "english-language": ["Feature spotting without analysing meaning.", "Using long quotations that hide the key word.", "Making vague reader-effect claims that are not supported by the source."],
  "english-literature": ["Retelling the plot instead of developing an interpretation.", "Treating context as a separate paragraph.", "Using a quotation without analysing the writer's choices."],
};

function enrichContent(subjectSlug: string, content: { summary: string; examTip: string; flashcards: RevisionFlashcard[]; questions: RevisionQuestion[] }): RevisionContent {
  const cards = content.flashcards;
  const midpoint = Math.max(1, Math.ceil(cards.length / 2));
  const groups = [cards.slice(0, midpoint), cards.slice(midpoint)].filter((group) => group.length);
  return {
    ...content,
    objectives: [
      `Define and use ${cards.slice(0, 2).map((card) => card.term).join(" and ")} accurately.`,
      `Explain the important links between ${cards.slice(2, 4).map((card) => card.term).join(" and ")}.`,
      "Apply the knowledge to an unfamiliar exam question and justify each step.",
    ],
    sections: groups.map((group, index) => ({
      heading: index === 0 ? "Core ideas" : "Apply it in the exam",
      explanation: index === 0
        ? "Secure these ideas first. Say each definition in your own words, then connect it to the topic overview."
        : "The exam will rarely ask for an isolated definition. Practise selecting the right idea and using it as part of a complete explanation or method.",
      bullets: group.map((card) => `${card.term}: ${card.definition}`),
    })),
    commonMistakes: commonMistakes[subjectSlug] ?? ["Answering a related question rather than the command word.", "Using a fact without explaining why it matters.", "Failing to check the final answer against the question."],
    retrievalPractice: cards.slice(0, 4).map((card) => `Without looking, explain ${card.term.toLowerCase()} and give one example or consequence.`),
    reviewedAt: REVIEWED_AT,
  };
}

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
  const englishContent = english[topicSlug];
  if (englishContent) return enrichContent(subjectSlug, englishContent);
  const extension = extendedRevisionContent[topicSlug];
  if (extension) return enrichContent(subjectSlug, extension);

  const content = generated[topicSlug];
  if (!content) return null;

  const topic = getTopic(subjectSlug, topicSlug)?.topic;
  const leadingFacts = content.flashcards.slice(0, 3).map((card) => card.definition).join(" ");
  return enrichContent(subjectSlug, {
    summary: `${topic?.name ?? "This topic"} is a key part of GCSE ${getSubject(subjectSlug)?.name ?? subjectSlug}. ${subjectSummaries[subjectSlug] ?? "Learn the key knowledge, then apply it in exam-style questions."} ${leadingFacts}`,
    examTip: subjectExamTips[subjectSlug] ?? "Use specific evidence, explain each link in your reasoning and answer the command word directly.",
    flashcards: content.flashcards,
    questions: content.questions,
  });
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
  "english-language": "https://www.aqa.org.uk/subjects/english/gcse/english-8700/specification/subject-content",
  "english-literature": "https://www.aqa.org.uk/subjects/english/gcse/english-8702/specification/subject-content",
};

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  subject: string;
  type: "Topic" | "Flashcard";
  keywords: string;
}

export function getSearchIndex(): SearchItem[] {
  return getPublishedSubjects().flatMap((subject) =>
    subject.topics.flatMap((topic) => {
      const content = getRevisionContent(subject.slug, topic.slug);
      if (!content) return [];
      const href = `/subjects/aqa/${subject.slug}/${topic.slug}`;
      return [
        {
          title: topic.name,
          description: content.summary,
          href,
          subject: subject.name,
          type: "Topic" as const,
          keywords: `${topic.name} ${subject.name} ${content.flashcards.map((card) => `${card.term} ${card.definition}`).join(" ")}`.toLowerCase(),
        },
        ...content.flashcards.map((card) => ({
          title: card.term,
          description: card.definition,
          href,
          subject: subject.name,
          type: "Flashcard" as const,
          keywords: `${card.term} ${card.definition} ${card.hint} ${topic.name} ${subject.name}`.toLowerCase(),
        })),
      ];
    })
  );
}
