import { UserTopicProgress, Topic } from "@/types/database";

const REVIEW_INTERVALS: Record<number, number> = {
  0: 1,   // Not started -> review tomorrow
  1: 2,   // Needs Work -> every 2 days
  2: 7,   // Getting There -> every 7 days
  3: 21,  // Mastered -> every 21 days
};

const EXAM_PREP_INTERVALS: Record<number, number> = {
  0: 1,
  1: 1,   // Needs Work -> daily
  2: 2,   // Getting There -> every 2 days
  3: 7,   // Mastered -> weekly
};

export function getNextReviewDate(
  confidenceLevel: number,
  examPrep: boolean = false
): Date {
  const intervals = examPrep ? EXAM_PREP_INTERVALS : REVIEW_INTERVALS;
  const days = intervals[confidenceLevel] ?? 1;
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next;
}

export function isExamPrepMode(examDate: string | Date): boolean {
  const now = new Date();
  const exam = new Date(examDate);
  const diffDays = Math.ceil(
    (exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diffDays <= 28 && diffDays > 0;
}

interface TopicWithProgress {
  topic: Topic;
  progress?: UserTopicProgress;
}

export function generateDailyTasks(
  topics: TopicWithProgress[],
  maxTasks: number = 6
): { topic: Topic; taskType: string }[] {
  const now = new Date();
  const tasks: { topic: Topic; taskType: string; priority: number }[] = [];

  for (const { topic, progress } of topics) {
    if (!progress || progress.confidence_level === 0) {
      // Never reviewed -> high priority revision
      tasks.push({ topic, taskType: "revision", priority: 100 });
      continue;
    }

    const nextReview = progress.next_review
      ? new Date(progress.next_review)
      : now;

    if (nextReview <= now) {
      // Due for review
      const overdueDays = Math.ceil(
        (now.getTime() - nextReview.getTime()) / (1000 * 60 * 60 * 24)
      );
      const priority =
        (4 - progress.confidence_level) * 20 + Math.min(overdueDays * 5, 30);

      // Vary task type based on confidence
      let taskType: string;
      if (progress.confidence_level === 1) {
        taskType = "revision";
      } else if (progress.confidence_level === 2) {
        taskType = progress.review_count % 2 === 0 ? "quiz" : "flashcards";
      } else {
        taskType = "quiz";
      }

      tasks.push({ topic, taskType, priority });
    }
  }

  // Sort by priority descending, take top N
  tasks.sort((a, b) => b.priority - a.priority);

  return tasks.slice(0, maxTasks).map(({ topic, taskType }) => ({
    topic,
    taskType,
  }));
}

export function calculateMasteryPercentage(
  progressList: UserTopicProgress[],
  totalTopics: number
): number {
  if (totalTopics === 0) return 0;
  const mastered = progressList.filter(
    (p) => p.confidence_level >= 2
  ).length;
  return Math.round((mastered / totalTopics) * 100);
}

export function calculateExamReadiness(
  progressList: UserTopicProgress[],
  totalTopics: number
): number {
  if (totalTopics === 0) return 0;
  const totalPossible = totalTopics * 3;
  const totalConfidence = progressList.reduce(
    (sum, p) => sum + p.confidence_level,
    0
  );
  return Math.round((totalConfidence / totalPossible) * 100);
}
