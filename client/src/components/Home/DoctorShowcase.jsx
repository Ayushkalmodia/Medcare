// src/components/Home/DoctorShowcase.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    image: '/api/placeholder/300/300',
    bio: 'Dr. Johnson specializes in cardiovascular health with over 15 years of experience.',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    image: '/api/placeholder/300/300',
    bio: 'Dr. Chen is an expert in neurological disorders and treatments.',
  },
  {
    id: 3,
    name: 'Dr. Amara Patel',
    specialty: 'Pediatrics',
    image: '/api/placeholder/300/300',
    bio: 'Dr. Patel provides compassionate care for children of all ages.',
  },
];

const DoctorShowcase = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Top Specialists
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our team of experienced doctors is dedicated to providing the highest quality care.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <p className="mt-2 text-gray-600">{doctor.bio}</p>
                <div className="mt-4">
                  <Link to={`/doctors/${doctor.id}`}>
                    <Button variant="outline">View Profile</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/doctors">
            <Button variant="primary">View All Doctors</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorShowcase;