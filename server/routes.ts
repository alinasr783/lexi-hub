import type { Express } from "express";
import { createServer, type Server } from "http";
import { MemStorage, type IStorage } from "./storage";

const storage: IStorage = new MemStorage();

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Services Routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Articles Routes
  app.get("/api/articles", async (req, res) => {
    try {
      let articles;
      if (req.query.published === 'true') {
        articles = await storage.getPublishedArticles();
      } else {
        articles = await storage.getArticles();
      }
      res.json(articles);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  // Team Members Routes
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  // Contact Info Routes
  app.get("/api/contact-info", async (req, res) => {
    try {
      const contactInfo = await storage.getContactInfo();
      res.json(contactInfo || {});
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  // Testimonials Routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      let testimonials;
      if (req.query.featured === 'true') {
        testimonials = await storage.getFeaturedTestimonials();
      } else {
        testimonials = await storage.getTestimonials();
      }
      res.json(testimonials);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // FAQs Routes
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  // Consultation Services Routes
  app.get("/api/consultation-services", async (req, res) => {
    try {
      let services;
      if (req.query.active === 'true') {
        services = await storage.getActiveConsultationServices();
      } else {
        services = await storage.getConsultationServices();
      }
      res.json(services);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch consultation services" });
    }
  });

  // Consultation Page Settings Routes
  app.get("/api/consultation-settings", async (req, res) => {
    try {
      const settings = await storage.getConsultationPageSettings();
      res.json(settings || {});
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch consultation settings" });
    }
  });

  // Contact Forms Routes
  app.get("/api/contact-forms", async (req, res) => {
    try {
      const contactForms = await storage.getContactForms();
      res.json(contactForms);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch contact forms" });
    }
  });

  app.post("/api/contact-forms", async (req, res) => {
    try {
      const contactForm = await storage.createContactForm(req.body);
      res.status(201).json(contactForm);
    } catch (error) {
      console.error('Server error:', error);
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  // Consultation Bookings Routes
  app.get("/api/consultation-bookings", async (req, res) => {
    try {
      const bookings = await storage.getConsultationBookings();
      res.json(bookings);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch consultation bookings" });
    }
  });

  app.post("/api/consultation-bookings", async (req, res) => {
    try {
      const booking = await storage.createConsultationBooking(req.body);
      res.status(201).json(booking);
    } catch (error) {
      console.error('Server error:', error);
      res.status(400).json({ error: "Invalid consultation booking data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}