import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class AddLiquidity {
  static addLiquidityApi(data) {
    return http.post(httpUrl + '/api/v1/liquidity/AddLiquidity', data)
  }
}
