import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane } from 'react-icons/fa';
import backgroundImage from '../assets/tourist-carrying-baggage.jpg';

const planeVariants = {
  initial: { x: '-10vw', y: '10vh', rotate: -10, opacity: 0 },
  animate: {
    x: ['-10vw', '110vw'],
    y: ['10vh', '-10vh'],
    rotate: [0, 15, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      repeatDelay: 2,
      ease: 'easeInOut'
    }
  }
};

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-white overflow-hidden font-bricolage"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-black" style={{opacity: 0.7}}></div>
      
      {/* Animated Plane */}
      <motion.div
        className="absolute z-20"
        style={{ top: '15%', left: 0, fontSize: '3rem', color: '#01AB6C' }}
        variants={planeVariants}
        initial="initial"
        animate="animate"
      >
        <FaPlane />
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-accent opacity-10"
          animate={{ 
            scale: [1, 1.5, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/3 w-48 h-48 rounded-full bg-white opacity-5"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container mx-auto px-6 z-10 flex flex-col items-center justify-center h-full">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-3xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Your Journey,</span><br />
            <span className="text-accent">Our Expertise.</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl mb-10 text-white/80 font-poppins leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            You can travel on your own—but you don't have to do it alone. We remove the stress, keep you informed with what others won't tell you, give you full access to your application process, and guide you through every step with transparency and professionalism.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#services"
              className="btn-animate bg-accent text-white px-8 py-3 rounded-md font-bold text-center border border-accent shadow hover:bg-white hover:text-accent transition-all font-poppins"
              style={{ textShadow: "none" }}
            >
              Get Started
            </a>
            <a
              href="#about"
              className="border-2 border-accent text-accent px-8 py-3 rounded-md font-bold hover:bg-accent hover:text-white transition-all text-center font-poppins"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse-slow"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
