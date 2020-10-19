import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  artistInfo: {
    width: '100%',
  },
  avatar: {
    width: 120,
    height: 120,
  },
  name: {
    fontFamily: 'Pyidaungsu-bold',
    marginTop: theme.spacing(1),
  },
}))

export default useStyles