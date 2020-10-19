import { LOAD_ARTISTS } from '../constants/actionTypes'

export default (state = { data: [], count: 0 }, action) => {
  switch (action.type) {
    case LOAD_ARTISTS:
      return {
        ...state,
        data: action.payload.artists,
        count: action.payload.count,
      }
    default:
      return state
  }
}