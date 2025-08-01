import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: 'العنوان',
      details: ['طريق الملك فهد، حي العليا', 'الرياض 12211، المملكة العربية السعودية']
    },
    {
      icon: Phone,
      title: 'الهاتف',
      details: ['+966 11 123 4567', '+966 50 123 4567']
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: ['info@lexihub.com', 'consultation@lexihub.com']
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: ['الأحد - الخميس: 9:00 ص - 6:00 م', 'الجمعة - السبت: مغلق']
    }
  ];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">تواصل معنا</h1>
              <p className="text-xl lg:text-2xl text-white/90">
                نحن هنا لمساعدتك في جميع احتياجاتك القانونية
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="card-elegant text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Form & Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="card-elegant">
                <h2 className="text-3xl font-bold mb-6">أرسل لنا رسالة</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input id="name" placeholder="أدخل اسمك الكامل" />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input id="phone" placeholder="أدخل رقم هاتفك" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني *</Label>
                    <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">الموضوع *</Label>
                    <Input id="subject" placeholder="موضوع الرسالة" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">الرسالة *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="اكتب رسالتك هنا..." 
                      rows={6}
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full btn-secondary">
                    <Send className="w-5 h-5 mr-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </div>

              {/* Map */}
              <div className="card-elegant">
                <h2 className="text-3xl font-bold mb-6">موقعنا</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">خريطة المكتب</p>
                    <p className="text-sm text-muted-foreground">طريق الملك فهد، حي العليا، الرياض</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">العنوان الكامل</p>
                      <p className="text-sm text-muted-foreground">
                        طريق الملك فهد، حي العليا، الرياض 12211، المملكة العربية السعودية
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-accent/10 rounded-lg">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">ساعات العمل</p>
                      <p className="text-sm text-muted-foreground">
                        الأحد - الخميس: 9:00 ص - 6:00 م
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">هل تحتاج مساعدة عاجلة؟</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              نحن متاحون للحالات الطارئة على مدار الساعة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-secondary">
                <a href="tel:+966501234567">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل الآن
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://wa.me/966501234567">
                  <Phone className="w-5 h-5 mr-2" />
                  واتساب
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;