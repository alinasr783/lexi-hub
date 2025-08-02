import { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Menu, X, Scale, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { useContactInfo } from '@/hooks/useContactInfo';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [articleCategories, setArticleCategories] = useState<string[]>([]);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { contactInfo } = useContactInfo();
  const { settings } = useSiteSettings();

  useEffect(() => {
    loadArticleCategories();
  }, []);

  const loadArticleCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('category')
        .eq('published', true);

      if (error) throw error;
      
      // Get unique categories
      const uniqueCategories = Array.from(new Set(data?.map(article => article.category) || []));
      setArticleCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const navigation = [
    { key: 'home', href: '/', show: settings.showHomePage },
    { key: 'services', href: '/services', show: settings.showServicesPage },
    { key: 'team', href: '/team', show: settings.showTeamPage },
    { key: 'about', href: '/about', show: settings.showAboutPage },
    { key: 'contact', href: '/contact', show: settings.showContactPage },
  ].filter(item => item.show);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      {/* شريط التنقل الرئيسي */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* الشعار */}
          <div className="flex items-center gap-3">
            {settings.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt="Logo" 
                className="w-10 h-10 object-contain"
              />
            ) : (
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Scale className="w-6 h-6 text-primary-foreground" />
              </div>
            )}
            <div className="font-bold text-xl text-gradient">
              {contactInfo?.site_name || settings.siteName || (language === 'ar' ? 'ليكسي هاب' : 'Lexi Hub')}
            </div>
          </div>

          {/* قائمة التنقل - الشاشات الكبيرة */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-foreground hover:text-primary transition-smooth font-medium"
              >
                {t(item.key)}
              </a>
            ))}
            
            {/* قائمة المقالات المنسدلة */}
            {settings.showArticlesPage && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-smooth font-medium">
                  {t('articles')}
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border border-border">
                  <DropdownMenuItem asChild>
                    <a href="/articles" className="w-full">
                      جميع المقالات
                    </a>
                  </DropdownMenuItem>
                  {articleCategories.map((category) => (
                    <DropdownMenuItem key={category} asChild>
                      <a 
                        href={`/articles?category=${encodeURIComponent(category)}`}
                        className="w-full"
                      >
                        {category}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* أزرار التحكم */}
          <div className="flex items-center gap-3">
            {/* زر حجز الاستشارة */}
            {settings.showConsultationPage && (
              <Button
                asChild
                className="hidden md:inline-flex btn-secondary"
              >
                <a href="/consultation">
                  {t('bookConsultation')}
                </a>
              </Button>
            )}

            {/* تبديل اللغة */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'ar' ? 'EN' : 'عر'}
              </span>
            </Button>

            {/* تبديل الوضع الليلي */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* زر القائمة - الشاشات الصغيرة */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* القائمة المنسدلة - الشاشات الصغيرة */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block py-2 text-foreground hover:text-primary transition-smooth font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
            {settings.showConsultationPage && (
              <Button
                asChild
                className="w-full mt-4 btn-secondary"
              >
                <a href="/consultation" onClick={() => setIsMenuOpen(false)}>
                  {t('bookConsultation')}
                </a>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};