import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class CurrencyCalculation {
  static currencyCalculationApi(body) {
    return http.post(httpUrl + '/api/v1/Swap/calculation', body)}
}
