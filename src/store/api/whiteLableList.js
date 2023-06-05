import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class WhiteLabelList {
  static labelApi(body) {
    return http.get(
      httpUrl +
        '/api/v1/WhiteLabelAddress/GetWhiteLabelAddressByChainID?ChainId=' +
        body,
    )
  }
}
