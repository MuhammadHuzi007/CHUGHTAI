# Chughtai Arts - Next.js Portfolio Website with CMS

A modern, professional portfolio website for Chughtai Arts built with Next.js, React, TypeScript, and Tailwind CSS. Includes a comprehensive Content Management System (CMS) for managing all website content.

## Features

### Frontend
- 🎨 Modern, stylish, professional design with Tailwind CSS
- 📱 Fully responsive layout
- ⚡ Optimized performance with Next.js
- 🔍 SEO optimized
- 🖼️ Image lightbox functionality
- 📝 Blog section
- 💬 Contact form with validation
- 🌙 Smooth animations and transitions

### CMS/Admin Panel
- 🔐 Secure admin authentication
- 📸 **Image Management**: Upload and manage portfolio images
- ✏️ **Portfolio Management**: Add, edit, delete portfolio items
- 📝 **Blog Management**: Create and manage blog posts
- ⭐ **Testimonials Management**: Add and manage client testimonials
- ⚙️ **Site Settings**: Update site information, contact details, and social links
- 📊 **Dashboard**: Overview of all content with quick stats

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd CHUGHTAI
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Panel Access

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. **Default Password**: `admin123`
   - ⚠️ **IMPORTANT**: Change this password in production by setting the `ADMIN_PASSWORD` environment variable

### Changing Admin Password

Create a `.env.local` file in the project root:

```env
ADMIN_PASSWORD=your_secure_password_here
```

## Project Structure

```
CHUGHTAI/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── login/          # Admin login page
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── portfolio/      # Portfolio management
│   │   ├── blog/           # Blog management
│   │   ├── testimonials/   # Testimonials management
│   │   └── settings/       # Site settings
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication
│   │   ├── portfolio/      # Portfolio CRUD
│   │   ├── blog/           # Blog CRUD
│   │   ├── testimonials/   # Testimonials CRUD
│   │   ├── upload/         # Image upload
│   │   └── settings/       # Settings management
│   ├── portfolio/          # Portfolio page
│   ├── about/              # About page
│   ├── services/           # Services page
│   ├── contact/            # Contact page
│   └── blog/               # Blog page
├── components/             # React components
│   ├── Header.tsx          # Site header
│   ├── Footer.tsx          # Site footer
│   ├── PortfolioCard.tsx   # Portfolio item card
│   ├── BlogCard.tsx        # Blog post card
│   ├── TestimonialCard.tsx # Testimonial card
│   ├── Lightbox.tsx        # Image lightbox
│   └── AdminLayout.tsx     # Admin panel layout
├── lib/
│   ├── data.ts             # Data management functions
│   └── auth.ts             # Authentication functions
├── data/                   # JSON data files (auto-generated)
├── public/
│   ├── images/             # Original images
│   └── uploads/            # Uploaded images (auto-generated)
└── styles/
    └── globals.css         # Global Tailwind styles
```

## CMS Features

### Portfolio Management
- Add new portfolio items with images
- Edit existing items (title, description, category, image)
- Delete portfolio items
- Upload images directly through the admin panel
- Categories: Portraits, Crochet & Jewelry, Sketches, Paintings, Textiles, Digital Art

### Blog Management
- Create new blog posts
- Edit existing posts
- Delete posts
- Upload featured images
- Set categories, dates, and read times

### Testimonials Management
- Add client testimonials
- Edit testimonials
- Delete testimonials
- Set star ratings (1-5)

### Site Settings
- Update site name and description
- Change contact information (email, phone, address)
- Update social media links (Instagram, Twitter, LinkedIn)

## Data Storage

The CMS uses JSON files for data storage (located in `/data` directory):
- `portfolio.json` - Portfolio items
- `blog.json` - Blog posts
- `testimonials.json` - Testimonials
- `settings.json` - Site settings

Uploaded images are stored in `/public/uploads` directory.

## API Endpoints

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `POST /api/portfolio` - Create new portfolio item
- `GET /api/portfolio/[id]` - Get single portfolio item
- `PUT /api/portfolio/[id]` - Update portfolio item
- `DELETE /api/portfolio/[id]` - Delete portfolio item

### Blog
- `GET /api/blog` - Get all blog posts
- `POST /api/blog` - Create new blog post
- `GET /api/blog/[id]` - Get single blog post
- `PUT /api/blog/[id]` - Update blog post
- `DELETE /api/blog/[id]` - Delete blog post

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial
- `GET /api/testimonials/[id]` - Get single testimonial
- `PUT /api/testimonials/[id]` - Update testimonial
- `DELETE /api/testimonials/[id]` - Delete testimonial

### Upload
- `POST /api/upload` - Upload image file (max 5MB)

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS 3.4
- Font Awesome Icons
- File-based data storage (JSON)

## Security Notes

⚠️ **For Production Use:**
1. Change the default admin password
2. Use environment variables for sensitive data
3. Consider implementing proper authentication (NextAuth.js)
4. Add rate limiting to API routes
5. Implement proper image optimization
6. Consider using a database instead of JSON files for better performance and security

## License

© 2025 Chughtai Arts. All rights reserved.
