'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import Image from 'next/image'

interface PortfolioItem {
  id: number
  image: string
  images?: string[]
  title: string
  description: string
  content?: string
  alt: string
  category: string
  year?: string
  medium?: string
  dimensions?: string
}

const categories = [
  { value: 'portraits', label: 'Portraits' },
  { value: 'calligraphy', label: 'Crochet & Jewelry' },
  { value: 'sketches', label: 'Sketches' },
  { value: 'paintings', label: 'Paintings' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'digital', label: 'Digital Art' },
]

function PortfolioManagementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  const editId = searchParams.get('id')

  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(action === 'create' || editId !== null)
  const [formData, setFormData] = useState({
    image: '',
    images: [] as string[],
    title: '',
    description: '',
    content: '',
    alt: '',
    category: 'portraits',
    year: '',
    medium: '',
    dimensions: '',
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    if (editId) {
      loadItem(parseInt(editId))
    }
  }, [editId])

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      if (data.success) {
        setItems(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch items:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadItem = async (id: number) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`)
      const data = await res.json()
      if (data.success) {
        setFormData(data.data)
        setShowForm(true)
      }
    } catch (error) {
      console.error('Failed to load item:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean = false) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      const data = await res.json()
      if (data.success) {
        if (isMain) {
          setFormData((prev) => ({ ...prev, image: data.data.url }))
        } else {
          setFormData((prev) => ({ 
            ...prev, 
            images: [...(prev.images || []), data.data.url] 
          }))
        }
      } else {
        setError(data.error || 'Failed to upload image')
      }
    } catch (error) {
      setError('Failed to upload image')
    } finally {
      setUploading(false)
      // Reset input
      e.target.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || []
    }))
  }

  const handleRemoveMainImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const url = editId ? `/api/portfolio/${editId}` : '/api/portfolio'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        setSuccess(editId ? 'Portfolio item updated successfully!' : 'Portfolio item created successfully!')
        setFormData({
          image: '',
          images: [],
          title: '',
          description: '',
          content: '',
          alt: '',
          category: 'portraits',
          year: '',
          medium: '',
          dimensions: '',
        })
        setShowForm(false)
        router.push('/admin/portfolio')
        fetchItems()
      } else {
        setError(data.error || 'Failed to save portfolio item')
      }
    } catch (error) {
      setError('Failed to save portfolio item')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return

    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSuccess('Portfolio item deleted successfully!')
        fetchItems()
      } else {
        setError(data.error || 'Failed to delete portfolio item')
      }
    } catch (error) {
      setError('Failed to delete portfolio item')
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-dark-900 mb-2">
              Portfolio Management
            </h1>
            <p className="text-dark-600">Add, edit, or delete portfolio items</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add New Item</span>
            </button>
          )}
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

        {showForm ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-dark-200 mb-8">
            <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
              {editId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Main Image <span className="text-accent-500">*</span>
                </label>
                {formData.image && (
                  <div className="mb-4 relative w-48 h-48 rounded-xl overflow-hidden border-2 border-dark-200 group">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveMainImage}
                      className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                    >
                      <i className="fa-solid fa-trash text-sm"></i>
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, true)}
                  disabled={uploading}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-accent file:bg-accent-500 file:text-white hover:file:bg-accent-600 cursor-pointer"
                />
              </div>

              {/* Additional Images */}
              <div>
                <label className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Additional Images
                </label>
                {formData.images && formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative h-32 rounded-xl overflow-hidden border-2 border-dark-200 group">
                        <Image
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                        >
                          <i className="fa-solid fa-times text-xs"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  disabled={uploading}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-accent file:bg-accent-500 file:text-white hover:file:bg-accent-600 cursor-pointer"
                />
                {uploading && (
                  <p className="mt-2 text-sm text-dark-600">
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    Uploading...
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Title <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="Portrait Study"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Short Description <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="Acrylic on canvas, 2025"
                />
              </div>

              {/* Content/Detailed Description */}
              <div>
                <label htmlFor="content" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Detailed Description
                </label>
                <textarea
                  id="content"
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 resize-none"
                  placeholder="Write a detailed description about this artwork..."
                />
              </div>

              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="2025"
                />
              </div>

              {/* Medium */}
              <div>
                <label htmlFor="medium" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Medium
                </label>
                <input
                  type="text"
                  id="medium"
                  value={formData.medium}
                  onChange={(e) => setFormData((prev) => ({ ...prev, medium: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="Acrylic on Canvas"
                />
              </div>

              {/* Dimensions */}
              <div>
                <label htmlFor="dimensions" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Dimensions
                </label>
                <input
                  type="text"
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dimensions: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder='24" x 30"'
                />
              </div>

              {/* Alt Text */}
              <div>
                <label htmlFor="alt" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Alt Text <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  id="alt"
                  required
                  value={formData.alt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, alt: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="Portrait Study - Acrylic painting by Chughtai Arts"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Category <span className="text-accent-500">*</span>
                </label>
                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-check"></i>
                      <span>{editId ? 'Update' : 'Create'}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ 
                      image: '', 
                      images: [],
                      title: '', 
                      description: '', 
                      content: '',
                      alt: '', 
                      category: 'portraits',
                      year: '',
                      medium: '',
                      dimensions: '',
                    })
                    router.push('/admin/portfolio')
                  }}
                  className="px-6 py-3 bg-dark-200 text-dark-800 rounded-xl font-accent font-semibold hover:bg-dark-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* Items List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-accent-500"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-dark-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-dark-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-accent-500/10 text-accent-600 text-xs font-accent font-semibold rounded">
                      {categories.find((c) => c.value === item.category)?.label || item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-dark-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-dark-600 text-sm mb-4">{item.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        router.push(`/admin/portfolio?id=${item.id}`)
                      }}
                      className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-accent font-semibold text-sm hover:bg-primary-600 transition-colors"
                    >
                      <i className="fa-solid fa-edit mr-2"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-accent font-semibold text-sm hover:bg-red-600 transition-colors"
                    >
                      <i className="fa-solid fa-trash mr-2"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-full text-center py-20">
                <i className="fa-solid fa-images text-6xl text-dark-300 mb-4"></i>
                <p className="text-dark-600 text-lg">No portfolio items yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Add Your First Item
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

function PortfolioManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-dark-600 font-accent text-lg">
          Loading portfolio dashboard...
        </div>
      }
    >
      <PortfolioManagementContent />
    </Suspense>
  )
}

export default PortfolioManagementPage

