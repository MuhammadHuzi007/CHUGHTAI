import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data')

// Ensure data directory exists
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true })
}

export interface PortfolioItem {
  id: number
  image: string // Main/featured image
  images: string[] // Additional images
  title: string
  description: string
  content?: string // Detailed description/content
  alt: string
  category: string
  year?: string
  medium?: string
  dimensions?: string
}

export interface BlogPost {
  id: number
  image: string // Main/featured image
  images: string[] // Additional images
  title: string
  excerpt: string
  content?: string // Full blog content
  date: string
  category: string
  alt: string
  readTime?: string
}

export interface Testimonial {
  id: number
  text: string
  author: string
  role: string
  rating: number
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  email: string
  phone: string
  address: string
  socialLinks: {
    instagram: string
    twitter: string
    linkedin: string
  }
}

// File paths
const portfolioPath = path.join(dataDirectory, 'portfolio.json')
const blogPath = path.join(dataDirectory, 'blog.json')
const testimonialsPath = path.join(dataDirectory, 'testimonials.json')
const settingsPath = path.join(dataDirectory, 'settings.json')

// Initialize default data if files don't exist
function initializeData() {
  if (!fs.existsSync(portfolioPath)) {
    const defaultPortfolio: PortfolioItem[] = [
      {
        id: 1,
        image: '/images/1.jpg',
        title: 'Portrait Study',
        description: 'Acrylic on canvas, 2025',
        alt: 'Portrait Study - Acrylic painting by Chughtai Arts',
        category: 'portraits'
      },
      {
        id: 2,
        image: '/images/2.png',
        title: 'Arabic Calligraphy',
        description: 'Ink on paper, 2024',
        alt: 'Arabic Calligraphy artwork by Chughtai Arts',
        category: 'calligraphy'
      },
      {
        id: 3,
        image: '/images/3.jpg',
        title: 'Embroidered Fabric',
        description: 'Silk and cotton, 2025',
        alt: 'Embroidered Fabric textile design by Chughtai Arts',
        category: 'textiles'
      },
      {
        id: 4,
        image: '/images/1.jpg',
        title: 'Pencil Sketch',
        description: 'Graphite on paper, 2024',
        alt: 'Pencil Sketch artwork by Chughtai Arts',
        category: 'sketches'
      },
      {
        id: 5,
        image: '/images/3.jpg',
        title: 'Landscape Painting',
        description: 'Oil on canvas, 2025',
        alt: 'Landscape Painting by Chughtai Arts',
        category: 'paintings'
      },
    ]
    fs.writeFileSync(portfolioPath, JSON.stringify(defaultPortfolio, null, 2))
  }

  if (!fs.existsSync(blogPath)) {
    const defaultBlog: BlogPost[] = [
      {
        id: 1,
        image: '/images/1.jpg',
        images: ['/images/1.jpg'],
        title: 'Mastering Hand Embroidery Techniques',
        excerpt: 'Learn the fundamental techniques of hand embroidery and how to create stunning textile designs that tell a story.',
        content: 'Hand embroidery is an ancient art form that has been passed down through generations. In this comprehensive guide, we\'ll explore the fundamental techniques that every embroiderer should master.\n\n## Getting Started\n\nBefore you begin, it\'s essential to gather the right materials. Quality threads, appropriate needles, and a good fabric foundation are crucial for successful embroidery work.\n\n## Basic Stitches\n\n1. **Running Stitch**: The simplest and most versatile stitch\n2. **Back Stitch**: Perfect for outlines and lettering\n3. **Satin Stitch**: Creates smooth, filled areas\n4. **French Knots**: Add texture and dimension\n\n## Advanced Techniques\n\nAs you progress, you can explore more complex techniques like stumpwork, goldwork, and three-dimensional embroidery. Each technique adds unique character to your textile designs.\n\n## Conclusion\n\nMastering hand embroidery takes time and practice, but the results are incredibly rewarding. With dedication and patience, you can create stunning textile designs that tell your unique story.',
        date: 'March 15, 2025',
        category: 'Textiles',
        alt: 'Textile Design Techniques',
        readTime: '5 min read'
      },
      {
        id: 2,
        image: '/images/2.png',
        images: ['/images/2.png'],
        title: 'The Art of Arabic Calligraphy',
        excerpt: 'Exploring the history and modern applications of Arabic calligraphy in contemporary art and design.',
        content: 'Arabic calligraphy is one of the most revered art forms in Islamic culture, combining spiritual significance with aesthetic beauty. This article explores its rich history and modern applications.\n\n## Historical Roots\n\nArabic calligraphy has its origins in the 7th century, evolving from the need to preserve the Quran in written form. Over centuries, various scripts developed, each with its own character and purpose.\n\n## Major Scripts\n\n- **Kufic**: The oldest script, known for its geometric forms\n- **Naskh**: The most readable script, used in printed materials\n- **Thuluth**: Elegant and decorative, often used in architecture\n- **Diwani**: Flowing and ornate, popular in Ottoman art\n\n## Modern Applications\n\nToday, Arabic calligraphy finds expression in contemporary art, graphic design, and digital media. Artists blend traditional techniques with modern aesthetics, creating works that honor the past while embracing the future.\n\n## Conclusion\n\nThe art of Arabic calligraphy continues to inspire artists worldwide, proving that traditional art forms can thrive in the modern world.',
        date: 'March 10, 2025',
        category: 'Calligraphy',
        alt: 'Calligraphy Art',
        readTime: '7 min read'
      },
    ]
    fs.writeFileSync(blogPath, JSON.stringify(defaultBlog, null, 2))
  }

  if (!fs.existsSync(testimonialsPath)) {
    const defaultTestimonials: Testimonial[] = [
      {
        id: 1,
        text: "Museera's portrait work is absolutely stunning! She captured every detail and emotion perfectly. Highly recommend her services.",
        author: 'Sarah Ahmed',
        role: 'Custom Portrait Client',
        rating: 5
      },
      {
        id: 2,
        text: "The embroidered textile pieces I ordered were beyond beautiful. Excellent craftsmanship and attention to detail. Will definitely order again!",
        author: 'Fatima Khan',
        role: 'Textile Art Client',
        rating: 5
      },
      {
        id: 3,
        text: "The calligraphy artwork for our event was exquisite. Museera is a true artist with incredible talent and professionalism.",
        author: 'Ali Hassan',
        role: 'Event Organizer',
        rating: 5
      },
    ]
    fs.writeFileSync(testimonialsPath, JSON.stringify(defaultTestimonials, null, 2))
  }

  if (!fs.existsSync(settingsPath)) {
    const defaultSettings: SiteSettings = {
      siteName: 'Chughtai Arts',
      siteDescription: 'Fine Arts portfolio featuring portraits, paintings, textiles, calligraphy, crochet, and jewelry by Museera Aftab.',
      email: 'info@chughtaiarts.com',
      phone: '+92 300 123 4567',
      address: 'Bahawalpur, Pakistan',
      socialLinks: {
        instagram: 'https://instagram.com/chughtaiarts',
        twitter: 'https://twitter.com/chughtaiarts',
        linkedin: 'https://linkedin.com/in/chughtaiarts'
      }
    }
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2))
  }
}

// Initialize on module load
initializeData()

// Helper functions
function readJsonFile<T>(filePath: string): T[] {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return []
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    throw error
  }
}

function readJsonFileObject<T>(filePath: string): T | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return null
  }
}

function writeJsonFileObject<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    throw error
  }
}

// Portfolio functions
export function getPortfolioItems(): PortfolioItem[] {
  return readJsonFile<PortfolioItem>(portfolioPath)
}

export function getPortfolioItem(id: number): PortfolioItem | undefined {
  const items = getPortfolioItems()
  return items.find(item => item.id === id)
}

export function createPortfolioItem(item: Omit<PortfolioItem, 'id'>): PortfolioItem {
  const items = getPortfolioItems()
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
  const newItem: PortfolioItem = { ...item, id: newId }
  items.push(newItem)
  writeJsonFile(portfolioPath, items)
  return newItem
}

export function updatePortfolioItem(id: number, updates: Partial<PortfolioItem>): PortfolioItem | null {
  const items = getPortfolioItems()
  const index = items.findIndex(item => item.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...updates }
  writeJsonFile(portfolioPath, items)
  return items[index]
}

export function deletePortfolioItem(id: number): boolean {
  const items = getPortfolioItems()
  const filtered = items.filter(item => item.id !== id)
  if (filtered.length === items.length) return false
  writeJsonFile(portfolioPath, filtered)
  return true
}

// Blog functions
export function getBlogPosts(): BlogPost[] {
  return readJsonFile<BlogPost>(blogPath)
}

export function getBlogPost(id: number): BlogPost | undefined {
  const posts = getBlogPosts()
  return posts.find(post => post.id === id)
}

export function createBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const posts = getBlogPosts()
  const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1
  const newPost: BlogPost = { ...post, id: newId }
  posts.push(newPost)
  writeJsonFile(blogPath, posts)
  return newPost
}

export function updateBlogPost(id: number, updates: Partial<BlogPost>): BlogPost | null {
  const posts = getBlogPosts()
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) return null
  posts[index] = { ...posts[index], ...updates }
  writeJsonFile(blogPath, posts)
  return posts[index]
}

export function deleteBlogPost(id: number): boolean {
  const posts = getBlogPosts()
  const filtered = posts.filter(post => post.id !== id)
  if (filtered.length === posts.length) return false
  writeJsonFile(blogPath, filtered)
  return true
}

// Testimonial functions
export function getTestimonials(): Testimonial[] {
  return readJsonFile<Testimonial>(testimonialsPath)
}

export function getTestimonial(id: number): Testimonial | undefined {
  const testimonials = getTestimonials()
  return testimonials.find(test => test.id === id)
}

export function createTestimonial(testimonial: Omit<Testimonial, 'id'>): Testimonial {
  const testimonials = getTestimonials()
  const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1
  const newTestimonial: Testimonial = { ...testimonial, id: newId }
  testimonials.push(newTestimonial)
  writeJsonFile(testimonialsPath, testimonials)
  return newTestimonial
}

export function updateTestimonial(id: number, updates: Partial<Testimonial>): Testimonial | null {
  const testimonials = getTestimonials()
  const index = testimonials.findIndex(test => test.id === id)
  if (index === -1) return null
  testimonials[index] = { ...testimonials[index], ...updates }
  writeJsonFile(testimonialsPath, testimonials)
  return testimonials[index]
}

export function deleteTestimonial(id: number): boolean {
  const testimonials = getTestimonials()
  const filtered = testimonials.filter(test => test.id !== id)
  if (filtered.length === testimonials.length) return false
  writeJsonFile(testimonialsPath, filtered)
  return true
}

// Settings functions
export function getSiteSettings(): SiteSettings {
  const settings = readJsonFileObject<SiteSettings>(settingsPath)
  return settings || {
    siteName: 'Chughtai Arts',
    siteDescription: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: {
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  }
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  const current = getSiteSettings()
  const updated = { ...current, ...updates }
  writeJsonFileObject(settingsPath, updated)
  return updated
}

