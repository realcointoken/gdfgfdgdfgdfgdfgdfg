import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class Fractal {
  static fractalApi(data) {
    return http.post(httpUrl + '/api/v1/Account/KycApprovedByFractal', data)
  }
}
