import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TestimonialForm {
  client_name: string;
  testimonial: string;
  case_type: string;
  rating: number;
  is_featured: boolean;
  is_anonymous: boolean;
}

const AdminTestimonialForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TestimonialForm>({
    client_name: '',
    testimonial: '',
    case_type: '',
    rating: 5,
    is_featured: false,
    is_anonymous: false,
  });

  const isEditMode = !!id;

  useEffect(() => {
    checkUser();
    if (isEditMode) {
      loadTestimonial();
    }
  }, [id]);

  const checkUser = () => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
    }
  };

  const loadTestimonial = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setFormData({
        client_name: data.client_name || '',
        testimonial: data.testimonial || '',
        case_type: data.case_type || '',
        rating: data.rating || 5,
        is_featured: data.is_featured || false,
        is_anonymous: data.is_anonymous || false,
      });
    } catch (error) {
      console.error('Error loading testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل بيانات الرأي',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditMode) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'تم بنجاح',
          description: 'تم تحديث الرأي بنجاح',
        });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: 'تم بنجاح',
          description: 'تم إضافة الرأي بنجاح',
        });
      }

      navigate('/admin/testimonials');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حفظ الرأي',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof TestimonialForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/testimonials')}
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            العودة لآراء العملاء
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditMode ? 'تعديل رأي العميل' : 'إضافة رأي عميل جديد'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>بيانات الرأي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="client_name">اسم العميل</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => handleInputChange('client_name', e.target.value)}
                  placeholder="اسم العميل"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="case_type">نوع القضية</Label>
                <Input
                  id="case_type"
                  value={formData.case_type}
                  onChange={(e) => handleInputChange('case_type', e.target.value)}
                  placeholder="مثال: قضية تجارية، استشارة قانونية، أحوال شخصية"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial">نص الرأي</Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => handleInputChange('testimonial', e.target.value)}
                  placeholder="اكتب رأي العميل هنا..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">التقييم</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) => handleInputChange('rating', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التقييم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">⭐ (1)</SelectItem>
                    <SelectItem value="2">⭐⭐ (2)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_featured">رأي مميز</Label>
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_anonymous">رأي مجهول</Label>
                <Switch
                  id="is_anonymous"
                  checked={formData.is_anonymous}
                  onCheckedChange={(checked) => handleInputChange('is_anonymous', checked)}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'جاري الحفظ...' : (isEditMode ? 'تحديث الرأي' : 'إضافة الرأي')}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AdminTestimonialForm;