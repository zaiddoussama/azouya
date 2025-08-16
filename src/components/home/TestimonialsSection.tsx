import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Testimonial {
  id: string
  name: string
  location: string
  text: string
  rating: number
  image: string
  product: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, NY',
    text: 'The engagement ring I purchased exceeded all my expectations. The craftsmanship is absolutely stunning, and the customer service was exceptional throughout the entire process.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    product: 'Diamond Engagement Ring',
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    text: 'I bought a necklace for my wife\'s anniversary, and she was absolutely thrilled. The quality is outstanding, and it arrived beautifully packaged. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    product: 'Pearl Anniversary Necklace',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    text: 'The earrings are even more beautiful in person! They\'re perfect for both everyday wear and special occasions. The attention to detail is remarkable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    product: 'Gold Drop Earrings',
  },
  {
    id: '4',
    name: 'David Thompson',
    location: 'Chicago, IL',
    text: 'Excellent experience from start to finish. The custom design process was smooth, and the final piece was exactly what we envisioned. True artistry!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    product: 'Custom Wedding Band',
  },
  {
    id: '5',
    name: 'Lisa Park',
    location: 'Seattle, WA',
    text: 'The bracelet I ordered is absolutely gorgeous. The shipping was fast, and the packaging was so elegant. I\'ll definitely be shopping here again!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    product: 'Silver Charm Bracelet',
  },
]

export function TestimonialsSection() {
  const [, setActiveIndex] = useState(0)

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-gold-500 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-gold-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our satisfied customers have to say about their Azouya experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            navigation={{
              nextEl: '.testimonials-button-next',
              prevEl: '.testimonials-button-prev',
            }}
            pagination={{
              el: '.testimonials-pagination',
              clickable: true,
              bulletClass: 'testimonials-pagination-bullet',
              bulletActiveClass: 'testimonials-pagination-bullet-active',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-primary-300" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">
                    "{testimonial.text}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                      <p className="text-sm text-primary-600 font-medium">
                        {testimonial.product}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="testimonials-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 transition-all duration-200">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="testimonials-button-next absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 transition-all duration-200">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Custom Pagination */}
          <div className="testimonials-pagination flex justify-center mt-8"></div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">10,000+</div>
            <div className="text-sm text-gray-600">Reviews</div>
          </div>
          <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">98%</div>
            <div className="text-sm text-gray-600">Recommend Us</div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 4px;
        }
        .testimonials-pagination-bullet-active {
          background: #ec4899;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  )
}

