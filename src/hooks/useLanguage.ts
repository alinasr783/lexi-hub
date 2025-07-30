import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    team: 'الفريق',
    articles: 'المقالات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    bookConsultation: 'احجز استشارة',
    learnMore: 'اعرف المزيد',
    heroTitle: 'مكتب ليكسي هاب للمحاماة والاستشارات القانونية',
    heroSubtitle: 'خبرة قانونية متميزة وحلول مبتكرة لجميع احتياجاتكم القانونية',
    ourServices: 'خدماتنا القانونية',
    servicesDesc: 'نقدم مجموعة شاملة من الخدمات القانونية المتخصصة',
    legalConsultations: 'الاستشارات القانونية',
    legalConsultationsDesc: 'استشارات قانونية شاملة في جميع المجالات',
    commercialCases: 'القضايا التجارية',
    commercialCasesDesc: 'تمثيل قانوني في القضايا التجارية',
    personalStatus: 'قضايا الأحوال الشخصية',
    personalStatusDesc: 'قضايا الزواج والطلاق والحضانة',
    ourTeam: 'فريق العمل',
    teamDesc: 'محامون متخصصون مع سنوات من الخبرة',
    testimonials: 'آراء عملائنا',
    testimonialsDesc: 'ما يقوله عملاؤنا عن خدماتنا',
    latestArticles: 'أحدث المقالات',
    articlesDesc: 'مقالات قانونية متخصصة لتوعية المجتمع'
  },
  en: {
    home: 'Home',
    services: 'Services',
    team: 'Team',
    articles: 'Articles',
    about: 'About',
    contact: 'Contact',
    bookConsultation: 'Book Consultation',
    learnMore: 'Learn More',
    heroTitle: 'Lexi Hub Law Firm & Legal Consultations',
    heroSubtitle: 'Distinguished legal expertise and innovative solutions for all your legal needs',
    ourServices: 'Our Legal Services',
    servicesDesc: 'We provide a comprehensive range of specialized legal services',
    legalConsultations: 'Legal Consultations',
    legalConsultationsDesc: 'Comprehensive legal advice in all areas',
    commercialCases: 'Commercial Cases',
    commercialCasesDesc: 'Legal representation in commercial disputes',
    personalStatus: 'Personal Status Cases',
    personalStatusDesc: 'Marriage, divorce and custody cases',
    ourTeam: 'Our Team',
    teamDesc: 'Specialized lawyers with years of experience',
    testimonials: 'Client Testimonials',
    testimonialsDesc: 'What our clients say about our services',
    latestArticles: 'Latest Articles',
    articlesDesc: 'Specialized legal articles for community awareness'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return React.createElement(LanguageContext.Provider, { value }, children);
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};