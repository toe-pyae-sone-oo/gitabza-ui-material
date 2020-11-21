import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  avatar: {
    width: '100%',
    height: 150,
    margin: '0 auto',
  },
  name: {
    fontFamily: 'Pyidaungsu-bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
}))

export default useStyles