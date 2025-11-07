alter table "public"."practice_sessions" drop column "comprehensionscore";

alter table "public"."practice_sessions" add column "comprehension" integer not null;

alter table "public"."users" drop column "baselinecomprehension";

alter table "public"."users" drop column "baselinewpm";

alter table "public"."users" drop column "contenttype";

alter table "public"."users" drop column "currentcomprehensionscore";

alter table "public"."users" drop column "currentwpm";

alter table "public"."users" drop column "dailyreminder";

alter table "public"."users" drop column "focusscore";

alter table "public"."users" drop column "issubscribed";

alter table "public"."users" drop column "lastactivedate";

alter table "public"."users" drop column "onboardingcompleted";

alter table "public"."users" drop column "remindertime";

alter table "public"."users" drop column "streakdays";

alter table "public"."users" drop column "totalsessions";

alter table "public"."users" drop column "weeklysummary";

alter table "public"."users" drop column "xpearned";

alter table "public"."users" add column "baseline_comprehension" integer default 0;

alter table "public"."users" add column "baseline_wpm" integer default 0;

alter table "public"."users" add column "content_type" text default 'mixed'::text;

alter table "public"."users" add column "current_comprehension_score" integer default 0;

alter table "public"."users" add column "current_wpm" integer default 0;

alter table "public"."users" add column "daily_reminder" boolean default true;

alter table "public"."users" add column "date_of_birth" date;

alter table "public"."users" add column "focus_score" integer default 0;

alter table "public"."users" add column "is_subscribed" boolean default false;

alter table "public"."users" add column "last_active_date" timestamp with time zone default now();

alter table "public"."users" add column "onboarding_completed" boolean default false;

alter table "public"."users" add column "reminder_time" time without time zone default '09:00:00'::time without time zone;

alter table "public"."users" add column "streak_days" integer default 0;

alter table "public"."users" add column "total_sessions" integer default 0;

alter table "public"."users" add column "weekly_summary" boolean default true;

alter table "public"."users" add column "xp_earned" integer default 0;


