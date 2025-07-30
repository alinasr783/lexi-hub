import { useLanguage } from '@/hooks/useLanguage';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ArticlesSection = () => {
  const { language, t } = useLanguage();

  // Placeholder articles data - will be dynamic from Supabase later
  const articles = [
    {
      title: 'حقوق العمال في القانون السعودي الجديد',
      excerpt: 'دليل شامل حول حقوق العمال والتحديثات الأخيرة في نظام العمل السعودي...',
      author: 'أحمد محمد علي',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
      slug: 'workers-rights-saudi-law'
    },
    {
      title: 'إجراءات تأسيس الشركات التجارية',
      excerpt: 'خطوات مفصلة لتأسيس الشركات التجارية في المملكة العربية السعودية...',
      author: 'فاطمة الزهراء',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      slug: 'company-establishment-procedures'
    },
    {
      title: 'قوانين الحضانة وحقوق الأطفال',
      excerpt: 'شرح مفصل لقوانين الحضانة وكيفية حماية حقوق الأطفال في القضايا الأسرية...',
      author: 'محمد عبدالرحمن',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      slug: 'custody-children-rights'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('latestArticles')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('articlesDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <article key={index} className="card-elegant group cursor-pointer">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-smooth">
                {article.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{article.excerpt}</p>
              
              <a 
                href={`/articles/${article.slug}`} 
                className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-smooth font-medium"
              >
                اقرأ المزيد
                {language === 'ar' ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </a>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="btn-secondary">
            <a href="/articles">
              جميع المقالات
              {language === 'ar' ? (
                <ArrowLeft className="mr-2 w-5 h-5" />
              ) : (
                <ArrowRight className="ml-2 w-5 h-5" />
              )}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};