-- Remove all RLS policies from contact_info table and allow full access
DROP POLICY IF EXISTS "Public can read contact info" ON public.contact_info;

-- Create new policies to allow full CRUD operations
CREATE POLICY "Allow all operations on contact_info" 
ON public.contact_info 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Make some fields optional in contact_info table
ALTER TABLE public.contact_info 
ALTER COLUMN phone DROP NOT NULL,
ALTER COLUMN email DROP NOT NULL,
ALTER COLUMN address DROP NOT NULL;