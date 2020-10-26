import { 
  LOAD_ADMIN_ARTISTS, 
  LOAD_ADMIN_ARTIST_NAMES,
  SET_ADMIN_ARTISTS_CHANGED, 
} from '../constants/actionTypes'

export default (state = { 
  data: [], 
  count: 0, 
  names: [],
  page: 1,
  changed: true,
}, action) => {
  switch (action.type) {
    case LOAD_ADMIN_ARTISTS:
      return {
        ...state,
        count: action.payload.count,
        data: [
          ...action.payload.data
        ],
        page: action.payload.page,
        changed: action.payload.changed,
      }
    case LOAD_ADMIN_ARTIST_NAMES:
      return {
        ...state,
        names: [
          ...action.payload
        ]
      }
    case SET_ADMIN_ARTISTS_CHANGED:
      return {
        ...state,
        changed: action.payload,
      }
    default:
      return state
  }
}