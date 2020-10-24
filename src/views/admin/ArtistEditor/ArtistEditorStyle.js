import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  cancel: {
    marginLeft: theme.spacing(1),
  },
  upload: {
    display: 'none',
  },
  picture: {
    objectFit: 'contain',
    width: 150,
    height: 150,
    marginTop: theme.spacing(2),
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
}))

export default useStyles