-- Exam boards
CREATE TABLE exam_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subjects per board
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL REFERENCES exam_boards(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  icon TEXT DEFAULT 'book',
  color TEXT DEFAULT '#6366f1',
  topic_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(board_id, slug)
);

-- Topics within a subject
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  paper TEXT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  spec_ref TEXT,
  tier TEXT DEFAULT 'both' CHECK (tier IN ('foundation', 'higher', 'both')),
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  estimated_minutes INTEGER DEFAULT 30,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(subject_id, slug)
);

-- Revision notes per topic
CREATE TABLE revision_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  content_html TEXT NOT NULL,
  summary TEXT,
  key_terms TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Flashcards per topic
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  hint TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quiz questions per topic
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Past papers
CREATE TABLE past_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  session TEXT NOT NULL,
  tier TEXT,
  paper_name TEXT,
  pdf_url TEXT,
  mark_scheme_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  year_group INTEGER DEFAULT 11,
  exam_board_id UUID REFERENCES exam_boards(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User's chosen subjects
CREATE TABLE user_subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  tier TEXT DEFAULT 'higher' CHECK (tier IN ('foundation', 'higher')),
  target_grade INTEGER DEFAULT 5 CHECK (target_grade BETWEEN 1 AND 9),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject_id)
);

-- Topic progress tracking
CREATE TABLE user_topic_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  confidence_level INTEGER DEFAULT 0 CHECK (confidence_level BETWEEN 0 AND 3),
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, topic_id)
);

-- Quiz attempts
CREATE TABLE user_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_answer INTEGER NOT NULL,
  correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMPTZ DEFAULT now()
);

-- Study sessions
CREATE TABLE user_study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  minutes_studied INTEGER DEFAULT 0,
  topics_covered UUID[] DEFAULT '{}',
  reflection TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Daily plan tasks
CREATE TABLE plan_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  task_type TEXT NOT NULL CHECK (task_type IN ('revision', 'quiz', 'flashcards', 'practice')),
  completed BOOLEAN DEFAULT FALSE,
  confidence_after INTEGER CHECK (confidence_after BETWEEN 0 AND 3),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Study streaks
CREATE TABLE user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own subjects" ON user_subjects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own subjects" ON user_subjects FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress" ON user_topic_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON user_topic_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz attempts" ON user_quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz attempts" ON user_quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON user_study_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own sessions" ON user_study_sessions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tasks" ON plan_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own tasks" ON plan_tasks FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own streaks" ON user_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own streaks" ON user_streaks FOR ALL USING (auth.uid() = user_id);

-- Public tables are readable by everyone
ALTER TABLE exam_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE revision_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE past_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read exam_boards" ON exam_boards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read subjects" ON subjects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read topics" ON topics FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read revision_notes" ON revision_notes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read flashcards" ON flashcards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read quiz_questions" ON quiz_questions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read past_papers" ON past_papers FOR SELECT TO anon, authenticated USING (true);

-- Indexes for performance
CREATE INDEX idx_topics_subject ON topics(subject_id);
CREATE INDEX idx_revision_notes_topic ON revision_notes(topic_id);
CREATE INDEX idx_flashcards_topic ON flashcards(topic_id);
CREATE INDEX idx_quiz_questions_topic ON quiz_questions(topic_id);
CREATE INDEX idx_user_topic_progress_user ON user_topic_progress(user_id);
CREATE INDEX idx_user_topic_progress_next_review ON user_topic_progress(next_review);
CREATE INDEX idx_plan_tasks_user_date ON plan_tasks(user_id, date);
CREATE INDEX idx_user_study_sessions_user_date ON user_study_sessions(user_id, date);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Student'));
  INSERT INTO public.user_streaks (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
