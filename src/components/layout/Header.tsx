import { useState } from 'react';
import { Moon, Sun, Globe, Menu, X, Scale, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { useContactInfo } from '@/hooks/useContactInfo';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { contactInfo } = useContactInfo();

  const navigation = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'team', href: '/team' },
    { key: 'articles', href: '/articles' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      {/* شريط التنقل الرئيسي */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* الشعار */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-bold text-xl text-gradient">
              {contactInfo?.site_name || (language === 'ar' ? 'ليكسي هاب' : 'Lexi Hub')}
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
          </nav>

          {/* أزرار التحكم */}
          <div className="flex items-center gap-3">
            {/* زر حجز الاستشارة */}
            <Button
              asChild
              className="hidden md:inline-flex btn-secondary"
            >
              <a href="/consultation">
                {t('bookConsultation')}
              </a>
            </Button>

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
            <Button
              asChild
              className="w-full mt-4 btn-secondary"
            >
              <a href="/consultation" onClick={() => setIsMenuOpen(false)}>
                {t('bookConsultation')}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};