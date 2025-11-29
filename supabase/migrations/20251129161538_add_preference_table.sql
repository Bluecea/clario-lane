drop trigger if exists "handle_updated_at" on "public"."user_preferences";

drop policy "Users can insert their own preferences" on "public"."user_preferences";

drop policy "Users can update their own preferences" on "public"."user_preferences";

drop policy "Users can view their own preferences" on "public"."user_preferences";

revoke delete on table "public"."user_preferences" from "anon";

revoke insert on table "public"."user_preferences" from "anon";

revoke references on table "public"."user_preferences" from "anon";

revoke select on table "public"."user_preferences" from "anon";

revoke trigger on table "public"."user_preferences" from "anon";

revoke truncate on table "public"."user_preferences" from "anon";

revoke update on table "public"."user_preferences" from "anon";

revoke delete on table "public"."user_preferences" from "authenticated";

revoke insert on table "public"."user_preferences" from "authenticated";

revoke references on table "public"."user_preferences" from "authenticated";

revoke select on table "public"."user_preferences" from "authenticated";

revoke trigger on table "public"."user_preferences" from "authenticated";

revoke truncate on table "public"."user_preferences" from "authenticated";

revoke update on table "public"."user_preferences" from "authenticated";

revoke delete on table "public"."user_preferences" from "service_role";

revoke insert on table "public"."user_preferences" from "service_role";

revoke references on table "public"."user_preferences" from "service_role";

revoke select on table "public"."user_preferences" from "service_role";

revoke trigger on table "public"."user_preferences" from "service_role";

revoke truncate on table "public"."user_preferences" from "service_role";

revoke update on table "public"."user_preferences" from "service_role";

alter table "public"."user_preferences" drop constraint "user_preferences_user_id_fkey";

drop function if exists "public"."handle_updated_at"();

alter table "public"."user_preferences" drop constraint "user_preferences_pkey";

drop index if exists "public"."idx_passages_difficulty";

drop index if exists "public"."user_preferences_pkey";

drop table "public"."user_preferences";

alter table "public"."passages" drop column "category";

alter table "public"."passages" drop column "difficulty";

alter table "public"."passages" drop column "questions";

alter table "public"."passages" drop column "title";


