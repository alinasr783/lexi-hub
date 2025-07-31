import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "@/hooks/useLanguage";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/articles" element={<AdminArticles />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/team" element={<AdminTeam />} />
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
