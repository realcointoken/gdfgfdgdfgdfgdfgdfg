import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const kycRegisterRequest = createAction('KYC_REGISTER_REQUEST')
export const kycRegisterSuccess = createAction('KYC_REGISTER_SUCCESS')
export const kycRegisterFail = createAction('KYC_REGISTER_FAIL')

export const kycRegister = (body) => (dispatch) => {
  return new Promise((resolve) => {
    return Api.kycRegister
      .kycRegisterAPI(body)
      .then(({data}) => {
        dispatch(kycRegisterSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(kycRegisterFail(error))
        resolve()
      })
  })
}
