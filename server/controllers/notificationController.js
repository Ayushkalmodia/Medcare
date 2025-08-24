const asyncHandler = require('../middleware/async');
const Notification = require('../models/Notification');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all notifications for a user
// @route   GET /api/v1/notifications
// @access  Private
exports.getMyNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ user: req.user.id })
    .sort('-createdAt')
    .limit(50);

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

// @desc    Get unread notifications count
// @route   GET /api/v1/notifications/unread-count
// @access  Private
exports.getUnreadCount = asyncHandler(async (req, res, next) => {
  const count = await Notification.countDocuments({ 
    user: req.user.id, 
    read: false 
  });

  res.status(200).json({
    success: true,
    data: { unreadCount: count }
  });
});

// @desc    Mark notification as read
// @route   PUT /api/v1/notifications/:id/read
// @access  Private
exports.markAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorResponse('Notification not found', 404));
  }

  // Make sure user owns the notification
  if (notification.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to access this notification', 401));
  }

  notification.read = true;
  await notification.save();

  res.status(200).json({
    success: true,
    data: notification
  });
});

// @desc    Mark all notifications as read
// @route   PUT /api/v1/notifications/mark-all-read
// @access  Private
exports.markAllAsRead = asyncHandler(async (req, res, next) => {
  await Notification.updateMany(
    { user: req.user.id, read: false },
    { read: true }
  );

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

// @desc    Delete notification
// @route   DELETE /api/v1/notifications/:id
// @access  Private
exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    return next(new ErrorResponse('Notification not found', 404));
  }

  // Make sure user owns the notification
  if (notification.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to delete this notification', 401));
  }

  await notification.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Notification deleted successfully'
  });
});

// @desc    Create notification (utility function for other controllers)
// @access  Private
exports.createNotification = asyncHandler(async (userId, title, message, type = 'system', relatedId = null, relatedModel = null, priority = 'medium') => {
  const notification = await Notification.create({
    user: userId,
    title,
    message,
    type,
    relatedId,
    relatedModel,
    priority
  });

  return notification;
});

// @desc    Create appointment notification
// @access  Private
exports.createAppointmentNotification = asyncHandler(async (userId, appointmentId, action) => {
  let title, message;
  
  switch (action) {
    case 'created':
      title = 'Appointment Booked';
      message = 'Your appointment has been successfully booked.';
      break;
    case 'confirmed':
      title = 'Appointment Confirmed';
      message = 'Your appointment has been confirmed by the doctor.';
      break;
    case 'cancelled':
      title = 'Appointment Cancelled';
      message = 'Your appointment has been cancelled.';
      break;
    case 'rescheduled':
      title = 'Appointment Rescheduled';
      message = 'Your appointment has been rescheduled.';
      break;
    case 'reminder':
      title = 'Appointment Reminder';
      message = 'You have an upcoming appointment tomorrow.';
      break;
    default:
      title = 'Appointment Update';
      message = 'There has been an update to your appointment.';
  }

  return await this.createNotification(userId, title, message, 'appointment', appointmentId, 'Appointment');
});

// @desc    Create medical record notification
// @access  Private
exports.createMedicalRecordNotification = asyncHandler(async (userId, recordId, action) => {
  let title, message;
  
  switch (action) {
    case 'uploaded':
      title = 'Medical Record Uploaded';
      message = 'A new medical record has been uploaded to your account.';
      break;
    case 'updated':
      title = 'Medical Record Updated';
      message = 'Your medical record has been updated.';
      break;
    default:
      title = 'Medical Record Update';
      message = 'There has been an update to your medical records.';
  }

  return await this.createNotification(userId, title, message, 'medical_record', recordId, 'MedicalRecord');
}); 