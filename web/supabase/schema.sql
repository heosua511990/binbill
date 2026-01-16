-- Create products table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  original_price numeric,
  image_url text not null,
  description text,
  category text default 'standard',
  condition text,
  is_hot boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- Create policies
-- 1. Public read access for active products
create policy "Public products are viewable by everyone"
  on public.products for select
  using ( is_active = true );

-- 2. Admin access (For simplicity in this demo, we might allow all authenticated users or specific emails)
-- Replace 'authenticated' with specific checks if needed.
create policy "Admins can do everything"
  on public.products for all
  to authenticated
  using ( true )
  with check ( true );

-- Storage bucket setup (Run this in SQL Editor if not using dashboard)
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

-- Storage policies
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'product-images' );
-- create policy "Admin Upload" on storage.objects for insert to authenticated with check ( bucket_id = 'product-images' );
