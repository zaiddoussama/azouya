import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { HeroSlider } from '@/components/home/HeroSlider'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { USPSection } from '@/components/home/USPSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { GallerySection } from '@/components/home/GallerySection'

export function HomePage() {
  const { initialize, initialized } = useAuthStore()

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialized, initialize])

  return (
    <div className="min-h-screen">
      <HeroSlider />
      <FeaturedProducts />
      <USPSection />
      <TestimonialsSection />
      <GallerySection />
    </div>
  )
}
