import axios from 'axios'
import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_LIST_MY_REQUEST,
  TRANSACTION_LIST_MY_SUCCESS,
  TRANSACTION_LIST_MY_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_SET_CURRENT,
  TRANSACTION_CLEAR_CURRENT,
} from '../constants/transactionConstants'
import { logout } from './userActions'

export const createTransaction = (walletId, transaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TRANSACTION_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const res = await axios.post(
      `/api/wallets/${walletId}/transactions`,
      transaction,
      config
    )

    dispatch({
      type: TRANSACTION_CREATE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.response
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listMyTransactions = (walletId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/wallets/${walletId}/transactions`,
      config
    )

    dispatch({
      type: TRANSACTION_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.response
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const updateTransaction = (transaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: TRANSACTION_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/wallets/transaction/${transaction._id}`,
      transaction,
      config
    )

    dispatch({
      type: TRANSACTION_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.response
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteTransaction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRANSACTION_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.delete(
      `/api/wallets/transaction/${id}`,
      config
    )

    dispatch({
      type: TRANSACTION_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.response
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload: message,
    })
  }
}

export const setTransactionCurrent = (transaction) => (dispatch) => {
  dispatch({ type: TRANSACTION_SET_CURRENT, payload: transaction })
}

export const clearTransactionCurrent = () => (dispatch) => {
  dispatch({ type: TRANSACTION_CLEAR_CURRENT })
}
