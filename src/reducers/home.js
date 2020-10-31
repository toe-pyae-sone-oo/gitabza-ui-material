import { 
  LOAD_LATEST_SONGS, 
  LOAD_LATEST_ARTISTS, 
  LOAD_TOP_SONGS
} from '../constants/actionTypes'

export default (state = { songs: [], artists: [], topSongs: [] }, action) => {
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
    case LOAD_TOP_SONGS:
      return {
        ...state,
        topSongs: action.payload,
      }
    default:
      return state
  }
}