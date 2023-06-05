import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const currentRequest = createAction('CURRENT_REQUEST')
export const currentSuccess = createAction('CURRENT_SUCCESS')
export const currentFail = createAction('CURRENT_FAIL')

export const current = (body) => (dispatch) => {
  dispatch(currentRequest())
  return new Promise((resolve, reject) => {
    return Api.Current.currentApi(body)
      .then(({data}) => {
        dispatch(currentSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(currentFail(error))
        reject(error)
      })
  })
}
