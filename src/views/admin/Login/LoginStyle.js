import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: 300
  },
  header: {
    textAlign: 'center',
  },
  username: {
    marginTop: theme.spacing(2),
  },
  password: {
    marginTop: theme.spacing(2),
  },
  loginBtn: {
    marginTop: theme.spacing(2),
  }
}))

export default useStyles