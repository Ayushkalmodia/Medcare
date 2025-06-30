// src/components/Home/CTASection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to prioritize your health?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join thousands of patients who trust us with their healthcare needs. Start your journey to better health today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-medium">
            Create Account
          </Link>
          <Link to="/appointments" className="bg-transparent text-white border border-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Book Appointment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;