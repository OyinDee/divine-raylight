import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    position: 'UK Study Visa Recipient 2022',
    text: 'Divine Raylight Consultancy made my migration process stress-free! Since I met all their requirements, my application was processed very fast. I got my decision sooner than expected.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Canada Study Visa Recipient 2022',
    text: 'I want to say a very big thank you for making the dream of traveling for masters possible. Their timely reply and response, always ready to answer numerous questions was impressive.',
    rating: 5
  },
  {
    id: 3,
    name: 'Michael Brown',
    position: 'USA Tourist Visa 2023',
    text: 'Divine Raylight Consultancy is the epitome of excellence, professionalism, and distinct work ethics. They are dedicated to making sure they have satisfied customers with perfect connections.',
    rating: 5
  },
  {
    id: 4,
    name: 'Amanda Lee',
    position: 'Australian Work Visa 2023',
    text: 'Quite glad I went with Divine Raylight Consultancy immigration services. They have the best human relations immigration experts. I will recommend them always to anyone looking to migrate.',
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Client Feedback</h2>
          <p className="text-gray-700">
            Here's what our clients have to say about their experience with Divine Raylight Consultancy.
          </p>
        </motion.div>
        
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-gray-100 p-8 rounded-xl shadow-md">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-black">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.position}</p>
                  </div>
                  <FaQuoteLeft className="text-3xl text-gray-300" />
                </div>
                
                <p className="text-gray-700 mb-6">{testimonial.text}</p>
                
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
