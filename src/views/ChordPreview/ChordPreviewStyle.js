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
    [theme.breakpoints.up('md')]: {
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
  actionCard: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  transponseAction: {
    width: 2000,
  },
  fontAction: {
    width: 1500,
  },
  action: {
    color: theme.palette.primary.main,
  },
  mobileActionCard: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export default useStyles