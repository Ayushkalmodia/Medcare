const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const MedicalRecord = require('../models/MedicalRecord');
const path = require('path');

// @desc    Get all medical records
// @route   GET /api/v1/medical-records
// @access  Private
exports.getAllRecords = asyncHandler(async (req, res, next) => {
  const records = await MedicalRecord.find();
  res.status(200).json({
    success: true,
    data: records
  });
});

// @desc    Get single medical record
// @route   GET /api/v1/medical-records/:id
// @access  Private
exports.getRecord = asyncHandler(async (req, res, next) => {
  const record = await MedicalRecord.findById(req.params.id);
  
  if (!record) {
    return next(new ErrorResponse(`Record not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: record
  });
});

// @desc    Get user's medical records
// @route   GET /api/v1/medical-records/my-records
// @access  Private
exports.getMyRecords = asyncHandler(async (req, res, next) => {
  const records = await MedicalRecord.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    data: records
  });
});

// @desc    Create medical record
// @route   POST /api/v1/medical-records
// @access  Private
exports.createRecord = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const record = await MedicalRecord.create(req.body);
  res.status(201).json({
    success: true,
    data: record
  });
});

// @desc    Update medical record
// @route   PUT /api/v1/medical-records/:id
// @access  Private
exports.updateRecord = asyncHandler(async (req, res, next) => {
  let record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return next(new ErrorResponse(`Record not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is record owner
  if (record.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this record`, 401));
  }

  record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: record
  });
});

// @desc    Delete medical record
// @route   DELETE /api/v1/medical-records/:id
// @access  Private
exports.deleteRecord = asyncHandler(async (req, res, next) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return next(new ErrorResponse(`Record not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is record owner
  if (record.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this record`, 401));
  }

  await record.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload medical record file
// @route   POST /api/v1/medical-records/upload
// @access  Private
exports.uploadFile = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  const file = req.files.file;

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload a file less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  // Create custom filename
  file.name = `medical_record_${req.user.id}_${Date.now()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    const record = await MedicalRecord.create({
      user: req.user.id,
      title: req.body.title || file.name,
      description: req.body.description,
      fileUrl: `${process.env.FILE_UPLOAD_PATH}/${file.name}`
    });

    res.status(200).json({
      success: true,
      data: record
    });
  });
}); 