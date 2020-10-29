import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
  },
  content: {
    width: '60%',
  },
  title: {
    fontFamily: 'Pyidaungsu-bold',
  },
  titleIcon: {
    marginRight: 5,
  },
  artists: {
    fontFamily: 'Pyidaungsu',
  },
  artistsIcon: {
    marginRight: 5,
  },
  version: {
    fontFamily: 'Pyidaungsu',
  },
  versionIcon: {
    marginRight: 5,
  },
  image: {
    width: '40%',
    height: 'auto',
  },
}))

export default useStyles