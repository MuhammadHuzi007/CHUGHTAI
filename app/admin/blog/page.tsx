'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import Image from 'next/image'

interface BlogPost {
  id: number
  image: string
  images?: string[]
  title: string
  excerpt: string
  content?: string
  date: string
  category: string
  alt: string
  readTime?: string
}

function BlogManagementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  const editId = searchParams.get('id')

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(action === 'create' || editId !== null)
  const [formData, setFormData] = useState({
    image: '',
    images: [] as string[],
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: 'Textiles',
    alt: '',
    readTime: '5 min read',
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (editId) {
      loadPost(parseInt(editId))
    }
  }, [editId])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog')
      const data = await res.json()
      if (data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPost = async (id: number) => {
    try {
      const res = await fetch(`/api/blog/${id}`)
      const data = await res.json()
      if (data.success) {
        setFormData(data.data)
        setShowForm(true)
      }
    } catch (error) {
      console.error('Failed to load post:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData((prev) => ({ ...prev, image: data.data.url }))
      } else {
        setError(data.error || 'Failed to upload image')
      }
    } catch (error) {
      setError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const url = editId ? `/api/blog/${editId}` : '/api/blog'
      const method = editId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        setSuccess(editId ? 'Blog post updated successfully!' : 'Blog post created successfully!')
        setFormData({
          image: '',
          images: [],
          title: '',
          excerpt: '',
          content: '',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          category: 'Textiles',
          alt: '',
          readTime: '5 min read',
        })
        setShowForm(false)
        router.push('/admin/blog')
        fetchPosts()
      } else {
        setError(data.error || 'Failed to save blog post')
      }
    } catch (error) {
      setError('Failed to save blog post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSuccess('Blog post deleted successfully!')
        fetchPosts()
      } else {
        setError(data.error || 'Failed to delete blog post')
      }
    } catch (error) {
      setError('Failed to delete blog post')
    }
  }

  const categories = ['Textiles', 'Calligraphy', 'Painting', 'Crafts', 'Jewelry', 'Inspiration']

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold text-dark-900 mb-2">
              Blog Management
            </h1>
            <p className="text-dark-600">Add, edit, or delete blog posts</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fa-solid fa-plus"></i>
              <span>Add New Post</span>
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
              {editId ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Image <span className="text-accent-500">*</span>
                </label>
                {formData.image && (
                  <div className="mb-4 relative w-48 h-48 rounded-xl overflow-hidden border-2 border-dark-200">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
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
                  placeholder="Mastering Hand Embroidery Techniques"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Short Excerpt <span className="text-accent-500">*</span>
                </label>
                <textarea
                  id="excerpt"
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 resize-none"
                  placeholder="Learn the fundamental techniques..."
                />
              </div>

              {/* Full Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Full Blog Content
                </label>
                <textarea
                  id="content"
                  rows={12}
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 resize-none font-mono text-sm"
                  placeholder="Write the full blog post content here. You can use markdown-style formatting with ## for headings, - for lists, etc."
                />
                <p className="mt-2 text-xs text-dark-500">
                  Use ## for headings, - for bullet points, and line breaks for paragraphs.
                </p>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Date <span className="text-accent-500">*</span>
                </label>
                <input
                  type="text"
                  id="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="March 15, 2025"
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
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  placeholder="Textile Design Techniques"
                />
              </div>

              {/* Read Time */}
              <div>
                <label htmlFor="readTime" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  id="readTime"
                  value={formData.readTime}
                  onChange={(e) => setFormData((prev) => ({ ...prev, readTime: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900"
                  placeholder="5 min read"
                />
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
                      excerpt: '',
                      content: '',
                      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                      category: 'Textiles',
                      alt: '',
                      readTime: '5 min read',
                    })
                    router.push('/admin/blog')
                  }}
                  className="px-6 py-3 bg-dark-200 text-dark-800 rounded-xl font-accent font-semibold hover:bg-dark-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* Posts List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-accent-500"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-dark-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-dark-100">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-block px-2 py-1 bg-accent-500/10 text-accent-600 text-xs font-accent font-semibold rounded">
                      {post.category}
                    </span>
                    {post.readTime && (
                      <span className="text-xs text-dark-500">
                        <i className="fa-solid fa-clock mr-1"></i>
                        {post.readTime}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-bold text-dark-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-dark-600 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-dark-500 mb-4">{post.date}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        router.push(`/admin/blog?id=${post.id}`)
                      }}
                      className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-accent font-semibold text-sm hover:bg-primary-600 transition-colors"
                    >
                      <i className="fa-solid fa-edit mr-2"></i>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-accent font-semibold text-sm hover:bg-red-600 transition-colors"
                    >
                      <i className="fa-solid fa-trash mr-2"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <div className="col-span-full text-center py-20">
                <i className="fa-solid fa-blog text-6xl text-dark-300 mb-4"></i>
                <p className="text-dark-600 text-lg">No blog posts yet</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Add Your First Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

function BlogManagementPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-dark-600 font-accent text-lg">
          Loading blog dashboard...
        </div>
      }
    >
      <BlogManagementContent />
    </Suspense>
  )
}

export default BlogManagementPage

