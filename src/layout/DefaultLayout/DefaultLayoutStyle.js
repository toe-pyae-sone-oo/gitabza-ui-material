import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  layoutContainer: {
    marginTop: 56,
    marginBottom: 56,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
    }
  },
}))

export default useStyles