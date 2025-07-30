import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { Calendar, User, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Articles = () => {
  const { language } = useLanguage();

  const articles = [
    {
      title: 'حقوق العمال في القانون السعودي الجديد',
      excerpt: 'دليل شامل حول حقوق العمال والتحديثات الأخيرة في نظام العمل السعودي وما يترتب عليها من حقوق وواجبات لأطراف علاقة العمل...',
      author: 'أحمد محمد علي',
      date: '2024-01-15',
      category: 'قانون العمل',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
      slug: 'workers-rights-saudi-law',
      readTime: '8 دقائق'
    },
    {
      title: 'إجراءات تأسيس الشركات التجارية في السعودية',
      excerpt: 'خطوات مفصلة لتأسيس الشركات التجارية في المملكة العربية السعودية، والوثائق المطلوبة، والرسوم، والمدة الزمنية اللازمة...',
      author: 'فاطمة الزهراء',
      date: '2024-01-10',
      category: 'القانون التجاري',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      slug: 'company-establishment-procedures',
      readTime: '12 دقيقة'
    },
    {
      title: 'قوانين الحضانة وحقوق الأطفال في الأحوال الشخصية',
      excerpt: 'شرح مفصل لقوانين الحضانة وكيفية حماية حقوق الأطفال في القضايا الأسرية، والعوامل التي تؤثر على قرارات المحكمة...',
      author: 'محمد عبدالرحمن',
      date: '2024-01-05',
      category: 'الأحوال الشخصية',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      slug: 'custody-children-rights',
      readTime: '10 دقائق'
    },
    {
      title: 'النظام الجديد لحماية البيانات الشخصية',
      excerpt: 'تحليل شامل للنظام السعودي لحماية البيانات الشخصية وتأثيره على الشركات والأفراد، والالتزامات القانونية الجديدة...',
      author: 'أحمد محمد علي',
      date: '2023-12-28',
      category: 'قانون التقنية',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
      slug: 'data-protection-law',
      readTime: '15 دقيقة'
    },
    {
      title: 'حقوق المستهلك في التجارة الإلكترونية',
      excerpt: 'دليل شامل لحقوق المستهلك في التجارة الإلكترونية، وآليات الحماية المتاحة، وإجراءات الشكوى والاسترداد...',
      author: 'فاطمة الزهراء',
      date: '2023-12-20',
      category: 'حماية المستهلك',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      slug: 'consumer-rights-ecommerce',
      readTime: '9 دقائق'
    },
    {
      title: 'النزاعات العقارية وطرق حلها',
      excerpt: 'أنواع النزاعات العقارية الشائعة في السعودية وطرق حلها قانونياً، بما في ذلك التحكيم والوساطة والتقاضي...',
      author: 'محمد عبدالرحمن',
      date: '2023-12-15',
      category: 'القانون العقاري',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      slug: 'real-estate-disputes',
      readTime: '11 دقيقة'
    }
  ];

  const categories = ['جميع المقالات', 'قانون العمل', 'القانون التجاري', 'الأحوال الشخصية', 'قانون التقنية', 'حماية المستهلك', 'القانون العقاري'];

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
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button 
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={index === 0 ? "btn-secondary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <article key={index} className="card-elegant group cursor-pointer">
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
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
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-smooth leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
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
                  </div>
                </article>
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" className="btn-secondary">
                تحميل المزيد من المقالات
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;