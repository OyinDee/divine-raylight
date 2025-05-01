import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setTestimonials(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // fallback for missing fields
          name: doc.data().author || "Anonymous",
          position: doc.data().position || "",
          text: doc.data().content || "",
          rating: doc.data().rating || 5
        }))
      );
    };
    fetchTestimonials();
  }, []);

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
          navigation={{
            nextEl: '.testimonial-next',
            prevEl: '.testimonial-prev',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          className="testimonial-swiper relative"
        >
          {/* Custom navigation buttons, hidden on small screens */}
          <div className="testimonial-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-accent text-3xl font-bold transition hover:scale-110 cursor-pointer hidden sm:block">
            &lt;
          </div>
          <div className="testimonial-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-accent text-3xl font-bold transition hover:scale-110 cursor-pointer hidden sm:block">
            &gt;
          </div>
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

