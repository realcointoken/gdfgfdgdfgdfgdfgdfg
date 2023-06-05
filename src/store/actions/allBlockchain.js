import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const blockchainRequest = createAction('BLOCKCHAIN_REQUEST')
export const blockchainSuccess = createAction('BLOCKCHAIN_SUCCESS')
export const blockchainFail = createAction('BLOCKCHAIN_FAIL')

export const blockchain = () => (dispatch) => {
  dispatch(blockchainRequest())
  return new Promise((resolve, reject) => {
    return Api.Blockchain.getAllBlockChain()
      .then(({data}) => {
        dispatch(blockchainSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(blockchainFail(error))
        reject(error)
      })
  })
}
