// server/controllers/appointmentController.js
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { createAppointmentNotification } = require('./notificationController');

// @desc    Get all appointments
// @route   GET /api/v1/appointments
// @access  Private (Doctor/Admin)
exports.getAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find()
    .populate('patient', 'name email phoneNumber')
    .populate('doctor', 'name email specialization');

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get single appointment
// @route   GET /api/v1/appointments/:id
// @access  Private (Doctor/Admin)
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('patient', 'name email phoneNumber')
    .populate('doctor', 'name email specialization');

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Create new appointment
// @route   POST /api/v1/appointments
// @access  Private
exports.createAppointment = asyncHandler(async (req, res, next) => {
  // Add patient to req.body
  req.body.patient = req.user.id;

  // Check if the time slot is available
  const existingAppointment = await Appointment.findOne({
    doctor: req.body.doctor,
    date: req.body.date,
    time: req.body.time,
    status: { $ne: 'cancelled' }
  });

  if (existingAppointment) {
    return next(new ErrorResponse('This time slot is already booked', 400));
  }

  const appointment = await Appointment.create(req.body);

  // Create notification for the patient
  try {
    await createAppointmentNotification(req.user.id, appointment._id, 'created');
  } catch (error) {
    console.error('Failed to create notification:', error);
  }

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Update appointment
// @route   PUT /api/v1/appointments/:id
// @access  Private (Doctor/Admin)
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  // Check if the time slot is available for rescheduling
  if (req.body.date && req.body.time) {
    const existingAppointment = await Appointment.findOne({
      doctor: appointment.doctor,
      date: req.body.date,
      time: req.body.time,
      status: { $ne: 'cancelled' },
      _id: { $ne: req.params.id }
    });

    if (existingAppointment) {
      return next(new ErrorResponse('This time slot is already booked', 400));
    }
  }

  const oldStatus = appointment.status;
  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // Create notification if status changed
  if (req.body.status && req.body.status !== oldStatus) {
    try {
      await createAppointmentNotification(appointment.patient, appointment._id, req.body.status);
    } catch (error) {
      console.error('Failed to create status change notification:', error);
    }
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Delete appointment
// @route   DELETE /api/v1/appointments/:id
// @access  Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is appointment owner or admin
  if (appointment.patient.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this appointment`, 401));
  }

  await appointment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get my appointments
// @route   GET /api/v1/appointments/my-appointments
// @access  Private
exports.getMyAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find({ patient: req.user.id })
    .populate({
      path: 'doctor',
      select: 'firstName lastName email specialization',
      populate: {
        path: 'user',
        select: 'firstName lastName email'
      }
    })
    .sort('-date -time');

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Reschedule appointment
// @route   PUT /api/v1/appointments/:id/reschedule
// @access  Private
exports.rescheduleAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is appointment owner
  if (appointment.patient.toString() !== req.user.id) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to reschedule this appointment`, 401));
  }

  // Check if the new time slot is available
  const existingAppointment = await Appointment.findOne({
    doctor: appointment.doctor,
    date: req.body.date,
    time: req.body.time,
    status: { $ne: 'cancelled' },
    _id: { $ne: req.params.id }
  });

  if (existingAppointment) {
    return next(new ErrorResponse('This time slot is already booked', 400));
  }

  appointment.date = req.body.date;
  appointment.time = req.body.time;
  appointment.status = 'rescheduled';
  await appointment.save();

  res.status(200).json({
    success: true,
    data: appointment
  });
});