import { LOAD_SONGS } from '../constants/actionTypes'

export default (state = { data: [], count: 0 }, action) => {
  switch (action.type) {
    case LOAD_SONGS:
      return {
        ...state,
        data: action.payload.songs,
        count: action.payload.count,
      }
    default:
      return state
  }
}