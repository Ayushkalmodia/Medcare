const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const doctors = [
  {
    user: {
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@medicare.com',
      password: 'password123',
      role: 'doctor',
      gender: 'Female',
      phoneNumber: '+1234567890'
    },
    specialization: 'Cardiology',
    qualification: 'MD, FACC',
    experience: 15,
    consultationFee: 150,
    schedule: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '17:00', available: true },
      saturday: { start: '09:00', end: '13:00', available: true },
      sunday: { start: '09:00', end: '13:00', available: false }
    }
  },
  {
    user: {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@medicare.com',
      password: 'password123',
      role: 'doctor',
      gender: 'Male',
      phoneNumber: '+1234567891'
    },
    specialization: 'Neurology',
    qualification: 'MD, PhD',
    experience: 12,
    consultationFee: 175,
    schedule: {
      monday: { start: '10:00', end: '18:00', available: true },
      tuesday: { start: '10:00', end: '18:00', available: true },
      wednesday: { start: '10:00', end: '18:00', available: true },
      thursday: { start: '10:00', end: '18:00', available: true },
      friday: { start: '10:00', end: '18:00', available: true },
      saturday: { start: '10:00', end: '14:00', available: false },
      sunday: { start: '10:00', end: '14:00', available: false }
    }
  },
  {
    user: {
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@medicare.com',
      password: 'password123',
      role: 'doctor',
      gender: 'Female',
      phoneNumber: '+1234567892'
    },
    specialization: 'Pediatrics',
    qualification: 'MD, FAAP',
    experience: 10,
    consultationFee: 125,
    schedule: {
      monday: { start: '08:00', end: '16:00', available: true },
      tuesday: { start: '08:00', end: '16:00', available: true },
      wednesday: { start: '08:00', end: '16:00', available: true },
      thursday: { start: '08:00', end: '16:00', available: true },
      friday: { start: '08:00', end: '16:00', available: true },
      saturday: { start: '08:00', end: '12:00', available: true },
      sunday: { start: '08:00', end: '12:00', available: false }
    }
  }
];

const seedDoctors = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/medicare', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing doctors and their associated users
    await Doctor.deleteMany({});
    await User.deleteMany({ role: 'doctor' });

    // Create doctors
    for (const doctorData of doctors) {
      // Create user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(doctorData.user.password, salt);
      
      const user = await User.create({
        ...doctorData.user,
        password: hashedPassword
      });

      // Create doctor profile
      await Doctor.create({
        user: user._id,
        specialization: doctorData.specialization,
        qualification: doctorData.qualification,
        experience: doctorData.experience,
        consultationFee: doctorData.consultationFee,
        schedule: doctorData.schedule
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