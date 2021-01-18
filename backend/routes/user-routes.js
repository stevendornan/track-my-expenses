const express = require('express')
const router = express.Router()
const {
  loginUser,
  registerUser,
  forgotPassword,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user-controller')

const { protect, authorize } = require('../middleware/auth-middleware')

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/forgotpassword', forgotPassword)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/')
  .get(protect, authorize('admin'), getUsers)
  .delete(protect, deleteUserAccount)
router
  .route('/:id')
  .delete(protect, authorize('admin'), deleteUser)
  .get(protect, authorize('admin'), getUserById)
  .put(protect, authorize('admin'), updateUser)

module.exports = router
