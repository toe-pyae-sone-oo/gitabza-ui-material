import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    display: 'inline-block',
    height: 90,
    [theme.breakpoints.up('sm')]: {
      height: 110
    },
    [theme.breakpoints.up('md')]: {
      height: 125
    }
  },
}))

export default useStyles