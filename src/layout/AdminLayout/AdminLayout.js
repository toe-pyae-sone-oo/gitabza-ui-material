import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import AdminNavigation from '../../components/AdminNavigation/AdminNavigation'
import Dashboard from '../../views/admin/Dashboard/Dashboard'
import ArtistsManager from '../../views/admin/ArtistsManager/ArtistsManager'
import ArtistEditor from '../../views/admin/ArtistEditor/ArtistEditor'
import SongsManager from '../../views/admin/SongsManager/SongsManager'
import SongEditor from '../../views/admin/SongEditor/SongEditor'
import { getToken } from '../../helpers/adminLogin'
import { SET_ADMIN_TOKEN } from '../../constants/actionTypes'
// import { verifyToken } from '../../api/adminLogin'
import AuthenticatedRoute from '../../routes/AuthenticatedRoute'
import useStyles from './AdminLayoutStyle'

const mapStateToProps = state => ({
  token: state.adminToken,
})

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch({ type: SET_ADMIN_TOKEN, payload: token })
})

const AdminLayout = ({ token, setToken }) => {
  const classes = useStyles()

  const [authenticated, setAuthenticated] = useState(!!getToken())

  useEffect(() => {
    setToken(getToken())
  }, [setToken])

  useEffect(() => {
    setAuthenticated(!!token || !!getToken())
  }, [token])

  return (
    <div>
      <AdminNavigation/>
      <Container
        maxWidth="lg"
        className={classes.container}
      >
        <Switch>
          <AuthenticatedRoute 
            exact 
            path="/admin" 
            component={Dashboard} 
            appProps={{ authenticated }}
            redirect={'/admin/login'}
          />
          <AuthenticatedRoute 
            exact 
            path="/admin/artists" 
            component={ArtistsManager} 
            appProps={{ authenticated }}
            redirect={'/admin/login'}
          />
          <AuthenticatedRoute  
            path="/admin/artists/new" 
            component={ArtistEditor} 
            appProps={{ authenticated }}
            redirect={'/admin/login'}
          />
          <AuthenticatedRoute 
            path="/admin/artists/:id/edit" 
            component={ArtistsManager} 
            appProps={{ authenticated }}
            redirect={'/admin/login'}
          />
          <AuthenticatedRoute 
            exact 
            path="/admin/songs" 
            component={SongsManager} 
            appProps={{ authenticated }}
            redirect={'/admin/login'}
          />
          <AuthenticatedRoute 
            path="/admin/songs/new" 
            component={SongEditor} 
            appProps={{ authenticated }}
            redirect={'/admin/login'}
          />
          <AuthenticatedRoute 
            path="/admin/songs/:id/edit" 
            component={ArtistsManager} 
            appProps={{ authenticated }}
            redirect={'/admin/login'}
          />
        </Switch>
      </Container>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)