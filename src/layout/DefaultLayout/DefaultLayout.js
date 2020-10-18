import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Home from '../../views/Home/Home'
import Chords from '../../views/Chords/Chords'
import Navigation from '../../components/Navigation/Navigation'
import useStyles from './DefaultLayoutStyle'

const DefaultLayout = () => {
  const classes = useStyles()

  return (
    <div>
      <Navigation/>
      <Container 
        maxWidth="lg" 
        className={classes.layoutContainer}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chords" component={Chords} />
        </Switch>
      </Container>
    </div>
  )
}

export default DefaultLayout