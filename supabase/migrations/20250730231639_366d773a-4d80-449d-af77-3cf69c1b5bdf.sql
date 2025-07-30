-- Create admins table for admin authentication
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access
CREATE POLICY "Admins can view their own data" 
ON public.admins 
FOR SELECT 
USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can update their own data" 
ON public.admins 
FOR UPDATE 
USING (auth.uid()::text = id::text);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_admins_updated_at
BEFORE UPDATE ON public.admins
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default admin (password should be hashed in real implementation)
INSERT INTO public.admins (email, password_hash, name) 
VALUES ('admin@lexihub.com', '$2a$10$example_hash_here', 'مدير النظام');