import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  scroll: {
    overflow: 'visible !important',
  },
  filter: {
    display: 'flex',
    paddingBottom: theme.spacing(2),
    alignItems: 'center'
  },
  genreFilter: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 200,
    },
  },
  title: {
    marginRight: 'auto !important'
  }
}))

export default useStyles