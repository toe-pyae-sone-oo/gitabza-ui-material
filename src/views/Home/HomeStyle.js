import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  mainSlider: {
    paddingTop: theme.spacing(1),
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1) 
    }
  }
}))

export default useStyles