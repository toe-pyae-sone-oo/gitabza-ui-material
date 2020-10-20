import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  songTitle: {
    fontFamily: 'Pyidaungsu-bold',
    textAlign: 'center',
  },
  artistsCard: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  artistWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  artists: {
    fontFamily: 'Pyidaungsu',
    marginLeft: theme.spacing(1),
  },
  lyricsCard: {
    marginTop: theme.spacing(2),
  },
  lyricsWrapper: {
    overflow: 'scroll',
  },
  lyrics: {
    fontSize: '14px',
  },
  code: {
    color: theme.palette.primary.main,
  },
  avatarWrapper: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  youtubeCard: {
    width: '100%',
    marginTop: 0,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(6),
    },
  },
  youtube: {
    width: '100%',
    height: 'auto',
  },
  infoCard: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  textCenter: {
    textAlign: 'center',
  },
}))

export default useStyles