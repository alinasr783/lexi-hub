import { Scale, Users, FileText, Gavel, Shield, Building } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Scale,
      titleKey: 'legalConsultations',
      descKey: 'legalConsultationsDesc'
    },
    {
      icon: Building,
      titleKey: 'commercialCases', 
      descKey: 'commercialCasesDesc'
    },
    {
      icon: Users,
      titleKey: 'personalStatus',
      descKey: 'personalStatusDesc'
    },
    {
      icon: FileText,
      titleKey: 'legalConsultations',
      descKey: 'legalConsultationsDesc'
    },
    {
      icon: Gavel,
      titleKey: 'commercialCases',
      descKey: 'commercialCasesDesc'
    },
    {
      icon: Shield,
      titleKey: 'personalStatus', 
      descKey: 'personalStatusDesc'
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('ourServices')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('servicesDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="card-elegant group cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-smooth">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">{t(service.titleKey)}</h3>
                <p className="text-muted-foreground text-center leading-relaxed">{t(service.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};