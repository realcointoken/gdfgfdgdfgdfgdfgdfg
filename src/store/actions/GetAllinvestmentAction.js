import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const GetAllintestmentRequest = createAction('GetAllintestment_REQUEST')
export const GetAllintestmentSuccess = createAction('GetAllintestment_SUCCESS')
export const GetAllintestmentFail = createAction('GetAllintestment_FAIL')
export const GetAllintestmentRequestClear = createAction(
  'GetAllintestment_REQUEST_CLEAR',
)

export const GetAllinvestmentAction = (body) => (dispatch) => {
  dispatch(GetAllintestmentRequest())
  return new Promise((resolve, reject) => {
    return Api.GetAllinvestmentApi.GetAllApi(body)
      .then(({data}) => {
        dispatch(GetAllintestmentSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(GetAllintestmentFail(error))
        reject()
      })
  })
}
