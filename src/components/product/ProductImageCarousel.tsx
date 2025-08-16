import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, Zoom } from 'swiper/modules'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/zoom'

interface ProductImageCarouselProps {
  images: string[]
  productName: string
}

export function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  // Ensure we have at least one image
  const productImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ]

  return (
    <div className="space-y-4">
      {/* Main Image Carousel */}
      <div className="relative group">
        <Swiper
          modules={[Navigation, Pagination, Thumbs, Zoom]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.product-carousel-next',
            prevEl: '.product-carousel-prev',
          }}
          pagination={{
            el: '.product-carousel-pagination',
            clickable: true,
            bulletClass: 'product-carousel-bullet',
            bulletActiveClass: 'product-carousel-bullet-active',
          }}
          thumbs={{ swiper: thumbsSwiper }}
          zoom={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
        >
          {productImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement
                    img.classList.add('loaded')
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        {productImages.length > 1 && (
          <>
            <button className="product-carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button className="product-carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Zoom Toggle */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
          title={isZoomed ? 'Zoom Out' : 'Zoom In'}
        >
          {isZoomed ? (
            <ZoomOut className="w-5 h-5 text-gray-700" />
          ) : (
            <ZoomIn className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Image Counter */}
        {productImages.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {activeIndex + 1} / {productImages.length}
          </div>
        )}

        {/* Pagination Dots */}
        {productImages.length > 1 && (
          <div className="product-carousel-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"></div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {productImages.length > 1 && (
        <div className="w-full">
          <Swiper
            modules={[Navigation, Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            breakpoints={{
              640: {
                slidesPerView: 5,
              },
              768: {
                slidesPerView: 6,
              },
            }}
            freeMode={true}
            watchSlidesProgress={true}
            className="product-thumbs"
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                    index === activeIndex
                      ? 'border-primary-600 ring-2 ring-primary-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${productName} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <style>{`
        .product-carousel-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 4px;
        }
        .product-carousel-bullet-active {
          background: white;
          transform: scale(1.2);
        }
        .swiper-slide img.loaded {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
