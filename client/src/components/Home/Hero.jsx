// src/components/Home/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-blue-50 h-[70vh]">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{ 
                backgroundImage: `url("https://images.unsplash.com/photo-1642381072437-ba50ad0a84b7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGhvc3BpdGFsJTIwd2FyZHxlbnwwfHwwfHx8MA%3D%3D")`,
                opacity: 0.4
             }}>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="w-full md:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health Is Our <span className="text-blue-600">Priority</span>
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl">
              Simple, secure access to your healthcare needs. Book appointments, manage medical records, and connect with doctors all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/appointments" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
                Book an Appointment
              </Link>
              <Link to="/doctors" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-medium">
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-8 bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for doctors, departments, or services..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-4 top-4 text-gray-400" />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;