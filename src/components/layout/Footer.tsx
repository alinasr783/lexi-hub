import { Scale, Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* معلومات المكتب */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-secondary p-2 rounded-lg">
                <Scale className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="font-bold text-xl">
                {language === 'ar' ? 'ليكسي هاب' : 'Lexi Hub'}
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              {language === 'ar' 
                ? 'مكتب محاماة متخصص في تقديم الخدمات القانونية المتميزة مع خبرة تزيد عن 15 عاماً'
                : 'A specialized law firm providing exceptional legal services with over 15 years of experience'
              }
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-secondary">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {['home', 'services', 'team', 'articles', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'home' ? '/' : `/${item}`}
                    className="text-primary-foreground/80 hover:text-secondary transition-smooth"
                  >
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* الخدمات */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-secondary">
              {t('services')}
            </h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>{language === 'ar' ? 'الاستشارات القانونية' : 'Legal Consultation'}</li>
              <li>{language === 'ar' ? 'القضايا التجارية' : 'Commercial Cases'}</li>
              <li>{language === 'ar' ? 'قضايا الأحوال الشخصية' : 'Family Law'}</li>
              <li>{language === 'ar' ? 'القضايا العمالية' : 'Labor Law'}</li>
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-secondary">
              {t('contact')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80">+966501234567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80">info@lexihub.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-1" />
                <span className="text-primary-foreground/80">
                  {language === 'ar' 
                    ? 'الرياض، حي الملك فهد، مبنى الأعمال، الطابق الخامس'
                    : 'Riyadh, King Fahd District, Business Building, 5th Floor'
                  }
                </span>
              </div>
            </div>

            {/* وسائل التواصل الاجتماعي */}
            <div className="flex gap-3 pt-2">
              <a 
                href="#" 
                className="bg-secondary/20 p-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-smooth"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-secondary/20 p-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-smooth"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-secondary/20 p-2 rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-smooth"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* الحقوق والرابط الإداري */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-center md:text-left">
            © 2024 {language === 'ar' ? 'ليكسي هاب' : 'Lexi Hub'}. {t('rights')}.
          </p>
          
          {/* رابط المدير */}
          <a 
            href="/admin/login"
            className="text-primary-foreground/40 hover:text-secondary transition-smooth text-sm"
          >
            {t('adminLink')}
          </a>
        </div>
      </div>
    </footer>
  );
};