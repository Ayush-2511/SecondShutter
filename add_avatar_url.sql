-- Add avatar_url to store the Google Profile Picture
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS avatar_url TEXT;
