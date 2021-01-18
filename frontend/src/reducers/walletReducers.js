import {
  WALLET_CREATE_REQUEST,
  WALLET_CREATE_SUCCESS,
  WALLET_CREATE_FAIL,
  WALLET_CREATE_RESET,
  WALLET_DETAILS_MY_REQUEST,
  WALLET_DETAILS_MY_SUCCESS,
  WALLET_DETAILS_MY_FAIL,
  WALLET_LIST_MY_REQUEST,
  WALLET_LIST_MY_SUCCESS,
  WALLET_LIST_MY_FAIL,
  WALLET_LIST_MY_RESET,
  WALLET_DELETE_REQUEST,
  WALLET_DELETE_SUCCESS,
  WALLET_DELETE_FAIL,
  WALLET_DELETE_RESET,
  WALLET_UPDATE_REQUEST,
  WALLET_UPDATE_SUCCESS,
  WALLET_UPDATE_FAIL,
  WALLET_UPDATE_RESET,
  WALLET_SET_CURRENT,
  WALLET_CLEAR_CURRENT,
  WALLET_SELECT_SET_CURRENT,
  WALLET_SELECT_CLEAR_CURRENT,
} from '../constants/walletConstants'

export const walletCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_CREATE_REQUEST:
      return {
        loading: true,
      }
    case WALLET_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        wallet: action.payload,
      }
    case WALLET_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case WALLET_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const walletDetailsReducer = (state = { wallet: {} }, action) => {
  switch (action.type) {
    case WALLET_DETAILS_MY_REQUEST:
      return { ...state, loading: true }
    case WALLET_DETAILS_MY_SUCCESS:
      return { loading: false, wallet: action.payload }
    case WALLET_DETAILS_MY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const walletListMyReducer = (state = { wallets: [] }, action) => {
  switch (action.type) {
    case WALLET_LIST_MY_REQUEST:
      return {
        loading: true,
        wallets: [],
      }
    case WALLET_LIST_MY_SUCCESS:
      return {
        loading: false,
        success: true,
        wallets: action.payload.wallets,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case WALLET_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case WALLET_LIST_MY_RESET:
      return { wallets: [] }
    default:
      return state
  }
}

export const walletDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WALLET_DELETE_REQUEST:
      return {
        loading: true,
      }
    case WALLET_DELETE_SUCCESS:
      return { loading: false, success: true }
    case WALLET_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case WALLET_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const walletUpdateReducer = (state = { wallet: {} }, action) => {
  switch (action.type) {
    case WALLET_UPDATE_REQUEST:
      return { loading: true }
    case WALLET_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case WALLET_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case WALLET_UPDATE_RESET:
      return {
        wallet: {},
      }
    default:
      return state
  }
}

export const walletSetCurrentReducer = (
  state = { wallets: {}, current: null, error: null },
  action
) => {
  switch (action.type) {
    case WALLET_SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case WALLET_CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }
    default:
      return state
  }
}

export const walletSelectSetCurrentReducer = (
  state = { wallets: {}, current: null, error: null },
  action
) => {
  switch (action.type) {
    case WALLET_SELECT_SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case WALLET_SELECT_CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }
    default:
      return state
  }
}
