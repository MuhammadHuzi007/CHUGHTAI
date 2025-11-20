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
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-palette-darkest via-palette-dark to-palette-darkest">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-96 h-96 bg-palette-mid/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-palette-light/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-palette-dark/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
          <div className="animate-fade-in space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-palette-light/10 border border-palette-light/20 backdrop-blur-sm mb-6 animate-slide-up">
              <span className="text-palette-lightest font-accent text-sm font-medium tracking-wider uppercase">Welcome to Art Excellence</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold text-white leading-tight animate-slide-up animate-delay-100">
              <span className="gradient-text">Chughtai Arts</span>
              <br />
              <span className="text-palette-lightest">Fine Art Portfolio</span>
            </h1>

            <p className="text-xl sm:text-2xl text-palette-light max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-200">
              Discover unique fine arts and textile creations that combine traditional craftsmanship with contemporary aesthetics
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-slide-up animate-delay-300">
              <Link
                href="/portfolio"
                className="group px-8 py-4 bg-gradient-to-r from-palette-mid to-palette-dark text-white rounded-full font-accent font-semibold text-lg shadow-lg shadow-palette-mid/30 hover:shadow-2xl hover:shadow-palette-mid/40 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Explore Portfolio</span>
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </Link>

              <Link
                href="/contact"
                className="px-8 py-4 glass-dark text-white rounded-full font-accent font-semibold text-lg border border-white/10 hover:bg-white/5 hover:scale-105 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="fa-solid fa-chevron-down text-palette-light/50 text-2xl"></i>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="py-24 bg-palette-lightest relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-block px-4 py-2 rounded-full bg-palette-dark/5 border border-palette-dark/10 backdrop-blur-sm mb-4">
              <span className="text-palette-dark font-accent text-sm font-medium tracking-wide">Featured Works</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-bold text-palette-darkest mb-4">
              Our <span className="gradient-text">Masterpieces</span>
            </h2>
            <p className="text-lg text-palette-dark/80 max-w-2xl mx-auto">
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

          <div className="text-center mt-16">
            <Link
              href="/portfolio"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-palette-darkest text-white rounded-full font-accent font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            >
              <span>View All Artwork</span>
              <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-palette-darkest text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-palette-dark/30 via-palette-mid/20 to-palette-dark/30 animate-gradient" style={{ backgroundSize: '200% 200%' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
              <span className="text-palette-light font-accent text-sm font-medium tracking-wide">Client Reviews</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-bold mb-4">
              What <span className="gradient-text">People Say</span>
            </h2>
            <p className="text-lg text-palette-light/80 max-w-2xl mx-auto">
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
