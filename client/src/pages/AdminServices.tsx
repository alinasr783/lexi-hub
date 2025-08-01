import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  DollarSign,
  Clock
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailed_description?: string;
  price_range?: string;
  duration?: string;
  icon?: string;
  created_at: string;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadServices();
  }, []);

  const checkUser = () => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
  };

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل الخدمات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف الخدمة بنجاح",
      });
      
      loadServices();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الخدمة",
        variant: "destructive",
      });
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
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
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للوحة الإدارة
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-xl">إدارة الخدمات</h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate('/admin/services/new')}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة خدمة جديدة
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="البحث في الخدمات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {service.price_range && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {service.price_range}
                    </Badge>
                  )}
                  {service.duration && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.duration}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/services/${service.slug}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    عرض
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد خدمات</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'لم يتم العثور على خدمات تطابق البحث' : 'لم يتم إضافة أي خدمات بعد'}
            </p>
            <Button onClick={() => navigate('/admin/services/new')}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة أول خدمة
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminServices;