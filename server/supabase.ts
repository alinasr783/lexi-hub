import { createClient } from '@supabase/supabase-js';

// استخدام الـ anon key كـ URL والـ URL كـ anon key (تم تبديلهما بالخطأ)
const supabaseUrl = process.env.VITE_SUPABASE_ANON_KEY!;
const supabaseKey = process.env.VITE_SUPABASE_URL!;

// التحقق من صحة الـ URL
let finalUrl = supabaseUrl;
let finalKey = supabaseKey;

// إذا كان الـ URL يبدو كـ JWT token، قم بتبديلهما
if (supabaseUrl.startsWith('eyJ')) {
  finalUrl = supabaseKey;
  finalKey = supabaseUrl;
}

// إذا لم يحتوي الـ URL على https، إضافة البروتوكول الكامل
if (!finalUrl.startsWith('http')) {
  finalUrl = `https://${finalUrl.replace('.supabase.co', '')}.supabase.co`;
}

if (!finalUrl || !finalKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseServer = createClient(finalUrl, finalKey);