import type { Express } from "express";
import { createServer, type Server } from "http";
import { supabaseServer } from "./supabase";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Services Routes
  app.get("/api/services", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch services" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Articles Routes
  app.get("/api/articles", async (req, res) => {
    try {
      let query = supabaseServer
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (req.query.published === 'true') {
        query = query.eq('published', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch articles" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  // Team Members Routes
  app.get("/api/team", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch team members" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  // Contact Info Routes
  app.get("/api/contact-info", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch contact info" });
      }
      
      res.json(data || {});
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  // Testimonials Routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      let query = supabaseServer
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (req.query.featured === 'true') {
        query = query.eq('is_featured', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch testimonials" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // FAQs Routes
  app.get("/api/faqs", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch FAQs" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  // Consultation Services Routes
  app.get("/api/consultation-services", async (req, res) => {
    try {
      let query = supabaseServer
        .from('consultation_services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (req.query.active === 'true') {
        query = query.eq('is_active', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch consultation services" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch consultation services" });
    }
  });

  // Consultation Page Settings Routes
  app.get("/api/consultation-settings", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('consultation_page_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch consultation settings" });
      }
      
      res.json(data || {});
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch consultation settings" });
    }
  });

  // Contact Forms Routes
  app.get("/api/contact-forms", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch contact forms" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch contact forms" });
    }
  });

  app.post("/api/contact-forms", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('contact_forms')
        .insert(req.body)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(400).json({ error: "Failed to create contact form" });
      }
      
      res.status(201).json(data);
    } catch (error) {
      console.error('Server error:', error);
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  // Consultation Bookings Routes
  app.get("/api/consultation-bookings", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('consultation_bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: "Failed to fetch consultation bookings" });
      }
      
      res.json(data || []);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: "Failed to fetch consultation bookings" });
    }
  });

  app.post("/api/consultation-bookings", async (req, res) => {
    try {
      const { data, error } = await supabaseServer
        .from('consultation_bookings')
        .insert(req.body)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        return res.status(400).json({ error: "Failed to create consultation booking" });
      }
      
      res.status(201).json(data);
    } catch (error) {
      console.error('Server error:', error);
      res.status(400).json({ error: "Invalid consultation booking data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}