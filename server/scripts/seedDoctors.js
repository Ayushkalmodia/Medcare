const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
require('dotenv').config();

const doctors = [
  {
    user: {
      name: 'Dr. Sarah Williams',
      email: 'sarah.williams@medicare.com',
      phoneNumber: '+1234567890',
      gender: 'Female',
      role: 'doctor',
      password: 'password123'
    },
    specialization: 'Cardiology',
    qualification: 'MD, FACC',
    experience: 15,
    consultationFee: 150,
    rating: 5,
    schedule: {
      monday: { available: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
      thursday: { available: true, startTime: '09:00', endTime: '17:00' },
      friday: { available: true, startTime: '09:00', endTime: '17:00' },
      saturday: { available: false },
      sunday: { available: false }
    }
  },
  {
    user: {
      name: 'Dr. Michael Chen',
      email: 'michael.chen@medicare.com',
      phoneNumber: '+1234567891',
      gender: 'Male',
      role: 'doctor',
      password: 'password123'
    },
    specialization: 'Neurology',
    qualification: 'MD, PhD',
    experience: 12,
    consultationFee: 175,
    rating: 5,
    schedule: {
      monday: { available: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
      thursday: { available: true, startTime: '09:00', endTime: '17:00' },
      friday: { available: true, startTime: '09:00', endTime: '17:00' },
      saturday: { available: false },
      sunday: { available: false }
    }
  },
  {
    user: {
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@medicare.com',
      phoneNumber: '+1234567892',
      gender: 'Female',
      role: 'doctor',
      password: 'password123'
    },
    specialization: 'Pediatrics',
    qualification: 'MD, FAAP',
    experience: 10,
    consultationFee: 125,
    rating: 5,
    schedule: {
      monday: { available: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
      thursday: { available: true, startTime: '09:00', endTime: '17:00' },
      friday: { available: true, startTime: '09:00', endTime: '17:00' },
      saturday: { available: false },
      sunday: { available: false }
    }
  }
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing doctors and their associated users
    await Doctor.deleteMany({});
    await User.deleteMany({ role: 'doctor' });

    // Create doctors and their associated users
    for (const doctorData of doctors) {
      const { user: userData, ...doctorInfo } = doctorData;
      
      // Create user
      const user = await User.create(userData);
      
      // Create doctor with user reference
      await Doctor.create({
        ...doctorInfo,
        user: user._id
      });
    }

    console.log('Doctors seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding doctors:', error);
    process.exit(1);
  }
};

seedDoctors(); 