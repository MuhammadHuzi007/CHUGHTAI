'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface SiteSettings {
  siteName: string
  siteDescription: string
  email: string
  phone: string
  address: string
  socialLinks: {
    instagram: string
    twitter: string
    linkedin: string
  }
}

export default function SettingsManagement() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    email: '',
    phone: '',
    address: '',
    socialLinks: {
      instagram: '',
      twitter: '',
      linkedin: '',
    },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data.success) {
        setSettings(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      const data = await res.json()
      if (data.success) {
        setSuccess('Settings updated successfully!')
        setSettings(data.data)
      } else {
        setError(data.error || 'Failed to update settings')
      }
    } catch (error) {
      setError('Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1]
      setSettings((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }))
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }))
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-accent-500"></i>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-dark-900 mb-2">
            Site Settings
          </h1>
          <p className="text-dark-600">Update your website settings and contact information</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
            {success}
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-dark-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Site Name */}
            <div>
              <label htmlFor="siteName" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                Site Name <span className="text-accent-500">*</span>
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                required
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                placeholder="Chughtai Arts"
              />
            </div>

            {/* Site Description */}
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                Site Description <span className="text-accent-500">*</span>
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                required
                rows={3}
                value={settings.siteDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 resize-none"
                placeholder="Fine Arts portfolio featuring portraits, paintings, textiles..."
              />
            </div>

            {/* Contact Information */}
            <div className="pt-6 border-t border-dark-200">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                Contact Information
              </h2>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Email <span className="text-accent-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="info@chughtaiarts.com"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Phone <span className="text-accent-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="+92 300 123 4567"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Address <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="Bahawalpur, Pakistan"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-dark-200">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                Social Media Links
              </h2>

              {/* Instagram */}
              <div className="mb-6">
                <label htmlFor="instagram" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instagram"
                  name="socialLinks.instagram"
                  value={settings.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="https://instagram.com/chughtaiarts"
                />
              </div>

              {/* Twitter */}
              <div className="mb-6">
                <label htmlFor="twitter" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Twitter URL
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="socialLinks.twitter"
                  value={settings.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="https://twitter.com/chughtaiarts"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label htmlFor="linkedin" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="socialLinks.linkedin"
                  value={settings.socialLinks.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="https://linkedin.com/in/chughtaiarts"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-dark-200">
              <button
                type="submit"
                disabled={saving}
                className="w-full px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {saving ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check"></i>
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

