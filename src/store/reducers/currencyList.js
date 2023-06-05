import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const currencyList = handleActions(
  {
    CURRENCY_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    CURRENCY_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    CURRENCY_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default currencyList
