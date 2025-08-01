import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Plus, Search, Edit, Trash2, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface ConsultationService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  is_active: boolean;
  created_at: string;
}

const AdminConsultationServices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<ConsultationService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ConsultationService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    is_active: true
  });

  useEffect(() => {
    checkUser();
    loadServices();
  }, []);

  const checkUser = () => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
    }
  };

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('consultation_services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error loading consultation services:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل خدمات الاستشارة',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        const { error } = await supabase
          .from('consultation_services')
          .update(formData)
          .eq('id', editingService.id);

        if (error) throw error;

        toast({
          title: 'تم بنجاح',
          description: 'تم تحديث الخدمة بنجاح',
        });
      } else {
        const { error } = await supabase
          .from('consultation_services')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: 'تم بنجاح',
          description: 'تم إضافة الخدمة بنجاح',
        });
      }

      resetForm();
      loadServices();
    } catch (error) {
      console.error('Error saving consultation service:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حفظ الخدمة',
        variant: 'destructive',
      });
    }
  };

  const editService = (service: ConsultationService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      is_active: service.is_active
    });
    setShowForm(true);
  };

  const deleteService = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      const { error } = await supabase
        .from('consultation_services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'تم بنجاح',
        description: 'تم حذف الخدمة بنجاح',
      });

      loadServices();
    } catch (error) {
      console.error('Error deleting consultation service:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في حذف الخدمة',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      is_active: true
    });
    setEditingService(null);
    setShowForm(false);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold">إدارة خدمات الاستشارة</h1>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة خدمة جديدة
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">اسم الخدمة</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="مثال: استشارة قانونية عامة"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">السعر (بالجنيه المصري)</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="مثال: 500 جنيه"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">المدة المتوقعة</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="مثال: 30 دقيقة"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف الخدمة</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="اكتب وصف تفصيلي للخدمة..."
                    rows={3}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {editingService ? 'تحديث الخدمة' : 'إضافة الخدمة'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في خدمات الاستشارة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">لا توجد خدمات استشارة</p>
            <Button onClick={() => setShowForm(true)}>
              إضافة أول خدمة
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant={service.is_active ? "default" : "secondary"}>
                      {service.is_active ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>السعر:</strong> {service.price}</p>
                    <p><strong>المدة:</strong> {service.duration}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{service.description}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    {new Date(service.created_at).toLocaleDateString('ar-SA')}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editService(service)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteService(service.id)}
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

export default AdminConsultationServices;