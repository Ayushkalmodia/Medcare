// server/routes/appointmentRoutes.js
const express = require('express');
const { 
  getAppointments, 
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getMyAppointments,
  rescheduleAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Patient routes
router.get('/my-appointments', getMyAppointments);
router.post('/', createAppointment);
router.put('/:id/reschedule', rescheduleAppointment);
router.delete('/:id', deleteAppointment);

// Doctor routes
router.use(authorize('doctor', 'admin'));
router.get('/', getAppointments);
router.get('/:id', getAppointment);
router.put('/:id', updateAppointment);

module.exports = router;