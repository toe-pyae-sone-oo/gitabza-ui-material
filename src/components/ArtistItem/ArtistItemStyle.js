import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    cursor: 'pointer',
  },
  avatarWrapper: {
    padding: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  name: {
    fontFamily: 'Pyidaungsu-bold',
  },
  nameIcon: {
    marginRight: theme.spacing(1),
  },
  songsIcon: {
    marginRight: theme.spacing(1),
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))

export default useStyles