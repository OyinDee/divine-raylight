import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../assets/tourist-carrying-luggage.jpg'
// import backgroundImage from '../assets/tourist-carrying-luggage.jpg';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div 
              className="relative animate-on-scroll"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Plane image with accent border and shadow */}
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-accent rounded-lg -z-10 opacity-20"></div>
              <img
                src={aboutImage}
          
                alt="Airplane flying over clouds"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-primary rounded-lg -z-10 opacity-10"></div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div 
              className="animate-on-scroll"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bricolage font-bold mb-4 text-primary">
                About <span className="text-accent">Divine Raylight Consultancy</span>
              </h2>
              
              <p className="text-gray-700 mb-6 font-poppins">
                Divine Raylight Consultancy is dedicated to empowering individuals to achieve their dreams abroad. With 9 years of excellence and expertise, we provide honest advice, practical solutions, and ongoing support for your international ambitions.
              </p>
              
              <p className="text-gray-700 mb-6 font-poppins">
                Our vision is to be the most trusted partner for global mobility, specializing in Canada, UK, USA, Ireland, Malta, Australia, New Zealand, and other European destinations. We offer innovative services that open doors to education, careers, and new experiences worldwide.
              </p>
              
              <p className="text-gray-700 mb-6 font-poppins">
                At Divine Raylight Consultancy, we believe in doing things differently. We remove the complications and stress from your travel journey. You don't need anyone to travel, but you also don't need the hassle—let us handle it for you.
              </p>
              
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="#services" className="btn-animate bg-accent text-white px-6 py-3 rounded-md font-bold text-center shadow hover:bg-primary transition-all font-poppins">
                  See Our Services
                </a>
                <a href="#contact" className="border-2 border-accent text-accent px-6 py-3 rounded-md font-bold hover:bg-accent hover:text-white transition-all text-center font-poppins">
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
