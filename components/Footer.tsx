import Link from 'next/link'

export default function Footer() {
  const socialLinks = [
    { href: 'https://instagram.com/chughtaiarts', icon: 'fa-brands fa-instagram', label: 'Instagram' },
    { href: 'https://twitter.com/chughtaiarts', icon: 'fa-brands fa-x-twitter', label: 'Twitter' },
    { href: 'mailto:info@chughtaiarts.com', icon: 'fa-solid fa-envelope', label: 'Email' },
    { href: 'https://linkedin.com/in/chughtaiarts', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold gradient-text">Chughtai Arts</h3>
            <p className="text-dark-300 leading-relaxed">
              Creating unique fine arts and textile creations that combine traditional craftsmanship with contemporary aesthetics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-4 text-accent-400">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Portfolio', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-dark-300 hover:text-accent-400 transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-accent font-semibold text-lg mb-4 text-accent-400">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-dark-800/50 backdrop-blur-sm border border-dark-700 flex items-center justify-center text-dark-300 hover:text-accent-400 hover:border-accent-500 hover:bg-accent-500/10 transition-all duration-300 hover:scale-110 hover:rotate-6"
                  aria-label={social.label}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-dark-400 text-sm">
            © {new Date().getFullYear()} Chughtai Arts. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-dark-400">
            <Link href="/privacy" className="hover:text-accent-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
