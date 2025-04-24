import React from 'react';
import { motion } from 'framer-motion';

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
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-gray-100 rounded-lg -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1501163109389-abf37ca1276a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Divine Raylight Consultancy Office" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gray-200 rounded-lg -z-10"></div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                About <span className="text-gray-700">Divine Raylight Consultancy</span>
              </h2>
              
              <p className="text-gray-700 mb-6">
                Divine Raylight Consultancy is a leading international education and migration agency with years of professional placement and visa counseling services. We represent and place clients into opportunities around the world mainly in the United Kingdom, United States of America, Canada, Ireland, Australia, and other top destinations.
              </p>
              
              <p className="text-gray-700 mb-6">
                We're on a mission to become Nigeria's foremost travel and destinations manager of choice by striving to be the finest and most competitive service provider, exceeding customer expectations with impeccable and personalized services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="#services" className="btn-animate bg-black text-white px-6 py-3 rounded-md font-medium text-center">
                  Our Services
                </a>
                <a href="#contact" className="border-2 border-black text-black px-6 py-3 rounded-md font-medium hover:bg-black hover:text-white transition-all text-center">
                  Contact Us
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
