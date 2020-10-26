import { 
  LOAD_ADMIN_SONGS, 
  SET_ADMIN_SONGS_CHANGED,
  SET_ADMIN_SONGS_SEARCH,
} from '../constants/actionTypes'

export default (state = { 
  count: 0, 
  data: [],
  page: 1,
  changed: true, 
  search: '',
}, action) => {
  switch (action.type) {
    case LOAD_ADMIN_SONGS:
      return {
        ...state,
        count: action.payload.count,
        data: [...action.payload.data],
        page: action.payload.page,
        changed: action.payload.changed,
      }
    case SET_ADMIN_SONGS_CHANGED:
      return {
        ...state,
        changed: action.payload,
      }
    case SET_ADMIN_SONGS_SEARCH:
      return {
        ...state,
        search: action.payload,
      }
    default:
      return state
  }
}