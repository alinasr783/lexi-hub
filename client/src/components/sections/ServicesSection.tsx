import { Scale, Users, FileText, Gavel, Shield, Building } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const iconMap = {
  Scale, Users, FileText, Gavel, Shield, Building
};

export const ServicesSection = () => {
  const { t } = useLanguage();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('ourServices')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('servicesDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = (iconMap as any)[service.icon] || Scale;
            return (
              <div key={service.id} className="card-elegant group cursor-pointer">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-smooth">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-center">{service.title}</h3>
                <p className="text-muted-foreground text-center leading-relaxed mb-6">{service.description}</p>
                <div className="text-center">
                  <a 
                    href="/consultation" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:scale-105 transition-smooth font-medium"
                  >
                    احجز استشارة
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};