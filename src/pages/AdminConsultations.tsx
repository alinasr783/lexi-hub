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
  Search, 
  Eye,
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  case_type: string;
  consultation_type?: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
  status: string;
  created_at: string;
}

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadConsultations();
  }, []);

  const checkUser = () => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
  };

  const loadConsultations = async () => {
    try {
      const { data, error } = await supabase
        .from('consultation_bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConsultations(data || []);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل طلبات الاستشارة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('consultation_bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم التحديث",
        description: "تم تحديث حالة الطلب بنجاح",
      });
      
      loadConsultations();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث الطلب",
        variant: "destructive",
      });
    }
  };

  const filteredConsultations = consultations.filter(consultation =>
    consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.case_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

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
                  <h1 className="font-bold text-xl">طلبات الاستشارة</h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="البحث في طلبات الاستشارة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Consultations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultations.map((consultation) => (
            <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{consultation.name}</CardTitle>
                  <Badge className={getStatusColor(consultation.status)}>
                    {getStatusText(consultation.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{consultation.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{consultation.phone}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge variant="outline">{consultation.case_type}</Badge>
                  {consultation.consultation_type && (
                    <Badge variant="secondary">{consultation.consultation_type}</Badge>
                  )}
                </div>

                {(consultation.preferred_date || consultation.preferred_time) && (
                  <div className="space-y-2">
                    {consultation.preferred_date && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(consultation.preferred_date).toLocaleDateString('ar-EG')}</span>
                      </div>
                    )}
                    {consultation.preferred_time && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{consultation.preferred_time}</span>
                      </div>
                    )}
                  </div>
                )}

                {consultation.message && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm line-clamp-3">{consultation.message}</p>
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  تاريخ الطلب: {new Date(consultation.created_at).toLocaleDateString('ar-EG')}
                </div>

                <div className="flex gap-2 pt-2">
                  {consultation.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(consultation.id, 'confirmed')}
                    >
                      تأكيد
                    </Button>
                  )}
                  {consultation.status === 'confirmed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(consultation.id, 'completed')}
                    >
                      إكمال
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/consultations/${consultation.id}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    عرض
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد طلبات استشارة</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'لم يتم العثور على طلبات تطابق البحث' : 'لم يتم تلقي أي طلبات بعد'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminConsultations;