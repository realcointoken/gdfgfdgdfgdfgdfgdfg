import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const swapRequest = createAction('SWAP_REQUEST')
export const swapSuccess = createAction('SWAP_SUCCESS')
export const swapFail = createAction('SWAP_FAIL')

export const swap = (body) => (dispatch) => {
  dispatch(swapRequest())
  return new Promise((resolve) => {
    return Api.Swap.swapApi(body)
      .then(({data}) => {
        console.log('swap', data)
        dispatch(swapSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(swapFail(error))
        resolve()
      })
  })
}
