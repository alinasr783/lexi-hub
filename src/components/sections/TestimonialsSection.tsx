import { useLanguage } from '@/hooks/useLanguage';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const { t } = useLanguage();

  // Placeholder testimonials data - will be dynamic from Supabase later
  const testimonials = [
    {
      name: 'سعد المحمدي',
      caseType: 'قضية تجارية',
      rating: 5,
      comment: 'خدمة ممتازة وفريق محترف جداً. تم حل قضيتي بأفضل النتائج المتوقعة وبوقت قياسي.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'نورا أحمد',
      caseType: 'قضية أحوال شخصية', 
      rating: 5,
      comment: 'التعامل كان في غاية الاحترافية والسرية. المحامية كانت متفهمة جداً وساعدتني كثيراً.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'خالد العتيبي',
      caseType: 'استشارة قانونية',
      rating: 5,
      comment: 'استشارة قانونية شاملة ومفصلة. الفريق مبدع في تبسيط المعلومات القانونية المعقدة.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('testimonials')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('testimonialsDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-elegant relative">
              <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4" />
              
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.caseType}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};