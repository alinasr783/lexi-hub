import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useConsultationSettings } from '@/hooks/useConsultationSettings';

const Consultation = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { settings, isLoading: settingsLoading } = useConsultationSettings();
  const [selectedType, setSelectedType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    case_type: '',
    consultation_type: '',
    message: ''
  });

  // استخدام البيانات من الإعدادات أو القيم الافتراضية
  const consultationTypes = settings?.consultation_types || [
    {
      id: 'online',
      name: 'استشارة أونلاين',
      duration: '30 دقيقة',
      price: 'مجانية',
      description: 'استشارة فورية عبر الإنترنت مع أحد محامينا المختصين'
    },
    {
      id: 'office',
      name: 'استشارة في المكتب',
      duration: '60 دقيقة',
      price: 'حسب الحالة',
      description: 'لقاء مباشر في مكتبنا للحصول على استشارة شاملة'
    },
    {
      id: 'phone',
      name: 'استشارة هاتفية',
      duration: '20 دقيقة',
      price: 'مجانية',
      description: 'استشارة سريعة عبر الهاتف للحالات العاجلة'
    }
  ];

  const caseTypes = settings?.case_types || [
    'قضايا مدنية',
    'قضايا تجارية', 
    'أحوال شخصية',
    'قضايا عمالية',
    'قضايا عقارية',
    'قضايا جنائية',
    'استشارات قانونية عامة'
  ];

  const timeSlots = settings?.time_slots || [
    '09:00',
    '10:00', 
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];

  const handleTypeSelection = (typeId) => {
    setSelectedType(typeId);
    setFormData(prev => ({ ...prev, consultation_type: typeId }));
    setStep(2);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.case_type || !selectedType) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('إرسال البيانات:', formData);
      
      const { error } = await supabase.from('consultation_bookings').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferred_date: formData.preferred_date || null,
          preferred_time: formData.preferred_time || null,
          case_type: formData.case_type,
          consultation_type: formData.consultation_type,
          message: formData.message || null,
          status: 'pending'
        }
      ]);

      if (error) {
        console.error('خطأ في الإرسال:', error);
        throw error;
      }

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سنتواصل معك قريباً لتأكيد موعد الاستشارة",
      });

      setStep(3);

      // إعادة تعيين النموذج
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_date: '',
        preferred_time: '',
        case_type: '',
        consultation_type: '',
        message: ''
      });
      setSelectedType('');

    } catch (error) {
      console.error('خطأ في الطلب:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedType('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferred_date: '',
      preferred_time: '',
      case_type: '',
      consultation_type: '',
      message: ''
    });
  };

  if (settingsLoading) {
    return (
      <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <main className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>جارٍ تحميل الصفحة...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {settings?.hero_title || 'احجز استشارة قانونية'}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90">
                {settings?.hero_description || 'احصل على استشارة قانونية متخصصة من فريق الخبراء لدينا'}
              </p>
            </div>
          </div>
        </section>

        {/* Consultation Booking */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Indicator */}
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                    1
                  </div>
                  <div className={`w-20 h-1 ${step >= 2 ? 'bg-accent' : 'bg-muted'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                    2
                  </div>
                  <div className={`w-20 h-1 ${step >= 3 ? 'bg-accent' : 'bg-muted'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                    3
                  </div>
                </div>
              </div>

              {/* Step 1: Choose Consultation Type */}
              {step === 1 && (
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">اختر نوع الاستشارة</h2>
                  <p className="text-muted-foreground mb-12">اختر النوع المناسب لك من الاستشارات القانونية المتاحة</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {consultationTypes.map((type) => (
                       <Card 
                         key={type.id} 
                         className={`cursor-pointer hover-card ${selectedType === type.name ? 'ring-2 ring-accent' : ''}`}
                         onClick={() => handleTypeSelection(type.name)}
                       >
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-accent" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                          <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {type.duration}
                            </span>
                            <span className="font-medium text-accent">{type.price}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Fill Form */}
              {step === 2 && (
                <div>
                  <div className="text-center mb-8">
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep(1)}
                      className="mb-4"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      العودة لاختيار النوع
                    </Button>
                    <h2 className="text-3xl font-bold mb-4">تفاصيل الاستشارة</h2>
                    <p className="text-muted-foreground mb-8">
                      {settings?.booking_instructions || 'يرجى ملء النموذج بدقة وسنتواصل معك خلال 24 ساعة'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            المعلومات الشخصية
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="name">الاسم الكامل *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="اكتب اسمك الكامل"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">البريد الإلكتروني *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="example@email.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">رقم الهاتف *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="+966501234567"
                              required
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Consultation Details */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            تفاصيل الاستشارة
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="case_type">نوع القضية *</Label>
                            <Select value={formData.case_type} onValueChange={(value) => handleInputChange('case_type', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر نوع القضية" />
                              </SelectTrigger>
                              <SelectContent>
                                {caseTypes.map((type, index) => (
                                  <SelectItem key={index} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="preferred_date">التاريخ المفضل</Label>
                            <Input
                              id="preferred_date"
                              type="date"
                              value={formData.preferred_date}
                              onChange={(e) => handleInputChange('preferred_date', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="preferred_time">الوقت المفضل</Label>
                            <Select value={formData.preferred_time} onValueChange={(value) => handleInputChange('preferred_time', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الوقت المفضل" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time, index) => (
                                  <SelectItem key={index} value={time}>
                                    {time.includes(':') ? `${time.split(':')[0]}:${time.split(':')[1]} ${parseInt(time.split(':')[0]) < 12 ? 'ص' : 'م'}` : time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Message */}
                    <Card>
                      <CardHeader>
                        <CardTitle>تفاصيل إضافية</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <Label htmlFor="message">وصف موجز للحالة أو الاستفسار</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="اكتب تفاصيل إضافية عن الحالة أو الاستفسار..."
                            rows={4}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <div className="text-center">
                      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto px-12">
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب الاستشارة'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">تم إرسال طلبك بنجاح!</h2>
                  <p className="text-muted-foreground mb-8">
                    شكراً لك على طلب الاستشارة. سيتواصل معك فريقنا خلال 24 ساعة لتأكيد موعد الاستشارة وتقديم التفاصيل اللازمة.
                  </p>
                  <div className="space-y-4">
                    <Button onClick={resetForm} size="lg">
                      طلب استشارة أخرى
                    </Button>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        أو يمكنك <a href="/" className="text-accent hover:underline">العودة للصفحة الرئيسية</a>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;