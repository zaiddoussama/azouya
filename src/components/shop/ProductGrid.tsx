import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, limit, getDocs, startAfter, QueryDocumentSnapshot } from 'firebase/firestore'
import { Search } from 'lucide-react'
import { db } from '@/lib/firebase'
import { Product, ProductFilters } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductFilters as FilterComponent } from './ProductFilters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { debounce } from '@/lib/utils'

const PRODUCTS_PER_PAGE = 12

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null)
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    priceRange: { min: 0, max: 10000 },
    search: '',
    sortBy: 'newest',
  })

  // Debounced search function
  const debouncedSearch = debounce((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }))
  }, 300)

  const fetchProducts = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true)
        setLastDoc(null)
      } else {
        setLoadingMore(true)
      }

      let baseQuery = collection(db, 'products')
      let conditions = [where('active', '==', true)]

      // Apply category filter
      if (filters.categories.length > 0) {
        conditions.push(where('categories', 'array-contains-any', filters.categories))
      }

      // Apply price filter
      if (filters.priceRange.min > 0) {
        conditions.push(where('price', '>=', filters.priceRange.min))
      }
      if (filters.priceRange.max < 10000) {
        conditions.push(where('price', '<=', filters.priceRange.max))
      }

      // Apply sorting
      let orderByClause
      switch (filters.sortBy) {
        case 'price-low':
          orderByClause = orderBy('price', 'asc')
          break
        case 'price-high':
          orderByClause = orderBy('price', 'desc')
          break
        case 'name':
          orderByClause = orderBy('title', 'asc')
          break
        case 'oldest':
          orderByClause = orderBy('createdAt', 'asc')
          break
        default:
          orderByClause = orderBy('createdAt', 'desc')
      }

      let q = query(
        baseQuery,
        ...conditions,
        orderByClause,
        limit(PRODUCTS_PER_PAGE)
      )

      // Add pagination
      if (isLoadMore && lastDoc) {
        q = query(
          baseQuery,
          ...conditions,
          orderByClause,
          startAfter(lastDoc),
          limit(PRODUCTS_PER_PAGE)
        )
      }

      const querySnapshot = await getDocs(q)
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[]

      // Apply client-side search filter
      let filteredProducts = fetchedProducts
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredProducts = fetchedProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.categories.some(cat => cat.toLowerCase().includes(searchTerm))
        )
      }

      if (isLoadMore) {
        setProducts(prev => [...prev, ...filteredProducts])
      } else {
        setProducts(filteredProducts)
      }

      // Update pagination state
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null)
      setHasMore(querySnapshot.docs.length === PRODUCTS_PER_PAGE)

    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback to sample data
      if (!isLoadMore) {
        setProducts(sampleProducts.slice(0, PRODUCTS_PER_PAGE))
        setHasMore(false)
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filters.categories, filters.priceRange, filters.sortBy, filters.search])

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      priceRange: { min: 0, max: 10000 },
      search: '',
      sortBy: 'newest',
    })
  }

  const handleLoadMore = () => {
    fetchProducts(true)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value)
  }

  if (loading) {
    return (
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Skeleton */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Products Skeleton */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search products..."
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-1/4">
          <FilterComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            productCount={products.length}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    onClick={handleLoadMore}
                    loading={loadingMore}
                    variant="outline"
                    size="lg"
                  >
                    {loadingMore ? 'Loading...' : 'Load More Products'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
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
  // Add more sample products as needed
]
