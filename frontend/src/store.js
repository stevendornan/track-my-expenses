import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userForgotPasswordReducer,
  userAccountDeleteReducer,
  userUpdateReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'

import {
  walletCreateReducer,
  walletDetailsReducer,
  walletListMyReducer,
  walletUpdateReducer,
  walletDeleteReducer,
  walletSetCurrentReducer,
  walletSelectSetCurrentReducer,
} from './reducers/walletReducers'

import {
  transactionCreateReducer,
  transactionListMyReducer,
  transactionUpdateReducer,
  transactionDeleteReducer,
  transactionSetCurrentReducer,
} from './reducers/transactionReducers'

import { planCreateReducer, planListReducer } from './reducers/planReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPassword: userForgotPasswordReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userAccountDelete: userAccountDeleteReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  walletCreate: walletCreateReducer,
  walletMyDetails: walletDetailsReducer,
  walletListMy: walletListMyReducer,
  walletUpdate: walletUpdateReducer,
  walletDelete: walletDeleteReducer,
  walletSetCurrent: walletSetCurrentReducer,
  walletSelectCurrent: walletSelectSetCurrentReducer,
  transactionCreate: transactionCreateReducer,
  transactionListMy: transactionListMyReducer,
  transactionUpdate: transactionUpdateReducer,
  transactionDelete: transactionDeleteReducer,
  transactionSetCurrent: transactionSetCurrentReducer,
  planCreate: planCreateReducer,
  planList: planListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
