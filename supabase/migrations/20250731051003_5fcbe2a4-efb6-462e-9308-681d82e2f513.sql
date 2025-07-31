-- Remove any existing restrictive policies on storage.objects
DROP POLICY IF EXISTS "Allow everyone to view images" ON storage.objects;
DROP POLICY IF EXISTS "Allow everyone to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow everyone to update images" ON storage.objects;
DROP POLICY IF EXISTS "Allow everyone to delete images" ON storage.objects;

-- Disable RLS on storage.objects completely for maximum permissiveness
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Make sure the images bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Also make other buckets public for simplicity
UPDATE storage.buckets SET public = true WHERE id IN ('team-photos', 'article-images', 'service-images', 'general-images');