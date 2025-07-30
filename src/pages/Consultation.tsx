import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Phone, Mail, CheckCircle, AlertCircle, Video, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Consultation = () => {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState('');

  const consultationTypes = [
    {
      id: 'phone',
      icon: Phone,
      title: 'استشارة هاتفية',
      description: 'استشارة سريعة عبر الهاتف لمدة 30 دقيقة',
      duration: '30 دقيقة',
      price: 'مجانية',
      features: ['استشارة فورية', 'تقييم أولي للحالة', 'توجيه قانوني عام']
    },
    {
      id: 'video',
      icon: Video,
      title: 'استشارة مرئية',
      description: 'جلسة استشارية مفصلة عبر الفيديو لمدة ساعة',
      duration: '60 دقيقة',
      price: '500 ريال',
      features: ['استشارة شاملة', 'مراجعة الوثائق', 'خطة عمل واضحة', 'تقرير مكتوب']
    },
    {
      id: 'office',
      icon: MessageCircle,
      title: 'زيارة المكتب',
      description: 'جلسة استشارية شخصية في مكتبنا',
      duration: '90 دقيقة',
      price: '800 ريال',
      features: ['استشارة شخصية', 'مراجعة مفصلة', 'استراتيجية قانونية', 'متابعة مجانية لأسبوع']
    }
  ];

  const caseTypes = [
    'القضايا التجارية',
    'الأحوال الشخصية',
    'القضايا الجنائية',
    'القضايا العمالية',
    'القضايا العقارية',
    'قضايا المواريث',
    'الاستشارات القانونية العامة',
    'أخرى'
  ];

  const timeSlots = [
    '09:00 ص',
    '10:00 ص',
    '11:00 ص',
    '12:00 م',
    '01:00 م',
    '02:00 م',
    '03:00 م',
    '04:00 م',
    '05:00 م'
  ];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">احجز استشارتك القانونية</h1>
              <p className="text-xl lg:text-2xl text-white/90">
                احصل على استشارة قانونية متخصصة من محامين خبراء في مختلف المجالات
              </p>
            </div>
          </div>
        </section>

        {/* Consultation Types */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gradient">أنواع الاستشارات</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                اختر نوع الاستشارة الأنسب لاحتياجاتك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {consultationTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <div key={index} className="card-elegant text-center group cursor-pointer">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-smooth">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    
                    <div className="flex justify-center gap-4 mb-6 text-sm">
                      <div className="flex items-center gap-1 text-accent">
                        <Clock className="w-4 h-4" />
                        <span>{type.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <span className="font-bold">{type.price}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => setSelectedType(type.id)}
                      className="w-full btn-secondary group-hover:shadow-glow"
                    >
                      اختر هذا النوع
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6 text-gradient">احجز استشارتك الآن</h2>
                <p className="text-xl text-muted-foreground">
                  املأ النموذج أدناه وسنتواصل معك لتأكيد الموعد
                </p>
              </div>

              <div className="card-elegant">
                <form className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">المعلومات الشخصية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="fullName">الاسم الكامل *</Label>
                        <Input id="fullName" placeholder="أدخل اسمك الكامل" />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input id="phone" placeholder="أدخل رقم هاتفك" />
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
                      </div>
                      <div>
                        <Label htmlFor="city">المدينة</Label>
                        <Input id="city" placeholder="أدخل مدينتك" />
                      </div>
                    </div>
                  </div>

                  {/* Case Details */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">تفاصيل القضية</h3>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="caseType">نوع القضية *</Label>
                        <Select>
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
                        <Label htmlFor="consultationType">نوع الاستشارة *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع الاستشارة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phone">استشارة هاتفية</SelectItem>
                            <SelectItem value="video">استشارة مرئية</SelectItem>
                            <SelectItem value="office">زيارة المكتب</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="caseDescription">وصف القضية *</Label>
                        <Textarea 
                          id="caseDescription" 
                          placeholder="اكتب وصفاً مفصلاً عن قضيتك أو استفسارك القانوني..." 
                          rows={6}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">الموعد المفضل</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="preferredDate">التاريخ المفضل *</Label>
                        <Input id="preferredDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">الوقت المفضل *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الوقت المفضل" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time, index) => (
                              <SelectItem key={index} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <Label htmlFor="notes">ملاحظات إضافية</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="أي ملاحظات أو متطلبات خاصة..." 
                      rows={3}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full btn-secondary text-lg py-4">
                    <Calendar className="w-5 h-5 mr-2" />
                    إرسال طلب الحجز
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">ماذا تتوقع بعد إرسال الطلب؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">مراجعة الطلب</h3>
                <p className="text-muted-foreground">سنراجع طلبك خلال ساعتين من الإرسال</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">تأكيد الموعد</h3>
                <p className="text-muted-foreground">سنتواصل معك لتأكيد الموعد والتفاصيل</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">الاستشارة</h3>
                <p className="text-muted-foreground">احصل على استشارة قانونية متخصصة</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Consultation;