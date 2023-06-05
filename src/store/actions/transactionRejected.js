import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const transactionRejectedRequest = createAction(
  'TRANSACTION_REJECTED_REQUEST',
)
export const transactionRejectedSuccess = createAction(
  'TRANSACTION_REJECTED_SUCCESS',
)
export const transactionRejectedFail = createAction('TRANSACTION_REJECTED_FAIL')

export const transactionRejected = (body) => (dispatch) => {
  dispatch(transactionRejectedRequest())
  return new Promise((resolve, reject) => {
    return Api.TransactionRejected.transactionRejectedApi(body)
      .then(({data}) => {
        console.log('swap', data)
        dispatch(transactionRejectedSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(transactionRejectedFail(error))
        reject()
      })
  })
}
