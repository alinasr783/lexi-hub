import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Share, BookOpen, List } from 'lucide-react';
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

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  category: string;
  created_at: string;
}

interface ArticleSection {
  id: string;
  title: string;
  content: string;
  subsections?: {
    id: string;
    title: string;
    content: string;
  }[];
}

const ArticleDetailStructured = () => {
  const { language } = useLanguage();
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sections, setSections] = useState<ArticleSection[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');

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
        
        // Parse content into sections
        parseContentIntoSections(data.content);
        
        // Load related articles
        loadRelatedArticles(data.category, data.id);
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

  const parseContentIntoSections = (content: string) => {
    // Parse HTML content and extract main headings and subheadings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4');
    
    const sectionsData: ArticleSection[] = [];
    let currentSection: ArticleSection | null = null;
    
    headings.forEach((heading, index) => {
      const id = `section-${index}`;
      const title = heading.textContent || '';
      
      if (heading.tagName === 'H1' || heading.tagName === 'H2') {
        // Main section
        if (currentSection) {
          sectionsData.push(currentSection);
        }
        currentSection = {
          id,
          title,
          content: '',
          subsections: []
        };
      } else if (heading.tagName === 'H3' || heading.tagName === 'H4') {
        // Subsection
        if (currentSection) {
          currentSection.subsections = currentSection.subsections || [];
          currentSection.subsections.push({
            id,
            title,
            content: ''
          });
        }
      }
    });
    
    if (currentSection) {
      sectionsData.push(currentSection);
    }
    
    setSections(sectionsData);
  };

  const loadRelatedArticles = async (category: string, currentId: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, featured_image, category, created_at')
        .eq('category', category)
        .neq('id', currentId)
        .eq('published', true)
        .limit(3);

      if (error) throw error;
      setRelatedArticles(data || []);
    } catch (error) {
      console.error('Error loading related articles:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents - Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <List className="w-5 h-5" />
                      فهرس المحتوى
                    </h3>
                    <nav className="space-y-2">
                      {sections.map((section) => (
                        <div key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className={`block w-full text-right text-sm p-2 rounded transition-colors ${
                              activeSection === section.id 
                                ? 'bg-primary text-primary-foreground' 
                                : 'hover:bg-muted'
                            }`}
                          >
                            {section.title}
                          </button>
                          {section.subsections && section.subsections.length > 0 && (
                            <div className="mr-4 mt-1 space-y-1">
                              {section.subsections.map((subsection) => (
                                <button
                                  key={subsection.id}
                                  onClick={() => scrollToSection(subsection.id)}
                                  className={`block w-full text-right text-xs p-1 rounded transition-colors ${
                                    activeSection === subsection.id 
                                      ? 'bg-secondary text-secondary-foreground' 
                                      : 'hover:bg-muted/50 text-muted-foreground'
                                  }`}
                                >
                                  {subsection.title}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Article Content */}
              <div className="lg:col-span-3">
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

                {/* Structured Article Body */}
                <div className="prose prose-lg max-w-none space-y-12">
                  {sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-6">
                      <h2 className="text-3xl font-bold mb-6 text-foreground">
                        {section.title}
                      </h2>
                      
                      {section.subsections && section.subsections.length > 0 ? (
                        <div className="space-y-8">
                          {section.subsections.map((subsection) => (
                            <div key={subsection.id} id={subsection.id} className="scroll-mt-6">
                              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                                {subsection.title}
                              </h3>
                              <div className="leading-relaxed text-muted-foreground">
                                {subsection.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="leading-relaxed text-muted-foreground">
                          {section.content}
                        </div>
                      )}
                    </section>
                  ))}
                  
                  {/* Fallback for unstructured content */}
                  {sections.length === 0 && (
                    <div 
                      className="leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  )}
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <Card className="mt-16">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        مواضيع قد تهمك
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedArticles.map((relatedArticle) => (
                          <Link 
                            key={relatedArticle.id}
                            to={`/articles/${relatedArticle.slug}`}
                            className="group"
                          >
                            <div className="space-y-3">
                              {relatedArticle.featured_image && (
                                <img 
                                  src={relatedArticle.featured_image} 
                                  alt={relatedArticle.title}
                                  className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform"
                                />
                              )}
                              <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                                {relatedArticle.title}
                              </h4>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {relatedArticle.excerpt}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(relatedArticle.created_at).toLocaleDateString('ar-EG')}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Section */}
                <Card className="bg-gradient-subtle mt-12">
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetailStructured;