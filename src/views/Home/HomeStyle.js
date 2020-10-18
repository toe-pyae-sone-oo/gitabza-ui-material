import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  songsCard: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(1),
  },
  artistsCard: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(1),
  },
}))

export default useStyles