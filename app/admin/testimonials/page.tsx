'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'

interface Testimonial {
  id: number
  text: string
  author: string
  role: string
  rating: number
}

function TestimonialsManagementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  const editId = searchParams.get('id')

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(action === 'create' || editId !== null)
  const [formData, setFormData] = useState({
    text: '',
    author: '',
    role: '',
    rating: 5,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (editId) {
      loadTestimonial(parseInt(editId))
    }
  }, [editId])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials')
      const data = await res.json()
      if (data.success) {
        setTestimonials(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTestimonial = async (id: number) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`)
      const data = await res.json()
      if (data.success) {
        setFormData(data.data)
        setShowForm(true)
      }
    } catch (error) {
      console.error('Failed to load testimonial:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const url = editId ? `/api/testimonials/${editId}` : '/api/testimonials'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        setSuccess(editId ? 'Testimonial updated successfully!' : 'Testimonial created successfully!')
        setFormData({ text: '', author: '', role: '', rating: 5 })
        setShowForm(false)
        router.push('/admin/testimonials')
        fetchTestimonials()
      } else {
        setError(data.error || 'Failed to save testimonial')
      }
    } catch (error) {
      setError('Failed to save testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSuccess('Testimonial deleted successfully!')
        fetchTestimonials()
      } else {
        setError(data.error || 'Failed to delete testimonial')
      }
    } catch (error) {
      setError('Failed to delete testimonial')
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-dark-900 mb-2">
              Testimonials Management
            </h1>
            <p className="text-dark-600">Add, edit, or delete testimonials</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add New Testimonial</span>
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
              {editId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Text */}
              <div>
                <label htmlFor="text" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Testimonial Text <span className="text-accent-500">*</span>
                </label>
                <textarea
                  id="text"
                  required
                  rows={5}
                  value={formData.text}
                  onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 resize-none"
                  placeholder="Enter the testimonial text..."
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Author Name <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="Sarah Ahmed"
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Role/Title <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="Custom Portrait Client"
                />
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="rating" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Rating <span className="text-accent-500">*</span>
                </label>
                <select
                  id="rating"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData((prev) => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} {rating === 1 ? 'Star' : 'Stars'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={saving}
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
                    setFormData({ text: '', author: '', role: '', rating: 5 })
                    router.push('/admin/testimonials')
                  }}
                  className="px-6 py-3 bg-dark-200 text-dark-800 rounded-xl font-accent font-semibold hover:bg-dark-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* Testimonials List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-accent-500"></i>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-dark-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-accent-500 text-sm"></i>
                      ))}
                    </div>
                    <p className="text-dark-700 italic mb-3">&ldquo;{testimonial.text}&rdquo;</p>
                    <div>
                      <p className="font-accent font-semibold text-dark-900">{testimonial.author}</p>
                      <p className="text-sm text-dark-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => {
                        router.push(`/admin/testimonials?id=${testimonial.id}`)
                      }}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg font-accent font-semibold text-sm hover:bg-primary-600 transition-colors"
                    >
                      <i className="fa-solid fa-edit mr-2"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-accent font-semibold text-sm hover:bg-red-600 transition-colors"
                    >
                      <i className="fa-solid fa-trash mr-2"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {testimonials.length === 0 && (
              <div className="text-center py-20">
                <i className="fa-solid fa-star text-6xl text-dark-300 mb-4"></i>
                <p className="text-dark-600 text-lg">No testimonials yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Add Your First Testimonial
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

function TestimonialsManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-dark-600 font-accent text-lg">
          Loading testimonials dashboard...
        </div>
      }
    >
      <TestimonialsManagementContent />
    </Suspense>
  )
}

export default TestimonialsManagementPage

