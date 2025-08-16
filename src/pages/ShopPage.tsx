import { ProductGrid } from '@/components/shop/ProductGrid'

export function ShopPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Our Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover exquisite handcrafted jewelry pieces designed to celebrate life's precious moments.
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid />
    </div>
  )
}
