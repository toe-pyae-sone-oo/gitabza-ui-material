import { 
  LOAD_SEARCH_SONGS, 
  LOAD_SEARCH_ARTISTS, 
  SET_SEARCH_TAB,
  SET_SEARCH,
} from '../constants/actionTypes'

export default (
  state = { 
    songs: {
      page: 0,
      count: 0,
      data: [],
    }, 
    artists: {
      page: 0,
      count: 0,
      data: [],
    },
    tab: 0,
    search: '',
  }, 
  action
) => {
  switch (action.type) {
    case LOAD_SEARCH_SONGS:
      return {
        ...state,
        songs: {
          page: action.payload.page,
          count: action.payload.count,
          data: action.payload.songs,
        },
      }
    case LOAD_SEARCH_ARTISTS:
      return {
        ...state,
        artists: {
          page: action.payload.page,
          count: action.payload.count,
          data: action.payload.artists,
        },
      }
    case SET_SEARCH_TAB:
      return {
        ...state,
        tab: action.payload,
      }
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      }
    default:
      return state
  }
}