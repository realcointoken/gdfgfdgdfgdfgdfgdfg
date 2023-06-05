import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const logoutRequest = createAction('LOGOUT_REQUEST')
export const logoutSuccess = createAction('LOGOUT_SUCCESS')
export const logoutFail = createAction('LOGOUT_FAIL')
export const logoutClear = createAction('LOGOUT_CLEAR')

export const logout = (body) => (dispatch) => {
  dispatch(logoutRequest())
  return new Promise((resolve, reject) => {
    return Api.Logout.logoutApi(body)
      .then(({data}) => {
        dispatch(logoutSuccess(data))
        dispatch(logoutClear())
        resolve(data)
      })
      .catch((error) => {
        dispatch(logoutFail(error))
        reject(error)
      })
  })
}
