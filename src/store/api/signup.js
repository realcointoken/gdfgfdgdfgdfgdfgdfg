import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class Signup {
  static signupApi(body) {
    return http.post(httpUrl + '/api/v1/Auth/signup', body)
  }
}
