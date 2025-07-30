import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Scale, Building, Users, FileText, Gavel, Shield, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: Scale,
      title: 'الاستشارات القانونية العامة',
      description: 'نقدم استشارات قانونية شاملة في جميع فروع القانون مع ضمان السرية التامة',
      features: ['استشارة مجانية أولية', 'تقييم شامل للحالة', 'خطة عمل واضحة', 'متابعة دورية'],
      duration: '1-2 أسابيع',
      price: '500 - 2000 ريال'
    },
    {
      icon: Building,
      title: 'القضايا التجارية وأنظمة الشركات',
      description: 'خدمات قانونية متخصصة للشركات والمؤسسات التجارية',
      features: ['تأسيس الشركات', 'عقود الشراكة', 'النزاعات التجارية', 'الاندماج والاستحواذ'],
      duration: '2-8 أسابيع',
      price: '1000 - 10000 ريال'
    },
    {
      icon: Users,
      title: 'قضايا الأحوال الشخصية',
      description: 'تمثيل قانوني في قضايا الأسرة والأحوال الشخصية',
      features: ['قضايا الطلاق', 'الحضانة والنفقة', 'المواريث', 'عقود الزواج'],
      duration: '2-6 أشهر',
      price: '800 - 5000 ريال'
    },
    {
      icon: Gavel,
      title: 'القضايا الجنائية',
      description: 'دفاع قانوني محترف في القضايا الجنائية',
      features: ['جرائم مالية', 'جرائم إلكترونية', 'جرائم مرورية', 'الدفاع الجنائي'],
      duration: '1-12 شهر',
      price: '1500 - 15000 ريال'
    },
    {
      icon: FileText,
      title: 'صياغة العقود والاتفاقيات',
      description: 'صياغة احترافية للعقود والوثائق القانونية',
      features: ['عقود العمل', 'عقود البيع والشراء', 'اتفاقيات السرية', 'عقود الإيجار'],
      duration: '3-10 أيام',
      price: '300 - 2000 ريال'
    },
    {
      icon: Shield,
      title: 'القضايا العمالية',
      description: 'حماية حقوق العمال وأصحاب العمل',
      features: ['نزاعات العمل', 'الفصل التعسفي', 'حقوق العمال', 'تسوية النزاعات'],
      duration: '2-4 أشهر',
      price: '600 - 4000 ريال'
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
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">خدماتنا القانونية</h1>
              <p className="text-xl lg:text-2xl text-white/90">
                نقدم مجموعة شاملة من الخدمات القانونية المتخصصة بأعلى معايير الجودة والاحترافية
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="card-elegant">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl">
                          <Icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">ما نقدمه:</h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-accent rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>المدة: {service.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            <span>الرسوم: {service.price}</span>
                          </div>
                        </div>
                        
                        <Button className="btn-secondary">
                          احجز استشارة
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">هل تحتاج استشارة قانونية؟</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              احجز استشارتك المجانية الآن واحصل على رأي قانوني متخصص
            </p>
            <Button asChild size="lg" className="btn-secondary text-lg px-8 py-4">
              <a href="/consultation">احجز استشارة مجانية</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;