'use client'

import { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'

interface PortfolioItem {
  id: number
  image: string
  images: string[]
  title: string
  description: string
  content?: string
  alt: string
  category: string
  year?: string
  medium?: string
  dimensions?: string
}

export default function PortfolioDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [item, setItem] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fetchPortfolioItem = useCallback(async () => {
    if (!id) return
    try {
      const res = await fetch(`/api/portfolio/${id}`)
      const data = await res.json()
      if (data.success) {
        // Ensure images array exists
        const portfolioItem = {
          ...data.data,
          images: data.data.images || [data.data.image]
        }
        setItem(portfolioItem)
      } else {
        router.push('/portfolio')
      }
    } catch (error) {
      console.error('Failed to fetch portfolio item:', error)
      router.push('/portfolio')
    } finally {
      setLoading(false)
    }
  }, [id, router])

  useEffect(() => {
    fetchPortfolioItem()
  }, [fetchPortfolioItem])

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const getCategoryLabel = (category: string) => {
    const categories: { [key: string]: string } = {
      portraits: 'Portraits',
      calligraphy: 'Crochet & Jewelry',
      sketches: 'Sketches',
      paintings: 'Paintings',
      textiles: 'Textiles',
      digital: 'Digital Art'
    }
    return categories[category] || category
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-accent-500"></i>
        </div>
        <Footer />
      </main>
    )
  }

  if (!item) {
    return null
  }

  const allImages = item.images && item.images.length > 0 ? item.images : [item.image]
  const lightboxImages = allImages.map((img, idx) => ({
    src: img,
    alt: `${item.alt} - Image ${idx + 1}`,
    title: item.title,
    description: item.description,
  }))

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-900 via-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="font-accent">Back to Portfolio</span>
          </button>

          <div className="text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 backdrop-blur-sm mb-4">
              <span className="text-accent-400 font-accent text-sm font-medium">
                {getCategoryLabel(item.category)}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              {item.title}
            </h1>
            <p className="text-xl text-dark-200 max-w-3xl mx-auto">
              {item.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Main Image */}
                <div
                  className="relative h-[500px] rounded-2xl overflow-hidden bg-dark-100 cursor-pointer group"
                  onClick={() => handleImageClick(0)}
                >
                  <Image
                    src={allImages[0]}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fa-solid fa-expand text-white text-3xl"></i>
                    </div>
                  </div>
                </div>

                {/* Additional Images Grid */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.slice(1).map((image, index) => (
                      <div
                        key={index}
                        className="relative h-48 rounded-xl overflow-hidden bg-dark-100 cursor-pointer group"
                        onClick={() => handleImageClick(index + 1)}
                      >
                        <Image
                          src={image}
                          alt={`${item.alt} - Image ${index + 2}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Details Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-dark-200 sticky top-24">
                <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                  Details
                </h2>

                <div className="space-y-6">
                  {item.year && (
                    <div>
                      <h3 className="text-sm font-accent font-semibold text-dark-600 mb-1">
                        Year
                      </h3>
                      <p className="text-lg font-accent text-dark-900">{item.year}</p>
                    </div>
                  )}

                  {item.medium && (
                    <div>
                      <h3 className="text-sm font-accent font-semibold text-dark-600 mb-1">
                        Medium
                      </h3>
                      <p className="text-lg font-accent text-dark-900">{item.medium}</p>
                    </div>
                  )}

                  {item.dimensions && (
                    <div>
                      <h3 className="text-sm font-accent font-semibold text-dark-600 mb-1">
                        Dimensions
                      </h3>
                      <p className="text-lg font-accent text-dark-900">{item.dimensions}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-accent font-semibold text-dark-600 mb-1">
                      Category
                    </h3>
                    <p className="text-lg font-accent text-dark-900">
                      {getCategoryLabel(item.category)}
                    </p>
                  </div>

                  {allImages.length > 1 && (
                    <div>
                      <h3 className="text-sm font-accent font-semibold text-dark-600 mb-1">
                        Images
                      </h3>
                      <p className="text-lg font-accent text-dark-900">
                        {allImages.length} {allImages.length === 1 ? 'image' : 'images'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-dark-200">
                  <Link
                    href="/contact"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    Inquire About This Piece
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          {item.content && (
            <div className="mt-16 max-w-4xl">
              <h2 className="text-3xl font-display font-bold text-dark-900 mb-6">
                About This Piece
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-dark-700 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)}
        onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
      />

      <Footer />
    </main>
  )
}

