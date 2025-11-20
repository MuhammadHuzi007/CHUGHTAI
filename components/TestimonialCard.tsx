interface TestimonialCardProps {
  text: string
  author: string
  role: string
  rating?: number
  delay?: number
}

export default function TestimonialCard({ 
  text, 
  author, 
  role, 
  rating = 5,
  delay = 0 
}: TestimonialCardProps) {
  return (
    <div
      className="glass-dark rounded-2xl p-8 hover:bg-dark-800/60 transition-all duration-500 transform hover:-translate-y-2 border border-dark-700/50 hover:border-accent-500/50"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Rating Stars */}
      <div className="flex space-x-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <i
            key={i}
            className="fa-solid fa-star text-accent-400 text-sm"
          ></i>
        ))}
      </div>

      {/* Quote Icon */}
      <div className="mb-4">
        <i className="fa-solid fa-quote-left text-accent-500/30 text-3xl"></i>
      </div>

      {/* Testimonial Text */}
      <p className="text-dark-200 text-lg leading-relaxed mb-6 italic">
        "{text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center space-x-4 pt-4 border-t border-dark-700/50">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center text-white font-bold font-accent shadow-lg">
          {author.charAt(0)}
        </div>
        <div>
          <h4 className="font-accent font-semibold text-white">{author}</h4>
          <p className="text-dark-400 text-sm">{role}</p>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-accent-500/10 rounded-full blur-xl"></div>
    </div>
  )
}
