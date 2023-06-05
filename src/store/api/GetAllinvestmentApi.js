import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class GetAllinvestmentApi {
  static GetAllApi(body) {
    return http.get(httpUrl + '/api/v1/Pool/GetAllInvestment', body)
  }
}
