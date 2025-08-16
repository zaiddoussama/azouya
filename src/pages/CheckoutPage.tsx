import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { ArrowLeft, Lock, ShoppingBag } from 'lucide-react'
import { db } from '@/lib/firebase'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { CartSummary } from '@/components/cart/CartSummary'
import { CheckoutFormData, Order } from '@/types'
import { generateId } from '@/lib/utils'
import toast from 'react-hot-toast'

export function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const { items, totals, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items.length, navigate])

  const handleCheckoutSubmit = async (formData: CheckoutFormData) => {
    setLoading(true)
    
    try {
      // Create order object
      const orderData: Omit<Order, 'id'> = {
        items: items.map(item => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          selectedOptions: item.selectedOptions,
        })),
        totals,
        customer: {
          uid: user?.uid,
          name: formData.customer.name,
          email: formData.customer.email,
          phone: formData.customer.phone,
        },
        shippingAddress: formData.shippingAddress,
        status: 'pending',
        notes: formData.notes || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // Save order to Firestore
      const orderRef = await addDoc(collection(db, 'orders'), orderData)
      
      // Clear cart after successful order
      clearCart()
      
      // Show success message
      toast.success('Order request submitted successfully!')
      
      // Redirect to confirmation page
      navigate(`/order-confirmation/${orderRef.id}`)
      
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('Failed to submit order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-8 h-8 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-50 py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center">
                <Lock className="w-6 h-6 mr-3 text-primary-600" />
                Secure Checkout
              </h1>
              <p className="text-gray-600 mt-1">
                Complete your order information below
              </p>
            </div>
            <Link to="/cart" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleCheckoutSubmit} loading={loading} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary showCheckoutButton={false} />
              
              {/* Security Info */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Lock className="w-5 h-5 text-green-600 mt-0.5" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-green-900">
                      Your information is secure
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      We use industry-standard encryption to protect your personal information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Process Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  What happens next?
                </h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span>Order confirmation email sent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span>We'll contact you within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span>Payment instructions provided</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span>Order processed after payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
