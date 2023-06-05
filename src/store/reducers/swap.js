import {handleActions} from 'redux-actions'

const initialState = {
  response: null,
}

const swap = handleActions(
  {
    SWAP_REQUEST: (state) => ({
      ...state,
      response: {
        ...state.response,
      },
    }),
    SWAP_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    SWAP_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default swap
