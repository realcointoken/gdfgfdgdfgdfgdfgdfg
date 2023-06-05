import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const loginRequest = createAction('LOGIN_REQUEST')
export const loginSuccess = createAction('LOGIN_SUCCESS')
export const loginFail = createAction('LOGIN_FAIL')
export const loginRequestClear = createAction('LOGIN_REQUEST_CLEAR')

export const login = (body) => (dispatch) => {
  dispatch(loginRequest())
  return new Promise((resolve, reject) => {
    return Api.Login.loginApi(body)
      .then(({data}) => {
        dispatch(loginSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(loginFail(error))
        reject()
      })
  })
}
