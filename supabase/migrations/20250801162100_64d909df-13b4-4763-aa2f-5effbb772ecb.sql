-- حذف كل RLS policies وإيقاف RLS على كل الجداول
-- Drop all RLS policies
DROP POLICY IF EXISTS "Public can read services" ON public.services;
DROP POLICY IF EXISTS "Allow admin manage services" ON public.services;
DROP POLICY IF EXISTS "Public can read articles" ON public.articles;
DROP POLICY IF EXISTS "Allow admin manage articles" ON public.articles;
DROP POLICY IF EXISTS "Public can read team members" ON public.team_members;
DROP POLICY IF EXISTS "Allow admin manage team members" ON public.team_members;
DROP POLICY IF EXISTS "Public can read page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Allow admin manage page contents" ON public.page_contents;
DROP POLICY IF EXISTS "Public can read jobs" ON public.jobs;
DROP POLICY IF EXISTS "Allow admin manage jobs" ON public.jobs;
DROP POLICY IF EXISTS "Public can read faqs" ON public.faqs;
DROP POLICY IF EXISTS "Allow admin manage faqs" ON public.faqs;
DROP POLICY IF EXISTS "Allow admin manage admins" ON public.admins;
DROP POLICY IF EXISTS "Allow admin manage consultation settings" ON public.consultation_page_settings;
DROP POLICY IF EXISTS "Public can read consultation page settings" ON public.consultation_page_settings;
DROP POLICY IF EXISTS "Anyone can insert contact forms" ON public.contact_forms;
DROP POLICY IF EXISTS "Allow all operations on consultation_bookings" ON public.consultation_bookings;
DROP POLICY IF EXISTS "Allow all operations on contact_info" ON public.contact_info;
DROP POLICY IF EXISTS "Public can read testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow admin delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow admin insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow admin update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can read consultation services" ON public.consultation_services;
DROP POLICY IF EXISTS "Allow admin insert consultation services" ON public.consultation_services;
DROP POLICY IF EXISTS "Allow admin update consultation services" ON public.consultation_services;
DROP POLICY IF EXISTS "Allow admin delete consultation services" ON public.consultation_services;

-- Disable RLS on all tables
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_contents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_page_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_services DISABLE ROW LEVEL SECURITY;