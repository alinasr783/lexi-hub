import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scale, 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Eye,
  Plus,
  Settings,
  LogOut,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalServices: 0,
    totalTeamMembers: 0,
    totalConsultations: 0,
    totalContacts: 0,
    totalTestimonials: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadStats();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
        return;
      }
      setUser(user);
    } catch (error) {
      navigate('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const [
        { count: articlesCount },
        { count: servicesCount },
        { count: teamCount },
        { count: consultationsCount },
        { count: contactsCount },
        { count: testimonialsCount }
      ] = await Promise.all([
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('consultation_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('contact_forms').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        totalArticles: articlesCount || 0,
        totalServices: servicesCount || 0,
        totalTeamMembers: teamCount || 0,
        totalConsultations: consultationsCount || 0,
        totalContacts: contactsCount || 0,
        totalTestimonials: testimonialsCount || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
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

  const statsCards = [
    {
      title: 'المقالات',
      value: stats.totalArticles,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      link: '/admin/articles'
    },
    {
      title: 'الخدمات',
      value: stats.totalServices,
      icon: Scale,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      link: '/admin/services'
    },
    {
      title: 'أعضاء الفريق',
      value: stats.totalTeamMembers,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      link: '/admin/team'
    },
    {
      title: 'طلبات الاستشارة',
      value: stats.totalConsultations,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      link: '/admin/consultations'
    },
    {
      title: 'رسائل التواصل',
      value: stats.totalContacts,
      icon: MessageSquare,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      link: '/admin/contacts'
    },
    {
      title: 'آراء العملاء',
      value: stats.totalTestimonials,
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      link: '/admin/testimonials'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl">لوحة الإدارة</h1>
                <p className="text-sm text-muted-foreground">ليكسي هاب</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <Eye className="w-4 h-4 mr-2" />
                عرض الموقع
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">مرحباً بك في لوحة الإدارة</h2>
          <p className="text-muted-foreground">إدارة محتوى موقع ليكسي هاب للمحاماة والاستشارات القانونية</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(stat.link)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">إدارة المحتوى</TabsTrigger>
            <TabsTrigger value="communications">التواصل</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    المقالات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    إدارة المقالات القانونية والمحتوى التعليمي
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="btn-secondary" onClick={() => navigate('/admin/articles/new')}>
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة مقال
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/articles')}>
                      عرض الكل
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    الخدمات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    إدارة الخدمات القانونية المقدمة
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="btn-secondary" onClick={() => navigate('/admin/services/new')}>
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة خدمة
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/services')}>
                      عرض الكل
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    الفريق
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    إدارة أعضاء فريق المحاماة
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="btn-secondary" onClick={() => navigate('/admin/team/new')}>
                      <Plus className="w-4 h-4 mr-2" />
                      إضافة عضو
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin/team')}>
                      عرض الكل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    طلبات الاستشارة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    عرض وإدارة طلبات الاستشارات القانونية
                  </p>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/consultations')}>
                    عرض الطلبات ({stats.totalConsultations})
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    رسائل التواصل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    عرض رسائل التواصل من العملاء
                  </p>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/contacts')}>
                    عرض الرسائل ({stats.totalContacts})
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    إعدادات الموقع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    إدارة معلومات التواصل والإعدادات العامة
                  </p>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/settings')}>
                    تعديل الإعدادات
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    التقارير
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    عرض تقارير الاستخدام والإحصائيات
                  </p>
                  <Button variant="outline" size="sm" onClick={() => navigate('/admin/analytics')}>
                    عرض التقارير
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;