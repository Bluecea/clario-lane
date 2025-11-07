alter table "public"."users" drop column "totaltimespent";

alter table "public"."users" add column "total_time_spent" integer default 0;


