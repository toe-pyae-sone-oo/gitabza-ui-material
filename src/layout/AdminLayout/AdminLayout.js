import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import AdminNavigation from '../../components/AdminNavigation/AdminNavigation'
import Dashboard from '../../views/admin/Dashboard/Dashboard'
import ArtistsManager from '../../views/admin/ArtistsManager/ArtistsManager'
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
          <Route path="/admin/artists" component={ArtistsManager} />
        </Switch>
      </Container>
    </div>
  )
}

export default AdminLayout