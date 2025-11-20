'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface LightboxProps {
  isOpen: boolean
  images: Array<{
    src: string
    alt: string
    title?: string
    description?: string
  }>
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className={`fixed inset-0 z-[100] bg-dark-900/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 text-white hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 flex items-center justify-center z-10 group"
        aria-label="Close lightbox"
      >
        <i className="fa-solid fa-times text-xl group-hover:rotate-90 transition-transform"></i>
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 text-white hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 flex items-center justify-center z-10 group"
            aria-label="Previous image"
          >
            <i className="fa-solid fa-chevron-left text-xl group-hover:-translate-x-1 transition-transform"></i>
          </button>

          <button
            onClick={onNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 text-white hover:bg-accent-500 hover:border-accent-500 transition-all duration-300 flex items-center justify-center z-10 group"
            aria-label="Next image"
          >
            <i className="fa-solid fa-chevron-right text-xl group-hover:translate-x-1 transition-transform"></i>
          </button>
        </>
      )}

      {/* Image Container */}
      <div className="w-full h-full p-4 flex flex-col items-center justify-center animate-scale-in">
        <div className="relative w-full h-full max-w-[95vw] max-h-[85vh] rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Image Info */}
        {(currentImage.title || currentImage.description) && (
          <div className="mt-6 text-center text-white max-w-2xl">
            {currentImage.title && (
              <h3 className="text-2xl font-display font-bold mb-2">
                {currentImage.title}
              </h3>
            )}
            {currentImage.description && (
              <p className="text-dark-300">{currentImage.description}</p>
            )}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="mt-4 text-dark-400 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}
