create table if not exists practice_sessions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    passage_id uuid null references passages(id) on delete set null,
    exercise_id uuid null references exercises(id) on delete set null,
    wpm integer not null,
    comprehension integer not null,
    timeSpent integer not null, -- in seconds
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);