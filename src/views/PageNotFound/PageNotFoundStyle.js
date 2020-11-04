import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  status: {
    fontWeight: 'bold',
  },
}))

export default useStyles