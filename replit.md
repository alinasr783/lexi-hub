# Overview

This is a comprehensive full-stack legal services web platform called "LexiHub" built for law firms. The application provides a complete digital presence solution with multi-language support (Arabic/English), client consultation booking, content management, and administrative capabilities. It features a modern, responsive design optimized for legal professionals to showcase their services, manage client interactions, and maintain their digital presence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: React Router for client-side navigation
- **Language Support**: Custom internationalization hook supporting Arabic (RTL) and English
- **UI Components**: Radix UI primitives with custom styling for accessibility and consistency

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: Supabase PostgreSQL with direct client connections
- **API Pattern**: RESTful API endpoints with Express routes
- **File Structure**: Shared schema definitions between client and server
- **Development**: Hot module replacement with Vite middleware integration
- **Deployment**: Configured for Vercel deployment via GitHub

## Database Design
- **Database**: PostgreSQL with Supabase hosting
- **Schema Management**: Managed through Supabase dashboard
- **Core Entities**:
  - Services: Legal service offerings with detailed descriptions and pricing
  - Articles: Blog/news content with publication status and categories
  - Team Members: Lawyer profiles with specializations and contact information
  - Testimonials: Client feedback with rating system
  - Consultation Bookings: Client appointment requests
  - Page Contents: Dynamic content management for static pages
  - Contact Info: Site-wide contact information and social media links
  - Admin Users: Administrative access control

## Authentication & Authorization
- **Admin System**: Custom authentication using email/password stored in database
- **Session Storage**: Local storage for admin session persistence
- **Access Control**: Route-level protection for administrative functions
- **User Roles**: Single admin role with full system access

## Content Management
- **Rich Text Editing**: Custom rich text editor component for content creation
- **Image Handling**: Upload and management system for images
- **Dynamic Configuration**: Site settings for theme, page visibility, and feature toggles
- **Multi-language Content**: Support for Arabic and English content

## Key Features
- **Responsive Design**: Mobile-first approach with desktop optimization
- **RTL Support**: Complete right-to-left layout support for Arabic
- **SEO Optimization**: Meta tags, structured content, and search engine friendly URLs
- **Performance**: Code splitting, lazy loading, and optimized asset delivery
- **Accessibility**: ARIA compliant components and keyboard navigation support

# External Dependencies

## Database & Hosting
- **Supabase**: PostgreSQL database hosting with real-time features
- **Vercel**: Production deployment platform (configured)
- **GitHub**: Code repository and CI/CD integration

## Authentication & Security
- **Supabase**: Database operations and authentication backend
- **Environment Variables**: Secure API key management

## UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Fonts**: Google Fonts (Cairo for Arabic, Inter for English)

## Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind
- **React Query**: Server state management and caching

## Communication & Integration
- **WhatsApp Business**: Click-to-chat integration for client communication
- **Social Media**: Facebook, LinkedIn, Twitter integration
- **Email Services**: Contact form and notification system (configurable)

## Monitoring & Analytics
- **Error Tracking**: Runtime error overlay for development
- **Performance Monitoring**: Built-in development tools and logging

The architecture follows modern full-stack patterns with clear separation of concerns, type safety throughout, and scalable design for growing legal practices.