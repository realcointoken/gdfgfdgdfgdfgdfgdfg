import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const currencyRequest = createAction('CURRENCY_REQUEST')
export const currencySuccess = createAction('CURRENCY_SUCCESS')
export const currencyFail = createAction('CURRENCY_FAIL')

export const currencyList = (body) => (dispatch) => {
  dispatch(currencyRequest())
  return new Promise((resolve) => {
    return Api.CurrencyList.currencyApi(body)
      .then(({data}) => {
        dispatch(currencySuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(currencyFail(error))
        resolve()
      })
  })
}
