import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const kycGetRequest = createAction('KYC_GET_REQUEST')
export const kycGetSuccess = createAction('KYC_GET_SUCCESS')
export const kycGetFail = createAction('KYC_GET_FAIL')

export const kycGet = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    return Api.GetKYCAPI.getKYCAPI()
      .then(({data}) => {
        dispatch(kycGetSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(kycGetFail(error))
        reject(error)
      })
  })
}
