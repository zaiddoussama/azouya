import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, MapPin, Mail, Phone, CreditCard } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { CheckoutFormData } from '@/types'

const checkoutSchema = z.object({
  customer: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
  }),
  shippingAddress: z.object({
    street: z.string().min(5, 'Please enter a complete street address'),
    city: z.string().min(2, 'Please enter a valid city'),
    state: z.string().min(2, 'Please select a state'),
    postalCode: z.string().min(5, 'Please enter a valid postal code'),
    country: z.string().min(2, 'Please select a country'),
  }),
  notes: z.string().optional(),
})

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  loading?: boolean
}

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
]

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
]

export function CheckoutForm({ onSubmit, loading = false }: CheckoutFormProps) {
  const [isGuest, setIsGuest] = useState(true)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer: {
        name: '',
        email: '',
        phone: '',
      },
      shippingAddress: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'US',
      },
      notes: '',
    },
  })

  const selectedCountry = watch('shippingAddress.country')

  return (
    <div className="space-y-8">
      {/* Guest/Account Toggle */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={isGuest}
              onChange={() => setIsGuest(true)}
              className="mr-2"
            />
            <span className="text-sm font-medium">Continue as Guest</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={!isGuest}
              onChange={() => setIsGuest(false)}
              className="mr-2"
            />
            <span className="text-sm font-medium">Create Account</span>
          </label>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {isGuest 
            ? 'You can create an account after completing your order'
            : 'Create an account to track your order and save your information'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-primary-600" />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              {...register('customer.name')}
              error={errors.customer?.name?.message}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              {...register('customer.phone')}
              error={errors.customer?.phone?.message}
              required
            />
          </div>
          
          <div className="mt-4">
            <Input
              label="Email Address"
              type="email"
              {...register('customer.email')}
              error={errors.customer?.email?.message}
              helperText="We'll send your order confirmation here"
              required
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary-600" />
            Shipping Address
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Street Address"
              {...register('shippingAddress.street')}
              error={errors.shippingAddress?.street?.message}
              placeholder="123 Main Street, Apt 4B"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                {...register('shippingAddress.city')}
                error={errors.shippingAddress?.city?.message}
                required
              />
              <Input
                label="Postal Code"
                {...register('shippingAddress.postalCode')}
                error={errors.shippingAddress?.postalCode?.message}
                placeholder={selectedCountry === 'US' ? '12345' : 'Postal Code'}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Country"
                {...register('shippingAddress.country')}
                options={COUNTRIES}
                error={errors.shippingAddress?.country?.message}
                required
              />
              <Select
                label={selectedCountry === 'US' ? 'State' : 'Province/State'}
                {...register('shippingAddress.state')}
                options={selectedCountry === 'US' ? US_STATES : [
                  { value: '', label: 'Select Province/State' }
                ]}
                error={errors.shippingAddress?.state?.message}
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
            Payment Method
          </h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-900">
                  Order Request (Offline Payment)
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your order will be processed manually. We'll contact you within 24 hours with payment instructions and order confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Notes */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Notes (Optional)
          </h3>
          
          <div>
            <textarea
              {...register('notes')}
              placeholder="Special instructions, gift message, or any other notes..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <Button
            type="submit"
            size="lg"
            className="w-full"
            loading={loading}
          >
            {loading ? 'Processing Order...' : 'Place Order Request'}
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            By placing this order, you agree to our{' '}
            <a href="/terms" className="text-primary-600 hover:text-primary-700 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  )
}
