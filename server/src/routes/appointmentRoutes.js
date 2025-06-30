const express = require('express');
const {
  getAllAppointments,
  getAppointment,
  getMyAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  rescheduleAppointment
} = require('../controllers/appointmentController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/my-appointments', protect, getMyAppointments);
router.get('/:id', protect, getAppointment);

// Protected routes
router.post('/', protect, createAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);
router.put('/:id/reschedule', protect, rescheduleAppointment);

// Admin routes
router.get('/', protect, authorize('admin'), getAllAppointments);

module.exports = router; 