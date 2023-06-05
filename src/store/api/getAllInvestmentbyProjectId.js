import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class GetAllInvestmentbyProjectId {
  static getAllInvestmentbyProjectIdApi(body) {
    return http.get(
      httpUrl + '/api/v1/Pool/GetAllInvestmentbyProjectId?ProjectId=' + body,
    )
  }
}
