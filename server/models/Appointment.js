// server/models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add an appointment date']
  },
  time: {
    type: String,
    required: [true, 'Please add an appointment time']
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'cancelled', 'completed', 'rescheduled'],
    default: 'scheduled'
  },
  appointmentType: {
    type: String,
    enum: ['in-person', 'video'],
    required: [true, 'Please specify appointment type']
  },
  reason: {
    type: String,
    required: [true, 'Please add a reason for the appointment']
  },
  notes: {
    type: String
  },
  symptoms: [String],
  diagnosis: String,
  prescription: String,
  followUpDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Prevent booking appointments in the past
AppointmentSchema.pre('save', function(next) {
  const appointmentDate = new Date(this.date);
  const now = new Date();
  
  if (appointmentDate < now) {
    next(new Error('Cannot book appointments in the past'));
  }
  next();
});

// Prevent double booking
AppointmentSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);