-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create very permissive storage policies for all operations
CREATE POLICY "Allow everyone to view images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'images');

CREATE POLICY "Allow everyone to upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow everyone to update images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'images');

CREATE POLICY "Allow everyone to delete images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'images');