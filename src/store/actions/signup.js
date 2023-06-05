import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const signupRequest = createAction('SIGN_UP_REQUEST')
export const signupSuccess = createAction('SIGN_UP_SUCCESS')
export const signupFail = createAction('SIGN_UP_FAIL')
export const signupClear = createAction('SIGN_UP_CLEAR')

export const signup = (body) => (dispatch) => {
  dispatch(signupRequest())
  return new Promise((resolve) => {
    return Api.Signup.signupApi(body)
      .then(({data}) => {
        dispatch(signupSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(signupFail(error))
        resolve()
      })
  })
}
