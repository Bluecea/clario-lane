create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    name text not null,
    baseline_wpm integer default 0,
    baseline_comprehension integer default 0,
    current_wpm integer default 0,
    total_sessions integer default 0,
    total_time_spent integer default 0, -- in seconds
    goals text default '{}',
    content_type text default 'mixed', -- e.g., 'fiction', 'non-fiction', 'mixed'
    challenges text default '{}', -- JSON array of challenge IDs
    current_comprehension_score integer default 0,
    onboarding_completed boolean default false,
    achievements text default '{}', -- JSON array of achievement IDs
    badges text default '{}', -- JSON array of badge IDs
    daily_reminder boolean default true,
    reminder_time time default '09:00:00',
    weekly_summary boolean default true,
    streak_days integer default 0,
    last_active_date timestamptz default now(),
    xp_earned integer default 0,
    level integer default 1,
    focus_score integer default 0,
    is_subscribed boolean default false,
    subscriptions text default '{}',
    date_of_birth date,

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);