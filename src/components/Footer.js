import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Information */}
          <div>
            <img src={logo} alt="Divine Raylight Consultancy" className="h-12 mb-6" />
            <p className="text-gray-400 mb-6">
              We are on a mission to become Nigeria's foremost travel and destinations manager of choice, exceeding customer expectations with impeccable and personalized services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Study Abroad</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Work Permits</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Visa Processing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Flight Booking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accommodation</a></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-white" />
                <span className="text-gray-400">123 Example Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-white" />
                <a href="tel:+2341234567890" className="text-gray-400 hover:text-white transition-colors">+234 123 456 7890</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-white" />
                <a href="mailto:info@divineraylight.com" className="text-gray-400 hover:text-white transition-colors">info@divineraylight.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-10" />
        
        <div className="text-center text-gray-500">
          <p>© {new Date().getFullYear()} Divine Raylight Consultancy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
