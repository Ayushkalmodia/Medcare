const MedicalRecord = require('../models/MedicalRecord');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs').promises;

// @desc    Get all medical records for current user with filters
// @route   GET /api/v1/medical-records
// @access  Private
exports.getMedicalRecords = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = MedicalRecord.find({ patient: req.user.id });

  // Search functionality
  if (req.query.search) {
    query = query.find({
      $or: [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $regex: req.query.search, $options: 'i' } }
      ]
    });
  }

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await MedicalRecord.countDocuments({ patient: req.user.id });

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const records = await query;

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
    count: records.length,
    pagination,
    data: records
  });
});

// @desc    Get single medical record
// @route   GET /api/v1/medical-records/:id
// @access  Private
exports.getMedicalRecord = asyncHandler(async (req, res, next) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return next(
      new ErrorResponse(`Medical record not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is record owner
  if (record.patient.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this record`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: record
  });
});

// @desc    Upload medical record
// @route   POST /api/v1/medical-records/upload
// @access  Private
exports.uploadMedicalRecord = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new ErrorResponse('Please upload a file', 400));
  }

  // Parse tags if provided
  let tags = [];
  if (req.body.tags) {
    tags = req.body.tags.split(',').map(tag => tag.trim());
  }

  // Create medical record
  const record = await MedicalRecord.create({
    patient: req.user.id,
    title: req.body.title || req.file.originalname,
    description: req.body.description,
    filePath: req.file.path,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
    category: req.body.category || 'other',
    tags: tags
  });

  res.status(201).json({
    success: true,
    data: record
  });
});

// @desc    Download medical record
// @route   GET /api/v1/medical-records/:id/download
// @access  Private
exports.downloadMedicalRecord = asyncHandler(async (req, res, next) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return next(
      new ErrorResponse(`Medical record not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is record owner
  if (record.patient.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to download this record`,
        401
      )
    );
  }

  const filePath = path.join(__dirname, '..', record.filePath);
  
  try {
    await fs.access(filePath);
    res.download(filePath);
  } catch (err) {
    return next(
      new ErrorResponse('File not found', 404)
    );
  }
});

// @desc    Delete medical record
// @route   DELETE /api/v1/medical-records/:id
// @access  Private
exports.deleteMedicalRecord = asyncHandler(async (req, res, next) => {
  const record = await MedicalRecord.findById(req.params.id);

  if (!record) {
    return next(
      new ErrorResponse(`Medical record not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is record owner
  if (record.patient.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this record`,
        401
      )
    );
  }

  // Delete file from filesystem
  try {
    await fs.unlink(path.join(__dirname, '..', record.filePath));
  } catch (err) {
    console.error('Error deleting file:', err);
  }

  await record.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 

// @desc    Get current user's medical records
// @route   GET /api/v1/medical-records/my-records
// @access  Private
exports.getMyRecords = asyncHandler(async (req, res, next) => {
  const records = await MedicalRecord.find({ patient: req.user.id })
    .sort('-createdAt')
    .limit(5);

  res.status(200).json({
    success: true,
    count: records.length,
    data: records
  });
}); 