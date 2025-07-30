import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, DollarSign, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceDetail = () => {
  const { language } = useLanguage();
  const { slug } = useParams();

  // محاكاة بيانات الخدمة (سيتم استبدالها ببيانات من Supabase)
  const service = {
    title: 'الاستشارات القانونية العامة',
    description: 'نقدم استشارات قانونية شاملة في جميع فروع القانون مع ضمان السرية التامة',
    detailedDescription: `
      تشمل خدمات الاستشارات القانونية العامة لدينا مجموعة واسعة من التخصصات القانونية لتلبية احتياجات عملائنا المتنوعة. 
      نحن نؤمن بأن الوقاية خير من العلاج، لذلك نركز على تقديم المشورة القانونية الوقائية التي تساعد عملاءنا على 
      تجنب المشاكل القانونية المحتملة.

      يضم فريقنا محامين متخصصين في مختلف فروع القانون، بما في ذلك القانون التجاري، والقانون المدني، 
      وقانون العمل، والقانون الجنائي، وقانون الأحوال الشخصية. هذا التنوع في الخبرات يمكننا من تقديم 
      استشارات شاملة ومتكاملة لعملائنا.

      نحن نتبع منهجية علمية في تحليل القضايا والمسائل القانونية، حيث نقوم بدراسة جميع الجوانب القانونية 
      والواقعية للمسألة المطروحة، ونقدم الحلول العملية والقابلة للتطبيق. كما نحرص على تقديم المشورة 
      بلغة واضحة ومفهومة لعملائنا، مع شرح الخيارات المتاحة والمخاطر المحتملة.
    `,
    features: [
      'استشارة مجانية أولية',
      'تقييم شامل للحالة',
      'خطة عمل واضحة',
      'متابعة دورية',
      'ضمان السرية التامة',
      'إجابات على جميع الاستفسارات'
    ],
    duration: '1-2 أسابيع',
    priceRange: '500 - 2000 ريال',
    requiredDocuments: [
      'بطاقة الهوية الوطنية',
      'الوثائق المتعلقة بالقضية',
      'المراسلات السابقة (إن وجدت)',
      'أي مستندات قانونية ذات صلة'
    ],
    process: [
      'التواصل الأولي وتحديد موعد الاستشارة',
      'دراسة الوثائق والمستندات المقدمة',
      'تحليل الوضع القانوني وتقييم الخيارات',
      'تقديم المشورة القانونية والتوصيات',
      'وضع خطة عمل مفصلة إذا لزم الأمر',
      'المتابعة والدعم المستمر'
    ]
  };

  if (!service) {
    return (
      <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">الخدمة غير موجودة</h1>
          <p className="text-muted-foreground mb-8">عذراً، الخدمة المطلوبة غير متوفرة</p>
          <Button asChild>
            <Link to="/services">العودة إلى الخدمات</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <section className="bg-muted/50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">الرئيسية</Link>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Link to="/services" className="text-muted-foreground hover:text-primary">الخدمات</Link>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary">{service.title}</span>
            </nav>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
                  <p className="text-xl text-muted-foreground mb-8">{service.description}</p>
                  
                  <div className="prose prose-lg max-w-none">
                    {service.detailedDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-6 leading-relaxed text-muted-foreground">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-accent" />
                      ما نقدمه لك
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Process */}
                <Card>
                  <CardHeader>
                    <CardTitle>مراحل العمل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-accent text-accent-foreground rounded-full text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p>{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Required Documents */}
                <Card>
                  <CardHeader>
                    <CardTitle>المستندات المطلوبة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.requiredDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Service Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الخدمة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">المدة المتوقعة</p>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">نطاق الرسوم</p>
                        <p className="text-sm text-muted-foreground">{service.priceRange}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>احجز استشارة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      احجز استشارتك المجانية الآن واحصل على رأي قانوني متخصص
                    </p>
                    
                    <div className="space-y-3">
                      <Button asChild className="w-full btn-secondary">
                        <Link to="/consultation">
                          احجز استشارة مجانية
                        </Link>
                      </Button>
                      
                      <Button asChild variant="outline" className="w-full">
                        <a href="tel:+966501234567">
                          <Phone className="w-4 h-4 mr-2" />
                          اتصل الآن
                        </a>
                      </Button>
                      
                      <Button asChild variant="outline" className="w-full">
                        <a href="mailto:info@lexihub.com">
                          <Mail className="w-4 h-4 mr-2" />
                          راسلنا
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="bg-accent/10">
                  <CardHeader>
                    <CardTitle className="text-accent">حالة طارئة؟</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      نحن متاحون للحالات الطارئة على مدار الساعة
                    </p>
                    <Button asChild variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      <a href="tel:+966501234567">اتصال طارئ</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;