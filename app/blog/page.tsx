import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import { getBlogPosts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog - Chughtai Arts',
  description: 'Read about art techniques, textile design, calligraphy, and creative inspiration from Chughtai Arts.',
}

export default function Blog() {
  const blogPosts = getBlogPosts()

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-dark-800 to-dark-900 pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 backdrop-blur-sm mb-6">
            <span className="text-accent-400 font-accent text-sm font-medium">Blog & Inspiration</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
            Art <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl sm:text-2xl text-dark-200 max-w-3xl mx-auto">
            Discover techniques, tutorials, and stories from my artistic journey
          </p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-gradient-to-b from-white via-dark-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm mb-4">
              <span className="text-primary-600 font-accent text-sm font-medium">Latest Posts</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-dark-900 mb-4">
              Explore Our <span className="gradient-text">Articles</span>
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Learn new techniques and get inspired by our latest blog posts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                id={post.id}
                image={post.image}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                alt={post.alt}
                readTime={post.readTime}
                delay={index * 100}
              />
            ))}
            {blogPosts.length === 0 && (
              <div className="col-span-full text-center py-20">
                <i className="fa-solid fa-blog text-6xl text-dark-300 mb-4"></i>
                <p className="text-dark-600 text-lg">No blog posts available yet</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
