import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import heroImage from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const { language, t } = useLanguage();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 41, 47, 0.7), rgba(34, 41, 47, 0.8)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-7xl font-bold mb-8 animate-slide-up leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xl lg:text-3xl mb-12 text-white/95 animate-fade-in font-light leading-relaxed">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent-light text-lg px-10 py-5 shadow-2xl transition-all duration-300 hover:shadow-lg hover:scale-105">
              <a href="/consultation">
                {t('bookConsultation')}
                {language === 'ar' ? (
                  <ArrowLeft className="mr-3 w-6 h-6" />
                ) : (
                  <ArrowRight className="ml-3 w-6 h-6" />
                )}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-10 py-5 border-2 border-white/80 text-white hover:bg-white hover:text-primary shadow-2xl backdrop-blur-sm transition-all duration-300">
              <a href="/services">
                {t('learnMore')}
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};