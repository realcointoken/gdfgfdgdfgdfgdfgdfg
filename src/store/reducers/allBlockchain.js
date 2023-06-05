import {handleActions} from 'redux-actions'

const initialState = {
  blockchainData: null,
}

const blockchain = handleActions(
  {
    BLOCKCHAIN_REQUEST: (state) => ({
      ...state,
      blockchainData: null,
    }),
    BLOCKCHAIN_SUCCESS: (state, {payload}) => ({
      ...state,
      blockchainData: payload.data,
    }),
    BLOCKCHAIN_FAIL: (state, {payload}) => ({
      ...state,
      blockchainData: payload.data,
    }),
    LOGIN_REQUEST_CLEAR: (state) => ({
      ...state,
      authResponse: null,
    }),
  },
  initialState,
)

export default blockchain
