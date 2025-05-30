import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section id="apply" className="py-24 bg-primary text-white font-poppins">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bricolage font-bold mb-6 text-accent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Take the First Step Toward Your Global Future
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/80 mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Our team is ready to guide you through every stage of your international journey. Connect with us to explore your options and get started today.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href="https://wa.me/2348131057809"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-md font-bold shadow hover:bg-green-600 transition-all"
            >
              <FaWhatsapp size={22} /> Start a conversation on WhatsApp!
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
