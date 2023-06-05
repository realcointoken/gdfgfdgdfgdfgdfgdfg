import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const liquidityCalculationRequest = createAction(
  'LIQUIDITY_CALCULATION_REQUEST',
)
export const liquidityCalculationSuccess = createAction(
  'LIQUIDITY_CALCULATION_SUCCESS',
)
export const liquidityCalculationFail = createAction(
  'LIQUIDITY_CALCULATION_FAIL',
)

export const liquidityCalculation = (body) => (dispatch) => {
  dispatch(liquidityCalculationRequest())
  return new Promise((resolve, reject) => {
    return Api.LiquidityCalculation.liquidityCalculationApi(body)
      .then(({data}) => {
        console.log('swap', data)
        dispatch(liquidityCalculationSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(liquidityCalculationFail(error))
        reject()
      })
  })
}
