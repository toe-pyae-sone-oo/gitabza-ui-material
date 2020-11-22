const { makeStyles } = require('@material-ui/core/styles')

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    height: 160,
    [theme.breakpoints.up('sm')]: {
      height: 'auto'
    },
    cursor: 'pointer'
  }
}))

export default useStyles