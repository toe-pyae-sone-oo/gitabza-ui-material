import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  scroll: {
    overflow: 'visible !important',
  },
  filter: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(2),
  },
  genreFilter: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 200,
    },
  },
}))

export default useStyles