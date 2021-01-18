import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_LIST_MY_REQUEST,
  TRANSACTION_LIST_MY_SUCCESS,
  TRANSACTION_LIST_MY_FAIL,
  TRANSACTION_LIST_MY_RESET,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_RESET,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_RESET,
  TRANSACTION_SET_CURRENT,
  TRANSACTION_CLEAR_CURRENT,
} from '../constants/transactionConstants'

export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return {
        loading: true,
      }
    case TRANSACTION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload,
      }
    case TRANSACTION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TRANSACTION_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const transactionListMyReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_LIST_MY_REQUEST:
      return {
        loading: true,
        transactions: [],
      }
    case TRANSACTION_LIST_MY_SUCCESS:
      return {
        loading: false,
        success: true,
        transactions: action.payload,
      }
    case TRANSACTION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TRANSACTION_LIST_MY_RESET:
      return { transactions: [] }
    default:
      return state
  }
}

export const transactionUpdateReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_UPDATE_REQUEST:
      return { loading: true }
    case TRANSACTION_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case TRANSACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case TRANSACTION_UPDATE_RESET:
      return {
        transaction: {},
      }
    default:
      return state
  }
}

export const transactionSetCurrentReducer = (
  state = { transaction: {}, current: null, error: null },
  action
) => {
  switch (action.type) {
    case TRANSACTION_SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case TRANSACTION_CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }
    default:
      return state
  }
}

export const transactionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return {
        loading: true,
      }
    case TRANSACTION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TRANSACTION_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TRANSACTION_DELETE_RESET:
      return {}
    default:
      return state
  }
}
