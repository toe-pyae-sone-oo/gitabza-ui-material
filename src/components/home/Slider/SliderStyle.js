const { makeStyles } = require('@material-ui/core/styles')

const useStyles = makeStyles(theme => ({
  slide: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  slideImage: {
    width: '100%',
    height: 'auto'
  }
}))

export default useStyles