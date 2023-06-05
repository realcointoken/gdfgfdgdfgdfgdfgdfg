import http from './http'
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL

export default class LiquidityCalculation {
  static liquidityCalculationApi(body) {
    return http.post(httpUrl + '/api/v1/liquidity/CalculationLiquidity', body)
  }
}
