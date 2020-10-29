import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: '0 auto',
  },
  name: {
    fontFamily: 'Pyidaungsu-bold',
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
}))

export default useStyles