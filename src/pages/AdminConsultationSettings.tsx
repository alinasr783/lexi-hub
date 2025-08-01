import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, Save, Plus, X, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useConsultationSettings } from '@/hooks/useConsultationSettings';

const AdminConsultationSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings, updateSettings, isLoading } = useConsultationSettings();
  
  const [formData, setFormData] = useState({
    hero_title: '',
    hero_description: '',
    consultation_types: [],
    time_slots: [],
    case_types: [],
    booking_instructions: '',
    is_active: true
  });

  const [newConsultationType, setNewConsultationType] = useState({
    id: '',
    name: '',
    duration: '',
    price: ''
  });
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [newCaseType, setNewCaseType] = useState('');

  useEffect(() => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (settings) {
      setFormData({
        hero_title: settings.hero_title,
        hero_description: settings.hero_description,
        consultation_types: settings.consultation_types || [],
        time_slots: settings.time_slots || [],
        case_types: settings.case_types || [],
        booking_instructions: settings.booking_instructions,
        is_active: settings.is_active
      });
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await updateSettings(formData);
      
      if (result.success) {
        toast({
          title: 'تم الحفظ بنجاح',
          description: 'تم حفظ إعدادات صفحة الاستشارة بنجاح',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حفظ الإعدادات',
        variant: 'destructive',
      });
    }
  };

  const addConsultationType = () => {
    if (newConsultationType.name && newConsultationType.duration) {
      setFormData(prev => ({
        ...prev,
        consultation_types: [...prev.consultation_types, { ...newConsultationType, id: Date.now().toString() }]
      }));
      setNewConsultationType({ id: '', name: '', duration: '', price: '' });
    }
  };

  const removeConsultationType = (index: number) => {
    setFormData(prev => ({
      ...prev,
      consultation_types: prev.consultation_types.filter((_, i) => i !== index)
    }));
  };

  const addTimeSlot = () => {
    if (newTimeSlot) {
      setFormData(prev => ({
        ...prev,
        time_slots: [...prev.time_slots, newTimeSlot]
      }));
      setNewTimeSlot('');
    }
  };

  const removeTimeSlot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      time_slots: prev.time_slots.filter((_, i) => i !== index)
    }));
  };

  const addCaseType = () => {
    if (newCaseType) {
      setFormData(prev => ({
        ...prev,
        case_types: [...prev.case_types, newCaseType]
      }));
      setNewCaseType('');
    }
  };

  const removeCaseType = (index: number) => {
    setFormData(prev => ({
      ...prev,
      case_types: prev.case_types.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>جارٍ تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للوحة التحكم
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8" />
            إعدادات صفحة الاستشارة
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          {/* Hero Section Settings */}
          <Card>
            <CardHeader>
              <CardTitle>إعدادات القسم الرئيسي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero_title">عنوان الصفحة</Label>
                <Input
                  id="hero_title"
                  value={formData.hero_title}
                  onChange={(e) => setFormData(prev => ({ ...prev, hero_title: e.target.value }))}
                  placeholder="احجز استشارة قانونية"
                />
              </div>
              <div>
                <Label htmlFor="hero_description">وصف الصفحة</Label>
                <Textarea
                  id="hero_description"
                  value={formData.hero_description}
                  onChange={(e) => setFormData(prev => ({ ...prev, hero_description: e.target.value }))}
                  placeholder="احصل على استشارة قانونية متخصصة من فريق الخبراء لدينا"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="booking_instructions">تعليمات الحجز</Label>
                <Textarea
                  id="booking_instructions"
                  value={formData.booking_instructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, booking_instructions: e.target.value }))}
                  placeholder="يرجى ملء النموذج بدقة وسنتواصل معك خلال 24 ساعة"
                  rows={2}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">تفعيل الصفحة</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Consultation Types */}
          <Card>
            <CardHeader>
              <CardTitle>أنواع الاستشارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="اسم نوع الاستشارة"
                  value={newConsultationType.name}
                  onChange={(e) => setNewConsultationType(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="المدة (مثلاً: 30 دقيقة)"
                  value={newConsultationType.duration}
                  onChange={(e) => setNewConsultationType(prev => ({ ...prev, duration: e.target.value }))}
                />
                <Input
                  placeholder="السعر (مثلاً: مجانية)"
                  value={newConsultationType.price}
                  onChange={(e) => setNewConsultationType(prev => ({ ...prev, price: e.target.value }))}
                />
                <Button type="button" onClick={addConsultationType}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.consultation_types.map((type, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2">
                    <span>{type.name} - {type.duration} - {type.price}</span>
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeConsultationType(index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card>
            <CardHeader>
              <CardTitle>المواعيد المتاحة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="وقت (مثلاً: 09:00)"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                />
                <Button type="button" onClick={addTimeSlot}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.time_slots.map((slot, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2">
                    <span>{slot}</span>
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeTimeSlot(index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Case Types */}
          <Card>
            <CardHeader>
              <CardTitle>أنواع القضايا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  placeholder="نوع القضية"
                  value={newCaseType}
                  onChange={(e) => setNewCaseType(e.target.value)}
                />
                <Button type="button" onClick={addCaseType}>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.case_types.map((type, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2">
                    <span>{type}</span>
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeCaseType(index)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            حفظ الإعدادات
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminConsultationSettings;