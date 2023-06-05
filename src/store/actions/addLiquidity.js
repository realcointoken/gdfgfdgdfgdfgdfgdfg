import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const addLiquidityRequest = createAction('ADD_LIQUIDITY_REQUEST')
export const addLiquiditySuccess = createAction('ADD_LIQUIDITY_SUCCESS')
export const addLiquidityFail = createAction('ADD_LIQUIDITY_FAIL')

export const addLiquidity = (data) => (dispatch) => {
  dispatch(addLiquidityRequest())
  return new Promise((resolve, reject) => {
    return Api.AddLiquidity.addLiquidityApi(data)
      .then(({data}) => {
        console.log('data')
        dispatch(addLiquiditySuccess(data))
        resolve(data)
      })
      .catch((error) => {
        console.log('error')
        dispatch(addLiquidityFail(error))
        reject(error)
      })
  })
}
