import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const labelRequest = createAction('LABEL_REQUEST')
export const labelSuccess = createAction('LABEL_SUCCESS')
export const labelFail = createAction('LABEL_FAIL')

export const whiteLabelList = (body) => (dispatch) => {
  dispatch(labelRequest())
  return new Promise((resolve, reject) => {
    return Api.WhiteLabelList.labelApi(body)
      .then(({data}) => {
        dispatch(labelSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        console.log('error')
        dispatch(labelFail(error))
        reject(error)
      })
  })
}
