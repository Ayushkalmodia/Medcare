const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/v1/appointments
// @access  Private/Admin
exports.getAllAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find()
    .populate('user', 'name email')
    .populate('doctor', 'user specialty')
    .populate('doctor.user', 'name email');

  res.status(200).json({
    success: true,
    data: appointments
  });
});

// @desc    Get single appointment
// @route   GET /api/v1/appointments/:id
// @access  Private
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('user', 'name email')
    .populate('doctor', 'user specialty')
    .populate('doctor.user', 'name email');

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is appointment owner or admin
  if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to view this appointment`, 401));
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Get user's appointments
// @route   GET /api/v1/appointments/my-appointments
// @access  Private
exports.getMyAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find({ user: req.user.id })
    .populate('doctor', 'user specialty')
    .populate('doctor.user', 'name email')
    .sort({ date: 1, time: 1 });

  res.status(200).json({
    success: true,
    data: appointments
  });
});

// @desc    Create appointment
// @route   POST /api/v1/appointments
// @access  Private
exports.createAppointment = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

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

  res.status(201).json({
    success: true,
    data: appointment
  });
});

// @desc    Update appointment
// @route   PUT /api/v1/appointments/:id
// @access  Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is appointment owner or admin
  if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this appointment`, 401));
  }

  // If updating date/time, check availability
  if (req.body.date || req.body.time) {
    const existingAppointment = await Appointment.findOne({
      doctor: appointment.doctor,
      date: req.body.date || appointment.date,
      time: req.body.time || appointment.time,
      status: { $ne: 'cancelled' },
      _id: { $ne: appointment._id }
    });

    if (existingAppointment) {
      return next(new ErrorResponse('This time slot is already booked', 400));
    }
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

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
  if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this appointment`, 401));
  }

  await appointment.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Reschedule appointment
// @route   PUT /api/v1/appointments/:id/reschedule
// @access  Private
exports.rescheduleAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is appointment owner or admin
  if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to reschedule this appointment`, 401));
  }

  // Check if the new time slot is available
  const existingAppointment = await Appointment.findOne({
    doctor: appointment.doctor,
    date: req.body.date,
    time: req.body.time,
    status: { $ne: 'cancelled' },
    _id: { $ne: appointment._id }
  });

  if (existingAppointment) {
    return next(new ErrorResponse('This time slot is already booked', 400));
  }

  appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {
      date: req.body.date,
      time: req.body.time,
      status: 'rescheduled'
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: appointment
  });
}); 