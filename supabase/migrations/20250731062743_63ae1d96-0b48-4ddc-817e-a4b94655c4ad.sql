-- إضافة عمود address_link إلى جدول contact_info
ALTER TABLE public.contact_info 
ADD COLUMN IF NOT EXISTS address_link text;

-- إنشاء جدول إعدادات صفحة الاستشارة إذا لم يكن موجود
CREATE TABLE IF NOT EXISTS public.consultation_page_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title text NOT NULL DEFAULT 'احجز استشارة قانونية',
  hero_description text NOT NULL DEFAULT 'احصل على استشارة قانونية متخصصة من فريق الخبراء لدينا',
  consultation_types json NOT NULL DEFAULT '[]',
  time_slots json NOT NULL DEFAULT '[]',
  case_types json NOT NULL DEFAULT '[]',
  booking_instructions text DEFAULT 'يرجى ملء النموذج بدقة وسنتواصل معك خلال 24 ساعة',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- تمكين RLS لجدول إعدادات صفحة الاستشارة
ALTER TABLE public.consultation_page_settings ENABLE ROW LEVEL SECURITY;

-- حذف السياسة إذا كانت موجودة وإعادة إنشاؤها
DROP POLICY IF EXISTS "Public can read consultation page settings" ON public.consultation_page_settings;

-- سياسة القراءة العامة
CREATE POLICY "Public can read consultation page settings" 
ON public.consultation_page_settings 
FOR SELECT 
USING (true);

-- إدراج البيانات الافتراضية
INSERT INTO public.consultation_page_settings (
  hero_title,
  hero_description,
  consultation_types,
  time_slots,
  case_types,
  booking_instructions
) 
SELECT 
  'احجز استشارة قانونية',
  'احصل على استشارة قانونية متخصصة من فريق الخبراء لدينا',
  '[
    {"id": "online", "name": "استشارة أونلاين", "duration": "30 دقيقة", "price": "مجانية"},
    {"id": "office", "name": "استشارة في المكتب", "duration": "60 دقيقة", "price": "حسب الحالة"},
    {"id": "phone", "name": "استشارة هاتفية", "duration": "20 دقيقة", "price": "مجانية"}
  ]',
  '[
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ]',
  '[
    "قضايا مدنية", "قضايا تجارية", "أحوال شخصية", "قضايا عمالية", "قضايا عقارية", "قضايا جنائية", "استشارات قانونية عامة"
  ]',
  'يرجى ملء النموذج بدقة وسنتواصل معك خلال 24 ساعة'
WHERE NOT EXISTS (SELECT 1 FROM public.consultation_page_settings);