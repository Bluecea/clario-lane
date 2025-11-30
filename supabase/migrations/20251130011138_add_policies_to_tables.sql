alter table "public"."paystack_payloads" drop constraint "paystack_payloads_user_id_fkey";

alter table "public"."practice_sessions" drop constraint "practice_sessions_user_id_fkey";

alter table "public"."challenges" enable row level security;

alter table "public"."content_types" enable row level security;

alter table "public"."exercises" enable row level security;

alter table "public"."goals" enable row level security;

alter table "public"."passages" enable row level security;

alter table "public"."paystack_payloads" enable row level security;

alter table "public"."practice_sessions" enable row level security;

alter table "public"."users" alter column "id" drop default;

alter table "public"."users" enable row level security;

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."paystack_payloads" add constraint "paystack_payloads_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."paystack_payloads" validate constraint "paystack_payloads_user_id_fkey";

alter table "public"."practice_sessions" add constraint "practice_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."practice_sessions" validate constraint "practice_sessions_user_id_fkey";


  create policy "Authenticated users can select challenges"
  on "public"."challenges"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Service role can manage challenges"
  on "public"."challenges"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Authenticated users can select content types"
  on "public"."content_types"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Service role can manage content types"
  on "public"."content_types"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Authenticated users can select exercises"
  on "public"."exercises"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Service role can manage exercises"
  on "public"."exercises"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Authenticated users can select goals"
  on "public"."goals"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Service role can manage goals"
  on "public"."goals"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Authenticated users can select passages"
  on "public"."passages"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Service role can manage passages"
  on "public"."passages"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Service role can manage paystack payloads"
  on "public"."paystack_payloads"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Service role can view all practice sessions"
  on "public"."practice_sessions"
  as permissive
  for select
  to service_role
using (true);



  create policy "Users can insert their own practice sessions"
  on "public"."practice_sessions"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = user_id));



  create policy "Users can view their own practice sessions"
  on "public"."practice_sessions"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can delete their own data"
  on "public"."users"
  as permissive
  for delete
  to authenticated
using ((auth.uid() = id));



  create policy "Users can insert their own data"
  on "public"."users"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = id));



  create policy "Users can update their own data"
  on "public"."users"
  as permissive
  for update
  to authenticated
using ((auth.uid() = id));



  create policy "Users can view their own data"
  on "public"."users"
  as permissive
  for select
  to authenticated
using ((auth.uid() = id));


-- Enable realtime for users table
alter publication supabase_realtime add table users;
