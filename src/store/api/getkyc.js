import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class GetKYCAPI {
  static getKYCAPI() {
    return http.get(httpUrl + '/api/v1/Account/GetKYC')
  }
}
