import { SET_ADMIN_TOKEN, SET_ADMIN_VERIFIED } from '../constants/actionTypes'

export default (state = { token: false, verified: false }, action) => {
  switch (action.type) {
    case SET_ADMIN_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case SET_ADMIN_VERIFIED:
      return {
        ...state,
        verified: action.payload,
      }
    default:
      return state
  }
}