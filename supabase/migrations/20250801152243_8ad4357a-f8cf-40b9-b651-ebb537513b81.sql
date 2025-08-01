-- Add missing columns to consultation_page_settings table
ALTER TABLE public.consultation_page_settings 
ADD COLUMN IF NOT EXISTS booking_instructions text,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;