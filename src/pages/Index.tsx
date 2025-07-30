import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { language } = useLanguage();

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        <HeroSection />
        
        {/* قسم الخدمات */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gradient">خدماتنا القانونية</h2>
            <p className="text-muted-foreground mb-8">نقدم مجموعة شاملة من الخدمات القانونية المتخصصة</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'الاستشارات القانونية', desc: 'استشارات قانونية شاملة في جميع المجالات' },
                { title: 'القضايا التجارية', desc: 'تمثيل قانوني في القضايا التجارية' },
                { title: 'قضايا الأحوال الشخصية', desc: 'قضايا الزواج والطلاق والحضانة' }
              ].map((service, index) => (
                <div key={index} className="card-elegant">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
