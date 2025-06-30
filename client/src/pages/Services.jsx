import React from 'react';
import { FaCalendarCheck, FaUserMd, FaHospital, FaFileMedical } from 'react-icons/fa';

const services = [
  {
    icon: <FaCalendarCheck className="text-blue-600 text-xl" />,
    title: 'Appointment Booking',
    description: 'Easily schedule appointments with your preferred doctors using our online platform.',
  },
  {
    icon: <FaUserMd className="text-blue-600 text-xl" />,
    title: 'Expert Doctors',
    description: 'Consult with experienced and top-rated specialists across a variety of medical fields.',
  },
  {
    icon: <FaHospital className="text-blue-600 text-xl" />,
    title: 'Modern Facilities',
    description: 'Get treated in our state-of-the-art clinics and diagnostic centers equipped with the latest technology.',
  },
  {
    icon: <FaFileMedical className="text-blue-600 text-xl" />,
    title: 'Digital Records',
    description: 'Secure access to your health data, prescriptions, and reports—anytime, anywhere.',
  },
];

const Services = () => {
  return (
    <div className="font-sans">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Our Services</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive healthcare solutions designed to meet your needs in a secure, convenient, and patient-first environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
