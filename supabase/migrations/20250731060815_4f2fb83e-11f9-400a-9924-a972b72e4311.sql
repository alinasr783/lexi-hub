-- إزالة جميع قيود RLS من جدول consultation_bookings لضمان الإرسال
DROP POLICY IF EXISTS "Anyone can insert consultation bookings" ON public.consultation_bookings;

-- إنشاء سياسة شاملة تسمح بكل العمليات
CREATE POLICY "Allow all operations on consultation_bookings" 
ON public.consultation_bookings 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- تحسين جدول consultation_bookings
ALTER TABLE public.consultation_bookings 
ALTER COLUMN name DROP NOT NULL,
ALTER COLUMN email DROP NOT NULL;