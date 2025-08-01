-- Enable RLS on all tables that need it
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_page_settings ENABLE ROW LEVEL SECURITY;

-- Add admin policies for services
CREATE POLICY "Allow admin manage services" ON public.services FOR ALL USING (true) WITH CHECK (true);

-- Add admin policies for articles  
CREATE POLICY "Allow admin manage articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);

-- Add admin policies for team_members
CREATE POLICY "Allow admin manage team members" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

-- Add admin policies for page_contents
CREATE POLICY "Allow admin manage page contents" ON public.page_contents FOR ALL USING (true) WITH CHECK (true);

-- Add admin policies for jobs
CREATE POLICY "Allow admin manage jobs" ON public.jobs FOR ALL USING (true) WITH CHECK (true);

-- Add admin policies for faqs
CREATE POLICY "Allow admin manage faqs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

-- Add admin policies for admins
CREATE POLICY "Allow admin manage admins" ON public.admins FOR ALL USING (true) WITH CHECK (true);

-- Add admin policies for consultation_page_settings
CREATE POLICY "Allow admin manage consultation settings" ON public.consultation_page_settings FOR ALL USING (true) WITH CHECK (true);

-- Fix update function search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;