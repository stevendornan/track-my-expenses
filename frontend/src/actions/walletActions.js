import axios from 'axios'
import {
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_SUCCESS,
  WALLET_CREATE_FAIL,
  WALLET_DETAILS_MY_REQUEST,
  WALLET_DETAILS_MY_SUCCESS,
  WALLET_DETAILS_MY_FAIL,
  WALLET_LIST_MY_REQUEST,
  WALLET_LIST_MY_SUCCESS,
  WALLET_LIST_MY_FAIL,
  WALLET_UPDATE_REQUEST,
  WALLET_UPDATE_SUCCESS,
  WALLET_UPDATE_FAIL,
  WALLET_DELETE_REQUEST,
  WALLET_DELETE_SUCCESS,
  WALLET_DELETE_FAIL,
  WALLET_SELECT_SET_CURRENT,
  WALLET_SET_CURRENT,
  WALLET_CLEAR_CURRENT,
} from '../constants/walletConstants'
import { logout } from './userActions'

export const createWallet = (wallet) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WALLET_CREATE_REQUEST,
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
    const res = await axios.post(`/api/wallets`, wallet, config)

    dispatch({
      type: WALLET_CREATE_SUCCESS,
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
      type: WALLET_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listMyWallets = (pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: WALLET_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/wallets/mywallets?pageNumber=${pageNumber}`,
      config
    )

    dispatch({
      type: WALLET_LIST_MY_SUCCESS,
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
      type: WALLET_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listWalletDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WALLET_DETAILS_MY_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/wallets/${id}`, config)

    dispatch({
      type: WALLET_DETAILS_MY_SUCCESS,
      payload: data,
    })
    dispatch({
      type: WALLET_SELECT_SET_CURRENT,
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
      type: WALLET_DETAILS_MY_FAIL,
      payload: message,
    })
  }
}

export const deleteWallet = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WALLET_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/wallets/${id}`, config)

    dispatch({
      type: WALLET_DELETE_SUCCESS,
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
      type: WALLET_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateWallet = (wallet) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WALLET_UPDATE_REQUEST,
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
      `/api/wallets/${wallet._id}`,
      wallet,
      config
    )

    dispatch({
      type: WALLET_UPDATE_SUCCESS,
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
      type: WALLET_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const setCurrent = (wallet) => (dispatch) => {
  dispatch({ type: WALLET_SET_CURRENT, payload: wallet })
}

export const clearCurrent = () => (dispatch) => {
  dispatch({ type: WALLET_CLEAR_CURRENT })
}
