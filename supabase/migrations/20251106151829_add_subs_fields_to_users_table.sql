alter table "public"."users" add column "issubscribed" boolean default false;

alter table "public"."users" add column "subscriptions" text default '{}'::text;


