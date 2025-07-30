-- إنشاء الجداول الأساسية للمنصة القانونية

-- جدول المقالات
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author_name TEXT NOT NULL,
  category TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الخدمات القانونية
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  detailed_description TEXT,
  steps TEXT[],
  price_range TEXT,
  duration TEXT,
  image_url TEXT,
  icon TEXT,
  required_documents TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول فريق العمل
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  position TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  years_experience INTEGER,
  image_url TEXT,
  email TEXT,
  phone TEXT,
  linkedin TEXT,
  education TEXT[],
  achievements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الأسئلة الشائعة
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الشهادات
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  case_type TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول بيانات التواصل
CREATE TABLE public.contact_info (
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

-- جدول نموذج التواصل
CREATE TABLE public.contact_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول حجز الاستشارات
CREATE TABLE public.consultation_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  case_type TEXT NOT NULL,
  consultation_type TEXT,
  preferred_date DATE,
  preferred_time TIME,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- جدول الوظائف
CREATE TABLE public.jobs (
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
CREATE TABLE public.page_contents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- تفعيل Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة
CREATE POLICY "Public can read published articles" ON public.articles FOR SELECT USING (published = true);
CREATE POLICY "Public can read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can read team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Public can read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read contact info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Public can read jobs" ON public.jobs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read page contents" ON public.page_contents FOR SELECT USING (true);

-- سياسات الإدراج للنماذج
CREATE POLICY "Anyone can insert contact forms" ON public.contact_forms FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert consultation bookings" ON public.consultation_bookings FOR INSERT WITH CHECK (true);

-- إنشاء trigger لتحديث updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إضافة triggers للجداول
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_contents_updated_at BEFORE UPDATE ON public.page_contents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- إنشاء بعض البيانات التجريبية
INSERT INTO public.contact_info (phone, email, address, whatsapp, office_hours) VALUES 
('+966501234567', 'info@lexihub.com', 'الرياض، حي الملك فهد، مبنى الأعمال، الطابق الخامس', '+966501234567', 'الأحد - الخميس: 9:00 ص - 6:00 م');

INSERT INTO public.page_contents (page_key, title, content, meta_description) VALUES 
('about_us', 'من نحن', 'مكتب محاماة متخصص يقدم خدمات قانونية متميزة منذ أكثر من 15 عاماً', 'تعرف على مكتب محاماة ليكسي هاب وتاريخنا في تقديم الخدمات القانونية المتميزة'),
('privacy_policy', 'سياسة الخصوصية', 'نحن نحترم خصوصيتك ونحمي بياناتك الشخصية...', 'سياسة الخصوصية الخاصة بمكتب محاماة ليكسي هاب'),
('terms_conditions', 'الشروط والأحكام', 'تحكم هذه الشروط والأحكام استخدامك لموقعنا...', 'الشروط والأحكام لاستخدام موقع مكتب محاماة ليكسي هاب');

-- إدراج بعض الخدمات التجريبية
INSERT INTO public.services (title, slug, description, detailed_description, icon, price_range) VALUES 
('الاستشارات القانونية', 'legal-consultation', 'استشارات قانونية شاملة في جميع المجالات', 'نقدم استشارات قانونية متخصصة تساعدك في اتخاذ القرارات الصحيحة...', 'Scale', '500 - 2000 ريال'),
('القضايا التجارية', 'commercial-cases', 'تمثيل قانوني في القضايا التجارية والتجارة الإلكترونية', 'فريقنا متخصص في حل النزاعات التجارية وحماية حقوق الشركات...', 'Building', '3000 - 15000 ريال'),
('قضايا الأحوال الشخصية', 'family-law', 'قضايا الزواج والطلاق والحضانة والنفقة', 'نتعامل مع قضايا الأسرة بحساسية عالية وخبرة واسعة...', 'Heart', '2000 - 8000 ريال');

INSERT INTO public.team_members (name, slug, position, specialization, bio, years_experience) VALUES 
('أ. محمد أحمد', 'mohamed-ahmed', 'المؤسس والشريك الإداري', 'القانون التجاري والشركات', 'محامي متخصص في القانون التجاري مع خبرة تزيد عن 15 عاماً', 15),
('أ. سارة محمد', 'sarah-mohammed', 'شريك أول', 'قضايا الأحوال الشخصية', 'محامية متخصصة في قضايا الأسرة والأحوال الشخصية', 12);

INSERT INTO public.faqs (question, answer, category, order_index) VALUES 
('كم تستغرق الاستشارة القانونية؟', 'عادة ما تستغرق الاستشارة من 30 إلى 60 دقيقة حسب تعقيد الحالة', 'عام', 1),
('هل يمكنني الحصول على استشارة هاتفية؟', 'نعم، نوفر استشارات هاتفية ومرئية عبر الإنترنت', 'عام', 2);

INSERT INTO public.testimonials (client_name, testimonial, case_type, rating, is_featured) VALUES 
('أحمد علي', 'خدمة ممتازة وتعامل راقي، تم حل قضيتي بشكل مثالي', 'قضايا تجارية', 5, true),
('فاطمة محمد', 'أشكر الفريق على التعامل المهني والنتائج المبهرة', 'أحوال شخصية', 5, true);