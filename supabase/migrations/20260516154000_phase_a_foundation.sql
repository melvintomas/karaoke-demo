create extension if not exists pgcrypto;

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  host_participant_id uuid,
  active_queue_item_id uuid,
  status text not null default 'lobby',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint rooms_status_check check (status in ('lobby', 'playing', 'paused', 'ended'))
);

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  display_name text not null,
  is_host boolean not null default false,
  joined_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  artist text not null,
  duration_ms integer not null,
  audio_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lyric_lines (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references public.songs(id) on delete cascade,
  line_index integer not null,
  start_ms integer not null,
  end_ms integer not null,
  text text not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint lyric_lines_song_line_unique unique (song_id, line_index)
);

create table if not exists public.queue_items (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  song_id uuid not null references public.songs(id) on delete restrict,
  queued_by_participant_id uuid not null references public.participants(id) on delete restrict,
  position integer not null,
  status text not null default 'queued',
  created_at timestamptz not null default timezone('utc', now()),
  constraint queue_items_room_position_unique unique (room_id, position),
  constraint queue_items_status_check check (status in ('queued', 'playing', 'completed', 'skipped'))
);

alter table public.rooms
  add constraint rooms_host_participant_id_fkey
  foreign key (host_participant_id)
  references public.participants(id)
  on delete set null;

alter table public.rooms
  add constraint rooms_active_queue_item_id_fkey
  foreign key (active_queue_item_id)
  references public.queue_items(id)
  on delete set null;

create index if not exists participants_room_id_idx on public.participants(room_id);
create index if not exists lyric_lines_song_id_idx on public.lyric_lines(song_id);
create index if not exists queue_items_room_id_idx on public.queue_items(room_id);
create index if not exists queue_items_song_id_idx on public.queue_items(song_id);
