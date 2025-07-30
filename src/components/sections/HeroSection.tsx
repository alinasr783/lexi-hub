import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export const HeroSection = () => {
  const { language, t } = useLanguage();

  return (
    <section className="bg-gradient-hero text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up">
            {t('heroTitle')}
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 animate-fade-in">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-secondary text-lg px-8 py-4">
              <a href="/consultation">
                {t('bookConsultation')}
                {language === 'ar' ? (
                  <ArrowLeft className="mr-2 w-5 h-5" />
                ) : (
                  <ArrowRight className="ml-2 w-5 h-5" />
                )}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 btn-outline border-white text-white hover:bg-white hover:text-primary">
              <a href="/services">
                {t('learnMore')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};