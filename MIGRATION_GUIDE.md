# Apply Gamification Migration - Manual Steps

## Option 1: Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/clariolane)
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the contents of `supabase/schemas/add_gamification_logic.sql`
5. Paste and run the query
6. You should see "Success. No rows returned" when complete

## Option 2: Command Line (Alternative)

If you have direct database access configured:

```bash
# Get your production database URL from Supabase Dashboard -> Project Settings -> Database
# Then run:
psql "<YOUR_DATABASE_URL>" -f supabase/schemas/add_gamification_logic.sql
```

## After Migration

Once the migration is applied, run these commands to regenerate TypeScript types:

```bash
# Regenerate types from the production database
npx supabase gen types typescript --linked > supabase/supabase_types.ts

# Or if that doesn't work, try:
npx supabase gen types typescript --project-id clariolane > supabase/supabase_types.ts
```

This will update the TypeScript types to include the new functions (`calculate_session_xp`, `calculate_level`, `check_and_unlock_achievements`, `get_words_read_today`) and fix all the type errors in the edge function.

## Verification

After applying the migration and regenerating types:
1. The edge function should compile without type errors
2. Test by completing a reading session
3. Check that XP is calculated and achievements unlock correctly
