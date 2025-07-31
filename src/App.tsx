import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
import { useSiteSettings, SiteSettings } from "@/hooks/useSiteSettings";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Team from "./pages/Team";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Consultation from "./pages/Consultation";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSettings from "./pages/AdminSettings";
import AdminArticles from "./pages/AdminArticles";
import AdminServices from "./pages/AdminServices";
import AdminTeam from "./pages/AdminTeam";
import AdminConsultations from "./pages/AdminConsultations";
import AdminArticleForm from "./pages/AdminArticleForm";
import AdminServiceForm from "./pages/AdminServiceForm";
import AdminTeamForm from "./pages/AdminTeamForm";
import AdminSiteSettings from "./pages/AdminSiteSettings";
import AdminMasterSettings from "./pages/AdminMasterSettings";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminTestimonialForm from "./pages/AdminTestimonialForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Component to conditionally render content based on settings
const ConditionalElement = ({ element, settingKey }: { element: React.ReactElement; settingKey?: keyof SiteSettings }) => {
  const { settings } = useSiteSettings();
  
  if (settingKey && !settings[settingKey]) {
    return <NotFound />;
  }
  
  return element;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<ConditionalElement element={<Index />} settingKey="showHomePage" />} />
            <Route path="/services" element={<ConditionalElement element={<Services />} settingKey="showServicesPage" />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/team" element={<ConditionalElement element={<Team />} settingKey="showTeamPage" />} />
            <Route path="/articles" element={<ConditionalElement element={<Articles />} settingKey="showArticlesPage" />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/contact" element={<ConditionalElement element={<Contact />} settingKey="showContactPage" />} />
            <Route path="/about" element={<ConditionalElement element={<About />} settingKey="showAboutPage" />} />
            <Route path="/consultation" element={<ConditionalElement element={<Consultation />} settingKey="showConsultationPage" />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminMasterSettings />} />
            <Route path="/admin/site-settings" element={<AdminSiteSettings />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/articles/new" element={<AdminArticleForm />} />
            <Route path="/admin/articles/edit/:id" element={<AdminArticleForm />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/services/new" element={<AdminServiceForm />} />
            <Route path="/admin/services/edit/:id" element={<AdminServiceForm />} />
            <Route path="/admin/team" element={<AdminTeam />} />
            <Route path="/admin/team/new" element={<AdminTeamForm />} />
            <Route path="/admin/team/edit/:id" element={<AdminTeamForm />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/testimonials/new" element={<AdminTestimonialForm />} />
            <Route path="/admin/testimonials/:id/edit" element={<AdminTestimonialForm />} />
            <Route path="/admin/consultations" element={<AdminConsultations />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
