import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Phone, Mail, MapPin, Globe, Facebook, Linkedin, Twitter, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useContactInfo } from '@/hooks/useContactInfo';

const AdminContact = () => {
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

  useEffect(() => {
    // Check if user is authenticated
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await updateContactInfo(formData);
      
      if (result.success) {
        toast({
          title: "تم حفظ البيانات بنجاح",
          description: "تم تحديث معلومات التواصل بنجاح",
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ البيانات",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>جارٍ تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة للوحة التحكم
            </Button>
            <h1 className="text-3xl font-bold">إدارة معلومات التواصل</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* معلومات الموقع الأساسية */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                معلومات الموقع الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site_name">اسم الموقع *</Label>
                  <Input
                    id="site_name"
                    value={formData.site_name}
                    onChange={(e) => handleInputChange('site_name', e.target.value)}
                    placeholder="اسم الموقع أو المكتب"
                    required
                  />
                </div>
            </CardContent>
          </Card>

          {/* معلومات التواصل */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                معلومات التواصل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+966501234567"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">رقم الواتساب</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+966501234567"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="info@example.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* العنوان ومواعيد العمل */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                الموقع ومواعيد العمل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">العنوان</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="العنوان الكامل للمكتب"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="address_link">رابط الموقع على الخريطة</Label>
                <Input
                  id="address_link"
                  value={formData.address_link}
                  onChange={(e) => handleInputChange('address_link', e.target.value)}
                  placeholder="https://maps.google.com/..."
                />
              </div>
              <div>
                <Label htmlFor="office_hours" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  مواعيد العمل
                </Label>
                <Textarea
                  id="office_hours"
                  value={formData.office_hours}
                  onChange={(e) => handleInputChange('office_hours', e.target.value)}
                  placeholder="السبت - الخميس: 9:00 ص - 6:00 م"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* وسائل التواصل الاجتماعي */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                وسائل التواصل الاجتماعي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="facebook" className="flex items-center gap-2">
                    <Facebook className="w-4 h-4" />
                    فيسبوك
                  </Label>
                  <Input
                    id="facebook"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/page"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    لينكد إن
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/profile"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    تويتر
                  </Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/account"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* تضمين الخريطة */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                تضمين الخريطة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="map_embed">كود تضمين الخريطة من Google Maps</Label>
                <Textarea
                  id="map_embed"
                  value={formData.map_embed}
                  onChange={(e) => handleInputChange('map_embed', e.target.value)}
                  placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
                  rows={4}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  يمكنك الحصول على كود التضمين من Google Maps عبر النقر على "مشاركة" ثم "تضمين خريطة"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* أزرار الحفظ */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              إلغاء
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              حفظ التغييرات
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContact;