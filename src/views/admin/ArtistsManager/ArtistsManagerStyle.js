import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  edit: {
    marginRight: theme.spacing(1),
    color: theme.palette.success.light,
  },
  delete: {
    color: theme.palette.error.light,
  },
  artistName: {
    fontFamily: 'Pyidaungsu',
  },
  indexCol: {
    width: '10%',
  },
  nameCol: {
    width: '60%',
  },
  actionCol: {
    width: '30%',
  },
  pagination: {
    maxWidth: 500,
  },
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
  },
  loadingCell: {
    textAlign: 'center',
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
}))

export default useStyles