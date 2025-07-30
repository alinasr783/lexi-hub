import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Award, Users, Target, Eye, Heart, Shield } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: 'النزاهة والشفافية',
      description: 'نعمل بأعلى معايير النزاهة والشفافية في جميع تعاملاتنا مع العملاء'
    },
    {
      icon: Award,
      title: 'التميز والجودة',
      description: 'نسعى لتقديم خدمات قانونية عالية الجودة تلبي توقعات عملائنا وتفوقها'
    },
    {
      icon: Heart,
      title: 'الاهتمام بالعملاء',
      description: 'نضع احتياجات عملائنا في المقدمة ونعمل على حل مشاكلهم بكفاءة واحترافية'
    },
    {
      icon: Users,
      title: 'روح الفريق',
      description: 'نؤمن بقوة العمل الجماعي والتعاون لتحقيق أفضل النتائج لعملائنا'
    }
  ];

  const stats = [
    { number: '500+', label: 'قضية ناجحة' },
    { number: '15+', label: 'سنة خبرة' },
    { number: '1000+', label: 'عميل راضي' },
    { number: '98%', label: 'معدل النجاح' }
  ];

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">من نحن</h1>
              <p className="text-xl lg:text-2xl text-white/90">
                مكتب محاماة متخصص يجمع بين الخبرة والاحترافية لخدمة عملائنا
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gradient">قصتنا</h2>
                <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    تأسس مكتب ليكسي هاب للمحاماة والاستشارات القانونية في عام 2009 على يد نخبة من المحامين المتخصصين 
                    في مختلف فروع القانون السعودي. منذ تأسيسنا، كنا نسعى لتقديم خدمات قانونية متميزة تلبي احتياجات 
                    عملائنا من الأفراد والشركات.
                  </p>
                  <p>
                    على مدار أكثر من 15 عاماً، نجحنا في بناء سمعة متميزة في السوق السعودي من خلال التزامنا 
                    بأعلى معايير الجودة والاحترافية. فريقنا المتخصص يضم محامين خبراء في القضايا التجارية، 
                    والأحوال الشخصية، والقضايا الجنائية، والاستشارات القانونية العامة.
                  </p>
                  <p>
                    نؤمن بأن النجاح الحقيقي يُقاس بنجاح عملائنا وتحقيق أهدافهم القانونية. لذلك، نعمل جاهدين 
                    لفهم احتياجات كل عميل وتقديم الحلول القانونية المناسبة بكفاءة واحترافية عالية.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop" 
                  alt="مكتب المحاماة"
                  className="rounded-2xl shadow-elegant w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              <div className="card-elegant">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl">
                    <Eye className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">رؤيتنا</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون الخيار الأول والأكثر ثقة للخدمات القانونية في المملكة العربية السعودية، 
                  ونموذجاً يُحتذى به في الاحترافية والتميز القانوني، مع المساهمة في تطوير البيئة 
                  القانونية والتشريعية في المملكة.
                </p>
              </div>
              
              <div className="card-elegant">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">رسالتنا</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  تقديم خدمات قانونية متميزة ومبتكرة لعملائنا من خلال فريق من المحامين المتخصصين، 
                  والالتزام بأعلى معايير الجودة والنزاهة، مع الحرص على حماية حقوق ومصالح عملائنا 
                  وتحقيق أهدافهم القانونية بكفاءة واحترافية.
                </p>
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-4xl font-bold text-center mb-12 text-gradient">قيمنا</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="card-elegant text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">هل تحتاج استشارة قانونية؟</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              تواصل معنا اليوم واحصل على استشارة قانونية متخصصة من فريقنا المحترف
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/consultation" 
                className="btn-secondary inline-flex items-center justify-center rounded-lg px-8 py-4 font-medium transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
              >
                احجز استشارة مجانية
              </a>
              <a 
                href="/contact" 
                className="btn-outline inline-flex items-center justify-center rounded-lg px-8 py-4 font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                تواصل معنا
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;