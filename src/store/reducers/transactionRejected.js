import {handleActions} from 'redux-actions'

const initialState = {
  response: null,
}

const transactionRejected = handleActions(
  {
    TRANSACTION_REJECTED_REQUEST: (state) => ({
      ...state,
      response: {
        ...state.response,
      },
    }),
    TRANSACTION_REJECTED_SUCCESS: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
    TRANSACTION_REJECTED_FAIL: (state, {payload}) => ({
      ...state,
      response: payload.data,
    }),
  },
  initialState,
)

export default transactionRejected
