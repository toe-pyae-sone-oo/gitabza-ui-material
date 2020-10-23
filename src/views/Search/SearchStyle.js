import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(6),
  },
  scroll: {
    overflow: 'visible !important',
  },
}))

export default useStyles