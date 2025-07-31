import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Scale, ArrowLeft, Save, Sun, Moon, Palette, Eye, EyeOff, Plus, X, Star, MessageSquare } from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  office_hours?: string;
  map_embed?: string;
}

interface PageContent {
  page_key: string;
  title: string;
  content: string;
  image_url?: string;
  meta_description?: string;
}

interface Testimonial {
  id?: string;
  client_name: string;
  testimonial: string;
  case_type: string;
  rating?: number;
  is_featured: boolean;
  is_anonymous: boolean;
}

interface SiteSettings {
  // Theme settings
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // Page visibility
  showHomePage: boolean;
  showServicesPage: boolean;
  showTeamPage: boolean;
  showArticlesPage: boolean;
  showContactPage: boolean;
  showAboutPage: boolean;
  showConsultationPage: boolean;
  
  // Section visibility
  showHeroSection: boolean;
  showServicesSection: boolean;
  showTeamSection: boolean;
  showTestimonialsSection: boolean;
  showArticlesSection: boolean;
  
  // Site info
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
}

const colorPresets = [
  { name: 'الأزرق الكلاسيكي', primary: '220 65% 12%', secondary: '42 78% 60%', accent: '220 50% 30%' },
  { name: 'الأخضر القانوني', primary: '142 71% 25%', secondary: '42 78% 60%', accent: '142 71% 45%' },
  { name: 'البني الأنيق', primary: '30 25% 15%', secondary: '42 78% 60%', accent: '30 50% 30%' },
  { name: 'الرمادي المحايد', primary: '220 9% 20%', secondary: '42 78% 60%', accent: '220 9% 40%' },
];

const AdminMasterSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  // Contact Info State
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: '',
    email: '',
    address: '',
    whatsapp: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    office_hours: '',
    map_embed: ''
  });

  // About Page State
  const [aboutContent, setAboutContent] = useState<PageContent>({
    page_key: 'about',
    title: '',
    content: '',
    image_url: '',
    meta_description: ''
  });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    client_name: '',
    testimonial: '',
    case_type: '',
    rating: 5,
    is_featured: false,
    is_anonymous: false
  });

  // Site Settings State
  const [settings, setSettings] = useState<SiteSettings>({
    theme: 'light',
    primaryColor: '220 65% 12%',
    secondaryColor: '42 78% 60%',
    accentColor: '220 50% 30%',
    showHomePage: true,
    showServicesPage: true,
    showTeamPage: true,
    showArticlesPage: true,
    showContactPage: true,
    showAboutPage: true,
    showConsultationPage: true,
    showHeroSection: true,
    showServicesSection: true,
    showTeamSection: true,
    showTestimonialsSection: true,
    showArticlesSection: true,
    siteName: 'ليكسي هاب',
    siteDescription: 'مكتب محاماة متخصص في تقديم الاستشارات القانونية',
    maintenanceMode: false
  });

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
    
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadContactInfo(),
        loadAboutContent(),
        loadTestimonials(),
        loadSiteSettings()
      ]);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل البيانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadContactInfo = async () => {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .single();
      
    if (data) setContactInfo(data);
  };

  const loadAboutContent = async () => {
    const { data, error } = await supabase
      .from('page_contents')
      .select('*')
      .eq('page_key', 'about')
      .single();
      
    if (data) setAboutContent(data);
  };

  const loadTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setTestimonials(data);
  };

  const loadSiteSettings = () => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveContactInfo = async () => {
    const { error } = await supabase
      .from('contact_info')
      .upsert(contactInfo);

    if (error) throw error;
  };

  const saveAboutContent = async () => {
    const { error } = await supabase
      .from('page_contents')
      .upsert(aboutContent);

    if (error) throw error;
  };

  const saveTestimonial = async () => {
    const { error } = await supabase
      .from('testimonials')
      .insert([newTestimonial]);

    if (error) throw error;
    
    setNewTestimonial({
      client_name: '',
      testimonial: '',
      case_type: '',
      rating: 5,
      is_featured: false,
      is_anonymous: false
    });
    
    loadTestimonials();
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;
    loadTestimonials();
  };

  const saveSiteSettings = () => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    
    // Apply theme changes
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    
    // Apply custom colors
    root.style.setProperty('--primary', settings.primaryColor);
    root.style.setProperty('--secondary', settings.secondaryColor);
    root.style.setProperty('--accent', settings.accentColor);
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      await Promise.all([
        saveContactInfo(),
        saveAboutContent(),
      ]);
      
      saveSiteSettings();
      
      toast({
        title: "تم الحفظ",
        description: "تم حفظ جميع الإعدادات بنجاح",
      });
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  if (loading) {
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
                  <h1 className="font-bold text-xl">الإعدادات الرئيسية</h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleSaveAll} disabled={loading}>
              {loading ? (
                <>
                  <Scale className="w-4 h-4 mr-2 animate-pulse" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ جميع الإعدادات
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="contact">بيانات التواصل</TabsTrigger>
            <TabsTrigger value="about">صفحة من نحن</TabsTrigger>
            <TabsTrigger value="testimonials">آراء العملاء</TabsTrigger>
            <TabsTrigger value="theme">الثيم والألوان</TabsTrigger>
            <TabsTrigger value="visibility">إظهار/إخفاء</TabsTrigger>
          </TabsList>

          {/* Contact Info Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات التواصل الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+966 50 000 0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="info@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Textarea
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="العنوان الكامل للمكتب"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">واتساب</Label>
                    <Input
                      id="whatsapp"
                      value={contactInfo.whatsapp || ''}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="+966 50 000 0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="office_hours">ساعات العمل</Label>
                    <Input
                      id="office_hours"
                      value={contactInfo.office_hours || ''}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, office_hours: e.target.value }))}
                      placeholder="الأحد - الخميس: 9 صباحاً - 6 مساءً"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">فيسبوك</Label>
                    <Input
                      id="facebook"
                      value={contactInfo.facebook || ''}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, facebook: e.target.value }))}
                      placeholder="https://facebook.com/page"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">لينكد إن</Label>
                    <Input
                      id="linkedin"
                      value={contactInfo.linkedin || ''}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/company/page"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">تويتر</Label>
                    <Input
                      id="twitter"
                      value={contactInfo.twitter || ''}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, twitter: e.target.value }))}
                      placeholder="https://twitter.com/page"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="map_embed">كود الخريطة</Label>
                  <Textarea
                    id="map_embed"
                    value={contactInfo.map_embed || ''}
                    onChange={(e) => setContactInfo(prev => ({ ...prev, map_embed: e.target.value }))}
                    placeholder="كود iframe للخريطة من Google Maps"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Content Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>محتوى صفحة "من نحن"</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about_title">عنوان الصفحة</Label>
                  <Input
                    id="about_title"
                    value={aboutContent.title}
                    onChange={(e) => setAboutContent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="من نحن"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_image">رابط الصورة الرئيسية</Label>
                  <Input
                    id="about_image"
                    value={aboutContent.image_url || ''}
                    onChange={(e) => setAboutContent(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_content">المحتوى</Label>
                  <Textarea
                    id="about_content"
                    value={aboutContent.content}
                    onChange={(e) => setAboutContent(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="اكتب محتوى صفحة من نحن هنا..."
                    className="min-h-[300px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about_meta">وصف الصفحة لمحركات البحث</Label>
                  <Textarea
                    id="about_meta"
                    value={aboutContent.meta_description || ''}
                    onChange={(e) => setAboutContent(prev => ({ ...prev, meta_description: e.target.value }))}
                    placeholder="وصف مختصر للصفحة لمحركات البحث"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            {/* Add New Testimonial */}
            <Card>
              <CardHeader>
                <CardTitle>إضافة رأي عميل جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">اسم العميل</Label>
                    <Input
                      id="client_name"
                      value={newTestimonial.client_name}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, client_name: e.target.value }))}
                      placeholder="اسم العميل"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="case_type">نوع القضية</Label>
                    <Input
                      id="case_type"
                      value={newTestimonial.case_type}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, case_type: e.target.value }))}
                      placeholder="قانون تجاري، أحوال شخصية، إلخ"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testimonial_text">نص الرأي</Label>
                  <Textarea
                    id="testimonial_text"
                    value={newTestimonial.testimonial}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, testimonial: e.target.value }))}
                    placeholder="اكتب رأي العميل هنا..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">التقييم</Label>
                    <Select 
                      value={newTestimonial.rating?.toString() || '5'} 
                      onValueChange={(value) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 نجوم</SelectItem>
                        <SelectItem value="4">4 نجوم</SelectItem>
                        <SelectItem value="3">3 نجوم</SelectItem>
                        <SelectItem value="2">2 نجمة</SelectItem>
                        <SelectItem value="1">1 نجمة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="is_featured"
                      checked={newTestimonial.is_featured}
                      onCheckedChange={(checked) => setNewTestimonial(prev => ({ ...prev, is_featured: checked }))}
                    />
                    <Label htmlFor="is_featured">مميز</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="is_anonymous"
                      checked={newTestimonial.is_anonymous}
                      onCheckedChange={(checked) => setNewTestimonial(prev => ({ ...prev, is_anonymous: checked }))}
                    />
                    <Label htmlFor="is_anonymous">مجهول</Label>
                  </div>
                </div>

                <Button onClick={saveTestimonial} disabled={!newTestimonial.client_name || !newTestimonial.testimonial}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة الرأي
                </Button>
              </CardContent>
            </Card>

            {/* Existing Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>آراء العملاء الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{testimonial.is_anonymous ? 'عميل مجهول' : testimonial.client_name}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{testimonial.case_type}</Badge>
                              {testimonial.is_featured && <Badge variant="default">مميز</Badge>}
                              <div className="flex">
                                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => testimonial.id && deleteTestimonial(testimonial.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.testimonial}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Settings Tab */}
          <TabsContent value="theme" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  إعدادات الثيم والألوان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>نمط الواجهة</Label>
                  <Select 
                    value={settings.theme} 
                    onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          الوضع النهاري
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          الوضع الليلي
                        </div>
                      </SelectItem>
                      <SelectItem value="system">تلقائي (حسب النظام)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>مجموعات الألوان المحددة مسبقاً</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {colorPresets.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 flex items-center justify-between"
                        onClick={() => applyColorPreset(preset)}
                      >
                        <span>{preset.name}</span>
                        <div className="flex gap-1">
                          <div 
                            className="w-4 h-4 rounded-full border" 
                            style={{ backgroundColor: `hsl(${preset.primary})` }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border" 
                            style={{ backgroundColor: `hsl(${preset.secondary})` }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border" 
                            style={{ backgroundColor: `hsl(${preset.accent})` }}
                          />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">اللون الأساسي</Label>
                    <Input
                      id="primaryColor"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="220 65% 12%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                    <Input
                      id="secondaryColor"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      placeholder="42 78% 60%"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">لون التمييز</Label>
                    <Input
                      id="accentColor"
                      value={settings.accentColor}
                      onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      placeholder="220 50% 30%"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visibility Settings Tab */}
          <TabsContent value="visibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  إظهار/إخفاء الصفحات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'showHomePage', label: 'الصفحة الرئيسية' },
                    { key: 'showServicesPage', label: 'صفحة الخدمات' },
                    { key: 'showTeamPage', label: 'صفحة الفريق' },
                    { key: 'showArticlesPage', label: 'صفحة المقالات' },
                    { key: 'showContactPage', label: 'صفحة التواصل' },
                    { key: 'showAboutPage', label: 'صفحة عن المكتب' },
                    { key: 'showConsultationPage', label: 'صفحة الاستشارات' },
                  ].map((page) => (
                    <div key={page.key} className="flex items-center justify-between">
                      <Label htmlFor={page.key}>{page.label}</Label>
                      <Switch
                        id={page.key}
                        checked={settings[page.key as keyof SiteSettings] as boolean}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, [page.key]: checked }))}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <EyeOff className="w-5 h-5" />
                  إظهار/إخفاء أقسام الصفحة الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'showHeroSection', label: 'قسم البطل الرئيسي' },
                    { key: 'showServicesSection', label: 'قسم الخدمات' },
                    { key: 'showTeamSection', label: 'قسم الفريق' },
                    { key: 'showTestimonialsSection', label: 'قسم آراء العملاء' },
                    { key: 'showArticlesSection', label: 'قسم المقالات' },
                  ].map((section) => (
                    <div key={section.key} className="flex items-center justify-between">
                      <Label htmlFor={section.key}>{section.label}</Label>
                      <Switch
                        id={section.key}
                        checked={settings[section.key as keyof SiteSettings] as boolean}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, [section.key]: checked }))}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminMasterSettings;
