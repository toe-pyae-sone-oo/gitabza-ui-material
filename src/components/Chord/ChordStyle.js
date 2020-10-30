import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  chord: {
    background: theme.palette.common.white,
    width: 120,
  },
  chordKey: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionBtn: {
  },
}))

export default useStyles