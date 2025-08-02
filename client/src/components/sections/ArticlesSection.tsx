import { useLanguage } from '@/hooks/useLanguage';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const ArticlesSection = () => {
  const { language, t } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gradient">{t('latestArticles')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('articlesDesc')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <article key={article.id} className="card-elegant group cursor-pointer">
              <div className="relative mb-6 overflow-hidden rounded-lg">
                {article.featured_image ? (
                  <img 
                    src={article.featured_image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                  />
                ) : (
                  <div className="w-full h-48 bg-accent/10 flex items-center justify-center">
                    <span className="text-4xl">📄</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.created_at).toLocaleDateString('ar-SA')}</span>
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