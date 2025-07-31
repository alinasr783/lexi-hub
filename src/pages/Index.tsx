import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ArticlesSection } from '@/components/sections/ArticlesSection';
import { useLanguage } from '@/hooks/useLanguage';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Index = () => {
  const { language } = useLanguage();
  const { settings } = useSiteSettings();

  // إذا كان الموقع في وضع الصيانة
  if (settings.maintenanceMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">الموقع تحت الصيانة</h1>
          <p className="text-muted-foreground">نعتذر للإزعاج، سنعود قريباً</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {settings.showHeroSection && <HeroSection />}
        {settings.showServicesSection && <ServicesSection />}
        {settings.showTeamSection && <TeamSection />}
        {settings.showTestimonialsSection && <TestimonialsSection />}
        {settings.showArticlesSection && <ArticlesSection />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
