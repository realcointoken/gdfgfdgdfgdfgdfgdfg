import {handleActions} from 'redux-actions'

const initialState = {
  response: {},
}

const currencyCalculation = handleActions(
  {
    CURRENCY_CALCULATION_REQUEST: (state) => ({
      ...state,
      response: {}
    }),
    CURRENCY_CALCULATION_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    CURRENCY_CALCULATION_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default currencyCalculation
