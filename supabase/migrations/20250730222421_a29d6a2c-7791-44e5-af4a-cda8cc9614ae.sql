-- إضافة الجداول المفقودة فقط

-- جدول بيانات التواصل
CREATE TABLE IF NOT EXISTS public.contact_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  whatsapp TEXT,
  facebook TEXT,
  linkedin TEXT,
  twitter TEXT,
  office_hours TEXT,
  map_embed TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الوظائف
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[],
  benefits TEXT[],
  employment_type TEXT,
  experience_level TEXT,
  salary_range TEXT,
  is_active BOOLEAN DEFAULT true,
  apply_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول محتوى الصفحات الثابتة
CREATE TABLE IF NOT EXISTS public.page_contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- تفعيل Row Level Security للجداول الجديدة
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة
CREATE POLICY "Public can read contact info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Public can read jobs" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read page contents" ON public.page_contents FOR SELECT USING (true);

-- إضافة triggers للجداول الجديدة
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_contents_updated_at BEFORE UPDATE ON public.page_contents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- إدراج البيانات التجريبية
INSERT INTO public.contact_info (phone, email, address, whatsapp, office_hours) VALUES 
('+966501234567', 'info@lexihub.com', 'الرياض، حي الملك فهد، مبنى الأعمال، الطابق الخامس', '+966501234567', 'الأحد - الخميس: 9:00 ص - 6:00 م')
ON CONFLICT DO NOTHING;

INSERT INTO public.page_contents (page_key, title, content, meta_description) VALUES 
('about_us', 'من نحن', 'مكتب محاماة متخصص يقدم خدمات قانونية متميزة منذ أكثر من 15 عاماً', 'تعرف على مكتب محاماة ليكسي هاب وتاريخنا في تقديم الخدمات القانونية المتميزة'),
('privacy_policy', 'سياسة الخصوصية', 'نحن نحترم خصوصيتك ونحمي بياناتك الشخصية...', 'سياسة الخصوصية الخاصة بمكتب محاماة ليكسي هاب'),
('terms_conditions', 'الشروط والأحكام', 'تحكم هذه الشروط والأحكام استخدامك لموقعنا...', 'الشروط والأحكام لاستخدام موقع مكتب محاماة ليكسي هاب')
ON CONFLICT (page_key) DO NOTHING;