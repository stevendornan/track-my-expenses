const express = require('express')

const router = express.Router()
const {
  addWallet,
  getMyWallets,
  getWalletById,
  updateWallet,
  deleteWallet,
  createWalletTransaction,
  getWalletTransactions,
  getWalletTransaction,
  updateWalletTransactions,
  deleteWalletTransactions,
} = require('../controllers/wallet-controller')
const { protect } = require('../middleware/auth-middleware')

router.route('/').post(protect, addWallet)
router
  .route('/:id/transactions')
  .get(protect, getWalletTransactions)
  .post(protect, createWalletTransaction)

router
  .route('/transaction/:id')
  .get(protect, getWalletTransaction)
  .put(protect, updateWalletTransactions)
  .delete(protect, deleteWalletTransactions)
router.route('/mywallets').get(protect, getMyWallets)
router
  .route('/:id')
  .get(protect, getWalletById)
  .put(protect, updateWallet)
  .delete(protect, deleteWallet)

module.exports = router
