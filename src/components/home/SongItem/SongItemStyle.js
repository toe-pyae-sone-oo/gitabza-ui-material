import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
  title: {
    fontFamily: 'Pyidaungsu'
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'inline-block',
  },
}))

export default useStyles