import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  layoutContainer: {
    marginTop: 56,
    marginBottom: 56,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: 64,
      marginBottom: 0,
    },
  },
}))

export default useStyles