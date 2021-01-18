import axios from 'axios'
import {
  PLAN_CREATE_REQUEST,
  PLAN_CREATE_SUCCESS,
  PLAN_CREATE_FAIL,
  PLAN_CREATE_RESET,
  PLAN_LIST_REQUEST,
  PLAN_LIST_SUCCESS,
  PLAN_LIST_FAIL,
} from '../constants/planConstants'
import { logout } from './userActions'

export const createPlan = (plan) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAN_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/plans`, plan, config)

    dispatch({
      type: PLAN_CREATE_SUCCESS,
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
      type: PLAN_CREATE_FAIL,
      payload: message,
    })
  }
}

export const listPlans = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAN_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/plans`, config)

    dispatch({
      type: PLAN_LIST_SUCCESS,
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
      type: PLAN_LIST_FAIL,
      payload: message,
    })
  }
}
