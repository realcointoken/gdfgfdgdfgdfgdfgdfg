import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class kycRegister {
  static kycRegisterAPI(body) {
    return http.post(httpUrl + '/api/v1/Account/AddKYC', body)
  }
}
