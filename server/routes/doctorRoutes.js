const express = require('express');
const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorSchedule,
  updateDoctorSchedule,
  getDoctorAvailability,
  getDoctorAppointments,
  getDoctorPatients,
  updateAppointmentStatus,
  addAppointmentNotes
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');
const { doctorValidation } = require('../middleware/validate');

const router = express.Router();

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.get('/:id/schedule', getDoctorSchedule);
router.get('/:id/availability', getDoctorAvailability);

// Protected routes
router.use(protect);

// Doctor only routes
router.get('/me/appointments', authorize('doctor'), getDoctorAppointments);
router.get('/me/patients', authorize('doctor'), getDoctorPatients);
router.put('/appointments/:id/status', authorize('doctor'), updateAppointmentStatus);
router.put('/appointments/:id/notes', authorize('doctor'), addAppointmentNotes);

// Admin only routes
router.use(authorize('admin'));
router.post('/', doctorValidation, createDoctor);
router.route('/:id')
  .put(doctorValidation, updateDoctor)
  .delete(deleteDoctor);

// Doctor only routes
router.put('/:id/schedule', authorize('doctor'), updateDoctorSchedule);

module.exports = router;
