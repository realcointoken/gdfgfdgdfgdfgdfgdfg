import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class GetCurrencyPairThroughCurrency {
  static getCurrencyPairThroughCurrencyApi(data) {
    return http.get(
      httpUrl +
        '/api/v1/liquidity/GetCurrencyPairThroughCurrency?CurrencyUuid=' +
        data,
    )
  }
}
