-- Fix contact_info table by adding site_name column
ALTER TABLE public.contact_info 
ADD COLUMN site_name TEXT;