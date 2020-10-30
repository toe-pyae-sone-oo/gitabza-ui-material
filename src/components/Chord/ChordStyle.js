import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.common.white,
    width: 140,
    paddingTop: theme.spacing(1),
  },
  chord: {
  },
  chordKey: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionBtn: {
    color: theme.palette.common.black,
  },
  position: {
    color: theme.palette.common.black,
  },
}))

export default useStyles