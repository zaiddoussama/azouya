import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { ChevronDown, X, Filter } from 'lucide-react'
import { db } from '@/lib/firebase'
import { Category, ProductFilters as Filters } from '@/types'
import { Button } from '@/components/ui/Button'

interface ProductFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  productCount: number
  onClearFilters: () => void
}

export function ProductFilters({ 
  filters, 
  onFiltersChange, 
  productCount, 
  onClearFilters 
}: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    sort: true,
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'))
        const fetchedCategories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Category[]
        
        setCategories(fetchedCategories.sort((a, b) => a.order - b.order))
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback categories
        setCategories([
          { id: '1', name: 'Rings', slug: 'rings', order: 1, active: true },
          { id: '2', name: 'Necklaces', slug: 'necklaces', order: 2, active: true },
          { id: '3', name: 'Earrings', slug: 'earrings', order: 3, active: true },
          { id: '4', name: 'Bracelets', slug: 'bracelets', order: 4, active: true },
          { id: '5', name: 'Bridal', slug: 'bridal', order: 5, active: true },
        ])
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    })
  }

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: { min, max },
    })
  }

  const handleSortChange = (sortBy: Filters['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy,
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const priceRanges = [
    { label: 'Under $200', min: 0, max: 199 },
    { label: '$200 - $500', min: 200, max: 499 },
    { label: '$500 - $1000', min: 500, max: 999 },
    { label: '$1000 - $2000', min: 1000, max: 1999 },
    { label: 'Over $2000', min: 2000, max: 10000 },
  ]

  const sortOptions = [
    { value: 'newest' as const, label: 'Newest First' },
    { value: 'oldest' as const, label: 'Oldest First' },
    { value: 'price-low' as const, label: 'Price: Low to High' },
    { value: 'price-high' as const, label: 'Price: High to Low' },
    { value: 'name' as const, label: 'Name: A to Z' },
  ]

  const activeFiltersCount = 
    filters.categories.length + 
    (filters.priceRange.min > 0 || filters.priceRange.max < 10000 ? 1 : 0) +
    (filters.search ? 1 : 0)

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          Categories
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              expandedSections.categories ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          Price Range
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              expandedSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange.min === range.min &&
                    filters.priceRange.max === range.max
                  }
                  onChange={() => handlePriceChange(range.min, range.max)}
                  className="border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort */}
      <div>
        <button
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          Sort By
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              expandedSections.sort ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.sort && (
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sortBy"
                  checked={filters.sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="w-full"
        >
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">
          {productCount} products found
        </div>
        <Button
          onClick={() => setShowMobileFilters(true)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            <div className="text-sm text-gray-600">
              {productCount} products
            </div>
          </div>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-20">
              <FiltersContent />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <Button
                onClick={() => setShowMobileFilters(false)}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
