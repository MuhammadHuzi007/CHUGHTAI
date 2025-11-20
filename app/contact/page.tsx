'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const contactInfo = [
    {
      icon: 'fa-solid fa-envelope',
      label: 'Email',
      value: 'info@chughtaiarts.com',
      href: 'mailto:info@chughtaiarts.com',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: 'fa-solid fa-phone',
      label: 'Phone',
      value: '+92 300 123 4567',
      href: 'tel:+923001234567',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: 'fa-solid fa-map-marker-alt',
      label: 'Address',
      value: 'Bahawalpur, Pakistan',
      href: '#',
      color: 'from-green-500 to-green-600'
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    setTimeout(() => {
      setMessage({
        type: 'success',
        text: "Thank you! Your message has been sent successfully. I&rsquo;ll get back to you soon.",
      })
      setFormData({ name: '', email: '', message: '', file: null })
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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-palette-darkest via-palette-dark to-palette-darkest pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-palette-mid/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-palette-light/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-palette-light/10 border border-palette-light/20 backdrop-blur-sm mb-6 animate-slide-up">
            <span className="text-palette-light font-accent text-sm font-medium tracking-wide">Get in Touch</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-slide-up animate-delay-100">
            Let&rsquo;s <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl sm:text-2xl text-palette-light/80 max-w-3xl mx-auto animate-slide-up animate-delay-200">
            Have a project in mind? Let&rsquo;s create something extraordinary together!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-palette-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-palette-mid/10 animate-slide-up animate-delay-300">
              <div className="mb-8">
                <div className="inline-block px-4 py-2 rounded-full bg-palette-dark/5 border border-palette-dark/10 backdrop-blur-sm mb-4">
                  <span className="text-palette-dark font-accent text-sm font-medium">Send Message</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-palette-darkest mb-2">
                  Contact <span className="gradient-text">Form</span>
                </h2>
                <p className="text-palette-dark/70">
                  Fill out the form and we&rsquo;ll respond as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {message && (
                  <div className={`p-4 rounded-xl font-medium ${message.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    {message.text}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-sm font-accent font-semibold text-palette-dark mb-2">
                    Name <span className="text-palette-mid">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-palette-mid/20 focus:border-palette-mid focus:ring-2 focus:ring-palette-mid/20 transition-all duration-300 bg-white text-palette-darkest placeholder-palette-dark/40"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-accent font-semibold text-palette-dark mb-2">
                    Email <span className="text-palette-mid">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-palette-mid/20 focus:border-palette-mid focus:ring-2 focus:ring-palette-mid/20 transition-all duration-300 bg-white text-palette-darkest placeholder-palette-dark/40"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-accent font-semibold text-palette-dark mb-2">
                    Message <span className="text-palette-mid">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-palette-mid/20 focus:border-palette-mid focus:ring-2 focus:ring-palette-mid/20 transition-all duration-300 bg-white text-palette-darkest placeholder-palette-dark/40 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <div>
                  <label htmlFor="file" className="block text-sm font-accent font-semibold text-palette-dark mb-2">
                    Attach File (Optional)
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-palette-mid/20 focus:border-palette-mid focus:ring-2 focus:ring-palette-mid/20 transition-all duration-300 bg-white text-palette-darkest file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-accent file:bg-palette-mid file:text-white hover:file:bg-palette-dark cursor-pointer"
                  />
                  <p className="text-xs text-palette-dark/50 mt-2">Upload reference images or documents (max 5MB)</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-palette-mid to-palette-dark text-white rounded-xl font-accent font-semibold text-lg shadow-lg shadow-palette-mid/30 hover:shadow-xl hover:shadow-palette-mid/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-slide-up animate-delay-300">
              <div>
                <div className="inline-block px-4 py-2 rounded-full bg-palette-mid/10 border border-palette-mid/20 backdrop-blur-sm mb-4">
                  <span className="text-palette-mid font-accent text-sm font-medium">Contact Details</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-palette-darkest mb-4">
                  Reach <span className="gradient-text">Out</span>
                </h2>
                <p className="text-palette-dark/80 mb-8">
                  We&rsquo;re here to help! Get in touch with us through any of these channels.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className={`group block bg-gradient-to-br ${info.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className={`${info.icon} text-white text-xl`}></i>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-accent mb-1">{info.label}</p>
                        <p className="text-white font-semibold text-lg">{info.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-palette-mid/10">
                <h3 className="text-xl font-display font-bold text-palette-darkest mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { href: 'https://instagram.com/chughtaiarts', icon: 'fa-brands fa-instagram', label: 'Instagram' },
                    { href: 'https://twitter.com/chughtaiarts', icon: 'fa-brands fa-x-twitter', label: 'Twitter' },
                    { href: 'mailto:info@chughtaiarts.com', icon: 'fa-solid fa-envelope', label: 'Email' },
                    { href: 'https://linkedin.com/in/chughtaiarts', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-palette-lightest hover:bg-gradient-to-r hover:from-palette-mid hover:to-palette-dark text-palette-dark hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6"
                      aria-label={social.label}
                    >
                      <i className={`${social.icon} text-lg`}></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-palette-mid/10 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.75!2d71.7616!3d29.3941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIzJzM4LjgiTiA3McKwNDUnNDEuOCJF!5e0!3m2!1sen!2s!4v1234567890123"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
