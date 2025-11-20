'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { isAuthenticated, clearSession } from '@/lib/auth'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    clearSession()
    router.push('/admin/login')
  }

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
    { href: '/admin/portfolio', label: 'Portfolio', icon: 'fa-solid fa-images' },
    { href: '/admin/blog', label: 'Blog', icon: 'fa-solid fa-blog' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: 'fa-solid fa-star' },
    { href: '/admin/settings', label: 'Settings', icon: 'fa-solid fa-cog' },
  ]

  if (!mounted || !isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 via-white to-primary-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-dark-200 shadow-lg z-40">
        <div className="p-6 border-b border-dark-200">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-white text-lg"></i>
            </div>
            <div>
              <h2 className="text-lg font-accent font-bold text-dark-900">Admin Panel</h2>
              <p className="text-xs text-dark-600">Chughtai Arts</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-accent font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg'
                    : 'text-dark-700 hover:bg-dark-100 hover:text-accent-600'
                }`}
              >
                <i className={`${link.icon} text-lg w-5`}></i>
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-accent font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <i className="fa-solid fa-sign-out-alt text-lg w-5"></i>
            <span>Logout</span>
          </button>
          <Link
            href="/"
            target="_blank"
            className="mt-2 w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-accent font-medium text-dark-700 hover:bg-dark-100 transition-all duration-200"
          >
            <i className="fa-solid fa-external-link-alt text-lg w-5"></i>
            <span>View Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

