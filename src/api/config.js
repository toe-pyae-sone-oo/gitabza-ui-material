import axios from 'axios'
import { API_URL } from '../constants/api'
import { SET_LOADING, SET_ERROR } from '../constants/actionTypes'
import { store } from '../store'
import { getToken } from '../helpers/adminLogin'

let onRequest = 0

const startLoading = () => {
  onRequest++
  store.dispatch({ type: SET_LOADING, loading: true })
}

const stopLoading = () => {
  onRequest--
  if (onRequest === 0) {
    store.dispatch({ type: SET_LOADING, loading: false })
  }
}

const setError = err => store.dispatch({ type: SET_ERROR, payload: err })

const httpClient = axios.create({
  baseURL: API_URL
})

httpClient.interceptors.request.use(config => {
  startLoading()
  return config
})

httpClient.interceptors.response.use(
  res => {
    stopLoading()
    return res
  },
  err => {
    stopLoading()

    // Fix this later
    if (err.response && err.response.status === 500) {
      setError({
        message: err.response.data.message,
        status: err.response.status,
      })
    }

    if (err.response && err.response.status === 401) {
      setError({ 
        message: err.response.data.message,
        status: err.response.status,
      })
    }

    throw err
  })

const adminAuthHeader = () => {
  const token = getToken()
  return {
    headers: {
      Authorization: token ? `Bearer ${token}`: undefined,
    }
  }
}

export {
  httpClient,
  adminAuthHeader,
}