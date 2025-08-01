-- Database Setup for LexiHub Legal Services Platform
-- Run these SQL commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    detailed_description TEXT,
    icon TEXT,
    image TEXT,
    duration TEXT,
    price_range TEXT,
    required_documents TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    author_name TEXT,
    category TEXT,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT,
    bio TEXT,
    image TEXT,
    email TEXT,
    phone TEXT,
    specializations TEXT[] DEFAULT '{}',
    years_of_experience INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Info table
CREATE TABLE IF NOT EXISTS contact_info (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phone TEXT,
    email TEXT,
    address TEXT,
    whatsapp TEXT,
    facebook TEXT,
    linkedin TEXT,
    twitter TEXT,
    office_hours TEXT,
    map_embed TEXT,
    address_link TEXT,
    site_name TEXT DEFAULT 'Law Office',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_position TEXT,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation Services table
CREATE TABLE IF NOT EXISTS consultation_services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    price TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation Page Settings table
CREATE TABLE IF NOT EXISTS consultation_page_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    hero_title TEXT DEFAULT 'احجز استشارة قانونية',
    hero_description TEXT DEFAULT 'احصل على استشارة قانونية متخصصة من فريق الخبراء لدينا',
    booking_instructions TEXT,
    contact_details TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Forms table
CREATE TABLE IF NOT EXISTS contact_forms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation Bookings table
CREATE TABLE IF NOT EXISTS consultation_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_date DATE,
    preferred_time TIME,
    case_type TEXT,
    consultation_type TEXT DEFAULT 'office',
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact info if not exists
INSERT INTO contact_info (site_name, phone, email, address)
SELECT 'مكتب المحاماة', '+966123456789', 'info@lawoffice.com', 'الرياض، المملكة العربية السعودية'
WHERE NOT EXISTS (SELECT 1 FROM contact_info);

-- Insert default consultation page settings if not exists
INSERT INTO consultation_page_settings (hero_title, hero_description, booking_instructions)
SELECT 
    'احجز استشارة قانونية',
    'احصل على استشارة قانونية متخصصة من فريق الخبراء لدينا',
    'يرجى ملء النموذج أدناه وسنتواصل معك خلال 24 ساعة'
WHERE NOT EXISTS (SELECT 1 FROM consultation_page_settings);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_members_created_at ON team_members(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_faqs_order_index ON faqs(order_index);
CREATE INDEX IF NOT EXISTS idx_consultation_services_active ON consultation_services(is_active);

-- Enable Row Level Security (RLS) for public read access
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_page_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON articles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON team_members FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON faqs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON consultation_services FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON consultation_page_settings FOR SELECT USING (true);

-- Allow public insert for contact forms and consultation bookings
CREATE POLICY "Enable insert for all users" ON contact_forms FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON consultation_bookings FOR INSERT WITH CHECK (true);