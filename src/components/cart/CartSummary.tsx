import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'

interface CartSummaryProps {
  showCheckoutButton?: boolean
  className?: string
}

export function CartSummary({ showCheckoutButton = true, className = '' }: CartSummaryProps) {
  const { totals, items } = useCartStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const handleApplyPromo = () => {
    // TODO: Implement promo code logic
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoApplied(true)
      // In a real app, you'd update the cart totals
    }
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <ShoppingBag className="w-5 h-5 mr-2" />
        Order Summary
      </h2>

      {/* Items Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items ({itemCount})</span>
          <span className="font-medium">{formatPrice(totals.subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <Truck className="w-4 h-4 mr-1" />
            Shipping
          </span>
          <span className="font-medium">
            {totals.shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </span>
        </div>

        {totals.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              Discount
            </span>
            <span className="font-medium text-green-600">
              -{formatPrice(totals.discount)}
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(totals.grandTotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleApplyPromo}
            variant="outline"
            size="sm"
            disabled={promoApplied}
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </Button>
        </div>
        {promoApplied && (
          <p className="text-sm text-green-600 mt-2">
            Promo code applied successfully!
          </p>
        )}
      </div>

      {/* Shipping Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Free Shipping</p>
            <p className="text-xs text-blue-700 mt-1">
              {totals.subtotal >= 100 ? (
                'Your order qualifies for free shipping!'
              ) : (
                `Add ${formatPrice(100 - totals.subtotal)} more for free shipping`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && itemCount > 0 && (
        <div className="space-y-3">
          <Link to="/checkout" className="block">
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
          <Link to="/shop" className="block">
            <Button variant="outline" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}

      {/* Security Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            SSL Secured
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            Safe Checkout
          </div>
        </div>
      </div>
    </div>
  )
}
