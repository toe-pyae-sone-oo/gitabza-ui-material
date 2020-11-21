import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import Toolbar from '@material-ui/core/Toolbar'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import MicIcon from '@material-ui/icons/Mic'
import SearchTab from '../SearchTab/SearchTab'
import useStyles from './NavigationStyle'

const Navigation = ({ 
  route, 
  changeRoute, 
  tab,
  setTab,
  showTab,
  handleSearch,
}) => {
  const classes = useStyles()

  const [searchText, setSearchText] = useState('')

  const handleSearchChange = e => setSearchText(e.target.value)
  
  const handleKeyDown = e => 
    e.keyCode === 13 && handleSearch(searchText)

  return (
    <>
      <AppBar classes={{ root: classes.appBar }}>
        <Toolbar>
          <img
            className={classes.logo}
            alt="logo"
            src={process.env.PUBLIC_URL + '/Gitabza@Logo.svg'}
          />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
              value={searchText}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton 
              onClick={() => changeRoute(0)}
            >
              <HomeIcon 
                className={route === 0 
                  ? classes.navIconActive 
                  : classes.navIcon
                } 
              />
            </IconButton>
            <IconButton 
              onClick={() => changeRoute(1)}
            >
              <MusicNoteIcon 
                className={route === 1
                  ? classes.navIconActive 
                  : classes.navIcon
                } 
              />
            </IconButton>
            <IconButton
              edge="end"
              onClick={() => changeRoute(2)}
            >
              <MicIcon 
                className={route === 2
                  ? classes.navIconActive 
                  : classes.navIcon
                } 
              />
            </IconButton>
          </div>
        </Toolbar>
        {showTab && <SearchTab tab={tab} changeTab={setTab} />}
      </AppBar>
      <BottomNavigation 
        className={classes.bottomNav} 
        showLabels
        value={route}
        onChange={(e, value) => changeRoute(value)}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Chords" icon={<MusicNoteIcon />} />
        <BottomNavigationAction label="Arists" icon={<MicIcon />} />
      </BottomNavigation>
    </>
  )
}

export default Navigation