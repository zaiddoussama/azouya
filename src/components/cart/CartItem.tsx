import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Heart } from 'lucide-react'
import { CartItem as CartItemType } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const { updateQuantity, removeItem } = useCartStore()

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return
    
    setIsUpdating(true)
    setQuantity(newQuantity)
    
    // Debounce the update to avoid too many calls
    setTimeout(() => {
      updateQuantity(item.productId, newQuantity, item.selectedOptions)
      setIsUpdating(false)
    }, 500)
  }

  const handleRemove = () => {
    removeItem(item.productId, item.selectedOptions)
  }

  const handleMoveToWishlist = () => {
    // TODO: Implement wishlist functionality
    handleRemove()
    toast.success('Moved to wishlist')
  }

  const itemTotal = item.price * quantity

  return (
    <div className="flex items-start space-x-4 py-6 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
        <Link to={`/product/${item.productId}`}>
          <img
            src={item.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg hover:opacity-75 transition-opacity duration-200"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <Link
              to={`/product/${item.productId}`}
              className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200"
            >
              <h3 className="truncate">{item.title}</h3>
            </Link>
            
            {/* Selected Options */}
            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
              <div className="mt-1 space-y-1">
                {Object.entries(item.selectedOptions).map(([key, value]) => (
                  <p key={key} className="text-xs text-gray-500">
                    {key}: <span className="font-medium">{value}</span>
                  </p>
                ))}
              </div>
            )}

            {/* Price */}
            <p className="mt-2 text-sm font-semibold text-primary-600">
              {formatPrice(item.price)}
            </p>
          </div>

          {/* Item Total */}
          <div className="text-right ml-4">
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(itemTotal)}
            </p>
            {quantity > 1 && (
              <p className="text-xs text-gray-500 mt-1">
                {quantity} × {formatPrice(item.price)}
              </p>
            )}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <label htmlFor={`quantity-${item.productId}`} className="text-xs text-gray-600">
              Qty:
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <input
                id={`quantity-${item.productId}`}
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-12 px-2 py-1 text-center text-sm border-0 focus:outline-none"
                disabled={isUpdating}
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isUpdating}
                className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
            {isUpdating && (
              <div className="text-xs text-gray-500">Updating...</div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleMoveToWishlist}
              variant="ghost"
              size="sm"
              className="text-xs text-gray-500 hover:text-primary-600 p-1"
            >
              <Heart className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="sm"
              className="text-xs text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
