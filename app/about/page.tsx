import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About - Chughtai Arts',
  description: 'Learn about Museera Aftab, Fine Arts student specializing in Textile Design. Discover her artistic journey and creative expertise.',
}

const skills = [
  {
    category: 'Textile Design',
    icon: 'fa-solid fa-palette',
    items: [
      'Hand embroidery, weaving, and surface embellishment',
      'Fabric dyeing and manipulation (tie-dye, batik, resist techniques)',
      'Sustainable fabric development and redesign',
    ]
  },
  {
    category: 'Portraiture & Painting',
    icon: 'fa-solid fa-paintbrush',
    items: [
      'Realistic and abstract portrait sketching',
      'Acrylic, watercolor, and oil painting techniques',
      'Custom canvas paintings',
    ]
  },
  {
    category: 'Product Making & Craft',
    icon: 'fa-solid fa-hammer',
    items: [
      'Crochet products (wearables, décor)',
      'Jewelry making (beaded, wire, and stained glass techniques)',
      'Handmade textile-based accessories and home items',
    ]
  },
  {
    category: 'Calligraphy & Sketching',
    icon: 'fa-solid fa-pen-nib',
    items: [
      'Arabic calligraphy and freestyle typography',
      'Ink and graphite sketching',
      'Decorative and illustrative compositions',
    ]
  },
  {
    category: 'Digital Arts',
    icon: 'fa-solid fa-laptop',
    items: [
      'Digital portrait creation and enhancements',
      'Pattern design and digital color theory',
      'Textile prints and layout composition in design software',
    ]
  },
]

export default function About() {
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
            <span className="text-palette-light font-accent text-sm font-medium tracking-wide">About the Artist</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-slide-up animate-delay-100">
            Meet <span className="gradient-text">Museera Aftab</span>
          </h1>
          <p className="text-xl sm:text-2xl text-palette-light/80 max-w-3xl mx-auto animate-slide-up animate-delay-200">
            Fine Arts student specializing in Textile Design
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 bg-palette-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Profile Image */}
            <div className="relative group animate-slide-up animate-delay-300">
              <div className="absolute inset-0 bg-gradient-to-r from-palette-mid to-palette-dark rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="/dp.jpg"
                  alt="Museera Aftab - Fine Arts Student and Artist"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            {/* About Text */}
            <div className="space-y-6 animate-slide-up animate-delay-300">
              <div className="inline-block px-4 py-2 rounded-full bg-palette-dark/5 border border-palette-dark/10 mb-4">
                <span className="text-palette-dark font-accent text-sm font-medium">Introduction</span>
              </div>

              <h2 className="text-4xl font-display font-bold text-palette-darkest mb-4">
                Creative Journey
              </h2>

              <p className="text-lg text-palette-dark/80 leading-relaxed">
                I am <strong className="text-palette-mid">Museera Aftab</strong>, a Fine Arts student majoring in <strong className="text-palette-dark">Textiles</strong>, with a deep passion for crafting expressive and original works across various mediums. My creative journey combines traditional craftsmanship with contemporary aesthetics, reflected in everything from realistic portraiture to handcrafted products like crochet and stained glass jewelry.
              </p>

              <p className="text-lg text-palette-dark/80 leading-relaxed">
                Through years of artistic exploration, I&rsquo;ve developed a strong command over both fabric-based design and visual storytelling. Whether it&rsquo;s detailed digital art, hand-dyed textiles, or intricate jewelry making, my focus remains on evoking meaning through material and form.
              </p>

              <div className="pt-4">
                <h3 className="text-2xl font-display font-bold text-palette-darkest mb-4 flex items-center">
                  <i className="fa-solid fa-graduation-cap text-palette-mid mr-3"></i>
                  Education
                </h3>
                <p className="text-lg text-palette-dark/80">
                  Bachelor of Fine Arts – <em className="text-palette-dark">Specialization: Textile Design</em>
                  <br />
                  <span className="text-palette-dark/60">Sadiq Women University Bahawalpur, 2022–2026</span>
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-12">
            <div className="text-center mb-16 animate-slide-up">
              <div className="inline-block px-4 py-2 rounded-full bg-palette-mid/10 border border-palette-mid/20 backdrop-blur-sm mb-4">
                <span className="text-palette-mid font-accent text-sm font-medium">Expertise</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-palette-darkest mb-4">
                Skills <span className="gradient-text">Overview</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.category}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-palette-mid/10 hover:border-palette-mid/50 transition-all duration-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-palette-mid to-palette-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${skill.icon} text-white text-xl`}></i>
                  </div>

                  <h3 className="text-xl font-display font-bold text-palette-darkest mb-4 group-hover:text-palette-mid transition-colors">
                    {skill.category}
                  </h3>

                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <li key={i} className="flex items-start text-palette-dark/70 text-sm">
                        <i className="fa-solid fa-check-circle text-palette-mid mr-2 mt-1 flex-shrink-0"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
