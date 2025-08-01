import { 
  services, articles, teamMembers, pageContents, jobs, faqs, admins,
  consultationPageSettings, contactForms, consultationBookings, contactInfo,
  testimonials, consultationServices,
  type Service, type InsertService,
  type Article, type InsertArticle,
  type TeamMember, type InsertTeamMember,
  type PageContent, type InsertPageContent,
  type Job, type InsertJob,
  type Faq, type InsertFaq,
  type Admin, type InsertAdmin,
  type ConsultationPageSettings, type InsertConsultationPageSettings,
  type ContactForm, type InsertContactForm,
  type ConsultationBooking, type InsertConsultationBooking,
  type ContactInfo, type InsertContactInfo,
  type Testimonial, type InsertTestimonial,
  type ConsultationService, type InsertConsultationService
} from "@shared/schema";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  // Articles
  getArticles(): Promise<Article[]>;
  getPublishedArticles(): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<boolean>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getTeamMember(id: string): Promise<TeamMember | undefined>;
  getTeamMemberBySlug(slug: string): Promise<TeamMember | undefined>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, teamMember: Partial<InsertTeamMember>): Promise<TeamMember | undefined>;
  deleteTeamMember(id: string): Promise<boolean>;

  // Page Contents
  getPageContents(): Promise<PageContent[]>;
  getPageContent(pageKey: string): Promise<PageContent | undefined>;
  createPageContent(pageContent: InsertPageContent): Promise<PageContent>;
  updatePageContent(pageKey: string, pageContent: Partial<InsertPageContent>): Promise<PageContent | undefined>;

  // Jobs
  getJobs(): Promise<Job[]>;
  getActiveJobs(): Promise<Job[]>;
  getJob(id: string): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;

  // FAQs
  getFaqs(): Promise<Faq[]>;
  getFaq(id: string): Promise<Faq | undefined>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  updateFaq(id: string, faq: Partial<InsertFaq>): Promise<Faq | undefined>;
  deleteFaq(id: string): Promise<boolean>;

  // Admins
  getAdmins(): Promise<Admin[]>;
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  updateAdmin(id: string, admin: Partial<InsertAdmin>): Promise<Admin | undefined>;
  deleteAdmin(id: string): Promise<boolean>;

  // Consultation Page Settings
  getConsultationPageSettings(): Promise<ConsultationPageSettings | undefined>;
  updateConsultationPageSettings(settings: InsertConsultationPageSettings): Promise<ConsultationPageSettings>;

  // Contact Forms
  getContactForms(): Promise<ContactForm[]>;
  getContactForm(id: string): Promise<ContactForm | undefined>;
  createContactForm(contactForm: InsertContactForm): Promise<ContactForm>;
  markContactFormAsRead(id: string): Promise<boolean>;

  // Consultation Bookings
  getConsultationBookings(): Promise<ConsultationBooking[]>;
  getConsultationBooking(id: string): Promise<ConsultationBooking | undefined>;
  createConsultationBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking>;
  updateConsultationBookingStatus(id: string, status: string): Promise<ConsultationBooking | undefined>;

  // Contact Info
  getContactInfo(): Promise<ContactInfo | undefined>;
  updateContactInfo(contactInfo: InsertContactInfo): Promise<ContactInfo>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  // Consultation Services
  getConsultationServices(): Promise<ConsultationService[]>;
  getActiveConsultationServices(): Promise<ConsultationService[]>;
  getConsultationService(id: string): Promise<ConsultationService | undefined>;
  createConsultationService(service: InsertConsultationService): Promise<ConsultationService>;
  updateConsultationService(id: string, service: Partial<InsertConsultationService>): Promise<ConsultationService | undefined>;
  deleteConsultationService(id: string): Promise<boolean>;
}

import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(desc(services.createdAt));
  }

  async getService(id: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
    return result[0];
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
    return result[0];
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getPublishedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => article.published);
  }

  async getArticle(id: string): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    return Array.from(this.articles.values()).find(article => article.slug === slug);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const newArticle: Article = {
      ...article,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      excerpt: article.excerpt ?? null,
      featuredImage: article.featuredImage ?? null,
      published: article.published ?? null
    };
    this.articles.set(newArticle.id, newArticle);
    return newArticle;
  }

  async updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined> {
    const existing = this.articles.get(id);
    if (!existing) return undefined;
    
    const updated: Article = {
      ...existing,
      ...article,
      updatedAt: new Date()
    };
    this.articles.set(id, updated);
    return updated;
  }

  async deleteArticle(id: string): Promise<boolean> {
    return this.articles.delete(id);
  }

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values());
  }

  async getTeamMember(id: string): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async getTeamMemberBySlug(slug: string): Promise<TeamMember | undefined> {
    return Array.from(this.teamMembers.values()).find(member => member.slug === slug);
  }

  async createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember> {
    const newMember: TeamMember = {
      ...teamMember,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      bio: teamMember.bio ?? null,
      photo: teamMember.photo ?? null,
      email: teamMember.email ?? null,
      phone: teamMember.phone ?? null,
      linkedin: teamMember.linkedin ?? null,
      yearsExperience: teamMember.yearsExperience ?? null,
      education: teamMember.education ?? null
    };
    this.teamMembers.set(newMember.id, newMember);
    return newMember;
  }

  async updateTeamMember(id: string, teamMember: Partial<InsertTeamMember>): Promise<TeamMember | undefined> {
    const existing = this.teamMembers.get(id);
    if (!existing) return undefined;
    
    const updated: TeamMember = {
      ...existing,
      ...teamMember,
      updatedAt: new Date()
    };
    this.teamMembers.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id: string): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  // Page Contents
  async getPageContents(): Promise<PageContent[]> {
    return Array.from(this.pageContents.values());
  }

  async getPageContent(pageKey: string): Promise<PageContent | undefined> {
    return Array.from(this.pageContents.values()).find(content => content.pageKey === pageKey);
  }

  async createPageContent(pageContent: InsertPageContent): Promise<PageContent> {
    const newContent: PageContent = {
      ...pageContent,
      id: crypto.randomUUID(),
      updatedAt: new Date(),
      imageUrl: pageContent.imageUrl ?? null,
      metaDescription: pageContent.metaDescription ?? null
    };
    this.pageContents.set(newContent.id, newContent);
    return newContent;
  }

  async updatePageContent(pageKey: string, pageContent: Partial<InsertPageContent>): Promise<PageContent | undefined> {
    const existing = Array.from(this.pageContents.values()).find(content => content.pageKey === pageKey);
    if (!existing) return undefined;
    
    const updated: PageContent = {
      ...existing,
      ...pageContent,
      updatedAt: new Date()
    };
    this.pageContents.set(existing.id, updated);
    return updated;
  }

  // Jobs
  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getActiveJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.isActive);
  }

  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(job: InsertJob): Promise<Job> {
    const newJob: Job = {
      ...job,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      requirements: job.requirements ?? null,
      benefits: job.benefits ?? null,
      salaryRange: job.salaryRange ?? null,
      employmentType: job.employmentType ?? null,
      experienceLevel: job.experienceLevel ?? null,
      applyEmail: job.applyEmail ?? null,
      isActive: job.isActive ?? null
    };
    this.jobs.set(newJob.id, newJob);
    return newJob;
  }

  async updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined> {
    const existing = this.jobs.get(id);
    if (!existing) return undefined;
    
    const updated: Job = {
      ...existing,
      ...job,
      updatedAt: new Date()
    };
    this.jobs.set(id, updated);
    return updated;
  }

  async deleteJob(id: string): Promise<boolean> {
    return this.jobs.delete(id);
  }

  // FAQs
  async getFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values()).sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }

  async getFaq(id: string): Promise<Faq | undefined> {
    return this.faqs.get(id);
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const newFaq: Faq = {
      ...faq,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      category: faq.category ?? null,
      orderIndex: faq.orderIndex ?? null
    };
    this.faqs.set(newFaq.id, newFaq);
    return newFaq;
  }

  async updateFaq(id: string, faq: Partial<InsertFaq>): Promise<Faq | undefined> {
    const existing = this.faqs.get(id);
    if (!existing) return undefined;
    
    const updated: Faq = {
      ...existing,
      ...faq
    };
    this.faqs.set(id, updated);
    return updated;
  }

  async deleteFaq(id: string): Promise<boolean> {
    return this.faqs.delete(id);
  }

  // Admins
  async getAdmins(): Promise<Admin[]> {
    return Array.from(this.admins.values());
  }

  async getAdmin(id: string): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.email === email);
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const newAdmin: Admin = {
      ...admin,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      role: admin.role ?? null,
      isActive: admin.isActive ?? null
    };
    this.admins.set(newAdmin.id, newAdmin);
    return newAdmin;
  }

  async updateAdmin(id: string, admin: Partial<InsertAdmin>): Promise<Admin | undefined> {
    const existing = this.admins.get(id);
    if (!existing) return undefined;
    
    const updated: Admin = {
      ...existing,
      ...admin,
      updatedAt: new Date()
    };
    this.admins.set(id, updated);
    return updated;
  }

  async deleteAdmin(id: string): Promise<boolean> {
    return this.admins.delete(id);
  }

  // Consultation Page Settings
  async getConsultationPageSettings(): Promise<ConsultationPageSettings | undefined> {
    return this.consultationPageSettings;
  }

  async updateConsultationPageSettings(settings: InsertConsultationPageSettings): Promise<ConsultationPageSettings> {
    const updated: ConsultationPageSettings = {
      ...settings,
      id: this.consultationPageSettings?.id || crypto.randomUUID(),
      updatedAt: new Date(),
      consultationTypes: settings.consultationTypes ?? null,
      caseTypes: settings.caseTypes ?? null,
      timeSlots: settings.timeSlots ?? null,
      bookingInstructions: settings.bookingInstructions ?? null,
      isActive: settings.isActive ?? null
    };
    this.consultationPageSettings = updated;
    return updated;
  }

  // Contact Forms
  async getContactForms(): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getContactForm(id: string): Promise<ContactForm | undefined> {
    return this.contactForms.get(id);
  }

  async createContactForm(contactForm: InsertContactForm): Promise<ContactForm> {
    const newForm: ContactForm = {
      ...contactForm,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      phone: contactForm.phone ?? null,
      isRead: contactForm.isRead ?? null
    };
    this.contactForms.set(newForm.id, newForm);
    return newForm;
  }

  async markContactFormAsRead(id: string): Promise<boolean> {
    const existing = this.contactForms.get(id);
    if (!existing) return false;
    
    existing.isRead = true;
    this.contactForms.set(id, existing);
    return true;
  }

  // Consultation Bookings
  async getConsultationBookings(): Promise<ConsultationBooking[]> {
    return Array.from(this.consultationBookings.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getConsultationBooking(id: string): Promise<ConsultationBooking | undefined> {
    return this.consultationBookings.get(id);
  }

  async createConsultationBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const newBooking: ConsultationBooking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      name: booking.name ?? null,
      email: booking.email ?? null,
      phone: booking.phone ?? null,
      consultationType: booking.consultationType ?? null,
      caseType: booking.caseType ?? null,
      preferredDate: booking.preferredDate ?? null,
      preferredTime: booking.preferredTime ?? null,
      message: booking.message ?? null,
      status: booking.status ?? null
    };
    this.consultationBookings.set(newBooking.id, newBooking);
    return newBooking;
  }

  async updateConsultationBookingStatus(id: string, status: string): Promise<ConsultationBooking | undefined> {
    const existing = this.consultationBookings.get(id);
    if (!existing) return undefined;
    
    existing.status = status;
    this.consultationBookings.set(id, existing);
    return existing;
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | undefined> {
    return this.contactInfo;
  }

  async updateContactInfo(contactInfo: InsertContactInfo): Promise<ContactInfo> {
    const updated: ContactInfo = {
      ...contactInfo,
      id: this.contactInfo?.id || crypto.randomUUID(),
      updatedAt: new Date(),
      siteName: contactInfo.siteName ?? null,
      phone: contactInfo.phone ?? null,
      email: contactInfo.email ?? null,
      address: contactInfo.address ?? null,
      addressLink: contactInfo.addressLink ?? null,
      officeHours: contactInfo.officeHours ?? null,
      facebook: contactInfo.facebook ?? null,
      twitter: contactInfo.twitter ?? null,
      linkedin: contactInfo.linkedin ?? null,
      whatsapp: contactInfo.whatsapp ?? null,
      mapEmbed: contactInfo.mapEmbed ?? null
    };
    this.contactInfo = updated;
    return updated;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.isFeatured);
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      rating: testimonial.rating ?? null,
      isAnonymous: testimonial.isAnonymous ?? null,
      isFeatured: testimonial.isFeatured ?? null
    };
    this.testimonials.set(newTestimonial.id, newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const existing = this.testimonials.get(id);
    if (!existing) return undefined;
    
    const updated: Testimonial = {
      ...existing,
      ...testimonial
    };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Consultation Services
  async getConsultationServices(): Promise<ConsultationService[]> {
    return Array.from(this.consultationServices.values());
  }

  async getActiveConsultationServices(): Promise<ConsultationService[]> {
    return Array.from(this.consultationServices.values()).filter(service => service.isActive);
  }

  async getConsultationService(id: string): Promise<ConsultationService | undefined> {
    return this.consultationServices.get(id);
  }

  async createConsultationService(service: InsertConsultationService): Promise<ConsultationService> {
    const newService: ConsultationService = {
      ...service,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: service.isActive ?? null
    };
    this.consultationServices.set(newService.id, newService);
    return newService;
  }

  async updateConsultationService(id: string, service: Partial<InsertConsultationService>): Promise<ConsultationService | undefined> {
    const existing = this.consultationServices.get(id);
    if (!existing) return undefined;
    
    const updated: ConsultationService = {
      ...existing,
      ...service,
      updatedAt: new Date()
    };
    this.consultationServices.set(id, updated);
    return updated;
  }

  async deleteConsultationService(id: string): Promise<boolean> {
    return this.consultationServices.delete(id);
  }
}

export const storage = new MemStorage();
