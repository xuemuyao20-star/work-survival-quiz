-- Access codes are stored as SHA-256 hashes. Only the Edge Function's service role
-- can consume a code; anonymous browser clients cannot read or change this table.
create schema if not exists private;
create extension if not exists pgcrypto with schema extensions;

create table if not exists private.access_codes (
  code_hash text primary key check (code_hash ~ '^[a-f0-9]{64}$'),
  uses_remaining integer not null default 5 check (uses_remaining between 0 and 5),
  created_at timestamptz not null default now(),
  disabled_at timestamptz
);

alter table private.access_codes enable row level security;
revoke all on schema private from public, anon, authenticated;
revoke all on table private.access_codes from public, anon, authenticated;
grant usage on schema private to service_role;
grant select, update on table private.access_codes to service_role;

-- A single atomic UPDATE makes simultaneous requests consume distinct uses and
-- never allows the remaining-use count to drop below zero.
create or replace function public.consume_access_code(p_code_hash text)
returns table (uses_remaining integer)
language sql
set search_path = ''
as $$
  update private.access_codes as c
     set uses_remaining = c.uses_remaining - 1
   where c.code_hash = p_code_hash
     and c.disabled_at is null
     and c.uses_remaining > 0
  returning c.uses_remaining;
$$;

revoke all on function public.consume_access_code(text) from public, anon, authenticated;
grant execute on function public.consume_access_code(text) to service_role;

