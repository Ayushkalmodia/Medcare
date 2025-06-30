const axios = require('axios');

const createDoctorProfile = async () => {
  try {
    // First, login to get the token
    const loginResponse = await axios.post('http://localhost:3001/api/v1/users/login', {
      email: 'doctor@example.com',
      password: 'password123'
    });

    const token = loginResponse.data.token;

    // Create doctor profile
    const doctorData = {
      specialization: 'General Medicine',
      qualification: 'MD, MBBS',
      experience: 10,
      consultationFee: 100,
      schedule: {
        monday: { start: '09:00', end: '17:00', available: true },
        tuesday: { start: '09:00', end: '17:00', available: true },
        wednesday: { start: '09:00', end: '17:00', available: true },
        thursday: { start: '09:00', end: '17:00', available: true },
        friday: { start: '09:00', end: '17:00', available: true },
        saturday: { start: '09:00', end: '13:00', available: true },
        sunday: { start: '09:00', end: '13:00', available: true }
      }
    };

    const response = await axios.post('http://localhost:3001/api/v1/doctors', doctorData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Doctor profile created successfully:', response.data);
  } catch (error) {
    console.error('Error creating doctor profile:', error.response?.data || error.message);
  }
};

createDoctorProfile(); 