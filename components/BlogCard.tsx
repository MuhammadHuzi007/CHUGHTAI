import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  id?: number
  image: string
  title: string
  excerpt: string
  date: string
  category: string
  alt: string
  readTime?: string
  delay?: number
}

export default function BlogCard({
  id,
  image,
  title,
  excerpt,
  date,
  category,
  alt,
  readTime,
  delay = 0,
}: BlogCardProps) {
  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-dark-200 hover:border-accent-500/50 flex flex-col"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Container */}
      <Link href="#" className="relative h-48 overflow-hidden bg-gradient-to-br from-dark-100 to-dark-200">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-accent-500/90 backdrop-blur-sm text-white text-xs font-accent font-semibold rounded-full">
          {category}
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Read More Icon */}
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <i className="fa-solid fa-arrow-right text-accent-500"></i>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-dark-500 mb-4">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-calendar"></i>
            <span>{date}</span>
          </div>
          {readTime && (
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-clock"></i>
              <span>{readTime}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <Link href={id ? `/blog/${id}` : "#"}>
          <h3 className="text-xl font-display font-bold text-dark-900 mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-dark-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {excerpt}
        </p>

        {/* Read More Link */}
        {id ? (
          <Link
            href={`/blog/${id}`}
            className="inline-flex items-center space-x-2 text-accent-600 font-accent font-semibold text-sm group-hover:translate-x-1 transition-transform"
          >
            <span>Read More</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        ) : (
          <Link
            href="#"
            className="inline-flex items-center space-x-2 text-accent-600 font-accent font-semibold text-sm group-hover:translate-x-1 transition-transform"
          >
            <span>Read More</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        )}

        {/* Decorative Line */}
        <div className="mt-4 h-1 w-0 bg-gradient-to-r from-accent-500 to-primary-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
      </div>
    </article>
  )
}
