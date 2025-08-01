import { pgTable, text, uuid, timestamp, boolean, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Services table
export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description"),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
  image: text("image"),
  priceRange: text("price_range"),
  duration: text("duration"),
  requiredDocuments: text("required_documents").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Articles table
export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  slug: text("slug").notNull().unique(),
  authorName: text("author_name").notNull(),
  category: text("category").notNull(),
  featuredImage: text("featured_image"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Team Members table
export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  specialization: text("specialization").notNull(),
  slug: text("slug").notNull().unique(),
  bio: text("bio"),
  photo: text("photo"),
  email: text("email"),
  phone: text("phone"),
  linkedin: text("linkedin"),
  yearsExperience: integer("years_experience"),
  education: text("education").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Page Contents table
export const pageContents = pgTable("page_contents", {
  id: uuid("id").primaryKey().defaultRandom(),
  pageKey: text("page_key").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  metaDescription: text("meta_description"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  position: text("position").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").array(),
  benefits: text("benefits").array(),
  salaryRange: text("salary_range"),
  employmentType: text("employment_type"),
  experienceLevel: text("experience_level"),
  applyEmail: text("apply_email"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// FAQs table
export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"),
  orderIndex: integer("order_index"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admins table
export const admins = pgTable("admins", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Consultation Page Settings table
export const consultationPageSettings = pgTable("consultation_page_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  heroTitle: text("hero_title").notNull(),
  heroDescription: text("hero_description").notNull(),
  consultationTypes: json("consultation_types"),
  caseTypes: json("case_types"),
  timeSlots: json("time_slots"),
  bookingInstructions: text("booking_instructions"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact Forms table
export const contactForms = pgTable("contact_forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Consultation Bookings table
export const consultationBookings = pgTable("consultation_bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),
  consultationType: text("consultation_type"),
  caseType: text("case_type"),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact Info table
export const contactInfo = pgTable("contact_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  siteName: text("site_name"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  addressLink: text("address_link"),
  officeHours: text("office_hours"),
  facebook: text("facebook"),
  twitter: text("twitter"),
  linkedin: text("linkedin"),
  whatsapp: text("whatsapp"),
  mapEmbed: text("map_embed"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientName: text("client_name").notNull(),
  testimonial: text("testimonial").notNull(),
  caseType: text("case_type").notNull(),
  rating: integer("rating"),
  isAnonymous: boolean("is_anonymous").default(false),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Consultation Services table
export const consultationServices = pgTable("consultation_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  duration: text("duration").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertServiceSchema = createInsertSchema(services).omit({ id: true, createdAt: true, updatedAt: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true, createdAt: true, updatedAt: true });
export const insertPageContentSchema = createInsertSchema(pageContents).omit({ id: true, updatedAt: true });
export const insertJobSchema = createInsertSchema(jobs).omit({ id: true, createdAt: true, updatedAt: true });
export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true, createdAt: true });
export const insertAdminSchema = createInsertSchema(admins).omit({ id: true, createdAt: true, updatedAt: true });
export const insertConsultationPageSettingsSchema = createInsertSchema(consultationPageSettings).omit({ id: true, updatedAt: true });
export const insertContactFormSchema = createInsertSchema(contactForms).omit({ id: true, createdAt: true });
export const insertConsultationBookingSchema = createInsertSchema(consultationBookings).omit({ id: true, createdAt: true });
export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({ id: true, updatedAt: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true, createdAt: true });
export const insertConsultationServiceSchema = createInsertSchema(consultationServices).omit({ id: true, createdAt: true, updatedAt: true });

// Types
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type PageContent = typeof pageContents.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;
export type InsertConsultationPageSettings = z.infer<typeof insertConsultationPageSettingsSchema>;
export type ConsultationPageSettings = typeof consultationPageSettings.$inferSelect;
export type InsertContactForm = z.infer<typeof insertContactFormSchema>;
export type ContactForm = typeof contactForms.$inferSelect;
export type InsertConsultationBooking = z.infer<typeof insertConsultationBookingSchema>;
export type ConsultationBooking = typeof consultationBookings.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertConsultationService = z.infer<typeof insertConsultationServiceSchema>;
export type ConsultationService = typeof consultationServices.$inferSelect;
