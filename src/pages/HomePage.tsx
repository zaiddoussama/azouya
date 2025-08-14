import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export function HomePage() {
  const { initialize, initialized } = useAuthStore()

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialized, initialize])

  return (
    <div className="min-h-screen">
      {/* Hero Section - Placeholder */}
      <section className="bg-gradient-to-r from-primary-50 to-gold-50 py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Exquisite Jewelry Collection
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover handcrafted pieces that tell your unique story. Each design is created with passion and precision.
          </p>
          <div className="space-x-4">
            <button className="btn-primary px-8 py-3 text-lg">
              Shop Collection
            </button>
            <button className="btn-outline px-8 py-3 text-lg">
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products - Placeholder */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully curated pieces that showcase our finest craftsmanship and design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Product Image</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Elegant Ring {item}</h3>
                <p className="text-primary-600 font-semibold">$299.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section - Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">💎</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Handcrafted with the finest materials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🔄</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
