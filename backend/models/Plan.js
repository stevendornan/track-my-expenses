const mongoose = require('mongoose')

mongoose.Schema.Types.String.set('trim', true)

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['starter', 'premium'],
      default: 'starter',
    },
    price: {
      type: Number,
      enum: [0.0, 3.99],
      default: 0.0,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Plan', planSchema)
