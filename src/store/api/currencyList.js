import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class CurrencyList {
  static currencyApi(body) {
    return http.get(
      httpUrl +
        '/api/v1/Currency/GetCurrencyThroughBlockChainId?BlockChainId=' +
        body,
    )
  }
}
