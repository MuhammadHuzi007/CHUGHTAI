'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'

interface BlogPost {
  id: number
  image: string
  images: string[]
  title: string
  excerpt: string
  content?: string
  date: string
  category: string
  alt: string
  readTime?: string
}

export default function BlogDetail() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      fetchBlogPost()
    }
  }, [id])

  const fetchBlogPost = async () => {
    try {
      const res = await fetch(`/api/blog/${id}`)
      const data = await res.json()
      if (data.success) {
        // Ensure images array exists
        const blogPost = {
          ...data.data,
          images: data.data.images || [data.data.image]
        }
        setPost(blogPost)
      } else {
        router.push('/blog')
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error)
      router.push('/blog')
    } finally {
      setLoading(false)
    }
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
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

  if (!post) {
    return null
  }

  const allImages = post.images && post.images.length > 0 ? post.images : [post.image]
  const lightboxImages = allImages.map((img, idx) => ({
    src: img,
    alt: `${post.alt} - Image ${idx + 1}`,
    title: post.title,
    description: post.excerpt,
  }))

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-900 via-dark-800 to-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="font-accent">Back to Blog</span>
          </button>

          <div className="text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 backdrop-blur-sm mb-4">
              <span className="text-accent-400 font-accent text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-dark-300">
              <span className="font-accent">{post.date}</span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span className="font-accent">
                    <i className="fa-solid fa-clock mr-2"></i>
                    {post.readTime}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="mb-12">
            <div
              className="relative h-[400px] rounded-2xl overflow-hidden bg-dark-100 cursor-pointer group"
              onClick={() => handleImageClick(0)}
            >
              <Image
                src={allImages[0]}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fa-solid fa-expand text-white text-3xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Images */}
          {allImages.length > 1 && (
            <div className="mb-12">
              <h3 className="text-xl font-display font-bold text-dark-900 mb-4">
                More Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {allImages.slice(1).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-48 rounded-xl overflow-hidden bg-dark-100 cursor-pointer group"
                    onClick={() => handleImageClick(index + 1)}
                  >
                    <Image
                      src={image}
                      alt={`${post.alt} - Image ${index + 2}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Content */}
          <article className="prose prose-lg max-w-none">
            {post.content ? (
              <div className="text-dark-700 leading-relaxed whitespace-pre-line">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-3xl font-display font-bold text-dark-900 mt-8 mb-4">
                        {paragraph.replace('## ', '')}
                      </h2>
                    )
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-2xl font-display font-bold text-dark-900 mt-6 mb-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-6 mb-2">
                        {paragraph.replace('- ', '')}
                      </li>
                    )
                  }
                  if (paragraph.trim() === '') {
                    return <br key={index} />
                  }
                  return (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            ) : (
              <p className="text-dark-700 leading-relaxed text-lg">
                {post.excerpt}
              </p>
            )}
          </article>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-dark-200 flex items-center justify-between">
            <Link
              href="/blog"
              className="flex items-center space-x-2 text-accent-600 hover:text-accent-700 font-accent font-semibold transition-colors"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Back to Blog</span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
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

