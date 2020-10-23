import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MusicIcon from '@material-ui/icons/MusicNote'
import MicIcon from '@material-ui/icons/Mic'
import PersonIcon from '@material-ui/icons/Person'
import KeyIcon from '@material-ui/icons/VpnKey'
import useStyles from './AdminNavigationStyle'

const AdminNavigation = ({ window }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [mobileOpen, setMobileOpen] = useState(false)

  const container = window !== undefined 
    ? () => window().document.body 
    : undefined

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider/>
      <List>
        <ListItem button>
          <ListItemIcon>
            <MusicIcon/>
          </ListItemIcon>
          <ListItemText primary="Songs" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MicIcon/>
          </ListItemIcon>
          <ListItemText primary="Artists" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon/>
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button>
          <ListItemIcon>
            <KeyIcon/>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar 
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            GitaBZa
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden 
          smUp 
          implementation="css"
        >
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

export default AdminNavigation