export interface ExamBoard {
  id: string;
  name: string;
  code: string;
  region: string;
}

export interface Subject {
  id: string;
  name: string;
  slug: string;
  board_id: string;
  icon: string;
  color: string;
  topic_count: number;
}

export interface Topic {
  id: string;
  subject_id: string;
  paper: string;
  name: string;
  slug: string;
  spec_ref: string;
  tier: "foundation" | "higher" | "both";
  difficulty: number;
  estimated_minutes: number;
  order_index: number;
}

export interface RevisionNote {
  id: string;
  topic_id: string;
  content_html: string;
  summary: string;
  key_terms: string[];
}

export interface Flashcard {
  id: string;
  topic_id: string;
  term: string;
  definition: string;
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  topic_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: number;
}

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string;
  year_group: number;
  exam_board_id: string;
  created_at: string;
}

export interface UserSubject {
  id: string;
  user_id: string;
  subject_id: string;
  tier: "foundation" | "higher";
  target_grade: number;
}

export interface UserTopicProgress {
  id: string;
  user_id: string;
  topic_id: string;
  confidence_level: 0 | 1 | 2 | 3;
  last_reviewed: string | null;
  next_review: string | null;
  review_count: number;
}

export interface UserStudySession {
  id: string;
  user_id: string;
  date: string;
  minutes_studied: number;
  topics_covered: string[];
  reflection: string | null;
}

export interface UserStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_active_date: string;
}

export interface PlanTask {
  id: string;
  user_id: string;
  date: string;
  topic_id: string;
  task_type: "revision" | "quiz" | "flashcards" | "practice";
  completed: boolean;
  confidence_after: number | null;
  topic?: Topic;
  subject?: Subject;
}

export interface SubjectWithProgress extends Subject {
  board?: ExamBoard;
  topics: (Topic & { progress?: UserTopicProgress })[];
  mastery_percentage: number;
}
