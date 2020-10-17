import { LOAD_LATEST_SONGS, LOAD_LATEST_ARTISTS } from '../constants/actionTypes'

export default (state = { songs: [], artists: [] }, action) => {
  switch (action.type) {
    case LOAD_LATEST_SONGS:
      return {
        ...state,
        songs: action.payload,
      }
    case LOAD_LATEST_ARTISTS:
      return {
        ...state,
        artists: action.payload,
      }
    default:
      return state
  }
}