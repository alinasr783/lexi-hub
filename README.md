# LexiHub - Legal Services Platform

A comprehensive full-stack legal services web platform built for law firms. The application provides a complete digital presence solution with multi-language support (Arabic/English), client consultation booking, content management, and administrative capabilities.

## Features

- 🌐 **Multi-language Support**: Complete Arabic (RTL) and English language support
- ⚖️ **Legal Services Management**: Showcase legal services with detailed descriptions and pricing
- 📝 **Content Management**: Articles, blog posts, and dynamic page content management
- 👥 **Team Management**: Lawyer profiles with specializations and contact information
- 💬 **Client Testimonials**: Client feedback system with rating support
- 📞 **Consultation Booking**: Online consultation request system
- 📧 **Contact Forms**: Client inquiry management system
- ❓ **FAQ System**: Frequently asked questions with categorization
- 📱 **Responsive Design**: Mobile-first approach with desktop optimization
- 🔒 **Admin Panel**: Administrative access for content management

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with shadcn/ui components
- **Vite** for fast development and optimized builds
- **React Router** for client-side navigation
- **React Query** for server state management

### Backend
- **Node.js** with Express.js
- **Supabase** for database and authentication
- **TypeScript** for type safety

### Database
- **PostgreSQL** via Supabase
- Comprehensive schema for legal services data

## Getting Started

### Prerequisites
- Node.js 18+ 
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lexihub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Set up your Supabase database with the required tables (see database schema below)

6. Start the development server:
```bash
npm run dev
```

## Database Schema

The application requires the following tables in your Supabase database:

- `services` - Legal services offered
- `articles` - Blog posts and articles
- `team_members` - Lawyer profiles
- `page_contents` - Dynamic page content
- `jobs` - Job postings
- `faqs` - Frequently asked questions
- `admins` - Administrative users
- `consultation_page_settings` - Consultation page configuration
- `contact_forms` - Client contact submissions
- `consultation_bookings` - Consultation requests
- `contact_info` - Site contact information
- `testimonials` - Client testimonials
- `consultation_services` - Available consultation services

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

The project includes `vercel.json` configuration for automatic deployment.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express server
│   ├── routes.ts           # API routes
│   ├── supabase.ts         # Supabase client configuration
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
└── vercel.json            # Vercel deployment configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.