import { LOAD_ARTISTS, SET_ARTISTS_PAGE } from '../constants/actionTypes'

export default (state = { data: [], count: -1, page: 0 }, action) => {
  switch (action.type) {
    case LOAD_ARTISTS:
      return {
        ...state,
        data: action.payload.artists,
        count: action.payload.count,
      }
    case SET_ARTISTS_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    default:
      return state
  }
}