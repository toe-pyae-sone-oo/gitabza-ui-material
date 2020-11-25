import React from 'react'
import Container from '@material-ui/core/Container'
import { Switch, Route } from 'react-router-dom'
import Login from '../../views/admin/Login/Login'
import { ADMIN_ROUTE } from '../../constants/routes'
// import useStyles from './EmptyLayoutStyle'

const EmptyLayout = () => {
  // const classes = useStyles()
  return (
    <Container
      maxWidth="lg"
    >
      <Switch>
        <Route exact path={`/${ADMIN_ROUTE}/login`} component={Login} />
      </Switch>
    </Container>
  )
}

export default EmptyLayout