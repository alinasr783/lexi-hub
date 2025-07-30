-- إزالة جميع قواعد الأمان من جدول admins
DROP POLICY IF EXISTS "Admins can view their own data" ON public.admins;
DROP POLICY IF EXISTS "Admins can update their own data" ON public.admins;

-- إلغاء تفعيل RLS على جدول admins
ALTER TABLE public.admins DISABLE ROW LEVEL SECURITY;