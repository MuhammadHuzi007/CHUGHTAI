'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'glass-dark shadow-xl py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-palette-mid/30 group-hover:ring-palette-mid transition-all duration-300 group-hover:scale-110">
              <Image
                src="/dp.jpg"
                alt="Chughtai Arts Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-accent font-bold gradient-text">
                Chughtai Arts
              </h1>
              <p className="text-xs text-palette-dark/80 font-sans">Fine Art Portfolio</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg font-accent text-sm font-medium transition-all duration-300 ${isActive
                    ? 'text-palette-mid bg-palette-mid/10'
                    : 'text-palette-dark hover:text-palette-mid hover:bg-white/10'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-palette-mid rounded-full"></span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-palette-mid to-palette-dark text-white rounded-full font-accent font-semibold text-sm shadow-lg shadow-palette-mid/30 hover:shadow-xl hover:shadow-palette-mid/40 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-palette-dark hover:bg-palette-mid/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="glass rounded-2xl p-4 space-y-2 shadow-xl">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname?.startsWith(link.href))

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-accent font-medium transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-palette-mid to-palette-dark text-white shadow-lg'
                    : 'text-palette-dark hover:bg-palette-mid/10'
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 bg-gradient-to-r from-palette-dark to-palette-darkest text-white rounded-xl font-accent font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-200 mt-2"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
