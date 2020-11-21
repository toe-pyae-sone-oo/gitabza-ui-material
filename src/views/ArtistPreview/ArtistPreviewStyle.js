import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  artistInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: theme.spacing(2)
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
    color: theme.palette.primary.main
  },
  songCount: {
    fontFamily: 'Pyidaungsu',
    fontSize: 14,
    color: theme.palette.text.primary
  },
  artists: {
    padding: theme.spacing(2)
  },
  artist: {
    color: theme.palette.text.primary,
    fontFamily: 'Pyidaungsu-bold',
    cursor: 'pointer'
  },
  header: {
    position: 'relative',
    height: 300,
    backgroundPosition: 'center !important',
    backgroundSize: 'cover !important'
  },
  headerLayer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  cover: {
    width: '100%',
    height: 300,
    objectFit: 'cover'
  }
}))

export default useStyles