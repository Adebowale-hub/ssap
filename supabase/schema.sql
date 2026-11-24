-- ============================================================
-- SSAP: Database Schema for Minimalist Event Ticketing SaaS
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Organizers)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. EVENTS
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  slug text not null unique,
  description text,
  date date not null,
  time text not null,
  end_date date,
  end_time text,
  location text not null,
  cover_image text,
  is_published boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TICKET TYPES (Tiers per event)
create table if not exists public.ticket_types (
  id uuid default gen_random_uuid() primary key,
  event_id uuid references public.events(id) on delete cascade not null,
  name text not null,
  description text,
  price integer default 0 not null, -- stored in cents (0 = free)
  quantity integer not null check (quantity > 0),
  sold integer default 0 not null check (sold >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ATTENDEES
create table if not exists public.attendees (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. TICKETS (Issued tickets with QR codes)
create table if not exists public.tickets (
  id text primary key, -- e.g. TKT-ABC123
  event_id uuid references public.events(id) on delete cascade not null,
  ticket_type_id uuid references public.ticket_types(id) on delete cascade not null,
  attendee_id uuid references public.attendees(id) on delete cascade not null,
  status text default 'valid' not null check (status in ('valid', 'used', 'cancelled')),
  qr_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. CHECK-INS
create table if not exists public.check_ins (
  id uuid default gen_random_uuid() primary key,
  ticket_id text references public.tickets(id) on delete cascade not null,
  event_id uuid references public.events(id) on delete cascade not null,
  checked_in_at timestamp with time zone default timezone('utc'::text, now()) not null,
  checked_in_by uuid references public.profiles(id) on delete set null
);

-- 7. TEAM MEMBERS (Premium feature)
create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  organizer_id uuid references public.profiles(id) on delete cascade not null,
  email text not null,
  role text default 'scanner' not null check (role in ('admin', 'scanner')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (organizer_id, email)
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.ticket_types enable row level security;
alter table public.attendees enable row level security;
alter table public.tickets enable row level security;
alter table public.check_ins enable row level security;
alter table public.team_members enable row level security;

-- Profiles: users can read and update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Events: anyone can view published events; organizers can manage own events
create policy "Anyone can view published events" on public.events
  for select using (is_published = true);

create policy "Organizers manage their own events" on public.events
  for all using (auth.uid() = user_id);

-- Ticket Types: public read; organizer write
create policy "Public can read ticket types" on public.ticket_types
  for select using (true);

create policy "Organizers can manage ticket types" on public.ticket_types
  for all using (
    exists (
      select 1 from public.events
      where public.events.id = public.ticket_types.event_id
      and public.events.user_id = auth.uid()
    )
  );

-- Tickets: anyone with the ticket ID can view their ticket; organizers can view all event tickets
create policy "View own ticket" on public.tickets
  for select using (true);

create policy "Organizers can view event tickets" on public.tickets
  for all using (
    exists (
      select 1 from public.events
      where public.events.id = public.tickets.event_id
      and public.events.user_id = auth.uid()
    )
  );
