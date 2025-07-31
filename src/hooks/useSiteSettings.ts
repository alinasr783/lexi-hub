import { useState, useEffect } from 'react';

export interface SiteSettings {
  theme: 'light' | 'dark' | 'auto';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  showHomePage: boolean;
  showAboutPage: boolean;
  showServicesPage: boolean;
  showTeamPage: boolean;
  showArticlesPage: boolean;
  showContactPage: boolean;
  showConsultationPage: boolean;
  showHeroSection: boolean;
  showServicesSection: boolean;
  showTeamSection: boolean;
  showTestimonialsSection: boolean;
  showArticlesSection: boolean;
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
  theme: 'light',
  primaryColor: '#1e3a8a',
  secondaryColor: '#3b82f6',
  accentColor: '#ef4444',
  showHomePage: true,
  showAboutPage: true,
  showServicesPage: true,
  showTeamPage: true,
  showArticlesPage: true,
  showContactPage: true,
  showConsultationPage: true,
  showHeroSection: true,
  showServicesSection: true,
  showTeamSection: true,
  showTestimonialsSection: true,
  showArticlesSection: true,
  siteName: 'LexiHub',
  siteDescription: 'خدمات قانونية متخصصة',
  maintenanceMode: false,
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('siteSettings', JSON.stringify(updated));
  };

  return {
    settings,
    updateSettings,
    loading,
  };
};