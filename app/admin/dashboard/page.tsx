'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'

interface Stats {
  portfolio: number
  blog: number
  testimonials: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ portfolio: 0, blog: 0, testimonials: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [portfolioRes, blogRes, testimonialsRes] = await Promise.all([
        fetch('/api/portfolio'),
        fetch('/api/blog'),
        fetch('/api/testimonials'),
      ])

      const portfolio = await portfolioRes.json()
      const blog = await blogRes.json()
      const testimonials = await testimonialsRes.json()

      setStats({
        portfolio: portfolio.data?.length || 0,
        blog: blog.data?.length || 0,
        testimonials: testimonials.data?.length || 0,
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    {
      title: 'Portfolio Items',
      count: stats.portfolio,
      icon: 'fa-solid fa-images',
      color: 'from-primary-500 to-primary-600',
      href: '/admin/portfolio',
    },
    {
      title: 'Blog Posts',
      count: stats.blog,
      icon: 'fa-solid fa-blog',
      color: 'from-accent-500 to-accent-600',
      href: '/admin/blog',
    },
    {
      title: 'Testimonials',
      count: stats.testimonials,
      icon: 'fa-solid fa-star',
      color: 'from-green-500 to-green-600',
      href: '/admin/testimonials',
    },
  ]

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-dark-900 mb-2">
            Dashboard
          </h1>
          <p className="text-dark-600">Manage your portfolio website content</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-accent-500"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {statsCards.map((stat) => (
              <Link
                key={stat.title}
                href={stat.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-dark-200 hover:border-accent-500/50 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${stat.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-display font-bold text-dark-900 mb-1">
                  {stat.count}
                </h3>
                <p className="text-dark-600 font-accent font-medium">{stat.title}</p>
                <div className="mt-4 flex items-center text-accent-600 group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-accent font-semibold">Manage</span>
                  <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-dark-200">
          <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/portfolio?action=create"
              className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <i className="fa-solid fa-plus text-lg"></i>
              <span>Add Portfolio</span>
            </Link>
            <Link
              href="/admin/blog?action=create"
              className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <i className="fa-solid fa-plus text-lg"></i>
              <span>Add Blog Post</span>
            </Link>
            <Link
              href="/admin/testimonials?action=create"
              className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <i className="fa-solid fa-plus text-lg"></i>
              <span>Add Testimonial</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-dark-700 to-dark-800 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <i className="fa-solid fa-cog text-lg"></i>
              <span>Site Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

