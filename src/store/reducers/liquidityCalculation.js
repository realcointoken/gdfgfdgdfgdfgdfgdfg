import {handleActions} from 'redux-actions'

const initialState = {
  response: null,
}

const liquidityCalculation = handleActions(
  {
    LIQUIDITY_CALCULATION_REQUEST: (state) => ({
      ...state,
      response: {
        ...state.response,
      },
    }),
    LIQUIDITY_CALCULATION_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    LIQUIDITY_CALCULATION_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default liquidityCalculation
