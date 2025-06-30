const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  recordType: {
    type: String,
    enum: ['lab-result', 'prescription', 'imaging', 'vaccination', 'other'],
    default: 'other'
  },
  category: {
    type: String,
    enum: ['diagnostic', 'treatment', 'medication', 'vaccination', 'imaging', 'lab', 'other'],
    required: true,
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadDate: {
    type: Date,
    default: Date.now
  },
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

// Add text index for search functionality
MedicalRecordSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema); 