import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  songInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Pyidaungsu-bold',
  },
  artists: {
    fontFamily: 'Pyidaungsu',
    color: theme.palette.primary.main,
  },
  difficulty: {
    color: theme.palette.primary.main,
  },
  version: {
    color: theme.palette.primary.main,
  },
  lyricsCard: {
    marginTop: theme.spacing(2),
  },
  lyricsWrapper: {
    overflow: 'scroll',
    padding: theme.spacing(2),
  },
  lyrics: {
    margin: 0,
  },
  code: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  youtubeCard: {
    padding: theme.spacing(1),
  },
  youtube: {
    width: '100%',
    height: 250,
    [theme.breakpoints.up('sm')]: {
      height: 360,
    },
    [theme.breakpoints.up('md')]: {
      height: 200,
    },
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
  actionTitle: {
    pointerEvents: 'none',
  },
  mobileActionCard: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileAutoScroll: {
    position: 'fixed',
    bottom: 65,
    right: theme.spacing(2),
    display: 'inline-flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileAutoScrollIcon: {
    color: '#ffffffb3',
  },
  otherSongsTitle: {
    marginTop: theme.spacing(2),
  },
  otherSongs: {
    marginTop: theme.spacing(2),
  },
  otherSongCard: {
    margin: theme.spacing(1),
  },
  instrumentTab: {
    marginBottom: theme.spacing(1),
  },
  chords: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  chordWrapper: {
    padding: theme.spacing(1),
  },
  popupChord: {
    maxWidth: 140,
  },
}))

export default useStyles