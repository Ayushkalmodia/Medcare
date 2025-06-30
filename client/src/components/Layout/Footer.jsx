import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">MedCare</h3>
            <p className="text-gray-400">Providing quality healthcare services for over 20 years.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedinIn className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/doctors" className="text-gray-400 hover:text-white">Doctors</Link></li>
              <li><Link to="/departments" className="text-gray-400 hover:text-white">Departments</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Emergency Care</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Outpatient Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Laboratory Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pharmacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Rehabilitation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p className="text-gray-400 mb-2">123 Hospital Street, City Name</p>
            <p className="text-gray-400 mb-2">contact@medcare.com</p>
            <p className="text-gray-400 mb-4">(123) 456-7890</p>
            <h4 className="text-lg font-semibold mb-2">Working Hours</h4>
            <p className="text-gray-400">Monday - Friday: 8:00 AM - 8:00 PM</p>
            <p className="text-gray-400">Weekend: 9:00 AM - 5:00 PM</p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MedCare Hospital Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;