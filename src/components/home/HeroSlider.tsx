import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  ctaSecondary?: {
    text: string
    link: string
  }
}

const heroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Timeless Elegance',
    subtitle: 'Discover Our Signature Collection',
    description: 'Handcrafted jewelry that tells your unique story. Each piece is designed with passion and precision to celebrate life\'s precious moments.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ctaText: 'Shop Collection',
    ctaLink: '/shop',
    ctaSecondary: {
      text: 'Our Story',
      link: '/about'
    }
  },
  {
    id: '2',
    title: 'Bridal Collection',
    subtitle: 'Make Your Special Day Sparkle',
    description: 'Exquisite engagement rings and wedding bands crafted to symbolize your eternal love. Find the perfect piece for your forever moment.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ctaText: 'View Bridal',
    ctaLink: '/shop?category=bridal',
    ctaSecondary: {
      text: 'Book Consultation',
      link: '/consultation'
    }
  },
  {
    id: '3',
    title: 'Limited Edition',
    subtitle: 'Exclusive Artisan Pieces',
    description: 'Rare and unique designs created in limited quantities. Own a piece of art that reflects your individual style and sophistication.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    ctaText: 'Explore Limited',
    ctaLink: '/shop?category=limited-edition',
    ctaSecondary: {
      text: 'Join Waitlist',
      link: '/waitlist'
    }
  }
]

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation={{
          nextEl: '.hero-button-next',
          prevEl: '.hero-button-prev',
        }}
        pagination={{
          el: '.hero-pagination',
          clickable: true,
          bulletClass: 'hero-pagination-bullet',
          bulletActiveClass: 'hero-pagination-bullet-active',
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="animate-fade-in">
                    <p className="text-lg md:text-xl font-medium mb-4 text-gold-300">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Link
                        to={slide.ctaLink}
                        className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        {slide.ctaText}
                      </Link>
                      {slide.ctaSecondary && (
                        <Link
                          to={slide.ctaSecondary.link}
                          className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                        >
                          {slide.ctaSecondary.text}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button className="hero-button-prev absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="hero-button-next absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 text-white hidden lg:block">
        <div className="flex items-center space-x-2">
          <div className="w-px h-16 bg-white bg-opacity-50"></div>
          <span className="text-sm font-medium rotate-90 origin-left whitespace-nowrap">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white hidden lg:block">
        <span className="text-sm font-medium">
          {String(activeIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </span>
      </div>

      <style>{`
        .hero-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .hero-pagination-bullet-active {
          background: white;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}

