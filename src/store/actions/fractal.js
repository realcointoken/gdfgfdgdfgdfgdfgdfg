import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const fractalRequest = createAction('FRACTAL_REQUEST')
export const fractalSuccess = createAction('FRACTAL_SUCCESS')
export const fractalFail = createAction('FRACTAL_FAIL')

export const fractal = (body) => (dispatch) => {
  dispatch(fractalRequest())
  return new Promise((resolve, reject) => {
    return Api.Fractal.fractalApi(body)
      .then(({data}) => {
        dispatch(fractalSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(fractalFail(error))
        reject(error)
      })
  })
}
