const express = require('express');
const {
  getMedicalRecords,
  getMedicalRecord,
  uploadMedicalRecord,
  downloadMedicalRecord,
  deleteMedicalRecord,
  getMyRecords
} = require('../controllers/medicalRecordController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/fileUpload');

const router = express.Router();

// All routes are protected
router.use(protect);

// Patient routes
router.get('/my-records', getMyRecords);
router.get('/', getMedicalRecords);
router.post('/upload', upload.single('file'), uploadMedicalRecord);
router.get('/:id/download', downloadMedicalRecord);
router.delete('/:id', deleteMedicalRecord);

module.exports = router; 