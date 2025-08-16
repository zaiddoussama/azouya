import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { db } from '@/lib/firebase'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('featured', '==', true),
          where('active', '==', true),
          limit(8)
        )
        const querySnapshot = await getDocs(q)
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        })) as Product[]
        
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching featured products:', error)
        // Fallback to sample data if Firestore fails
        setProducts(sampleProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0] || '',
      quantity: 1,
    })
  }

  const handleQuickView = (product: Product) => {
    // TODO: Implement quick view modal
    toast.success(`Quick view for ${product.title} coming soon!`)
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Carefully curated pieces that showcase our finest craftsmanship and design.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Carefully curated pieces that showcase our finest craftsmanship and design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {/* Product Image */}
                <img
                  src={product.images[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleQuickView(product)
                      }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product)
                      }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toast.success('Added to wishlist!')
                      }}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                      title="Add to Wishlist"
                    >
                      <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Sale Badge */}
                {product.price < 200 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Sale
                  </div>
                )}
              </div>
              
              <Link to={`/product/${product.slug}`} className="block">
                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-200">
                  {product.title}
                </h3>
                <p className="text-primary-600 font-semibold text-lg">
                  {formatPrice(product.price)}
                </p>
                {product.categories.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {product.categories[0]}
                  </p>
                )}
              </Link>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

// Sample products as fallback
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Elegant Diamond Ring',
    slug: 'elegant-diamond-ring',
    description: 'A stunning diamond ring crafted with precision and care.',
    price: 599,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    categories: ['Rings'],
    stock: 10,
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Pearl Necklace',
    slug: 'pearl-necklace',
    description: 'Classic pearl necklace for elegant occasions.',
    price: 299,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    categories: ['Necklaces'],
    stock: 15,
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Gold Earrings',
    slug: 'gold-earrings',
    description: 'Beautiful gold earrings with intricate design.',
    price: 199,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    categories: ['Earrings'],
    stock: 20,
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Silver Bracelet',
    slug: 'silver-bracelet',
    description: 'Delicate silver bracelet with charm details.',
    price: 149,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'],
    categories: ['Bracelets'],
    stock: 25,
    featured: true,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

