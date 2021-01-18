import React from 'react'
import { useSelector } from 'react-redux'
import { numberWithCommas } from '../../utils/formatMoney'

const Balance = ({ balance }) => {
  const transactionListMy = useSelector((state) => state.transactionListMy)
  const { transactions } = transactionListMy

  const walletBalance = balance ? balance : 0

  const amounts = (transactions ?? []).map((transaction) => transaction.amount)

  const total = amounts
    .reduce((acc, item) => (acc += item), walletBalance)
    .toFixed(2)

  return (
    <>
      <h2>Your Balance: &pound;{numberWithCommas(total)}</h2>
    </>
  )
}

export default Balance
