create table if not exists profiles (
  id text primary key,
  created_at timestamptz not null default now()
);

create table if not exists workout_sessions (
  id text primary key,
  user_id text not null references profiles(id) on delete cascade,
  week_key text not null,
  day_key text not null,
  label text not null,
  type text not null,
  focus text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists workout_exercises (
  id text primary key,
  workout_session_id text not null references workout_sessions(id) on delete cascade,
  name text not null,
  exercise_type text not null,
  rep_range_min integer,
  rep_range_max integer,
  rep_range_label text,
  completed boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists workout_sets (
  id text primary key,
  workout_exercise_id text not null references workout_exercises(id) on delete cascade,
  set_index integer not null,
  weight text,
  reps text,
  rir text
);

create table if not exists meals (
  id text primary key,
  user_id text not null references profiles(id) on delete cascade,
  logged_at timestamptz not null default now(),
  meal_name text not null,
  meal_category text,
  text text,
  portion_multiplier numeric not null default 1,
  notes text,
  calories numeric not null default 0,
  protein numeric not null default 0,
  carbs numeric not null default 0,
  fat numeric not null default 0,
  fiber numeric not null default 0,
  structured_json jsonb not null default '{}'::jsonb
);

create table if not exists meal_items (
  id text primary key,
  meal_id text not null references meals(id) on delete cascade,
  food_id text,
  food_name text not null,
  source text not null default 'local',
  amount numeric,
  unit text,
  calories numeric not null default 0,
  protein numeric not null default 0,
  carbs numeric not null default 0,
  fat numeric not null default 0,
  fiber numeric not null default 0,
  micros jsonb not null default '{}'::jsonb
);

create table if not exists meal_templates (
  id text primary key,
  user_id text not null references profiles(id) on delete cascade,
  template_name text not null,
  meal_category text,
  text text,
  structured_json jsonb not null default '{}'::jsonb,
  is_favorite boolean not null default false,
  times_logged integer not null default 0,
  last_logged_at timestamptz
);

create table if not exists favorite_foods (
  id text primary key,
  user_id text not null references profiles(id) on delete cascade,
  source text not null,
  external_food_id text not null,
  food_name text not null,
  brand text,
  default_serving_json jsonb not null default '{}'::jsonb
);

create table if not exists recent_foods (
  id text primary key,
  user_id text not null references profiles(id) on delete cascade,
  source text not null,
  external_food_id text not null,
  food_name text not null,
  brand text,
  default_serving_json jsonb not null default '{}'::jsonb,
  last_used_at timestamptz not null default now(),
  times_used integer not null default 0
);

create index if not exists idx_workout_sessions_user_week on workout_sessions(user_id, week_key, day_key);
create index if not exists idx_meals_user_logged_at on meals(user_id, logged_at desc);
create index if not exists idx_meal_items_meal_id on meal_items(meal_id);
create index if not exists idx_meal_templates_user on meal_templates(user_id);
create index if not exists idx_recent_foods_user_used_at on recent_foods(user_id, last_used_at desc);
create index if not exists idx_favorite_foods_user on favorite_foods(user_id);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to anon, authenticated;

alter table profiles enable row level security;
alter table workout_sessions enable row level security;
alter table workout_exercises enable row level security;
alter table workout_sets enable row level security;
alter table meals enable row level security;
alter table meal_items enable row level security;
alter table meal_templates enable row level security;
alter table favorite_foods enable row level security;
alter table recent_foods enable row level security;

create policy "profiles own row" on profiles
  for all using (id = auth.uid()::text) with check (id = auth.uid()::text);

create policy "workout sessions own rows" on workout_sessions
  for all using (user_id = auth.uid()::text) with check (user_id = auth.uid()::text);

create policy "workout exercises through session owner" on workout_exercises
  for all using (
    exists (
      select 1 from workout_sessions
      where workout_sessions.id = workout_exercises.workout_session_id
        and workout_sessions.user_id = auth.uid()::text
    )
  )
  with check (
    exists (
      select 1 from workout_sessions
      where workout_sessions.id = workout_exercises.workout_session_id
        and workout_sessions.user_id = auth.uid()::text
    )
  );

create policy "workout sets through exercise owner" on workout_sets
  for all using (
    exists (
      select 1
      from workout_exercises
      join workout_sessions on workout_sessions.id = workout_exercises.workout_session_id
      where workout_exercises.id = workout_sets.workout_exercise_id
        and workout_sessions.user_id = auth.uid()::text
    )
  )
  with check (
    exists (
      select 1
      from workout_exercises
      join workout_sessions on workout_sessions.id = workout_exercises.workout_session_id
      where workout_exercises.id = workout_sets.workout_exercise_id
        and workout_sessions.user_id = auth.uid()::text
    )
  );

create policy "meals own rows" on meals
  for all using (user_id = auth.uid()::text) with check (user_id = auth.uid()::text);

create policy "meal items through meal owner" on meal_items
  for all using (
    exists (
      select 1
      from meals
      where meals.id = meal_items.meal_id
        and meals.user_id = auth.uid()::text
    )
  )
  with check (
    exists (
      select 1
      from meals
      where meals.id = meal_items.meal_id
        and meals.user_id = auth.uid()::text
    )
  );

create policy "meal templates own rows" on meal_templates
  for all using (user_id = auth.uid()::text) with check (user_id = auth.uid()::text);

create policy "favorite foods own rows" on favorite_foods
  for all using (user_id = auth.uid()::text) with check (user_id = auth.uid()::text);

create policy "recent foods own rows" on recent_foods
  for all using (user_id = auth.uid()::text) with check (user_id = auth.uid()::text);
