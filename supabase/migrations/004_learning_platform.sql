-- Local-first learner state with authenticated cloud sync.
CREATE TABLE IF NOT EXISTS learner_states (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  progress JSONB NOT NULL DEFAULT '{}'::jsonb,
  profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  mistakes JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE learner_states ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learners can read own state"
  ON learner_states FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Learners can insert own state"
  ON learner_states FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Learners can update own state"
  ON learner_states FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Human review decisions are separate from version-controlled learning content.
CREATE TABLE IF NOT EXISTS content_reviews (
  subject_slug TEXT NOT NULL,
  topic_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'changes_requested')),
  notes TEXT NOT NULL DEFAULT '',
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (subject_slug, topic_slug)
);

ALTER TABLE content_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published review status is readable"
  ON content_reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Editors can create reviews"
  ON content_reviews FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'editor');

CREATE POLICY "Editors can update reviews"
  ON content_reviews FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'editor')
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') = 'editor');

-- Privacy-conscious aggregate analytics: no IP, cookie, email or raw user ID.
CREATE TABLE IF NOT EXISTS product_event_counts (
  event_date DATE NOT NULL DEFAULT CURRENT_DATE,
  event_name TEXT NOT NULL,
  event_key TEXT NOT NULL DEFAULT '',
  event_count BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (event_date, event_name, event_key)
);

ALTER TABLE product_event_counts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Editors can read aggregate analytics"
  ON product_event_counts FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'editor');

CREATE OR REPLACE FUNCTION track_product_event(requested_name TEXT, requested_key TEXT DEFAULT '')
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  clean_key TEXT;
BEGIN
  IF requested_name NOT IN ('page_view', 'quiz_complete', 'topic_complete', 'diagnostic_complete', 'plan_created', 'search_used', 'tutor_used') THEN
    RAISE EXCEPTION 'Unsupported analytics event';
  END IF;
  clean_key := LEFT(REGEXP_REPLACE(COALESCE(requested_key, ''), '[^a-zA-Z0-9_:/-]', '', 'g'), 120);
  INSERT INTO product_event_counts (event_date, event_name, event_key, event_count)
  VALUES (CURRENT_DATE, requested_name, clean_key, 1)
  ON CONFLICT (event_date, event_name, event_key)
  DO UPDATE SET event_count = product_event_counts.event_count + 1;
END;
$$;

GRANT EXECUTE ON FUNCTION track_product_event(TEXT, TEXT) TO anon, authenticated;
