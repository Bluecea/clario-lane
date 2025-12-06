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
  base_xp := FLOOR(words_read::NUMERIC / 10.0);
  
  -- Time Bonus: 10 XP per minute
  time_bonus := FLOOR(duration_seconds::NUMERIC / 60.0) * 10;
  
  -- Comprehension multiplier (1.0 to 1.5)
  comp_multiplier := 1.0 + (COALESCE(comprehension_pct, 0) / 100.0 * 0.5);
  
  -- Total XP
  total_xp := FLOOR((base_xp + time_bonus) * comp_multiplier);
  
  RETURN GREATEST(total_xp, 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;
