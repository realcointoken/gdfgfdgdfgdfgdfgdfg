import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const getCurrencyPairThroughCurrencyRequest = createAction(
  'GET_CURRENCY_PAIR_THROUGH_CURRENCY_REQUEST',
)
export const getCurrencyPairThroughCurrencySuccess = createAction(
  'GET_CURRENCY_PAIR_THROUGH_CURRENCY_SUCCESS',
)
export const getCurrencyPairThroughCurrencyFail = createAction(
  'GET_CURRENCY_PAIR_THROUGH_CURRENCY_FAIL',
)

export const getCurrencyPairThroughCurrency = (data) => (dispatch) => {
  dispatch(getCurrencyPairThroughCurrencyRequest())
  return new Promise((resolve, reject) => {
    return Api.GetCurrencyPairThroughCurrency.getCurrencyPairThroughCurrencyApi(
      data,
    )
      .then(({data}) => {
        console.log('data')
        dispatch(getCurrencyPairThroughCurrencySuccess(data))
        resolve(data)
      })
      .catch((error) => {
        console.log('error')
        dispatch(getCurrencyPairThroughCurrencyFail(error))
        reject(error)
      })
  })
}
