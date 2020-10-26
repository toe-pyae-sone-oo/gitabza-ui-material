import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginRight: 'auto',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    margin: `${theme.spacing(2)}px 0`,
    [theme.breakpoints.up('md')]: {
      minWidth: 400,
    },
  },
  searchButton: {
    marginLeft: theme.spacing(1),
    height: 40,
  },
  edit: {
    marginRight: theme.spacing(1),
    color: theme.palette.success.light,
  },
  delete: {
    color: theme.palette.error.light,
  },
  loadingCell: {
    textAlign: 'center',
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
  },
  pagination: {
    maxWidth: 500,
  },
  indexCol: {
    width: '10%',
  },
  titleCol: {
    width: '60%',
  },
  actionCol: {
    width: '30%',
  },
}))

export default useStyles