import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
  },
  avatar: {
    height: 150
  },
  name: {
    fontFamily: 'Pyidaungsu-bold',
  },
  songs: {
    fontFamily: 'Pyidaungsu',
    fontSize: 12
  }
}))

export default useStyles