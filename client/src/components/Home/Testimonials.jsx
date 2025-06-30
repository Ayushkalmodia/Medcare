// src/components/Home/Testimonials.jsx
import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Patient Testimonials</h2>
          <p className="mt-4 text-xl text-gray-600">What our patients say about their experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Patient" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Sarah Johnson</h4>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"The online appointment system made scheduling my check-up so easy. The doctors were professional and caring. Highly recommend!"</p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Patient" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Michael Chen</h4>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"From reception to treatment, every step was handled with care and professionalism. The digital records system is incredibly convenient."</p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full overflow-hidden">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Patient" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Emily Rodriguez</h4>
                <div className="flex text-yellow-400">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 italic">"The specialists here are world-class. My treatment plan was thoroughly explained, and I felt involved in every decision about my care."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;