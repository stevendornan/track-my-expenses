import {
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_SUCCESS,
  PLAN_CREATE_FAIL,
  PLAN_CREATE_RESET,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  PLAN_LIST_FAIL,
} from '../constants/planConstants'

export const planCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAN_CREATE_REQUEST:
      return {
        loading: true,
      }
    case PLAN_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        plan: action.payload,
      }
    case PLAN_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case PLAN_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const planListReducer = (state = { plans: [] }, action) => {
  switch (action.type) {
    case PLAN_LIST_REQUEST:
      return {
        loading: true,
      }
    case PLAN_LIST_SUCCESS:
      return {
        loading: false,
        plans: action.payload,
      }
    case PLAN_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
