const Wallet = require('../models/Wallet')
const User = require('../models/User')
const ErrorResponse = require('../utills/errorResponse')
const asyncHandler = require('express-async-handler')

// @desc    Get users wallets
// @route   GET /api/wallets/mywallets
// @access  Private
exports.getMyWallets = asyncHandler(async (req, res, next) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1
  const count = await Wallet.countDocuments()
  const wallets = await Wallet.find({ user: req.user.id })
    .populate('user', 'name email')
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  return res.json({ wallets, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single wallet
// @route   GET /api/wallets/:id
// @access  Private
exports.getWalletById = asyncHandler(async (req, res) => {
  const wallet = await Wallet.findById(req.params.id)

  if (wallet) {
    res.json(wallet)
  } else {
    return next(new ErrorResponse('Wallet not found', 404))
  }
})

// @desc    Add wallet
// @route   POST /api/wallets
// @access  Private
exports.addWallet = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id

  const wallets = await Wallet.find({ user: req.user.id })
  const user = await User.findOne({ _id: req.user.id }).populate('plan', 'name')

  if (wallets.length === 1 && user.plan.name === 'starter') {
    throw new Error('Go Premium and get unlimited access to everything')
  }

  const wallet = await Wallet.create(req.body)

  return res.status(201).json({
    success: true,
    data: wallet,
  })
})

// @desc    Update wallet
// @route   PUT /api/wallets:/id
// @access  Private
exports.updateWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id)
  if (wallet) {
    wallet.name = req.body.name || wallet.name
    wallet.balance = req.body.balance || wallet.balance

    const updatedWallet = await wallet.save()
    return res.status(200).json({
      _id: updatedWallet._id,
      name: updatedWallet.name,
      balance: updatedWallet.balance,
    })
  } else {
    return next(new ErrorResponse('Wallet not found', 404))
  }
})

// @desc    Delete wallet
// @route   GET /api/wallets:/id
// @access  Private
exports.deleteWallet = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id)
  if (!wallet) {
    return next(new ErrorResponse('Wallet not found', 404))
  }
  await wallet.remove()
  return res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc    Create new transaction
// @route   POST /api/wallets/:id/transactions
// @access  Private
exports.createWalletTransaction = asyncHandler(async (req, res) => {
  const { note, category, amount } = req.body

  const wallet = await Wallet.findById(req.params.id)

  const user = await User.findOne({ _id: req.user.id }).populate('plan', 'name')

  if (wallet.transactions.length === 2 && user.plan.name === 'starter') {
    throw new Error('Go Premium and get unlimited access to everything')
  }

  if (wallet) {
    const transaction = {
      note,
      category,
      amount: Number(amount),
      user: req.user._id,
    }

    wallet.transactions.push(transaction)

    await wallet.save()
    res.status(201).json({ message: 'Transaction created' })
  } else {
    return next(new ErrorResponse('Wallet not found', 404))
  }
})

// @desc    get wallet transactions
// @route   GET /api/wallets/:id/transactions
// @access  Private
exports.getWalletTransactions = asyncHandler(async (req, res, next) => {
  const wallet = await Wallet.findById(req.params.id)

  if (wallet) {
    if (wallet.transactions.length < 1) {
      return next(new ErrorResponse(`${wallet.name} has no transactions`, 404))
    }

    res.status(200).json(wallet.transactions)
  } else {
    return next(new ErrorResponse('Wallet not found', 404))
  }
})

// @desc    get wallet transaction
// @route   GET /api/wallets/transaction
// @access  Private
exports.getWalletTransaction = asyncHandler(async (req, res, next) => {
  const foundWallet = await Wallet.findOne({ user: req.user.id })

  if (!foundWallet) return next(new ErrorResponse('no wallet found', 404))

  const transIndex = foundWallet.transactions.findIndex(
    (trans) => trans._id.toString() === req.params.id
  )
  const trans = foundWallet.transactions[transIndex]

  if (trans) {
    res.json(trans)
  } else {
    return next(new ErrorResponse('Transaction not found', 404))
  }
})

// @desc    update wallet transactions
// @route   PUT /api/wallets/transaction
// @access  Private
exports.updateWalletTransactions = asyncHandler(async (req, res, next) => {
  const { amount, category, note } = req.body
  const foundWallet = await Wallet.findOne({ user: req.user.id })

  if (!foundWallet) return next(new ErrorResponse('no wallet found', 404))

  const transIndex = foundWallet.transactions.findIndex(
    (trans) => trans._id.toString() === req.params.id
  )

  const trans = foundWallet.transactions[transIndex]

  if (trans) {
    trans.amount = amount || trans.amount
    trans.category = category || trans.category
    trans.note = note || trans.note
  } else {
    return next(new ErrorResponse('Transaction not found', 404))
  }

  const updatedWallet = await foundWallet.save()
  const updatedTransactions = updatedWallet.transactions

  return res.status(200).json(updatedTransactions)
})

// @desc    delete wallet transactions
// @route   DELETE /api/wallets/transaction/:id
// @access  Private
exports.deleteWalletTransactions = asyncHandler(async (req, res, next) => {
  const foundWallet = await Wallet.findOne({ user: req.user.id })

  const removeIndex = foundWallet.transactions
    .map((item) => item.id)
    .indexOf(req.params.id)

  foundWallet.transactions.splice(removeIndex, 1)

  await foundWallet.save()
  return res.status(200).json(foundWallet)
})
