import { httpClient, adminAuthHeader } from './config'

export const create = payload => {
  return httpClient
    .post('/artists', payload, adminAuthHeader())
    .then(({ data }) => data)
}

export const upload = file => {
  const formData = new FormData()
  formData.append('picture', file, file.name)
  return httpClient
    .post('/artists/upload/pic', formData, adminAuthHeader())
    .then(({ data }) => data)
}

export const find = ({ name, skip = 0, limit = 10, sort, order }) => {
  let query = name ? `name=${name.trim()}&` : ''
  query += sort ? `sort=${sort}&` : ''
  query += order ? `order=${order}&` : ''
  query += `skip=${skip}&`
  query += `limit=${limit}`

  return httpClient
    .get(`/artists?${query}`)
    .then(({ data }) => data)
}

export const remove = id => {
  return httpClient.delete(`/artists/${id}`, adminAuthHeader())
}

export const findById = id => {
  return httpClient
    .get(`/artists/${id}`)
    .then(({ data }) => data)
}

export const update = (id, body) => {
  return httpClient
    .put(`/artists/${id}`, body, adminAuthHeader())
    .then(({ data }) => data)
}

export const getNames = () => {
  return httpClient
    .get('/artists/names', adminAuthHeader())
    .then(({ data }) => data)
}

export const getLatest = () => {
  return httpClient
    .get('/artists?limit=10')
    .then(({ data }) => data.artists)
}