import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Share, Bookmark, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author_name: string;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const ArticleDetail = () => {
  const { language } = useLanguage();
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">المقال غير موجود</h1>
          <p className="text-muted-foreground mb-8">عذراً، المقال المطلوب غير متوفر</p>
          <Button asChild>
            <Link to="/articles">العودة إلى المقالات</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <section className="bg-muted/50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary">الرئيسية</Link>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <Link to="/articles" className="text-muted-foreground hover:text-primary">المقالات</Link>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary">{article.category}</span>
            </nav>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(article.created_at).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.author_name}</span>
                    </div>
                </div>
                
                 <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-sm text-muted-foreground">
                    تم النشر في {new Date(article.created_at).toLocaleDateString('ar-EG')}
                  </span>
                  
                   <div className="flex items-center gap-2">
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={async () => {
                         try {
                           if (navigator.share) {
                             await navigator.share({
                               title: article.title,
                               text: article.excerpt,
                               url: window.location.href
                             });
                           } else {
                             await navigator.clipboard.writeText(window.location.href);
                           }
                         } catch (error) {
                           console.log('Share failed:', error);
                         }
                       }}
                     >
                       <Share className="w-4 h-4 mr-2" />
                       مشاركة
                     </Button>
                   </div>
                </div>
              </div>

              {/* Featured Image */}
              {article.featured_image && (
                <div className="mb-12">
                  <img 
                    src={article.featured_image} 
                    alt={article.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-elegant"
                  />
                </div>
              )}

              {/* Article Body */}
              <div className="prose prose-lg max-w-none mb-12">
                <div 
                  className="leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              {/* Category */}
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4">التصنيف:</h3>
                <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                  #{article.category}
                </span>
              </div>

              {/* Author Bio */}
              <Card className="mb-12">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                     <Link 
                       to={`/team/${article.author_name.toLowerCase().replace(/\s+/g, '-')}`}
                       className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                     >
                       <User className="w-8 h-8 text-primary-foreground" />
                     </Link>
                     <div className="flex-1">
                       <Link 
                         to={`/team/${article.author_name.toLowerCase().replace(/\s+/g, '-')}`}
                         className="text-xl font-semibold mb-2 hover:text-primary transition-colors cursor-pointer inline-block"
                       >
                         {article.author_name}
                       </Link>
                      <p className="text-muted-foreground mb-4">
                        محامي متخصص في القانون التجاري وقانون الشركات مع خبرة تزيد عن 12 عاماً في المجال القانوني. 
                        حاصل على درجة الدكتوراه في القانون التجاري من جامعة الملك سعود.
                      </p>
                       <Button 
                         variant="outline" 
                         size="sm"
                         asChild
                       >
                         <Link to={`/articles?author=${encodeURIComponent(article.author_name)}`}>
                           عرض المزيد من المقالات
                         </Link>
                       </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Section */}
              <Card className="bg-gradient-subtle">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">هل تحتاج استشارة قانونية؟</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    فريقنا من المحامين المتخصصين جاهز لمساعدتك في جميع احتياجاتك القانونية
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="btn-secondary">
                      <Link to="/consultation">احجز استشارة مجانية</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to="/contact">تواصل معنا</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;