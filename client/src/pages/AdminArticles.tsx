import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Scale, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  Calendar
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  author_name: string;
  category: string;
  published: boolean;
  excerpt: string;
  created_at: string;
}

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    loadArticles();
  }, []);

  const checkUser = () => {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) {
      navigate('/admin/login');
      return;
    }
  };

  const loadArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل المقالات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف المقال بنجاح",
      });
      
      loadArticles();
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المقال",
        variant: "destructive",
      });
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Scale className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة للوحة الإدارة
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-bold text-xl">إدارة المقالات</h1>
                  <p className="text-sm text-muted-foreground">ليكسي هاب</p>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate('/admin/articles/new')}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة مقال جديد
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="البحث في المقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <Badge variant={article.published ? "default" : "secondary"}>
                    {article.published ? "منشور" : "مسودة"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.created_at).toLocaleDateString('ar-EG')}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">الكاتب: </span>
                    <span className="font-medium">{article.author_name}</span>
                  </div>
                  <Badge variant="outline">{article.category}</Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/articles/${article.slug}`)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    عرض
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/articles/edit/${article.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteArticle(article.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد مقالات</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'لم يتم العثور على مقالات تطابق البحث' : 'لم يتم إضافة أي مقالات بعد'}
            </p>
            <Button onClick={() => navigate('/admin/articles/new')}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة أول مقال
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminArticles;