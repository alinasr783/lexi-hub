-- إضافة العمود المفقود address_link إلى جدول contact_info
ALTER TABLE public.contact_info 
ADD COLUMN IF NOT EXISTS address_link text;

-- إنشاء جدول لإدارة صفحة الاستشارة من الداشبورد
CREATE TABLE IF NOT EXISTS public.consultation_page_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_title text NOT NULL DEFAULT 'احجز استشارة قانونية',
  hero_description text NOT NULL DEFAULT 'احصل على استشارة قانونية متخصصة من فريق من المحامين ذوي الخبرة',
  consultation_types jsonb NOT NULL DEFAULT '[]'::jsonb,
  time_slots jsonb NOT NULL DEFAULT '["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]'::jsonb,
  case_types jsonb NOT NULL DEFAULT '["استشارة عامة", "قضايا عمالية", "قضايا تجارية", "قضايا عقارية", "قضايا أسرية", "قضايا جنائية", "قضايا إدارية"]'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- تمكين RLS على الجدول الجديد
ALTER TABLE public.consultation_page_settings ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسة للقراءة العامة
CREATE POLICY "Public can read consultation page settings" 
ON public.consultation_page_settings 
FOR SELECT 
USING (true);

-- إدراج البيانات الافتراضية
INSERT INTO public.consultation_page_settings (
  hero_title,
  hero_description,
  consultation_types,
  case_types
) VALUES (
  'احجز استشارة قانونية',
  'احصل على استشارة قانونية متخصصة من فريق من المحامين ذوي الخبرة',
  '[
    {
      "id": "phone",
      "title": "استشارة هاتفية",
      "description": "استشارة سريعة عبر الهاتف",
      "duration": "30 دقيقة",
      "price": "مجانية"
    },
    {
      "id": "office",
      "title": "استشارة في المكتب",
      "description": "لقاء مباشر في مكتبنا",
      "duration": "60 دقيقة", 
      "price": "200 ريال"
    },
    {
      "id": "video",
      "title": "استشارة مرئية",
      "description": "استشارة عبر الفيديو",
      "duration": "45 دقيقة",
      "price": "150 ريال"
    }
  ]'::jsonb,
  '["استشارة عامة", "قضايا عمالية", "قضايا تجارية", "قضايا عقارية", "قضايا أسرية", "قضايا جنائية", "قضايا إدارية"]'::jsonb
) ON CONFLICT DO NOTHING;