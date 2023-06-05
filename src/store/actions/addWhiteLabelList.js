import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const addWhitelabelRequest = createAction('ADD_WHITE_LABEL_REQUEST')
export const addWhitelabelSuccess = createAction('ADD_WHITE_LABEL_SUCCESS')
export const addWhitelabelFail = createAction('ADD_WHITE_LABEL_FAIL')

export const addWhiteLabelList = (data) => (dispatch) => {
  dispatch(addWhitelabelRequest())
  return new Promise((resolve) => {
    return Api.AddWhiteLabelList.addWhitelabelApi(data)
      .then(({data}) => {
        console.log('data')
        dispatch(addWhitelabelSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        console.log('error')
        dispatch(addWhitelabelFail(error))
        resolve()
      })
  })
}
