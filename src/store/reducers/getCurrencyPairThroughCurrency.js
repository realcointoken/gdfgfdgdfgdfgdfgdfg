import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const getCurrencyPairThroughCurrency = handleActions(
  {
    GET_CURRENCY_PAIR_THROUGH_CURRENCY_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    GET_CURRENCY_PAIR_THROUGH_CURRENCY_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload,
    }),
    GET_CURRENCY_PAIR_THROUGH_CURRENCY_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default getCurrencyPairThroughCurrency
