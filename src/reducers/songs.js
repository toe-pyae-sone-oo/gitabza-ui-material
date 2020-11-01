import { LOAD_SONGS, SET_SONGS_GENRE, SET_SONGS_PAGE } from '../constants/actionTypes'

export default (
  state = { 
    data: [], 
    count: -1, 
    genre: '', 
    page: 0, 
  }, 
  action,
) => {
  switch (action.type) {
    case LOAD_SONGS:
      return {
        ...state,
        data: action.payload.songs,
        count: action.payload.count,
      }
    case SET_SONGS_GENRE:
      return {
        ...state,
        genre: action.payload,
      }
    case SET_SONGS_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    default:
      return state
  }
}