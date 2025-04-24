import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

// You would replace these with actual partner logos
const partners = [
  { id: 1, name: 'Partner 1', logo: 'https://via.placeholder.com/150/ffffff/000000?text=Partner+1' },
  { id: 2, name: 'Partner 2', logo: 'https://via.placeholder.com/150/ffffff/000000?text=Partner+2' },
  { id: 3, name: 'Partner 3', logo: 'https://via.placeholder.com/150/ffffff/000000?text=Partner+3' },
  { id: 4, name: 'Partner 4', logo: 'https://via.placeholder.com/150/ffffff/000000?text=Partner+4' },
  { id: 5, name: 'Partner 5', logo: 'https://via.placeholder.com/150/ffffff/000000?text=Partner+5' },
  { id: 6, name: 'Partner 6', logo: 'https://via.placeholder.com/150/ffffff/000000?text=Partner+6' },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Our Partners</h2>
          <p className="text-gray-700">
            We collaborate with leading institutions around the world to provide you with the best opportunities.
          </p>
        </motion.div>
        
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="flex items-center justify-center h-24">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-16 grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnersSection;
