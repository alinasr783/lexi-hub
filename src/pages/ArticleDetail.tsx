import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Share, Bookmark, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ArticleDetail = () => {
  const { language } = useLanguage();
  const { slug } = useParams();

  // محاكاة بيانات المقال (سيتم استبدالها ببيانات من Supabase)
  const article = {
    title: 'التحديثات الجديدة في قانون الشركات السعودي 2024',
    excerpt: 'نظرة شاملة على أحدث التعديلات في قانون الشركات وتأثيرها على الأعمال التجارية',
    content: `
      شهد قانون الشركات في المملكة العربية السعودية تطورات مهمة خلال عام 2024، والتي تهدف إلى تحسين بيئة الأعمال وتعزيز الشفافية والحوكمة في الشركات. هذه التحديثات تأتي ضمن جهود المملكة لتحقيق رؤية 2030 وتطوير القطاع الخاص.

      ## التعديلات الرئيسية

      ### 1. تبسيط إجراءات تأسيس الشركات
      تم تبسيط الإجراءات المطلوبة لتأسيس الشركات بشكل كبير، حيث أصبح بإمكان رواد الأعمال إكمال عملية التأسيس خلال 24 ساعة فقط في معظم الحالات. هذا التطور يشمل:

      - الموافقة الإلكترونية على اسم الشركة خلال دقائق
      - التكامل الكامل بين منصة "قوام" والجهات الحكومية المختلفة
      - إمكانية الحصول على السجل التجاري والرخص ذات العلاقة في نفس الوقت

      ### 2. تعزيز حقوق المساهمين
      تم تطوير الأحكام المتعلقة بحماية حقوق المساهمين، خاصة المساهمين الأقلية، من خلال:

      - تعزيز حقوق التصويت والمشاركة في القرارات المهمة
      - تحسين آليات الإفصاح والشفافية
      - وضع ضوابط أكثر صرامة لتضارب المصالح

      ### 3. تطوير أحكام الحوكمة
      تم تحديث لوائح الحوكمة لتواكب أفضل الممارسات الدولية، وتشمل:

      - متطلبات جديدة لاستقلالية أعضاء مجلس الإدارة
      - تعزيز دور لجان المراجعة والمخاطر
      - وضع معايير أكثر وضوحاً لمسؤوليات الإدارة التنفيذية

      ## التأثير على الشركات الموجودة

      الشركات القائمة لديها فترة انتقالية تمتد لستة أشهر لتطبيق التعديلات الجديدة. ينصح بشدة بالبدء في عملية التحديث فوراً لتجنب أي مخالفات محتملة.

      ### الخطوات المطلوبة:
      1. مراجعة النظام الأساسي للشركة
      2. تحديث لوائح الحوكمة الداخلية
      3. تدريب أعضاء مجلس الإدارة على المتطلبات الجديدة
      4. تطوير أنظمة الإفصاح والشفافية

      ## التحديات والفرص

      رغم أن هذه التعديلات تتطلب استثماراً في التطوير والتدريب، إلا أنها تفتح آفاقاً جديدة أمام الشركات السعودية للنمو والتوسع محلياً وإقليمياً.

      ### الفرص المتاحة:
      - تحسين الوصول إلى التمويل والاستثمار
      - زيادة الثقة من المستثمرين المحليين والأجانب
      - تطوير قدرات الشركة على المنافسة إقليمياً وعالمياً

      ## الخلاصة

      التحديثات الجديدة في قانون الشركات تمثل خطوة مهمة نحو تطوير بيئة الأعمال في المملكة. الشركات التي تتبنى هذه التغييرات بشكل استباقي ستكون في موقع أفضل للاستفادة من الفرص المستقبلية.

      نحن في مكتب ليكسي هاب نقدم خدمات استشارية شاملة لمساعدة الشركات على فهم وتطبيق هذه التعديلات بكفاءة واحترافية.
    `,
    author: 'د. أحمد المحمدي',
    publishDate: '15 نوفمبر 2024',
    category: 'القانون التجاري',
    readTime: '8 دقائق للقراءة',
    views: 1250,
    featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop',
    tags: ['قانون الشركات', 'التحديثات القانونية', 'رؤية 2030', 'الحوكمة']
  };

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
                    <span>{article.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{article.views} مشاهدة</span>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      مشاركة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-2" />
                      حفظ
                    </Button>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-12">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-elegant"
                />
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none mb-12">
                {article.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.trim().startsWith('##')) {
                    return (
                      <h2 key={index} className="text-3xl font-bold mt-12 mb-6 text-primary">
                        {paragraph.replace('##', '').trim()}
                      </h2>
                    );
                  }
                  if (paragraph.trim().startsWith('###')) {
                    return (
                      <h3 key={index} className="text-2xl font-semibold mt-8 mb-4">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.trim().startsWith('-')) {
                    const listItems = paragraph.split('\n').filter(item => item.trim().startsWith('-'));
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 mb-6">
                        {listItems.map((item, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            {item.replace('-', '').trim()}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.trim().match(/^\d+\./)) {
                    const listItems = paragraph.split('\n').filter(item => item.trim().match(/^\d+\./));
                    return (
                      <ol key={index} className="list-decimal list-inside space-y-2 mb-6">
                        {listItems.map((item, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            {item.replace(/^\d+\./, '').trim()}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={index} className="mb-6 leading-relaxed text-muted-foreground">
                      {paragraph.trim()}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4">العلامات:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <Card className="mb-12">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{article.author}</h3>
                      <p className="text-muted-foreground mb-4">
                        محامي متخصص في القانون التجاري وقانون الشركات مع خبرة تزيد عن 12 عاماً في المجال القانوني. 
                        حاصل على درجة الدكتوراه في القانون التجاري من جامعة الملك سعود.
                      </p>
                      <Button variant="outline" size="sm">
                        عرض المزيد من المقالات
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