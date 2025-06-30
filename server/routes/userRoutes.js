const express = require('express');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { userValidation } = require('../middleware/validate');

const router = express.Router();

// Public routes
router.post('/register', userValidation, registerUser);
router.post('/login', loginUser);

// Protected routes
router.use(protect);

// User profile routes
router.get('/me', getCurrentUser);
router.put('/me', userValidation, updateUser);
router.delete('/me', deleteUser);

// Admin only routes
router.use(authorize('admin'));
router.get('/', getAllUsers);
router.route('/:id')
  .get(getUserById)
  .put(userValidation, updateUser)
  .delete(deleteUser);

module.exports = router;
