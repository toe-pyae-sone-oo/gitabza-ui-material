import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { SET_ERROR } from '../../constants/actionTypes'
import useStyles from './ServerErrorStyle'

const mapStateToProps = state => ({
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch({ type: SET_ERROR, payload: error })
})

const ServerError = ({ error, setError, history }) => {
  const classes = useStyles()

  useEffect(() => {
    document.title = `${process.env.REACT_APP_SITE_TITLE_PREFIX} | 500`
  }, [])

  useEffect(() => {
    if (!error) {
      history.push('/')
    }
  }, [error, history])

  const goBackHome = () => {
    setError(false)
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        className={classes.status}
      >
        500
      </Typography>
      <Typography
        variant="h6"
        className={classes.message}
      >
        SOMETHING WENT WRONG
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={goBackHome}
      >
        Go Back Home
      </Button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerError)