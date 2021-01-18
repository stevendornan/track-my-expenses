const express = require('express')

const router = express.Router()
const { addPlan, getPlans } = require('../controllers/plan-controller')
const { protect, authorize } = require('../middleware/auth-middleware')

router
  .route('/')
  .get(protect, getPlans)
  .post(protect, authorize('admin'), addPlan)

module.exports = router
