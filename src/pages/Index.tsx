import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ArticlesSection } from '@/components/sections/ArticlesSection';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { language } = useLanguage();

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TeamSection />
        <TestimonialsSection />
        <ArticlesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
