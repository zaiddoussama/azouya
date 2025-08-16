import { Truck, Shield, RotateCcw, Headphones, Award, Heart } from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free worldwide shipping on orders over $100',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'Comprehensive warranty on all jewelry pieces',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    description: 'Easy returns and exchanges within 30 days',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Expert customer service whenever you need it',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Handcrafted with the finest materials and gems',
    color: 'text-gold-600',
    bgColor: 'bg-gold-50',
  },
  {
    icon: Heart,
    title: 'Ethical Sourcing',
    description: 'Responsibly sourced materials and fair trade practices',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
]

export function USPSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            The Azouya Promise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We're committed to providing you with the finest jewelry and exceptional service every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-white"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              50K+
            </div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              15+
            </div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              1000+
            </div>
            <div className="text-gray-600 font-medium">Unique Designs</div>
          </div>
          <div className="group">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
              99%
            </div>
            <div className="text-gray-600 font-medium">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}

