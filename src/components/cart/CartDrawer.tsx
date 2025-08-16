import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { X, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totals, removeItem, updateQuantity } = useCartStore()

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl flex flex-col transform transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mb-4">Add some items to get started!</p>
              <Link to="/shop" onClick={onClose}>
                <Button>Start Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${JSON.stringify(item.selectedOptions || {})}`}
                  className="flex items-start space-x-3"
                >
                  {/* Image */}
                  <div className="flex-shrink-0 w-16 h-16">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </h4>
                    
                    {/* Options */}
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div className="mt-1">
                        {Object.entries(item.selectedOptions).map(([key, value]) => (
                          <p key={key} className="text-xs text-gray-500">
                            {key}: {value}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedOptions)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedOptions)}
                          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        >
                          +
                        </button>
                      </div>

                      {/* Price and Remove */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-primary-600">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId, item.selectedOptions)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {totals.shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatPrice(totals.shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(totals.grandTotal)}</span>
                </div>
              </div>

              {/* Shipping Notice */}
              {totals.subtotal < 100 && (
                <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                  Add {formatPrice(100 - totals.subtotal)} more for free shipping!
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Link to="/cart" onClick={onClose} className="block">
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
                <Link to="/checkout" onClick={onClose} className="block">
                  <Button className="w-full">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
