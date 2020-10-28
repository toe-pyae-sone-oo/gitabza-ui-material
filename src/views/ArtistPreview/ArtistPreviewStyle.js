import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  artistInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  artistInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(2),
  },
  avatar: {
    width: 120,
    height: 120,
  },
  name: {
    fontFamily: 'Pyidaungsu-bold',
  },
  songCount: {
    fontFamily: 'Pyidaungsu',
  },
  artists: {
    marginTop: theme.spacing(2),
  },
}))

export default useStyles