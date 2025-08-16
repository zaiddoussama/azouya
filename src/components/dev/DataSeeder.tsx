import { useState } from 'react'
import { seedAllData, seedCategories, seedProducts } from '@/lib/sampleData'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export function DataSeeder() {
  const [loading, setLoading] = useState(false)

  const handleSeedAll = async () => {
    setLoading(true)
    try {
      await seedAllData()
      toast.success('All sample data seeded successfully!')
    } catch (error) {
      console.error('Error seeding data:', error)
      toast.error('Failed to seed data. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const handleSeedCategories = async () => {
    setLoading(true)
    try {
      await seedCategories()
      toast.success('Categories seeded successfully!')
    } catch (error) {
      console.error('Error seeding categories:', error)
      toast.error('Failed to seed categories. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const handleSeedProducts = async () => {
    setLoading(true)
    try {
      await seedProducts()
      toast.success('Products seeded successfully!')
    } catch (error) {
      console.error('Error seeding products:', error)
      toast.error('Failed to seed products. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  // Only show in development
  if (import.meta.env.PROD) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <h3 className="font-semibold text-gray-900 mb-3">Development Tools</h3>
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleSeedAll}
          loading={loading}
          size="sm"
          className="text-xs"
        >
          Seed All Data
        </Button>
        <Button
          onClick={handleSeedCategories}
          loading={loading}
          size="sm"
          variant="secondary"
          className="text-xs"
        >
          Seed Categories
        </Button>
        <Button
          onClick={handleSeedProducts}
          loading={loading}
          size="sm"
          variant="secondary"
          className="text-xs"
        >
          Seed Products
        </Button>
      </div>
    </div>
  )
}

