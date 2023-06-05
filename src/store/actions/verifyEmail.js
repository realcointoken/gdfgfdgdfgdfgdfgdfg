import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const verifyEmailRequest = createAction('VERIFY_EMAIL_REQUEST')
export const verifyEmailSuccess = createAction('VERIFY_EMAIL_SUCCESS')
export const verifyEmailFail = createAction('VERIFY_EMAIL_FAIL')

export const verifyEmail = (data) => (dispatch) => {
  dispatch(verifyEmailRequest())
  return new Promise((resolve, reject) => {
    return Api.VerifyEmail.verifyEmailApi(data)
      .then(({data}) => {
        dispatch(verifyEmailSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        console.log('error')
        dispatch(verifyEmailFail(error))
        reject(error.data.message)
      })
  })
}
