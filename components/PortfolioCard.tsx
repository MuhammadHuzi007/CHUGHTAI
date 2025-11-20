'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PortfolioCardProps {
  id?: number
  image: string
  title: string
  description: string
  alt: string
  category?: string
  onClick?: () => void
  delay?: number
}

export default function PortfolioCard({
  id,
  image,
  title,
  description,
  alt,
  category,
  onClick,
  delay = 0,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const CardContent = (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-dark-100 to-dark-200">
        <Image
          src={image}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-500/90 backdrop-blur-sm text-white text-xs font-accent font-semibold rounded-full">
            {category}
          </div>
        )}

        {/* Hover Icon */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center shadow-xl transform rotate-0 group-hover:rotate-90 transition-transform duration-500">
            <i className="fa-solid fa-arrow-up-right text-white text-xl"></i>
          </div>
        </div>

        {/* Shine Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-dark-900 mb-2 group-hover:text-accent-600 transition-colors">
          {title}
        </h3>
        <p className="text-dark-600 text-sm font-sans">{description}</p>
        
        {/* Decorative Line */}
        <div className="mt-4 h-1 w-0 bg-gradient-to-r from-accent-500 to-primary-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )

  if (onClick) {
    return CardContent
  }

  if (id) {
    return (
      <Link href={`/portfolio/${id}`}>
        {CardContent}
      </Link>
    )
  }

  return (
    <Link href="/portfolio">
      {CardContent}
    </Link>
  )
}
