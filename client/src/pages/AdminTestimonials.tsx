import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Plus, Search, Eye, Edit, Trash2, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  client_name: string;
  testimonial: string;
  case_type: string;
  rating?: number;
  is_featured: boolean;
  is_anonymous: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkUser();
    loadTestimonials();
  }, []);

  const checkUser = () => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
    }
  };

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل آراء العملاء',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الرأي؟')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'تم بنجاح',
        description: 'تم حذف الرأي بنجاح',
      });

      loadTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف الرأي',
        variant: 'destructive',
      });
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.case_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.testimonial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للوحة التحكم
            </Button>
            <h1 className="text-3xl font-bold">إدارة آراء العملاء</h1>
          </div>
          <Button
            onClick={() => navigate('/admin/testimonials/new')}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة رأي جديد
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في آراء العملاء..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* Testimonials Grid */}
        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">لا توجد آراء عملاء</p>
            <Button onClick={() => navigate('/admin/testimonials/new')}>
              إضافة أول رأي
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {testimonial.is_anonymous ? 'عميل مجهول' : testimonial.client_name}
                    </CardTitle>
                    <div className="flex gap-1">
                      {testimonial.is_featured && (
                        <Badge variant="secondary">مميز</Badge>
                      )}
                      {testimonial.is_anonymous && (
                        <Badge variant="outline">مجهول</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{testimonial.case_type}</p>
                  {testimonial.rating && (
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.testimonial}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    {new Date(testimonial.created_at).toLocaleDateString('ar-SA')}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/testimonials/${testimonial.id}`)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      عرض
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/testimonials/${testimonial.id}/edit`)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonials;