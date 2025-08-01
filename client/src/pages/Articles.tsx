import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Calendar, User, ArrowLeft, ArrowRight, Search, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author_name: string;
  created_at: string;
  category: string;
  featured_image?: string;
  slug: string;
  published: boolean;
  content: string;
}

const Articles = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(articles.map(article => article.category)))];

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterAndSortArticles();
  }, [articles, searchTerm, selectedCategory, sortBy]);

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortArticles = () => {
    let filtered = [...articles];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} دقائق`;
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <main className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-lg mb-4"></div>
                  <CardContent className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-16 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-inter'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">المقالات القانونية</h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8">
                مقالات متخصصة في القانون السعودي لتوعية المجتمع وتثقيفه قانونياً
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input 
                    placeholder="ابحث في المقالات..." 
                    className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "btn-secondary" : ""}
                  >
                    {category === 'all' ? 'جميع المقالات' : category}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">ترتيب بواسطة:</span>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="oldest">الأقدم</SelectItem>
                    <SelectItem value="title">العنوان</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {filteredArticles.length === 0 
                ? 'لا توجد مقالات تطابق البحث'
                : `عرض ${Math.min(currentPage * articlesPerPage, filteredArticles.length)} من ${filteredArticles.length} مقال`
              }
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">لا توجد مقالات</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'لم يتم العثور على مقالات تطابق معايير البحث'
                      : 'لم يتم نشر أي مقالات بعد'
                    }
                  </p>
                  {(searchTerm || selectedCategory !== 'all') && (
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      variant="outline"
                    >
                      مسح الفلاتر
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentArticles.map((article) => (
                    <Card key={article.id} className="card-elegant group cursor-pointer overflow-hidden">
                      <div className="relative mb-6 overflow-hidden">
                        <img 
                          src={article.featured_image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop'} 
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.created_at)}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-smooth leading-tight line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{getReadingTime(article.content)}</span>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>مشاهدة</span>
                            </div>
                          </div>
                          <Link 
                            to={`/articles/${article.slug}`} 
                            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-smooth font-medium"
                          >
                            اقرأ المزيد
                            {language === 'ar' ? (
                              <ArrowLeft className="w-4 h-4" />
                            ) : (
                              <ArrowRight className="w-4 h-4" />
                            )}
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center mt-12 gap-4">
                    <div className="text-sm text-muted-foreground">
                      الصفحة {currentPage} من {totalPages}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {currentPage > 1 && (
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                          السابق
                        </Button>
                      )}
                      
                      {/* Page numbers */}
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <Button
                              key={pageNum}
                              variant={pageNum === currentPage ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-10"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                        {totalPages > 5 && (
                          <>
                            <span className="px-2 text-muted-foreground">...</span>
                            <Button
                              variant={totalPages === currentPage ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(totalPages)}
                              className="w-10"
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      
                      {currentPage < totalPages && (
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                          التالي
                        </Button>
                      )}
                    </div>
                    
                    {/* Load More option */}
                    {currentPage < totalPages && (
                      <Button 
                        size="lg" 
                        className="btn-secondary"
                        onClick={handleLoadMore}
                      >
                        تحميل المزيد من المقالات
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;