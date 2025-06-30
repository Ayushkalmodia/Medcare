// src/components/Home/FeaturedServices.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaUserMd, FaHospital, FaFileMedical } from 'react-icons/fa';

const FeaturedServices = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaCalendarCheck className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Appointment Booking</h3>
            <p className="text-gray-600">Schedule appointments with your preferred doctors online.</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaUserMd className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
            <p className="text-gray-600">Consult with top specialists in every medical field.</p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaHospital className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Modern Facilities</h3>
            <p className="text-gray-600">Access to state-of-the-art medical equipment and facilities.</p>
          </div>
          
          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaFileMedical className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Digital Records</h3>
            <p className="text-gray-600">Access your medical history and reports anytime, anywhere.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;