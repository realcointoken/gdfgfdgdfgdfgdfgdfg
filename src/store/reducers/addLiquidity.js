import {handleActions} from 'redux-actions'

const initialState = {
  response: [],
}

const addLiquidity = handleActions(
  {
    ADD_LIQUIDITY_REQUEST: (state) => ({
      ...state,
      response: [],
    }),
    ADD_LIQUIDITY_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload,
    }),
    ADD_LIQUIDITY_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default addLiquidity
