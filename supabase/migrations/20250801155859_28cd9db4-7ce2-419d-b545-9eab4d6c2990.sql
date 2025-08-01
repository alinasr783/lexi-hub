-- Create consultation_services table
CREATE TABLE public.consultation_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  duration TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultation_services ENABLE ROW LEVEL SECURITY;

-- Create policies for consultation_services
CREATE POLICY "Public can read consultation services" 
ON public.consultation_services 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Allow admin insert consultation services" 
ON public.consultation_services 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow admin update consultation services" 
ON public.consultation_services 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow admin delete consultation services" 
ON public.consultation_services 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultation_services_updated_at
BEFORE UPDATE ON public.consultation_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default consultation services with Egyptian Pound pricing
INSERT INTO public.consultation_services (name, description, price, duration) VALUES
('استشارة قانونية عامة', 'استشارة شاملة حول المسائل القانونية العامة مع محامي متخصص', '500 جنيه مصري', '30 دقيقة'),
('استشارة قضايا تجارية', 'استشارة متخصصة في القانون التجاري والشركات والعقود التجارية', '800 جنيه مصري', '45 دقيقة'),
('استشارة أحوال شخصية', 'استشارة في قضايا الزواج والطلاق والحضانة والميراث', '600 جنيه مصري', '30 دقيقة'),
('استشارة قضايا عمالية', 'استشارة في قانون العمل وحقوق العمال ومنازعات العمل', '700 جنيه مصري', '45 دقيقة'),
('استشارة قضايا عقارية', 'استشارة في عقود البيع والشراء والإيجار والتطوير العقاري', '750 جنيه مصري', '45 دقيقة'),
('استشارة قانونية مطولة', 'جلسة استشارية مطولة لمراجعة شاملة للقضية والخيارات المتاحة', '1200 جنيه مصري', '90 دقيقة');