'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PortfolioCard from '@/components/PortfolioCard'

interface PortfolioItem {
  id: number
  image: string
  title: string
  description: string
  alt: string
  category: string
}

const categories = [
  { id: 'all', label: 'All', icon: 'fa-solid fa-grid' },
  { id: 'portraits', label: 'Portraits', icon: 'fa-solid fa-user' },
  { id: 'calligraphy', label: 'Crochet & Jewelry', icon: 'fa-solid fa-gem' },
  { id: 'sketches', label: 'Sketches', icon: 'fa-solid fa-pencil' },
  { id: 'paintings', label: 'Paintings', icon: 'fa-solid fa-paintbrush' },
  { id: 'textiles', label: 'Textiles', icon: 'fa-solid fa-sewing-machine' },
  { id: 'digital', label: 'Digital Art', icon: 'fa-solid fa-laptop' },
]

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      if (data.success) {
        setPortfolioItems(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory)

  const getCategoryLabel = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.label || categoryId
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-palette-darkest via-palette-dark to-palette-darkest pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-palette-mid/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-palette-light/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-palette-light/10 border border-palette-light/20 backdrop-blur-sm mb-6 animate-slide-up">
            <span className="text-palette-light font-accent text-sm font-medium tracking-wide">Portfolio Gallery</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-slide-up animate-delay-100">
            My <span className="gradient-text">Artwork</span>
          </h1>
          <p className="text-xl sm:text-2xl text-palette-light/80 max-w-3xl mx-auto animate-slide-up animate-delay-200">
            Discover unique fine arts and textile creations
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-24 bg-palette-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 animate-slide-up animate-delay-300">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`group px-6 py-3 rounded-full font-accent font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${selectedCategory === category.id
                  ? 'bg-gradient-to-r from-palette-mid to-palette-dark text-white shadow-lg shadow-palette-mid/30 scale-105'
                  : 'bg-white text-palette-dark border border-palette-mid/20 hover:border-palette-mid hover:text-palette-mid hover:bg-palette-lightest hover:scale-105'
                  }`}
              >
                <i className={`${category.icon} text-sm`}></i>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Artwork Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <i className="fa-solid fa-spinner fa-spin text-4xl text-palette-mid"></i>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  alt={item.alt}
                  category={getCategoryLabel(item.category)}
                  delay={index * 100}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-palette-mid/20 to-palette-dark/20 flex items-center justify-center">
                <i className="fa-solid fa-image text-4xl text-palette-dark/50"></i>
              </div>
              <h3 className="text-2xl font-display font-bold text-palette-darkest mb-2">No items found</h3>
              <p className="text-palette-dark/70">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
