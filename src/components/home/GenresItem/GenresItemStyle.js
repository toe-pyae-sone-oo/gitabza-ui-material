import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 144,
    objectFit: 'cover',
    display: 'inline-block',
  },
}))

export default useStyles