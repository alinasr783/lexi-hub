import { useLanguage } from '@/hooks/useLanguage';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
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

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('testimonials')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('testimonialsDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card-elegant relative">
              <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold text-accent">
                    {testimonial.is_anonymous ? '؟' : testimonial.client_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold">
                    {testimonial.is_anonymous ? 'عميل مجهول' : testimonial.client_name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{testimonial.case_type}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};