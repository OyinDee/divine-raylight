import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import logo from '../assets/logo.png';
// Use a simple text logo for now

const LogoSVG = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="24" fill="#01AB6C"/>
    <path d="M24 12L29 28H19L24 12Z" fill="white"/>
    <circle cx="24" cy="33" r="3" fill="white"/>
  </svg>
);

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white pt-16 pb-8 font-poppins">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div>
            <div className="h-12 mb-6 flex items-center gap-3">
              <LogoSVG />
              <span className="text-2xl font-bricolage font-bold text-accent">Divine Raylight</span>
            </div>
            <p className="text-gray-100 mb-6">
              We are on a mission to become Nigeria's foremost travel and destinations manager of choice, exceeding customer expectations with impeccable and personalized services.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-primary p-2 rounded-full hover:bg-white hover:text-accent transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-primary p-2 rounded-full hover:bg-white hover:text-accent transition-colors">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-primary p-2 rounded-full hover:bg-white hover:text-accent transition-colors">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-accent text-primary p-2 rounded-full hover:bg-white hover:text-accent transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-bricolage text-accent">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-100 hover:text-accent transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-100 hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-100 hover:text-accent transition-colors">Services</a></li>
              <li><a href="#testimonials" className="text-gray-100 hover:text-accent transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-100 hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-bricolage text-accent">Our Services</h3>
            <ul className="space-y-3">
              <li><span className="text-gray-100">Study Abroad</span></li>
              <li><span className="text-gray-100">Work Permits</span></li>
              <li><span className="text-gray-100">Visa Processing</span></li>
              <li><span className="text-gray-100">Flight Booking</span></li>
              <li><span className="text-gray-100">Accommodation</span></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 font-bricolage text-accent">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-accent" />
                <span className="text-gray-100">House 32, Road 11, Ikota Villa Estate, Lekki,  Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-accent" />
                <a href="tel:+2348131057809" className="text-gray-100 hover:text-accent transition-colors">+234 123 456 7890</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent" />
                <a href="mailto:info@divineraylight.com" className="text-gray-100 hover:text-accent transition-colors">info@divineraylight.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-accent my-10 opacity-30" />
        
        <div className="text-center text-gray-300 font-poppins">
          <p>
            © {new Date().getFullYear()} <span className="text-accent font-bricolage">Divine Raylight Consultancy</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
