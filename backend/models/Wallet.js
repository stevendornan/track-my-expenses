const mongoose = require('mongoose')

mongoose.Schema.Types.String.set('trim', true)

const transactionSchema = mongoose.Schema(
  {
    note: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const WalletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please enter a name'],
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Wallet', WalletSchema)
