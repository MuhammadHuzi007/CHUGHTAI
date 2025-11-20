'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Services() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderDetails: '',
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const services = [
    {
      title: 'Custom Portraits',
      icon: 'fa-solid fa-user',
      description: 'Create personalized portraits in acrylics, watercolor, or pencil that capture the essence of your subject.',
      features: ['Realistic portraits', 'Abstract interpretations', 'Multiple mediums', 'Custom sizes']
    },
    {
      title: 'Textile Products',
      icon: 'fa-solid fa-sewing-machine',
      description: 'Design custom embroidered fabrics or wearable art pieces that blend traditional techniques with modern aesthetics.',
      features: ['Hand embroidery', 'Custom patterns', 'Wearable art', 'Home décor']
    },
    {
      title: 'Calligraphy Art',
      icon: 'fa-solid fa-pen-nib',
      description: 'Commission unique calligraphy designs for events or decor, featuring Arabic calligraphy and modern typography.',
      features: ['Arabic calligraphy', 'Event designs', 'Custom quotes', 'Decorative pieces']
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    setTimeout(() => {
      setMessage({
        type: 'success',
        text: "Thank you! Your custom order request has been received. I'll contact you shortly to discuss the details.",
      })
      setFormData({ name: '', email: '', orderDetails: '', file: null })
      setIsSubmitting(false)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }))
    }
  }

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-dark-800 to-dark-900 pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 backdrop-blur-sm mb-6">
            <span className="text-accent-400 font-accent text-sm font-medium">Our Services</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
            Custom <span className="gradient-text">Art Solutions</span>
          </h1>
          <p className="text-xl sm:text-2xl text-dark-200 max-w-3xl mx-auto">
            Explore custom art solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-white via-dark-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-dark-200 hover:border-accent-500/50 transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${service.icon} text-white text-2xl`}></i>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-dark-900 mb-4 group-hover:text-accent-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-dark-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-dark-600 text-sm">
                      <i className="fa-solid fa-check-circle text-accent-500 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Order Form Section */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-dark-200">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm mb-4">
                  <span className="text-primary-600 font-accent text-sm font-medium">Custom Order</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 mb-4">
                  Request a <span className="gradient-text">Custom Order</span>
                </h2>
                <p className="text-dark-600">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {message && (
                  <div className={`p-4 rounded-xl font-medium ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {message.text}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                    Full Name <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 placeholder-dark-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                    Email Address <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 placeholder-dark-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="order-details" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                    Order Details <span className="text-accent-500">*</span>
                  </label>
                  <textarea
                    id="order-details"
                    name="orderDetails"
                    value={formData.orderDetails}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 placeholder-dark-400 resize-none"
                    placeholder="Describe your custom order requirements..."
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block text-sm font-accent font-semibold text-dark-900 mb-2">
                    Reference Image (Optional)
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 bg-white text-dark-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-accent file:bg-accent-500 file:text-white hover:file:bg-accent-600 cursor-pointer"
                  />
                  <p className="text-xs text-dark-500 mt-2">Upload reference images to help us understand your vision</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl font-accent font-semibold text-lg shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Submitting Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Order</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
