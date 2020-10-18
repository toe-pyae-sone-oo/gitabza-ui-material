import { combineReducers } from 'redux'
import loading from './loading'
import error from './error'
import adminArtists from './adminArtists'
import adminSongs from './adminSongs'
import adminToken from './adminToken'
import home from './home'
import songs from './songs'

export default combineReducers({
  loading,
  error,
  adminArtists,
  adminSongs,
  adminToken,
  home,
  songs,
})