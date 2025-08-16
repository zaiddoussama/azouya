import { useState } from 'react'
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'

interface GalleryItem {
  id: string
  image: string
  caption: string
  likes: number
  comments: number
  hashtags: string[]
  link?: string
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Sparkle like you mean it ✨ Our diamond collection brings out your inner radiance.',
    likes: 1247,
    comments: 89,
    hashtags: ['#AzouyaJewelry', '#DiamondRing', '#LuxuryJewelry', '#Handcrafted'],
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Pearls of wisdom: Sometimes the most beautiful things come from the depths of the ocean 🌊',
    likes: 892,
    comments: 67,
    hashtags: ['#PearlNecklace', '#OceanInspired', '#Timeless', '#Elegant'],
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Golden hour calls for golden accessories ☀️ These earrings are pure sunshine.',
    likes: 1456,
    comments: 134,
    hashtags: ['#GoldEarrings', '#GoldenHour', '#Sunshine', '#DailyGlam'],
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Delicate details make the biggest impact 💫 Our silver collection is all about subtle elegance.',
    likes: 743,
    comments: 45,
    hashtags: ['#SilverBracelet', '#DelicateJewelry', '#MinimalistStyle', '#EverydayLux'],
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Love stories deserve to be celebrated with the perfect ring 💍 #SaidYes',
    likes: 2341,
    comments: 278,
    hashtags: ['#EngagementRing', '#SaidYes', '#LoveStory', '#BridalJewelry'],
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Behind the scenes: Our master craftsmen bringing dreams to life, one piece at a time 🔨',
    likes: 567,
    comments: 23,
    hashtags: ['#Handcrafted', '#BehindTheScenes', '#Artisan', '#MadeWithLove'],
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1588444650700-6c5c7e4b6e5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Stack them up! Mix and match our rings for a look that\'s uniquely you 💎',
    likes: 1089,
    comments: 156,
    hashtags: ['#StackableRings', '#MixAndMatch', '#PersonalStyle', '#RingStack'],
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    caption: 'Every gemstone tells a story. What\'s yours? 🌟 Explore our colored gemstone collection.',
    likes: 934,
    comments: 78,
    hashtags: ['#Gemstones', '#ColoredStones', '#YourStory', '#UniqueDesign'],
  },
]

export function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-primary-600" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                @AzouyaJewelry
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Follow us on Instagram for daily inspiration, behind-the-scenes content, and styling tips. 
              Tag us in your photos for a chance to be featured!
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="flex items-center space-x-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{item.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">{item.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Instagram Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>

          {/* Follow Button */}
          <div className="text-center mt-12">
            <a
              href="https://instagram.com/azouya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              Follow @AzouyaJewelry
            </a>
          </div>
        </div>
      </section>

      {/* Modal for detailed view */}
      <Modal
        isOpen={!!selectedItem}
        onClose={closeModal}
        size="lg"
      >
        {selectedItem && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src={selectedItem.image}
                alt="Instagram post"
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">@AzouyaJewelry</h3>
                  <p className="text-sm text-gray-500">Luxury Jewelry</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {selectedItem.caption}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedItem.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between py-4 border-t border-gray-200">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-6 h-6 text-red-500" />
                    <span className="font-medium">{selectedItem.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-6 h-6 text-gray-600" />
                    <span className="font-medium">{selectedItem.comments}</span>
                  </div>
                </div>
                <a
                  href="https://instagram.com/azouya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  View on Instagram
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

