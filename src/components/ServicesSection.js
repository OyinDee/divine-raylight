import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaPassport, FaPlane } from 'react-icons/fa';

const services = [
  {
    id: 1,
    icon: <FaGraduationCap className="text-4xl mb-4 text-accent" />,
    title: 'Counseling',
    description: 'We counsel individuals to consider attractive destinations that will match their preferences. We value successful visa applications and would not recommend a destination we are not sure of.'
  },
  {
    id: 2,
    icon: <FaPassport className="text-4xl mb-4 text-accent" />,
    title: 'Visa Processing',
    description: 'We thoroughly vet each visa document before approving an application submission. We process study and tourist visas, and render visa renewal and appeal services for previously refused applicants.'
  },
  {
    id: 3,
    icon: <FaPlane className="text-4xl mb-4 text-accent animate-bounce" />,
    title: 'Bookings & Reservations',
    description: 'We help you get the best flight deals at unbeatable rates. We also render budget-friendly accommodation booking services for clients traveling abroad.'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-gray-100">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bricolage font-bold mb-4 text-primary">Our <span className="text-accent">Services</span></h2>
          <p className="text-gray-700 font-poppins">
            You could be on your way to your favorite destination for Study, Tourism or Business.
            We provide comprehensive assistance for all your migration needs.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card bg-white rounded-xl shadow-lg p-8 text-center animate-on-scroll border-t-4 border-accent"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div>{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-primary font-bricolage">{service.title}</h3>
              <p className="text-gray-600 font-poppins">{service.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12 animate-on-scroll"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a href="#apply" className="btn-animate inline-block bg-accent text-white px-8 py-3 rounded-md font-bold font-poppins shadow hover:bg-primary transition-all">
            Apply Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
