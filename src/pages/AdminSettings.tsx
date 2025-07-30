import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useContactInfo } from '@/hooks/useContactInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Scale, Settings } from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { contactInfo, updateContactInfo, isLoading } = useContactInfo();
  const [formData, setFormData] = useState({
    site_name: '',
    phone: '',
    email: '',
    address: '',
    address_link: '',
    whatsapp: '',
    facebook: '',
    linkedin: '',
    twitter: '',
    office_hours: '',
    map_embed: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
      }
    };
    
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        site_name: contactInfo.site_name || '',
        phone: contactInfo.phone || '',
        email: contactInfo.email || '',
        address: contactInfo.address || '',
        address_link: contactInfo.address_link || '',
        whatsapp: contactInfo.whatsapp || '',
        facebook: contactInfo.facebook || '',
        linkedin: contactInfo.linkedin || '',
        twitter: contactInfo.twitter || '',
        office_hours: contactInfo.office_hours || '',
        map_embed: contactInfo.map_embed || ''
      });
    }
  }, [contactInfo]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await updateContactInfo(formData);
      
      if (result.success) {
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم تحديث إعدادات الموقع بنجاح",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
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
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                العودة للوحة الإدارة
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Settings className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl">إعدادات الموقع</h1>
                <p className="text-sm text-muted-foreground">إدارة معلومات التواصل والإعدادات العامة</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="site_name">اسم الموقع</Label>
                  <Input
                    id="site_name"
                    placeholder="اسم الموقع"
                    value={formData.site_name}
                    onChange={(e) => handleInputChange('site_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">رقم الواتساب</Label>
                  <Input
                    id="whatsapp"
                    placeholder="رقم الواتساب"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">العنوان</Label>
                <Textarea
                  id="address"
                  placeholder="العنوان الكامل"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="address_link">رابط العنوان (خرائط جوجل)</Label>
                <Input
                  id="address_link"
                  placeholder="https://maps.google.com/..."
                  value={formData.address_link}
                  onChange={(e) => handleInputChange('address_link', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="office_hours">ساعات العمل</Label>
                <Input
                  id="office_hours"
                  placeholder="السبت - الخميس: 9:00 ص - 6:00 م"
                  value={formData.office_hours}
                  onChange={(e) => handleInputChange('office_hours', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="facebook">رابط فيسبوك</Label>
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/..."
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">رابط لينكدإن</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/..."
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">رابط تويتر</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/..."
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Embed */}
          <Card>
            <CardHeader>
              <CardTitle>خريطة الموقع</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="map_embed">كود تضمين الخريطة (HTML)</Label>
                <Textarea
                  id="map_embed"
                  placeholder='<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
                  rows={4}
                  value={formData.map_embed}
                  onChange={(e) => handleInputChange('map_embed', e.target.value)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  يمكنك الحصول على كود التضمين من خرائط جوجل بالذهاب إلى الموقع والضغط على "مشاركة" ثم "تضمين خريطة"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="btn-secondary gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminSettings;