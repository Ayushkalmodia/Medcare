// server/controllers/doctorController.js
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all doctors with advanced filtering
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res, next) => {
  try {
    // Initialize query
    let query = Doctor.find().populate({
      path: 'user',
      select: 'name email gender profileImage'
    });

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit', 'search', 'gender'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Apply filters
    let queryStr = JSON.stringify(reqQuery);
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = query.find(JSON.parse(queryStr));

    // Specialty filter (case-insensitive)
    if (req.query.specialty) {
      query = query.find({ 
        specialization: { $regex: new RegExp(req.query.specialty, 'i') }
      });
    }

    // Rating filter
    if (req.query.rating) {
      query = query.find({ averageRating: { $gte: parseFloat(req.query.rating) } });
    }

    // Available days filter
    if (req.query.availableDay) {
      query = query.find({ 
        availableDays: { $in: [req.query.availableDay] }
      });
    }

    // Gender filter (on User model)
    if (req.query.gender) {
      const users = await User.find({ 
        gender: req.query.gender, 
        role: 'doctor' 
      }).select('_id');
      const userIds = users.map(user => user._id);
      query = query.find({ user: { $in: userIds } });
    }

    // Consultation fee range
    if (req.query.minFee) {
      query = query.find({ consultationFee: { $gte: parseInt(req.query.minFee) } });
    }
    if (req.query.maxFee) {
      query = query.find({ consultationFee: { $lte: parseInt(req.query.maxFee) } });
    }

    // Search functionality (name or specialty)
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      
      // Find users with matching names
      const users = await User.find({ 
        name: { $regex: searchRegex },
        role: 'doctor'
      }).select('_id');
      
      const userIds = users.map(user => user._id);
      
      // Find doctors with matching specialties or matching user IDs
      query = query.find({
        $or: [
          { user: { $in: userIds } },
          { specialization: { $regex: searchRegex } },
          { bio: { $regex: searchRegex } }
        ]
      });
    }

    // Select specific fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort results
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // Default sort by rating (highest first)
      query = query.sort('-averageRating');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Doctor.countDocuments(query.getQuery());

    query = query.skip(startIndex).limit(limit);

    // Get doctors with pagination
    const doctors = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: doctors.length,
      pagination,
      total,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor with availability info
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate({
      path: 'user',
      select: 'name email gender profileImage'
    });

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Get doctor's upcoming appointments for availability checking
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingAppointments = await Appointment.find({
      doctor: doctor._id,
      date: { $gte: today },
      status: { $ne: 'cancelled' }
    }).select('date time');

    // Format result
    const result = {
      ...doctor.toObject(),
      upcomingAppointments: upcomingAppointments.map(apt => ({
        date: apt.date,
        time: apt.time
      }))
    };

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private (admin or doctor)
exports.createDoctor = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Validate the user is a doctor
    const user = await User.findById(req.user.id);
    if (user.role !== 'doctor' && user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only doctors or admins can create doctor profiles'
      });
    }

    // Check if doctor profile already exists for this user
    const existingDoctor = await Doctor.findOne({ user: req.user.id });

    if (existingDoctor) {
      return res.status(400).json({ 
        success: false, 
        message: 'Doctor profile already exists for this user' 
      });
    }

    // Validate available days
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (req.body.availableDays) {
      const invalidDays = req.body.availableDays.filter(day => !validDays.includes(day));
      if (invalidDays.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Invalid day(s): ${invalidDays.join(', ')}. Valid options are: ${validDays.join(', ')}`
        });
      }
    }

    // Create doctor profile
    const doctor = await Doctor.create(req.body);

    // Return the created doctor with populated user data
    const populatedDoctor = await Doctor.findById(doctor._id).populate({
      path: 'user',
      select: 'name email gender profileImage'
    });

    res.status(201).json({
      success: true,
      data: populatedDoctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private (owner doctor or admin)
exports.updateDoctor = async (req, res, next) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Make sure user is doctor owner or admin
    const isOwner = doctor.user.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // Prevent updating the user field
    if (req.body.user) {
      delete req.body.user;
    }

    // Update doctor
    doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate({
      path: 'user',
      select: 'name email gender profileImage'
    });

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add rating to doctor
// @route   POST /api/doctors/:id/ratings
// @access  Private (patients only)
exports.addRating = async (req, res, next) => {
  try {
    const { rating, review } = req.body;
    
    // Check if rating is valid
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false, 
        message: 'Rating must be between 1 and 5' 
      });
    }

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ 
        success: false, 
        message: 'Doctor not found' 
      });
    }

    // Check if user has had an appointment with this doctor
    const hasAppointment = await Appointment.findOne({
      doctor: doctor._id,
      patient: req.user.id,
      status: 'completed'
    });

    if (!hasAppointment && process.env.RATING_REQUIRES_APPOINTMENT === 'true') {
      return res.status(403).json({
        success: false,
        message: 'You can only rate doctors you have had appointments with'
      });
    }

    // Check if user has already rated this doctor
    const alreadyRated = doctor.ratings.find(
      r => r.patient.toString() === req.user.id
    );

    if (alreadyRated) {
      // Update existing rating
      doctor.ratings.forEach(r => {
        if (r.patient.toString() === req.user.id) {
          r.rating = rating;
          r.review = review;
          r.date = Date.now();
        }
      });
    } else {
      // Add new rating
      doctor.ratings.push({
        rating,
        review,
        patient: req.user.id,
      });
    }

    // Calculate average rating
    doctor.averageRating = doctor.getAverageRating();
    doctor.reviews = doctor.ratings.length;

    await doctor.save();

    // Populate the user details for the ratings
    const populatedDoctor = await Doctor.findById(doctor._id)
      .populate({
        path: 'user',
        select: 'name profileImage'
      })
      .populate({
        path: 'ratings.patient',
        select: 'name profileImage'
      });

    res.status(200).json({
      success: true,
      data: populatedDoctor
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get doctor's availability for a specific date
// @route   GET /api/v1/doctors/:id/availability
// @access  Public
exports.getDoctorAvailability = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Parse the date from query parameter
  const dateQuery = new Date(req.query.date);
  if (isNaN(dateQuery.getTime())) {
    return next(
      new ErrorResponse('Invalid date format', 400)
    );
  }

  // Set hours to beginning of day for consistency
  dateQuery.setHours(0, 0, 0, 0);

  // Get doctor's schedule
  const availableDays = doctor.availableDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const availableHours = doctor.availableHours || { start: '09:00', end: '17:00' };

  // Create time slots (30 min intervals)
  const createTimeSlots = (start, end) => {
    const slots = [];
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);

    let current = new Date(startTime);
    while (current < endTime) {
      const timeString = current.toTimeString().slice(0, 5);
      slots.push(timeString);
      current.setMinutes(current.getMinutes() + 30);
    }

    return slots;
  };

  const timeSlots = createTimeSlots(
    availableHours.start,
    availableHours.end
  );

  // Get existing appointments for the date
  const existingAppointments = await Appointment.find({
    doctor: doctor._id,
    date: dateQuery,
    status: { $ne: 'cancelled' }
  }).select('time');

  const bookedTimes = existingAppointments.map(apt => apt.time);

  // Available slots are all slots minus booked ones
  const availableSlots = timeSlots.filter(slot => !bookedTimes.includes(slot));

  res.status(200).json({
    success: true,
    data: {
      date: dateQuery.toISOString().split('T')[0],
      day: dateQuery.toLocaleDateString('en-US', { weekday: 'long' }),
      available: availableDays.includes(dateQuery.toLocaleDateString('en-US', { weekday: 'long' })),
      slots: availableSlots
    }
  });
});

// @desc    Get all doctors
// @route   GET /api/v1/doctors
// @access  Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate({
      path: 'user',
      select: 'name email phoneNumber gender profileImage'
    });

    // Log the doctors data for debugging
    console.log('Doctors from database:', doctors);

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Error in getDoctors:', error);
    next(error);
  }
});

// @desc    Get single doctor
// @route   GET /api/v1/doctors/:id
// @access  Public
exports.getDoctorById = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id).populate({
    path: 'user',
    select: 'name email phoneNumber gender'
  });

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Create new doctor
// @route   POST /api/v1/doctors
// @access  Private/Admin
exports.createDoctor = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const doctor = await Doctor.create(req.body);

  res.status(201).json({
    success: true,
    data: doctor
  });
});

// @desc    Update doctor
// @route   PUT /api/v1/doctors/:id
// @access  Private/Admin
exports.updateDoctor = asyncHandler(async (req, res, next) => {
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: doctor
  });
});

// @desc    Delete doctor
// @route   DELETE /api/v1/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  await doctor.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get doctor schedule
// @route   GET /api/v1/doctors/:id/schedule
// @access  Public
exports.getDoctorSchedule = asyncHandler(async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('schedule');

    if (!doctor) {
      return next(
        new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
      );
    }

    // Format the schedule to include available time slots
    const schedule = doctor.schedule || {};
    const formattedSchedule = {
      monday: { available: schedule.monday?.available || false, slots: generateTimeSlots(schedule.monday) },
      tuesday: { available: schedule.tuesday?.available || false, slots: generateTimeSlots(schedule.tuesday) },
      wednesday: { available: schedule.wednesday?.available || false, slots: generateTimeSlots(schedule.wednesday) },
      thursday: { available: schedule.thursday?.available || false, slots: generateTimeSlots(schedule.thursday) },
      friday: { available: schedule.friday?.available || false, slots: generateTimeSlots(schedule.friday) },
      saturday: { available: schedule.saturday?.available || false, slots: generateTimeSlots(schedule.saturday) },
      sunday: { available: schedule.sunday?.available || false, slots: generateTimeSlots(schedule.sunday) }
    };

    res.status(200).json({
      success: true,
      data: formattedSchedule
    });
  } catch (error) {
    next(error);
  }
});

// Helper function to generate time slots
const generateTimeSlots = (daySchedule) => {
  if (!daySchedule?.available || !daySchedule?.start || !daySchedule?.end) {
    return [];
  }

  const slots = [];
  const start = new Date(`2000-01-01T${daySchedule.start}`);
  const end = new Date(`2000-01-01T${daySchedule.end}`);
  
  let current = new Date(start);
  while (current < end) {
    slots.push(current.toTimeString().slice(0, 5));
    current.setMinutes(current.getMinutes() + 30);
  }
  
  return slots;
};

// @desc    Update doctor schedule
// @route   PUT /api/v1/doctors/:id/schedule
// @access  Private/Doctor
exports.updateDoctorSchedule = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is doctor owner
  if (doctor.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this doctor's schedule`,
        401
      )
    );
  }

  doctor.schedule = req.body;
  await doctor.save();

  res.status(200).json({
    success: true,
    data: doctor.schedule
  });
});

// @desc    Get doctor's appointments
// @route   GET /api/doctors/me/appointments
// @access  Private (doctor only)
exports.getDoctorAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find({ doctor: req.user.id })
    .populate({
      path: 'patient',
      select: 'firstName lastName email gender profileImage'
    })
    .sort({ date: 1, time: 1 });

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Get doctor's patients
// @route   GET /api/doctors/me/patients
// @access  Private (doctor only)
exports.getDoctorPatients = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find({ doctor: req.user.id })
    .populate({
      path: 'patient',
      select: 'firstName lastName email gender profileImage'
    })
    .distinct('patient');

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

// @desc    Update appointment status
// @route   PUT /api/doctors/appointments/:id/status
// @access  Private (doctor only)
exports.updateAppointmentStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
    return next(new ErrorResponse('Invalid status', 400));
  }

  const appointment = await Appointment.findOne({
    _id: req.params.id,
    doctor: req.user.id
  });

  if (!appointment) {
    return next(new ErrorResponse('Appointment not found', 404));
  }

  appointment.status = status;
  await appointment.save();

  res.status(200).json({
    success: true,
    data: appointment
  });
});

// @desc    Add appointment notes (diagnosis, prescription, etc.)
// @route   PUT /api/doctors/appointments/:id/notes
// @access  Private (doctor only)
exports.addAppointmentNotes = asyncHandler(async (req, res, next) => {
  const { diagnosis, prescription, notes, followUpDate } = req.body;

  const appointment = await Appointment.findOne({
    _id: req.params.id,
    doctor: req.user.id
  });

  if (!appointment) {
    return next(new ErrorResponse('Appointment not found', 404));
  }

  if (diagnosis) appointment.diagnosis = diagnosis;
  if (prescription) appointment.prescription = prescription;
  if (notes) appointment.notes = notes;
  if (followUpDate) appointment.followUpDate = followUpDate;

  await appointment.save();

  res.status(200).json({
    success: true,
    data: appointment
  });
});