import { httpClient, adminAuthHeader } from './config'

export const login = payload => {
  return httpClient.post('/admin/login', payload)
    .then(({ data }) => data)
}

export const verifyToken = () => {
  return httpClient
    .post('/admin/verify', {}, adminAuthHeader())
}