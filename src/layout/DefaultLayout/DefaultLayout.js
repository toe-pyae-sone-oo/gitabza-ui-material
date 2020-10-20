import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Home from '../../views/Home/Home'
import Chords from '../../views/Chords/Chords'
import ChordPreview from '../../views/ChordPreview/ChordPreview'
import Artists from '../../views/Artists/Artists'
import ArtistPreview from '../../views/ArtistPreview/ArtistPreview'
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
  const index = routes.findIndex(route => route.path === path)
  return index < 0 ? 0 : index
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
          <Route exact path="/chords" component={Chords} />
          <Route path="/chords/:id" component={ChordPreview} />
          <Route exact path="/artists" component={Artists} />
          <Route path="/artists/:id" component={ArtistPreview} />
        </Switch>
      </Container>
    </div>
  )
}

export default DefaultLayout