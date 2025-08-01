import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertServiceSchema, insertArticleSchema, insertTeamMemberSchema,
  insertPageContentSchema, insertJobSchema, insertFaqSchema, insertAdminSchema,
  insertConsultationPageSettingsSchema, insertContactFormSchema,
  insertConsultationBookingSchema, insertContactInfoSchema,
  insertTestimonialSchema, insertConsultationServiceSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Services Routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.get("/api/services/slug/:slug", async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validatedService = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedService);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data" });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const validatedService = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(req.params.id, validatedService);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data" });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteService(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  // Articles Routes
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = req.query.published === 'true' 
        ? await storage.getPublishedArticles()
        : await storage.getArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticle(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.get("/api/articles/slug/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    try {
      const validatedArticle = insertArticleSchema.parse(req.body);
      const article = await storage.createArticle(validatedArticle);
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.put("/api/articles/:id", async (req, res) => {
    try {
      const validatedArticle = insertArticleSchema.partial().parse(req.body);
      const article = await storage.updateArticle(req.params.id, validatedArticle);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: "Invalid article data" });
    }
  });

  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteArticle(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  // Team Members Routes
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.get("/api/team/:id", async (req, res) => {
    try {
      const teamMember = await storage.getTeamMember(req.params.id);
      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(teamMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  app.get("/api/team/slug/:slug", async (req, res) => {
    try {
      const teamMember = await storage.getTeamMemberBySlug(req.params.slug);
      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(teamMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team member" });
    }
  });

  app.post("/api/team", async (req, res) => {
    try {
      const validatedTeamMember = insertTeamMemberSchema.parse(req.body);
      const teamMember = await storage.createTeamMember(validatedTeamMember);
      res.status(201).json(teamMember);
    } catch (error) {
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.put("/api/team/:id", async (req, res) => {
    try {
      const validatedTeamMember = insertTeamMemberSchema.partial().parse(req.body);
      const teamMember = await storage.updateTeamMember(req.params.id, validatedTeamMember);
      if (!teamMember) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.json(teamMember);
    } catch (error) {
      res.status(400).json({ error: "Invalid team member data" });
    }
  });

  app.delete("/api/team/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTeamMember(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Team member not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete team member" });
    }
  });

  // Page Contents Routes
  app.get("/api/pages", async (req, res) => {
    try {
      const pageContents = await storage.getPageContents();
      res.json(pageContents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page contents" });
    }
  });

  app.get("/api/pages/:pageKey", async (req, res) => {
    try {
      const pageContent = await storage.getPageContent(req.params.pageKey);
      if (!pageContent) {
        return res.status(404).json({ error: "Page content not found" });
      }
      res.json(pageContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page content" });
    }
  });

  app.post("/api/pages", async (req, res) => {
    try {
      const validatedPageContent = insertPageContentSchema.parse(req.body);
      const pageContent = await storage.createPageContent(validatedPageContent);
      res.status(201).json(pageContent);
    } catch (error) {
      res.status(400).json({ error: "Invalid page content data" });
    }
  });

  app.put("/api/pages/:pageKey", async (req, res) => {
    try {
      const validatedPageContent = insertPageContentSchema.partial().parse(req.body);
      const pageContent = await storage.updatePageContent(req.params.pageKey, validatedPageContent);
      if (!pageContent) {
        return res.status(404).json({ error: "Page content not found" });
      }
      res.json(pageContent);
    } catch (error) {
      res.status(400).json({ error: "Invalid page content data" });
    }
  });

  // Jobs Routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = req.query.active === 'true' 
        ? await storage.getActiveJobs()
        : await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const validatedJob = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedJob);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid job data" });
    }
  });

  app.put("/api/jobs/:id", async (req, res) => {
    try {
      const validatedJob = insertJobSchema.partial().parse(req.body);
      const job = await storage.updateJob(req.params.id, validatedJob);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid job data" });
    }
  });

  app.delete("/api/jobs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteJob(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete job" });
    }
  });

  // FAQs Routes
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  app.get("/api/faqs/:id", async (req, res) => {
    try {
      const faq = await storage.getFaq(req.params.id);
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
      res.json(faq);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch FAQ" });
    }
  });

  app.post("/api/faqs", async (req, res) => {
    try {
      const validatedFaq = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(validatedFaq);
      res.status(201).json(faq);
    } catch (error) {
      res.status(400).json({ error: "Invalid FAQ data" });
    }
  });

  app.put("/api/faqs/:id", async (req, res) => {
    try {
      const validatedFaq = insertFaqSchema.partial().parse(req.body);
      const faq = await storage.updateFaq(req.params.id, validatedFaq);
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
      res.json(faq);
    } catch (error) {
      res.status(400).json({ error: "Invalid FAQ data" });
    }
  });

  app.delete("/api/faqs/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFaq(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "FAQ not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete FAQ" });
    }
  });

  // Contact Forms Routes
  app.get("/api/contact-forms", async (req, res) => {
    try {
      const contactForms = await storage.getContactForms();
      res.json(contactForms);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact forms" });
    }
  });

  app.get("/api/contact-forms/:id", async (req, res) => {
    try {
      const contactForm = await storage.getContactForm(req.params.id);
      if (!contactForm) {
        return res.status(404).json({ error: "Contact form not found" });
      }
      res.json(contactForm);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact form" });
    }
  });

  app.post("/api/contact-forms", async (req, res) => {
    try {
      const validatedContactForm = insertContactFormSchema.parse(req.body);
      const contactForm = await storage.createContactForm(validatedContactForm);
      res.status(201).json(contactForm);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  app.patch("/api/contact-forms/:id/read", async (req, res) => {
    try {
      const marked = await storage.markContactFormAsRead(req.params.id);
      if (!marked) {
        return res.status(404).json({ error: "Contact form not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to mark contact form as read" });
    }
  });

  // Consultation Bookings Routes
  app.get("/api/consultation-bookings", async (req, res) => {
    try {
      const bookings = await storage.getConsultationBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultation bookings" });
    }
  });

  app.get("/api/consultation-bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getConsultationBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Consultation booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultation booking" });
    }
  });

  app.post("/api/consultation-bookings", async (req, res) => {
    try {
      const validatedBooking = insertConsultationBookingSchema.parse(req.body);
      const booking = await storage.createConsultationBooking(validatedBooking);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid consultation booking data" });
    }
  });

  app.patch("/api/consultation-bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const booking = await storage.updateConsultationBookingStatus(req.params.id, status);
      if (!booking) {
        return res.status(404).json({ error: "Consultation booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to update consultation booking status" });
    }
  });

  // Contact Info Routes
  app.get("/api/contact-info", async (req, res) => {
    try {
      const contactInfo = await storage.getContactInfo();
      if (!contactInfo) {
        return res.status(404).json({ error: "Contact info not found" });
      }
      res.json(contactInfo);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  app.put("/api/contact-info", async (req, res) => {
    try {
      const validatedContactInfo = insertContactInfoSchema.parse(req.body);
      const contactInfo = await storage.updateContactInfo(validatedContactInfo);
      res.json(contactInfo);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact info data" });
    }
  });

  // Testimonials Routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = req.query.featured === 'true' 
        ? await storage.getFeaturedTestimonials()
        : await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonial = await storage.getTestimonial(req.params.id);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonial" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedTestimonial = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedTestimonial);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const validatedTestimonial = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validatedTestimonial);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTestimonial(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // Consultation Services Routes
  app.get("/api/consultation-services", async (req, res) => {
    try {
      const services = req.query.active === 'true' 
        ? await storage.getActiveConsultationServices()
        : await storage.getConsultationServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultation services" });
    }
  });

  app.get("/api/consultation-services/:id", async (req, res) => {
    try {
      const service = await storage.getConsultationService(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Consultation service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultation service" });
    }
  });

  app.post("/api/consultation-services", async (req, res) => {
    try {
      const validatedService = insertConsultationServiceSchema.parse(req.body);
      const service = await storage.createConsultationService(validatedService);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid consultation service data" });
    }
  });

  app.put("/api/consultation-services/:id", async (req, res) => {
    try {
      const validatedService = insertConsultationServiceSchema.partial().parse(req.body);
      const service = await storage.updateConsultationService(req.params.id, validatedService);
      if (!service) {
        return res.status(404).json({ error: "Consultation service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid consultation service data" });
    }
  });

  app.delete("/api/consultation-services/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteConsultationService(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Consultation service not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete consultation service" });
    }
  });

  // Consultation Page Settings Routes
  app.get("/api/consultation-settings", async (req, res) => {
    try {
      const settings = await storage.getConsultationPageSettings();
      if (!settings) {
        return res.status(404).json({ error: "Consultation settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch consultation settings" });
    }
  });

  app.put("/api/consultation-settings", async (req, res) => {
    try {
      const validatedSettings = insertConsultationPageSettingsSchema.parse(req.body);
      const settings = await storage.updateConsultationPageSettings(validatedSettings);
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: "Invalid consultation settings data" });
    }
  });

  // Admin Routes
  app.get("/api/admins", async (req, res) => {
    try {
      const admins = await storage.getAdmins();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admins" });
    }
  });

  app.get("/api/admins/:id", async (req, res) => {
    try {
      const admin = await storage.getAdmin(req.params.id);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch admin" });
    }
  });

  app.post("/api/admins", async (req, res) => {
    try {
      const validatedAdmin = insertAdminSchema.parse(req.body);
      const admin = await storage.createAdmin(validatedAdmin);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ error: "Invalid admin data" });
    }
  });

  app.put("/api/admins/:id", async (req, res) => {
    try {
      const validatedAdmin = insertAdminSchema.partial().parse(req.body);
      const admin = await storage.updateAdmin(req.params.id, validatedAdmin);
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res.status(400).json({ error: "Invalid admin data" });
    }
  });

  app.delete("/api/admins/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteAdmin(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete admin" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
