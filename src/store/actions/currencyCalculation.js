import {createAction, createActions} from 'redux-actions'
import Api from '../api'

export const currencyCalculationRequest = createAction('CURRENCY_CALCULATION_REQUEST')
export const currencyCalculationSuccess = createAction('CURRENCY_CALCULATION_SUCCESS')
export const currencyCalculationFail = createAction('CURRENCY_CALCULATION_FAIL')

export const currencyCalculation = (body) => (dispatch) => {
  dispatch(currencyCalculationRequest())
  return new Promise((resolve) => {
    return Api.CurrencyCalculation.currencyCalculationApi(body)
      .then(({data}) => {
        console.log('adfasdfasdffsadf', data)
        dispatch(currencyCalculationSuccess(data))
        resolve(data)
      })
      .catch((error) => {
        dispatch(currencyCalculationFail(error))
        resolve()
      })
  })
}
