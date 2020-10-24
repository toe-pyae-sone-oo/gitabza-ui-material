import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 56,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      marginLeft: drawerWidth,
      maxWidth: `calc(100% - ${drawerWidth}px)`,
    },
  }
}))

export default useStyles