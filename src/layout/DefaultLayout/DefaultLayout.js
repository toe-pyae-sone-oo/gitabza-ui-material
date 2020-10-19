import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Home from '../../views/Home/Home'
import Chords from '../../views/Chords/Chords'
import Artists from '../../views/Artists/Artists'
import Navigation from '../../components/Navigation/Navigation'
import useStyles from './DefaultLayoutStyle'

const routes = [
  {
    path: '/',
    title: 'Home'
  },
  {
    path: '/chords',
    title: 'Chords'
  },
  {
    path: '/artists',
    title: 'Artists',
  },
]

const getRouteByPath = path => {
  return routes.findIndex(route => route.path === path) || 0
}

const DefaultLayout = ({ history }) => {
  const classes = useStyles()

  const path = useLocation().pathname
  const [currentRoute, setCurrentRoute] = useState(getRouteByPath(path))

  const navigate = route => {
    setCurrentRoute(route)
    history.push(routes[route].path)
  }

  return (
    <div>
      <Navigation
        route={currentRoute}
        changeRoute={navigate}
        title={routes[currentRoute].title}
      />
      <Container 
        maxWidth="lg" 
        className={classes.layoutContainer}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chords" component={Chords} />
          <Route path="/artists" component={Artists} />
        </Switch>
      </Container>
    </div>
  )
}

export default DefaultLayout