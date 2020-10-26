import React, { useState } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { validateAdminLoginForm as validateForm } from '../../../validators'
import { login } from '../../../api/adminLogin'
import { saveToken } from '../../../helpers/adminLogin'
import { SET_ADMIN_TOKEN, SET_ERROR } from '../../../constants/actionTypes'
import useStyles from './LoginStyle'

const mapStateToProps = state => ({
  loading: state.loading,
})

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch({ type: SET_ADMIN_TOKEN, payload: token }),
  setError: error => dispatch({ type: SET_ERROR, payload: error }),
})

const Login = ({ loading, setToken, setError, history }) => {
  const classes = useStyles()

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  const handleChange = e => setForm({
    ...form,
    [e.target.name]: e.target.value,
  })

  const handleToken = ({ token }) => {
    saveToken(token)
    setToken(token)
  }

  const handleSubmit = () => {
    const _errors = validateForm(form)
    setErrors(_errors)

    const valid = Object.values(_errors).every(err => !err)
    if (valid) {
      login(form)
        .then(handleToken)
        .then(() => {
          setError(false)
          history.push('/admin')
        })
        .catch(({ response }) => {
          if (
            response && response.data && 
            response.status === 401
          ) {
            const { message } = response.data
            if (message === 'user not found') {
              setErrors({ password: '', username: message })
            } else if (message === 'wrong password') {
              setErrors({ username: '', password: message })
            }
          }
        })
    }
  }

  const handleKeyDown = e => {
    (e.keyCode === 13) && handleSubmit()
  }

  return (
    <div className={classes.root}>
      <Card 
        className={classes.card}
        variant="outlined"
      >
        <Typography 
          variant="h5"
          className={classes.header}
        >
          Gita B Za
        </Typography>
        <TextField
          name="username"
          variant="outlined"
          label="username"
          size="small"
          fullWidth
          className={classes.username}
          value={form.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          disabled={loading}
          onKeyDown={handleKeyDown}
        />
        <TextField
          name="password"
          type="password"
          variant="outlined"
          label="password"
          size="small"
          fullWidth
          className={classes.password}
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          disabled={loading}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          fullWidth
          className={classes.loginBtn}
          color="primary"
          disableElevation
          onClick={handleSubmit}
          disabled={loading}
        >
          Log In
        </Button>
      </Card>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)