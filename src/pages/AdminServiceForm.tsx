import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ImageUpload } from '@/components/ui/image-upload';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Scale, ArrowLeft, Save, Plus, X } from 'lucide-react';

interface ServiceFormData {
  title: string;
  slug: string;
  description: string;
  detailed_description: string;
  price_range: string;
  duration: string;
  icon: string;
  image: string;
  required_documents: string[];
}

const AdminServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [documentInput, setDocumentInput] = useState('');
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    slug: '',
    description: '',
    detailed_description: '',
    price_range: '',
    duration: '',
    icon: '',
    image: '',
    required_documents: []
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }

    if (isEditing) {
      loadService();
    }
  }, [id, navigate]);

  const loadService = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الخدمة",
        variant: "destructive",
      });
      navigate('/admin/services');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleInputChange = (field: keyof ServiceFormData, value: string | string[]) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title') {
        updated.slug = generateSlug(value as string);
      }
      return updated;
    });
  };

  const addDocument = () => {
    if (documentInput.trim()) {
      setFormData(prev => ({
        ...prev,
        required_documents: [...prev.required_documents, documentInput.trim()]
      }));
      setDocumentInput('');
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      required_documents: prev.required_documents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: "تم التحديث",
          description: "تم تحديث الخدمة بنجاح",
        });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: "تم الإنشاء",
          description: "تم إنشاء الخدمة بنجاح",
        });
      }

      navigate('/admin/services');
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ الخدمة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Scale className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/services')}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للخدمات
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-xl">
                    {isEditing ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
                  </h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الخدمة الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">اسم الخدمة *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="أدخل اسم الخدمة"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">الرابط المخصص</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="سيتم إنشاؤه تلقائياً"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price_range">نطاق السعر</Label>
                  <Input
                    id="price_range"
                    value={formData.price_range}
                    onChange={(e) => handleInputChange('price_range', e.target.value)}
                    placeholder="مثال: 500-1000 ريال"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">المدة المتوقعة</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="مثال: 1-2 أسبوع"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">أيقونة الخدمة</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => handleInputChange('icon', e.target.value)}
                    placeholder="اسم الأيقونة من Lucide"
                  />
                </div>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => handleInputChange('image', url)}
                  bucket="service-images"
                  folder="main"
                  label="صورة الخدمة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف مختصر *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="وصف مختصر للخدمة..."
                  className="min-h-[80px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>التفاصيل الكاملة</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={formData.detailed_description}
                onChange={(content) => handleInputChange('detailed_description', content)}
                label="الوصف التفصيلي"
                placeholder="الوصف التفصيلي للخدمة وما تشمله..."
                minHeight="300px"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المستندات المطلوبة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={documentInput}
                  onChange={(e) => setDocumentInput(e.target.value)}
                  placeholder="أدخل اسم المستند المطلوب"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDocument())}
                />
                <Button type="button" onClick={addDocument}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.required_documents.map((doc, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {doc}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => removeDocument(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 md:flex-none"
            >
              {loading ? (
                <>
                  <Scale className="w-4 h-4 mr-2 animate-pulse" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'تحديث الخدمة' : 'إنشاء الخدمة'}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/services')}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminServiceForm;