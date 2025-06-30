const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorSchedule,
  updateDoctorSchedule,
  getDoctorAvailability,
  getDoctorAppointments,
  getDoctorPatients,
  updateAppointmentStatus,
  addAppointmentNotes,
  getMyPatients
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');
const { doctorValidation } = require('../middleware/validate');

const router = express.Router();

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctor);
router.get('/:id/schedule', getDoctorSchedule);
router.get('/:id/availability', getDoctorAvailability);

// Protected routes
router.use(protect);

// Doctor only routes
router.get('/my-patients', authorize('doctor'), getMyPatients);
router.get('/doctor-appointments', authorize('doctor'), getDoctorAppointments);
router.post('/', authorize('doctor', 'admin'), doctorValidation, createDoctor);
router.get('/me/appointments', authorize('doctor'), getDoctorAppointments);
router.get('/me/patients', authorize('doctor'), getDoctorPatients);
router.put('/appointments/:id/status', authorize('doctor'), updateAppointmentStatus);
router.put('/appointments/:id/notes', authorize('doctor'), addAppointmentNotes);
router.put('/:id/schedule', authorize('doctor'), updateDoctorSchedule);

// Admin only routes
router.use(authorize('admin'));
router.route('/:id')
  .put(doctorValidation, updateDoctor)
  .delete(deleteDoctor);

module.exports = router;
