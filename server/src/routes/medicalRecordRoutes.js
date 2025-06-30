const express = require('express');
const {
  getAllRecords,
  getRecord,
  getMyRecords,
  createRecord,
  updateRecord,
  deleteRecord,
  uploadFile
} = require('../controllers/medicalRecordController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', protect, getAllRecords);
router.get('/my-records', protect, getMyRecords);
router.get('/:id', protect, getRecord);

// Protected routes
router.post('/', protect, createRecord);
router.put('/:id', protect, updateRecord);
router.delete('/:id', protect, deleteRecord);
router.post('/upload', protect, uploadFile);

module.exports = router; 