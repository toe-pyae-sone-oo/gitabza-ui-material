import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginRight: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  showAllBtn: {
    alignSelf: 'end',
    marginRight: theme.spacing(1),
  },
}))

export default useStyles