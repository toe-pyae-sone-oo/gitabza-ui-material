import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  cancel: {
    marginLeft: theme.spacing(1),
  },
  lyrics: {
    fontFamily: 'monospace !important',
  },
}))

export default useStyles