import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const LogoSVG = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#01AB6C"/>
    <path d="M24 12L29 28H19L24 12Z" fill="white"/>
    <circle cx="24" cy="33" r="3" fill="white"/>
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoSVG />
            <span className="text-lg font-bricolage font-bold text-white hidden sm:inline">Divine Raylight</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a href="#home" className="text-white hover:text-gray-300 font-medium">Home</a>
              </li>
              <li>
                <a href="#about" className="text-white hover:text-gray-300 font-medium">About</a>
              </li>
              <li>
                <a href="#services" className="text-white hover:text-gray-300 font-medium">Services</a>
              </li>
              <li>
                <a href="#destinations" className="text-white hover:text-gray-300 font-medium">Destinations</a>
              </li>
              <li>
                <a href="#testimonials" className="text-white hover:text-gray-300 font-medium">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="text-white hover:text-gray-300 font-medium">Contact</a>
              </li>
            </ul>
          </nav>
          
          <div className="hidden md:block">
            <a href="#apply" className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-all">
              Apply Online
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black">
          <ul className="px-6 pt-2 pb-4 space-y-2">
            <li>
              <a href="#home" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Home</a>
            </li>
            <li>
              <a href="#about" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>About</a>
            </li>
            <li>
              <a href="#services" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Services</a>
            </li>
            <li>
              <a href="#destinations" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Destinations</a>
            </li>
            <li>
              <a href="#testimonials" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Testimonials</a>
            </li>
            <li>
              <a href="#contact" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Contact</a>
            </li>
            <li className="pt-2">
              <a href="#apply" className="block w-full text-center bg-white text-black px-4 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>
                Apply Online
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
