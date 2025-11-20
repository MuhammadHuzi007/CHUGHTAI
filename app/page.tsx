import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PortfolioCard from '@/components/PortfolioCard'
import TestimonialCard from '@/components/TestimonialCard'
import Link from 'next/link'
import { getPortfolioItems, getTestimonials } from '@/lib/data'

export default async function Home() {
  const portfolioItems = getPortfolioItems().slice(0, 3)
  const testimonials = getTestimonials()

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-primary-900 to-dark-800">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
          <div className="animate-fade-in space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 backdrop-blur-sm mb-6">
              <span className="text-accent-400 font-accent text-sm font-medium">Welcome to Art Excellence</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
              <span className="gradient-text">Chughtai Arts</span>
              <br />
              <span className="text-white">Fine Art Portfolio</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-dark-200 max-w-3xl mx-auto leading-relaxed">
              Discover unique fine arts and textile creations that combine traditional craftsmanship with contemporary aesthetics
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/portfolio"
                className="group px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full font-accent font-semibold text-lg shadow-xl shadow-accent-500/30 hover:shadow-2xl hover:shadow-accent-500/40 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Portfolio</span>
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>
              
              <Link
                href="/contact"
                className="px-8 py-4 glass-dark text-white rounded-full font-accent font-semibold text-lg border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fa-solid fa-chevron-down text-white/50 text-2xl"></i>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="py-24 bg-gradient-to-b from-white via-dark-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23f59e0b' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm mb-4">
              <span className="text-primary-600 font-accent text-sm font-medium">Featured Works</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-dark-900 mb-4">
              Our <span className="gradient-text">Masterpieces</span>
            </h2>
            <p className="text-lg text-dark-600 max-w-2xl mx-auto">
              Explore a curated selection of our finest artistic creations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((artwork, index) => (
              <PortfolioCard
                key={artwork.id}
                id={artwork.id}
                image={artwork.image}
                title={artwork.title}
                description={artwork.description}
                alt={artwork.alt}
                category={artwork.category}
                delay={index * 100}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-accent font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>View All Artwork</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent-500/20 via-primary-500/20 to-accent-500/20 animate-gradient" style={{ backgroundSize: '200% 200%' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 backdrop-blur-sm mb-4">
              <span className="text-accent-400 font-accent text-sm font-medium">Client Reviews</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              What <span className="gradient-text">People Say</span>
            </h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                text={testimonial.text}
                author={testimonial.author}
                role={testimonial.role}
                rating={testimonial.rating}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
