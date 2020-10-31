import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 144,
    objectFit: 'contain',
    display: 'inline-block',
  },
}))

export default useStyles