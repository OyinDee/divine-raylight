import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section id="apply" className="py-24 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Your Migration Journey?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            We represent and place clients into opportunities around the world. Let's help you achieve your dream of living, studying, or working abroad.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a 
              href="#contact" 
              className="btn-animate bg-white text-black px-8 py-4 rounded-md font-medium inline-block"
            >
              Apply Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
