import http from './http'

export default class Wallet {
  static walletConnect(body) {
    return http.post('/WalletConnecteds/connect', body)
  }

  static checkWhitelist(params) {
    return http.get('/Whitelists/in-whitelist', {
      params,
    })
  }
}
