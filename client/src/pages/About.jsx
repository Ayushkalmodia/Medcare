// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="font-sans">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            About Our Medical Center
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Providing quality healthcare services since 2005.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-500">
                We are dedicated to providing exceptional healthcare services with compassion and 
                expertise. Our mission is to improve the health and wellbeing of the communities 
                we serve through innovative medical practices, education, and research.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
              <p className="mt-4 text-lg text-gray-500">
                To be the leading healthcare provider recognized for excellence in patient care, 
                innovation, and community engagement. We strive to create a healthier future for 
                all through accessible, high-quality healthcare services.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-blue-800">Compassion</h3>
              <p className="mt-2 text-gray-600">
                We treat each patient with kindness, empathy, and respect, understanding that 
                healthcare is not just about treating conditions but caring for people.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-blue-800">Excellence</h3>
              <p className="mt-2 text-gray-600">
                We are committed to delivering the highest standard of care through continuous 
                learning, improvement, and innovation in all aspects of our services.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-blue-800">Integrity</h3>
              <p className="mt-2 text-gray-600">
                We adhere to the highest ethical standards and are accountable for our actions 
                and decisions, fostering trust with our patients and the community.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Our History</h2>
          <p className="mt-4 text-lg text-gray-500">
            Founded in 2005, our medical center began as a small clinic with just five doctors. 
            Over the years, we have grown into a comprehensive healthcare facility offering a 
            wide range of medical services. Our growth has been driven by our unwavering 
            commitment to patient care and community health.
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Today, with over 50 specialists across various departments, state-of-the-art 
            facilities, and innovative treatment approaches, we continue to lead the way in 
            healthcare excellence in our region.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;