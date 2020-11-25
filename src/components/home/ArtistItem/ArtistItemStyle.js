import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  avatar: {
    width: '100%',
    margin: '0 auto',
    height: 90,
    [theme.breakpoints.up('sm')]: {
      height: 110
    },
    [theme.breakpoints.up('md')]: {
      height: 125
    }
  },
  name: {
    fontFamily: 'Pyidaungsu-bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
}))

export default useStyles