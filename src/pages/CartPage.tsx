import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'

export function CartPage() {
  const { items, clearCart } = useCartStore()

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <div className="space-y-4">
            <Link to="/shop">
              <Button size="lg" className="w-full">
                Start Shopping
              </Button>
            </Link>
            <Link to="/" className="block">
              <Button variant="outline" size="lg" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          {/* Suggestions */}
          <div className="mt-12 text-left">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">You might be interested in:</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <Link to="/shop?category=rings" className="block hover:text-primary-600 transition-colors duration-200">
                • Engagement Rings
              </Link>
              <Link to="/shop?category=necklaces" className="block hover:text-primary-600 transition-colors duration-200">
                • Pearl Necklaces
              </Link>
              <Link to="/shop?category=earrings" className="block hover:text-primary-600 transition-colors duration-200">
                • Diamond Earrings
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link to="/shop" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Cart Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                <Button
                  onClick={handleClearCart}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </Button>
              </div>

              {/* Items List */}
              <div className="px-6">
                {items.map((item) => (
                  <CartItem
                    key={`${item.productId}-${JSON.stringify(item.selectedOptions || {})}`}
                    item={item}
                  />
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-primary-600" />
                You might also like
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Placeholder for recommended products */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-2"></div>
                    <p className="text-sm font-medium text-gray-900">Product {i}</p>
                    <p className="text-sm text-primary-600">$299</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
