-- Disable RLS on content management tables to allow admin operations
-- This removes all security restrictions for content management

-- Disable RLS on articles table
ALTER TABLE public.articles DISABLE ROW LEVEL SECURITY;

-- Disable RLS on services table  
ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;

-- Disable RLS on team_members table
ALTER TABLE public.team_members DISABLE ROW LEVEL SECURITY;

-- Disable RLS on testimonials table
ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;

-- Disable RLS on page_contents table
ALTER TABLE public.page_contents DISABLE ROW LEVEL SECURITY;

-- Disable RLS on contact_info table
ALTER TABLE public.contact_info DISABLE ROW LEVEL SECURITY;

-- Keep RLS only on contact_forms and consultation_bookings for basic form protection
-- But allow full access to all content management tables