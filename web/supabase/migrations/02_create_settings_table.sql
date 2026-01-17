-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
    key text PRIMARY KEY,
    value text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default values
INSERT INTO public.settings (key, value) VALUES
('contact_phone', '0909 999 999'),
('contact_zalo', 'https://zalo.me/0909999999'),
('contact_facebook', 'https://facebook.com/binbill')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid errors on re-run
DROP POLICY IF EXISTS "Public settings are viewable by everyone." ON public.settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can insert settings" ON public.settings;

-- Re-create policies
CREATE POLICY "Public settings are viewable by everyone." ON public.settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can update settings" ON public.settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert settings" ON public.settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
