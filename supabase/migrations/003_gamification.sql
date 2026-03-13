-- Add XP and gamification columns to user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS total_xp INTEGER DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS badges_earned TEXT[] DEFAULT '{}';

-- User badge events log
CREATE TABLE IF NOT EXISTS user_badge_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_badge_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own badges" ON user_badge_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can earn badges" ON user_badge_events FOR INSERT WITH CHECK (auth.uid() = user_id);

-- XP transaction log
CREATE TABLE IF NOT EXISTS user_xp_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE user_xp_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own xp" ON user_xp_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can log xp" ON user_xp_log FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_xp_log_user ON user_xp_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badge_events_user ON user_badge_events(user_id);
