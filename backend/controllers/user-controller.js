const User = require('../models/User')
const Plan = require('../models/Plan')
const Wallet = require('../models/Wallet')
const ErrorResponse = require('../utills/errorResponse')
const asyncHandler = require('express-async-handler')
const sendEmail = require('../utills/sendEmail')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.getSignedJwtToken(),
    })
  } else {
    return next(new ErrorResponse('Invalid credentials', 401))
  }
})

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return next(new ErrorResponse('Email already exists', 400))
  }

  const starterPlan = await Plan.find({ name: 'starter' })
  const plan = starterPlan[0]._id

  const user = await User.create({
    name,
    email,
    password,
    role,
    plan,
  })

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.getSignedJwtToken(),
    })
  } else {
    return next(new ErrorResponse('Invalid user data', 400))
  }
})

// @desc    Forgot password
// @route   POST /api/users/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(
      new ErrorResponse('There is no user with this email address!', 404)
    )
  }
  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetpassword/${resetToken}`

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password.`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    })

    res
      .status(200)
      .json({ success: true, data: 'Email sent with default password' })
  } catch (err) {
    console.log(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    return next(new ErrorResponse('Email could not be sent', 500))
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('plan', 'name')

  if (user) {
    res.json(user)
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: updatedUser.getSignedJwtToken(),
    })
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// @desc    Delete user account
// @route   DELETE /api/v1/users
// @access  Private
exports.deleteUserAccount = asyncHandler(async (req, res) => {
  await Promise.all([
    Wallet.deleteMany({ user: req.user.id }),
    User.findOneAndRemove({ _id: req.user.id }),
  ])
  res.json({ msg: 'User account deleted' })
})

// @desc    Get all users
// @route   Get /api/v1/users
// @access  Private/admin
exports.getUsers = asyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1

  const count = await User.countDocuments({})
  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ users, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private/admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// @desc    Get user by ID
// @route   Get /api/users/:id
// @access  Private/admin
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})

// @desc    Update user
// @route   Get /api/users/:id
// @access  Private/admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    return next(new ErrorResponse('User not found', 404))
  }
})
