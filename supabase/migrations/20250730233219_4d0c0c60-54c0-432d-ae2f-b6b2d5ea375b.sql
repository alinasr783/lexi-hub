-- Update admins table to use plaintext password instead of hash
ALTER TABLE public.admins 
DROP COLUMN password_hash,
ADD COLUMN password text NOT NULL DEFAULT '';

-- Create contact_info table for site-wide settings
CREATE TABLE public.contact_info (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name text NOT NULL DEFAULT 'موقع المحامي',
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  address_link text,
  whatsapp text,
  facebook text,
  linkedin text,
  twitter text,
  office_hours text,
  map_embed text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on contact_info
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contact_info
CREATE POLICY "Public can read contact info" 
ON public.contact_info 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update contact info" 
ON public.contact_info 
FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.admins WHERE id::text = auth.uid()::text));

-- Create trigger for updated_at on contact_info
CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON public.contact_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default contact info record
INSERT INTO public.contact_info (
  site_name,
  phone,
  email,
  address,
  office_hours
) VALUES (
  'مكتب المحامي',
  '+20123456789',
  'info@lawyer-office.com',
  'القاهرة، مصر',
  'السبت - الخميس: 9:00 ص - 6:00 م'
);