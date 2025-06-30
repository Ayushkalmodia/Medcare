import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaUserMd, FaHospital, FaFileMedical, FaSearch } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="font-sans">
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

      {/* Feature Cards */}
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
      
      {/* Departments Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Departments</h2>
            <p className="mt-4 text-xl text-gray-600">Comprehensive healthcare services across all specialties</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Department 1 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1682308449346-0d68b4e3f3fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyZGlvbG9neXxlbnwwfHwwfHx8MA%3D%3D')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cardiology</h3>
                <p className="text-gray-600 mb-4">Expert care for heart and vascular conditions.</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">Learn more →</a>
              </div>
            </div>
            
            {/* Department 2 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Neurology</h3>
                <p className="text-gray-600 mb-4">Specialized care for nervous system disorders.</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">Learn more →</a>
              </div>
            </div>
            
            {/* Department 3 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop')" }}></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Orthopedics</h3>
                <p className="text-gray-600 mb-4">Comprehensive care for bone, joint, and muscle conditions.</p>
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">Learn more →</a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/departments" className="inline-block bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-medium">
              View All Departments
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* CTA Section */}
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

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">123 Healthcare Avenue<br />Medical District, NY 10001</p>
            </div>
            
            {/* Contact */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">Phone: (123) 456-7890<br />Email: info@healthcareclinic.com</p>
            </div>
            
            {/* Hours */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-600">Monday - Friday: 8am - 8pm<br />Saturday: 9am - 5pm<br />Sunday: 10am - 4pm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;