import React, { useState, useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Home from '../../views/Home/Home'
import Chords from '../../views/Chords/Chords'
import ChordPreview from '../../views/ChordPreview/ChordPreview'
import Artists from '../../views/Artists/Artists'
import ArtistPreview from '../../views/ArtistPreview/ArtistPreview'
import Navigation from '../../components/Navigation/Navigation'
import Search from '../../views/Search/Search'
import { SET_SEARCH_TAB, SET_SEARCH } from '../../constants/actionTypes'
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
  return routes.findIndex(route => route.path === path)
}

const mapStateToProps = state => ({
  tab: state.search.tab,
  search: state.search.search,
})

const mapDispatchToProps = dispatch => ({
  setTab: tab => dispatch({ type: SET_SEARCH_TAB, payload: tab }),
  setSearch: search => dispatch({ type: SET_SEARCH, payload: search }),
})

const DefaultLayout = ({ 
  tab, 
  setTab,
  search,
  setSearch, 
  history,
}) => {
  const classes = useStyles()

  const path = useLocation().pathname
  const [currentRoute, setCurrentRoute] = useState(getRouteByPath(path))
  const [isSearchView, setSearchView] = useState(path === '/search')

  const navigate = route => {
    setCurrentRoute(route)
    history.push(routes[route].path)
  }

  useEffect(() => {
    setSearchView(path === '/search')
    setCurrentRoute(getRouteByPath(path))
  }, [path])

  const handleSearch = text => {
    setSearch(text)
    history.push('/search')
  }

  return (
    <div>
      <Navigation
        route={currentRoute}
        changeRoute={navigate}
        showTab={isSearchView}
        tab={tab}
        setTab={setTab}
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <Container 
        maxWidth="lg" 
        className={classes.layoutContainer}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chords" component={Chords} />
          <Route path="/chords/:artist/:song" component={ChordPreview} />
          <Route exact path="/artists" component={Artists} />
          <Route path="/artists/:slug" component={ArtistPreview} />
          <Route path="/search" component={Search} />
        </Switch>
      </Container>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)