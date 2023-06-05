import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class Login {
  static loginApi(body) {
    return http.post(httpUrl + '/api/v1/Auth/login', body)
  }
}
