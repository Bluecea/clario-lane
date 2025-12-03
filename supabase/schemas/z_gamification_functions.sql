-- Migration: Add Gamification Logic
-- Created: 2025-12-02
-- Description: Adds XP calculation, level calculation, achievement unlocking, and daily goal tracking

-- ============================================
-- 1. XP Calculation Function
-- ============================================
-- Calculates XP based on words read, duration, and comprehension
-- Formula: (Base XP + Time Bonus) × Comprehension Multiplier
--   - Base XP: 1 XP per 10 words
--   - Time Bonus: 10 XP per minute
--   - Comprehension Multiplier: 1.0x → 1.5x (0% → 100%)

CREATE OR REPLACE FUNCTION calculate_session_xp(
  words_read INT,
  duration_seconds INT,
  comprehension_pct NUMERIC
) RETURNS INT AS $$
DECLARE
  base_xp INT;
  time_bonus INT;
  comp_multiplier NUMERIC;
  total_xp INT;
BEGIN
  -- Base XP: 1 XP per 10 words
  base_xp := FLOOR(words_read / 10.0);
  
  -- Time Bonus: 10 XP per minute
  time_bonus := FLOOR(duration_seconds / 60.0) * 10;
  
  -- Comprehension multiplier (1.0 to 1.5)
  comp_multiplier := 1.0 + (COALESCE(comprehension_pct, 0) / 100.0 * 0.5);
  
  -- Total XP
  total_xp := FLOOR((base_xp + time_bonus) * comp_multiplier);
  
  RETURN GREATEST(total_xp, 1); -- Minimum 1 XP
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- 2. Level Calculation Function
-- ============================================
-- Formula: Level = FLOOR(SQRT(total_xp / 100))

CREATE OR REPLACE FUNCTION calculate_level(total_xp BIGINT)
RETURNS INT AS $$
BEGIN
  RETURN GREATEST(FLOOR(SQRT(total_xp / 100.0)), 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================
-- 3. Daily Words Read Function
-- ============================================
-- Returns total words read today for a user

CREATE OR REPLACE FUNCTION get_words_read_today(uid UUID)
RETURNS INT AS $$
DECLARE
  words_today INT;
BEGIN
  SELECT COALESCE(SUM(total_words), 0)
  INTO words_today
  FROM practice_sessions
  WHERE user_id = uid
    AND DATE(created_at) = CURRENT_DATE;
  
  RETURN words_today;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================
-- 4. Achievement Unlocking Function
-- ============================================
-- Checks and unlocks achievements for a user
-- Returns newly unlocked achievement IDs

CREATE OR REPLACE FUNCTION check_and_unlock_achievements(uid UUID)
RETURNS TABLE (achievement_id TEXT, just_unlocked BOOLEAN) AS $$
DECLARE
  user_stat RECORD;
  latest_session RECORD;
BEGIN
  -- Get user stats
  SELECT * INTO user_stat
  FROM user_stats
  WHERE user_id = uid;
  
  -- Get latest session
  SELECT * INTO latest_session
  FROM practice_sessions
  WHERE user_id = uid
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- Achievement: First Steps (1 session)
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'first_session') THEN
    IF (SELECT COUNT(*) FROM practice_sessions WHERE user_id = uid) >= 1 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'first_session');
      RETURN QUERY SELECT 'first_session'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: 3-Day Streak
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'streak_3') THEN
    IF user_stat.current_streak >= 3 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'streak_3');
      RETURN QUERY SELECT 'streak_3'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: 7-Day Streak
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'streak_7') THEN
    IF user_stat.current_streak >= 7 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'streak_7');
      RETURN QUERY SELECT 'streak_7'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: 30-Day Streak
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'streak_30') THEN
    IF user_stat.current_streak >= 30 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'streak_30');
      RETURN QUERY SELECT 'streak_30'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: 10K Words
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'words_10k') THEN
    IF user_stat.total_words_read >= 10000 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'words_10k');
      RETURN QUERY SELECT 'words_10k'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: 100K Words
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'words_100k') THEN
    IF user_stat.total_words_read >= 100000 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'words_100k');
      RETURN QUERY SELECT 'words_100k'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: 400 WPM
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'speed_400') THEN
    IF latest_session.wpm >= 400 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'speed_400');
      RETURN QUERY SELECT 'speed_400'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: 600 WPM
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'speed_600') THEN
    IF latest_session.wpm >= 600 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'speed_600');
      RETURN QUERY SELECT 'speed_600'::TEXT, TRUE;
    END IF;
  END IF;
  
  -- Achievement: Perfect Score
  IF NOT EXISTS (SELECT 1 FROM user_achievements WHERE user_id = uid AND achievement_id = 'perfect_quiz') THEN
    IF latest_session.comprehension >= 100 THEN
      INSERT INTO user_achievements (user_id, achievement_id) VALUES (uid, 'perfect_quiz');
      RETURN QUERY SELECT 'perfect_quiz'::TEXT, TRUE;
    END IF;
  END IF;
  
  RETURN;
END;
$$ LANGUAGE plpgsql;
