import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import MicIcon from '@material-ui/icons/Mic'
import useStyles from './NavigationStyle'

const routes = ['Home', 'Chords', 'Artists']

const Navigation = () => {
  const classes = useStyles()
  const [currentRoute, setCurrentRoute] = useState(0)

  return (
    <>
      <AppBar classes={{ root: classes.appBar }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {routes[currentRoute]}
          </Typography>
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
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton 
              onClick={() => setCurrentRoute(0)}
            >
              <HomeIcon 
                className={currentRoute === 0 
                  ? classes.navIconActive 
                  : classes.navIcon
                } 
              />
            </IconButton>
            <IconButton 
              onClick={() => setCurrentRoute(1)}
            >
              <MusicNoteIcon 
                className={currentRoute === 1
                  ? classes.navIconActive 
                  : classes.navIcon
                } 
              />
            </IconButton>
            <IconButton
              edge="end"
              onClick={() => setCurrentRoute(2)}
            >
              <MicIcon 
                className={currentRoute === 2
                  ? classes.navIconActive 
                  : classes.navIcon
                } 
              />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <BottomNavigation 
        className={classes.bottomNav} 
        showLabels
        value={currentRoute}
        onChange={(e, value) => setCurrentRoute(value)}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Chords" icon={<MusicNoteIcon />} />
        <BottomNavigationAction label="Arists" icon={<MicIcon />} />
      </BottomNavigation>
    </>
  )
}

export default Navigation