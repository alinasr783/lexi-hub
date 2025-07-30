import { useState } from 'react';

type Language = 'ar' | 'en';

const translations = {
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    team: 'فريق العمل',
    articles: 'المقالات',
    about: 'من نحن',
    contact: 'اتصل بنا',
    bookConsultation: 'احجز استشارة',
    workingHours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
    heroTitle: 'مكتب محاماة متخصص في تقديم الحلول القانونية',
    heroSubtitle: 'نحن نقدم خدمات قانونية متميزة مع خبرة تزيد عن 15 عاماً في المملكة العربية السعودية',
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد',
    ourServices: 'خدماتنا',
    servicesDesc: 'نقدم مجموعة شاملة من الخدمات القانونية المتخصصة',
    viewAllServices: 'عرض جميع الخدمات',
    ourTeam: 'فريق العمل',
    teamDesc: 'فريق من المحامين المتخصصين ذوي الخبرة العالية',
    yearsExperience: 'سنة خبرة',
    testimonials: 'آراء العملاء',
    testimonialsDesc: 'ماذا يقول عملاؤنا عن خدماتنا',
    faqs: 'الأسئلة الشائعة',
    faqsDesc: 'إجابات على الأسئلة الأكثر شيوعاً',
    readMore: 'اقرأ المزيد',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح',
    submit: 'إرسال',
    cancel: 'إلغاء',
    close: 'إغلاق',
    adminLink: 'هل أنت المدير؟',
    rights: 'جميع الحقوق محفوظة',
    followUs: 'تابعنا على',
  },
  en: {
    home: 'Home',
    services: 'Services',
    team: 'Team',
    articles: 'Articles',
    about: 'About',
    contact: 'Contact',
    bookConsultation: 'Book Consultation',
    workingHours: 'Sun - Thu: 9:00 AM - 6:00 PM',
    heroTitle: 'Professional Law Firm Specialized in Legal Solutions',
    heroSubtitle: 'We provide exceptional legal services with over 15 years of experience in Saudi Arabia',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    ourServices: 'Our Services',
    servicesDesc: 'We offer a comprehensive range of specialized legal services',
    viewAllServices: 'View All Services',
    ourTeam: 'Our Team',
    teamDesc: 'A team of specialized lawyers with high expertise',
    yearsExperience: 'years of experience',
    testimonials: 'Client Reviews',
    testimonialsDesc: 'What our clients say about our services',
    faqs: 'Frequently Asked Questions',
    faqsDesc: 'Answers to the most common questions',
    readMore: 'Read More',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close',
    adminLink: 'Are you the admin?',
    rights: 'All rights reserved',
    followUs: 'Follow us on',
  },
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return { language, setLanguage, t };
};