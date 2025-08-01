import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AboutData {
  id: string;
  title: string;
  content: string;
  meta_description: string;
  image_url?: string;
}

const AdminAbout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    meta_description: '',
    image_url: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
    
    fetchAboutData();
  }, [navigate]);

  const fetchAboutData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('page_contents')
        .select('*')
        .eq('page_key', 'about_us')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setAboutData(data as AboutData);
        setFormData({
          title: data.title || '',
          content: data.content || '',
          meta_description: data.meta_description || '',
          image_url: data.image_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);

      if (aboutData) {
        // Update existing
        const { error } = await supabase
          .from('page_contents')
          .update({
            title: formData.title,
            content: formData.content,
            meta_description: formData.meta_description,
            image_url: formData.image_url || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', aboutData.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('page_contents')
          .insert([{
            page_key: 'about_us',
            title: formData.title,
            content: formData.content,
            meta_description: formData.meta_description,
            image_url: formData.image_url || null
          }]);

        if (error) throw error;
      }

      toast({
        title: "تم حفظ البيانات بنجاح",
        description: "تم تحديث صفحة من نحن بنجاح",
      });

      // Refresh data
      await fetchAboutData();
      
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>جارٍ تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للوحة التحكم
            </Button>
            <h1 className="text-3xl font-bold">إدارة صفحة من نحن</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => window.open('/about', '_blank')}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            معاينة الصفحة
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* معلومات أساسية */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">عنوان الصفحة</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="من نحن"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="meta_description">وصف الصفحة (للمحركات البحث)</Label>
                <Input
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleInputChange('meta_description', e.target.value)}
                  placeholder="وصف مختصر عن صفحة من نحن"
                />
              </div>

              <div>
                <Label htmlFor="image_url">رابط الصورة الرئيسية (اختياري)</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* المحتوى */}
          <Card>
            <CardHeader>
              <CardTitle>محتوى الصفحة</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="content">المحتوى</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="اكتب محتوى صفحة من نحن هنا..."
                  rows={15}
                  className="mt-2"
                  required
                />
                <p className="text-sm text-muted-foreground mt-2">
                  يمكنك استخدام **النص الغامق** و *النص المائل* و # العناوين
                </p>
              </div>
            </CardContent>
          </Card>

          {/* أزرار الحفظ */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              إلغاء
            </Button>
            <Button 
              type="submit" 
              className="flex items-center gap-2"
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAbout;