import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import AdminNavigation from '../../components/AdminNavigation/AdminNavigation'
import Dashboard from '../../views/admin/Dashboard/Dashboard'
import ArtistsManager from '../../views/admin/ArtistsManager/ArtistsManager'
import ArtistEditor from '../../views/admin/ArtistEditor/ArtistEditor'
import SongsManager from '../../views/admin/SongsManager/SongsManager'
import SongEditor from '../../views/admin/SongEditor/SongEditor'
import { getToken, removeToken } from '../../helpers/adminLogin'
import { SET_ADMIN_TOKEN, SET_ERROR, SET_ADMIN_VERIFIED } from '../../constants/actionTypes'
import { verifyToken } from '../../api/adminLogin'
import { ADMIN_ROUTE } from '../../constants/routes'
import AuthenticatedRoute from '../../routes/AuthenticatedRoute'
import useStyles from './AdminLayoutStyle'

const mapStateToProps = state => ({
  token: state.adminToken.token,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch({ type: SET_ADMIN_TOKEN, payload: token }),
  setVerified: isVerified => dispatch({ type: SET_ADMIN_VERIFIED, payload: isVerified }),
  setError: error => dispatch({ type: SET_ERROR, payload: error }),
})

const AdminLayout = ({ 
  error, 
  token, 
  setToken, 
  setError, 
  history,
  setVerified, 
}) => {
  const classes = useStyles()

  const [loggedIn, setLoggedIn] = useState(!!getToken())
  const [dialog, setDialog] = useState(false)

  useEffect(() => {
    setToken(getToken())
  }, [setToken])

  useEffect(() => {
    setLoggedIn(!!token || !!getToken())
  }, [token])

  useEffect(() => {
    verifyToken()
      .then(() => setVerified(true))
  }, [setVerified])

  useEffect(() => {
    if (error && error.status === 401) {
      setDialog(true)
    }
  }, [error])

  const closeDialog = () => {
    setDialog(false)
  }

  const reLogin = () => {
    history.push(`/${ADMIN_ROUTE}/login`)
    setToken(false)
    removeToken()
    setError(false)
    setVerified(false)
  }

  return (
    <div>
      <Dialog
        open={dialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">
          Unauthorized
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your session has expired. Please login again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={reLogin} 
            color="primary" 
            autoFocus
          >
            Log In
          </Button>
        </DialogActions>
      </Dialog>
      <AdminNavigation/>
      <Container
        maxWidth="lg"
        className={classes.container}
      >
        <Switch>
          <AuthenticatedRoute 
            exact 
            path={`/${ADMIN_ROUTE}`}
            component={Dashboard} 
            appProps={{ authenticated: loggedIn }}
            redirect={`/${ADMIN_ROUTE}/login`}
          />
          <AuthenticatedRoute 
            exact 
            path={`/${ADMIN_ROUTE}/artists`}
            component={ArtistsManager} 
            appProps={{ authenticated: loggedIn }}
            redirect={`/${ADMIN_ROUTE}/login`}
          />
          <AuthenticatedRoute  
            path={`/${ADMIN_ROUTE}/artists/new`}
            component={ArtistEditor} 
            appProps={{ authenticated: loggedIn }}
            redirect={`/${ADMIN_ROUTE}/login`}
          />
          <AuthenticatedRoute 
            path={`/${ADMIN_ROUTE}/artists/:id/edit`}
            component={ArtistEditor} 
            appProps={{ authenticated: loggedIn }}
            redirect={`/${ADMIN_ROUTE}/login`}
          />
          <AuthenticatedRoute 
            exact 
            path={`/${ADMIN_ROUTE}/songs`}
            component={SongsManager} 
            appProps={{ authenticated: loggedIn }}
            redirect={`/${ADMIN_ROUTE}/login`}
          />
          <AuthenticatedRoute 
            path={`/${ADMIN_ROUTE}/songs/new`}
            component={SongEditor} 
            appProps={{ authenticated: loggedIn }}
            redirect={`/${ADMIN_ROUTE}/login`}
          />
          <AuthenticatedRoute 
            path={`/${ADMIN_ROUTE}/songs/:id/edit`}
            component={SongEditor} 
            appProps={{ authenticated: loggedIn }}
            redirect={`/${ADMIN_ROUTE}/login`}
          />
        </Switch>
      </Container>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)