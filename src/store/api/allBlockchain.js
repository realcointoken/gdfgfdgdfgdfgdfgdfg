import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class Blockchain {
  static getAllBlockChain() {
    return http.get(httpUrl + '/api/v1/Currency/GetAllBlockChainList')
  }
}
