-- Create very permissive policies for storage.objects
CREATE POLICY "Anyone can view all files" 
ON storage.objects 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can upload files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update files" 
ON storage.objects 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete files" 
ON storage.objects 
FOR DELETE 
USING (true);

-- Make sure the images bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;