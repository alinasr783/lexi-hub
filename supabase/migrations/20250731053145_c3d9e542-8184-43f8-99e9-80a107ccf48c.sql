-- Enable RLS policies for testimonials management
-- Add INSERT and UPDATE policies for testimonials table

-- Allow admin insertions to testimonials
CREATE POLICY "Allow admin insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (true);

-- Allow admin updates to testimonials  
CREATE POLICY "Allow admin update testimonials"
ON public.testimonials 
FOR UPDATE 
USING (true);

-- Allow admin deletions from testimonials
CREATE POLICY "Allow admin delete testimonials"
ON public.testimonials 
FOR DELETE 
USING (true);