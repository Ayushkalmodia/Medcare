import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaStar, FaCalendarAlt } from 'react-icons/fa';

const Doctors = () => {
  const [filters, setFilters] = useState({
    specialty: '',
    availability: '',
    gender: '',
    rating: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Williams',
      specialty: 'Cardiology',
      rating: 4.9,
      reviews: 124,
      experience: '15 years',
      availability: 'Mon, Wed, Fri',
      education: 'Harvard Medical School',
      gender: 'Female',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      rating: 4.8,
      reviews: 98,
      experience: '12 years',
      availability: 'Tue, Thu, Sat',
      education: 'Johns Hopkins University',
      gender: 'Male',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      rating: 4.9,
      reviews: 156,
      experience: '10 years',
      availability: 'Mon, Tue, Thu',
      education: 'Stanford University',
      gender: 'Female',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      rating: 4.7,
      reviews: 87,
      experience: '14 years',
      availability: 'Wed, Fri, Sat',
      education: 'Yale University',
      gender: 'Male',
      image: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
    {
      id: 5,
      name: 'Dr. Sophia Patel',
      specialty: 'Dermatology',
      rating: 4.8,
      reviews: 112,
      experience: '9 years',
      availability: 'Mon, Thu, Fri',
      education: 'University of California',
      gender: 'Female',
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: 6,
      name: 'Dr. Robert Johnson',
      specialty: 'Oncology',
      rating: 4.9,
      reviews: 135,
      experience: '18 years',
      availability: 'Tue, Wed, Sat',
      education: 'Columbia University',
      gender: 'Male',
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ];

  // Filter doctors based on selected filters and search term
  const filteredDoctors = doctors.filter(doctor => {
    return (
      (filters.specialty === '' || doctor.specialty === filters.specialty) &&
      (filters.gender === '' || doctor.gender === filters.gender) &&
      (filters.rating === '' || doctor.rating >= parseFloat(filters.rating)) &&
      (searchTerm === '' || 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Available specialties for the filter
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      

      {/* Hero Section */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Find the Right Doctor for You</h1>
          <p className="text-blue-100 text-xl max-w-3xl mx-auto">
            Browse our network of top healthcare professionals and book appointments with specialists who meet your needs.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Search Bar */}
            <div className="flex-grow w-full lg:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by doctor name or specialty..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FaSearch className="absolute left-4 top-4 text-gray-400" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              {/* Specialty Filter */}
              <div className="w-full sm:w-auto">
                <select
                  name="specialty"
                  value={filters.specialty}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="w-full sm:w-auto">
                <select
                  name="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="w-full sm:w-auto">
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5 & Above</option>
                  <option value="4.0">4.0 & Above</option>
                  <option value="3.5">3.5 & Above</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Listing */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {filteredDoctors.length} Doctors Available
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600">{doctor.specialty}</p>
                      
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          <FaStar />
                        </div>
                        <span className="text-gray-700 ml-1">{doctor.rating}</span>
                        <span className="text-gray-500 ml-1">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div className="text-gray-500">Experience:</div>
                      <div className="text-gray-900">{doctor.experience}</div>
                      
                      <div className="text-gray-500">Education:</div>
                      <div className="text-gray-900">{doctor.education}</div>
                      
                      <div className="text-gray-500">Availability:</div>
                      <div className="text-gray-900">{doctor.availability}</div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/doctors/${doctor.id}`}
                      className="flex-1 text-center bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 font-medium"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/book-appointment`}
                      className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center"
                    >
                      <FaCalendarAlt className="mr-2" /> Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No doctors match your search criteria. Please try different filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need help finding the right specialist?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our healthcare assistants can help match you with the best doctor for your needs.
          </p>
          <div className="inline-flex">
            <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
              Contact Support
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Doctors;