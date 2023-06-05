import axios from 'axios'
import localForage from 'localforage'
import {useStore} from 'react-redux'
const API_ROOT = process.env.REACT_APP_API_URL
/* eslint-disable dot-notation */

axios.defaults.baseURL = API_ROOT
axios.defaults.timeout = 120000
axios.defaults.headers.common['Accept'] = 'application/json'

export var loginToken = ''

localForage.getItem('persist:login').then((value) => {
  const authResponse = JSON.parse(JSON.parse(value)?.authResponse)
  if (authResponse && Object.keys(authResponse).length && authResponse?.data) {
    const token = authResponse?.data?.token
    loginToken = token
    console.log(loginToken)
    http.setAuthorizationHeader(token)
  } else {
    axios.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    )
  }
})

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response || error.request || error.message),
)

const http = {
  setAuthorizationHeader(accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    axios.defaults.headers.Authorization = 'Bearer ' + accessToken
  },
  request(config = {}) {
    return axios.request(config)
  },
  get(url, config = {}) {
    return axios.get(url, config)
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config)
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config)
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config)
  },
  delete(url, config = {}) {
    return axios.delete(url, config)
  },
}

export default http
