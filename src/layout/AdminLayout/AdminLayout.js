import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import AdminNavigation from '../../components/AdminNavigation/AdminNavigation'
import Dashboard from '../../views/admin/Dashboard/Dashboard'
import ArtistsManager from '../../views/admin/ArtistsManager/ArtistsManager'
import ArtistEditor from '../../views/admin/ArtistEditor/ArtistEditor'
import useStyles from './AdminLayoutStyle'

const AdminLayout = () => {
  const classes = useStyles()
  return (
    <div>
      <AdminNavigation/>
      <Container
        maxWidth="lg"
        className={classes.container}
      >
        <Switch>
          <Route exact path="/admin" component={Dashboard} />
          <Route exact path="/admin/artists" component={ArtistsManager} />
          <Route path="/admin/artists/new" component={ArtistEditor} />
          <Route path="/admin/artists/:id/edit" component={ArtistEditor} />
        </Switch>
      </Container>
    </div>
  )
}

export default AdminLayout