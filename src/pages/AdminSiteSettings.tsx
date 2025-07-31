import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Scale, ArrowLeft, Save, Sun, Moon, Palette, Eye, EyeOff } from 'lucide-react';

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

const AdminSiteSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
    
    loadSettings();
  }, [navigate]);

  const loadSettings = () => {
    // Load settings from localStorage or use defaults
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const handleSettingChange = (key: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  const handleSave = () => {
    setLoading(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('siteSettings', JSON.stringify(settings));
      
      // Apply theme changes
      const root = document.documentElement;
      if (settings.theme === 'dark') {
        root.classList.add('dark');
      } else if (settings.theme === 'light') {
        root.classList.remove('dark');
      } else {
        // System theme
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
      
      toast({
        title: "تم الحفظ",
        description: "تم حفظ إعدادات الموقع بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
                  <h1 className="font-bold text-xl">إعدادات الموقع</h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Scale className="w-4 h-4 mr-2 animate-pulse" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ الإعدادات
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Site Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                معلومات الموقع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">اسم الموقع</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">وصف الموقع</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
                <Label htmlFor="maintenanceMode">وضع الصيانة</Label>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
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
                  onValueChange={(value) => handleSettingChange('theme', value)}
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
                    onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                    placeholder="220 65% 12%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                  <Input
                    id="secondaryColor"
                    value={settings.secondaryColor}
                    onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                    placeholder="42 78% 60%"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">لون التمييز</Label>
                  <Input
                    id="accentColor"
                    value={settings.accentColor}
                    onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                    placeholder="220 50% 30%"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Page Visibility */}
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
                      onCheckedChange={(checked) => handleSettingChange(page.key as keyof SiteSettings, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section Visibility */}
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
                      onCheckedChange={(checked) => handleSettingChange(section.key as keyof SiteSettings, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default AdminSiteSettings;