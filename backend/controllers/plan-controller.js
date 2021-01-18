const Plan = require('../models/Plan')
const ErrorResponse = require('../utills/errorResponse')
const asyncHandler = require('express-async-handler')

// @desc    Add plan
// @route   POST /api/plans
// @access  Private
exports.addPlan = asyncHandler(async (req, res, next) => {
  const plan = await Plan.create(req.body)

  return res.status(201).json({
    success: true,
    data: plan,
  })
})

// @desc    Get plans
// @route   GET /api/plans
// @access  Private
exports.getPlans = asyncHandler(async (req, res, next) => {
  const plans = await Plan.find({})
  return res.status(201).json(plans)
})
