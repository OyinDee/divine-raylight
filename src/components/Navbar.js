import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/4.png';
import logo7 from '../assets/1.png'; // <-- Add this import

const Navbar = ({ admin, blog, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!admin) {
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
    }
  }, [admin]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      admin ? 'bg-black shadow-lg' : (isScrolled ? 'bg-black shadow-lg' : 'bg-transparent')
    }`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={blog ? logo7 : logo} alt="Divine Raylight Logo" className="h-10 w-auto" />
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              {admin ? (
                <>
                  <li>
                    <Link to="/" className="text-white hover:text-gray-300 font-medium">Go to Home</Link>
                  </li>
                  {onLogout && (
                    <li>
                      <button
                        onClick={onLogout}
                        className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded transition"
                      >
                        Logout
                      </button>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className="text-white hover:text-gray-300 font-medium">Home</Link>
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
                    <Link to="/blog" className="text-white hover:text-gray-300 font-medium">Blog</Link>
                  </li>
                  <li>
                    <Link to="/#testimonials" className="text-white hover:text-gray-300 font-medium">Testimonials</Link>
                  </li>
                  <li>
                    <a href="#contact" className="text-white hover:text-gray-300 font-medium">Contact</a>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`${blog ? "text-accent" : "text-white"} focus:outline-none`}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className={`md:hidden ${blog ? "bg-accent" : "bg-black"}`}>
          <ul className="px-6 pt-2 pb-4 space-y-2">
            {admin ? (
              <>
                <li>
                  <Link to="/" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Go to Home</Link>
                </li>
                {onLogout && (
                  <li>
                    <button
                      onClick={() => { setIsOpen(false); onLogout(); }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded transition text-left"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Home</Link>
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
                  <Link to="/blog" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Blog</Link>
                </li>
                <li>
                  <Link to="/#testimonials" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Testimonials</Link>
                </li>
                <li>
                  <a href="#contact" className="block text-white hover:text-gray-300 py-2" onClick={() => setIsOpen(false)}>Contact</a>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
