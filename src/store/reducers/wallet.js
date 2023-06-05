import {handleActions} from 'redux-actions'

const initialState = {
  connected: {
    requesting: false,
    result: null,
    error: null,
  },
  checkWhitelist: {
    requesting: false,
    result: null,
    error: null,
  },
  checkWhitelistContract: {
    requesting: false,
    result: null,
    error: null,
  },
  isWhitelist: false,
  rewardedAmount: 0,
  redeemed: false,
  amount: 0,
  maxPayableAmount: 0,
  maxAllocation: 0,
}

export const wallet = handleActions(
  {
    WALLET_CONNECT_REQUEST: (state) => ({
      ...state,
      connected: {
        ...state.connected,
        requesting: true,
        error: null,
      },
    }),
    WALLET_CONNECT_SUCCESS: (state, {payload}) => ({
      ...state,
      connected: {
        ...state.connected,
        requesting: false,
        error: null,
        result: payload.data,
      },
    }),
    WALLET_CONNECT_FAIL: (state, {payload}) => ({
      ...state,
      connected: {
        ...state.connected,
        requesting: false,
        error: payload.error,
      },
    }),
    CHECK_WHITELIST_REQUEST: (state) => ({
      ...state,
      checkWhitelist: {
        ...state.checkWhitelist,
        requesting: true,
        error: null,
      },
    }),
    CHECK_WHITELIST_SUCCESS: (state, {payload}) => ({
      ...state,
      checkWhitelist: {
        ...state.checkWhitelist,
        requesting: false,
        error: null,
        result: payload.data,
      },
      isWhitelist: payload.data,
    }),
    CHECK_WHITELIST_FAIL: (state, {payload}) => ({
      ...state,
      checkWhitelist: {
        ...state.checkWhitelist,
        requesting: false,
        error: payload.error,
      },
    }),
    FETCH_WHITELIST_FROM_CONTRACT_REQUEST: (state) => ({
      ...state,
      checkWhitelistContract: {
        ...state.checkWhitelistContract,
        requesting: true,
        error: null,
      },
    }),
    FETCH_WHITELIST_FROM_CONTRACT_SUCCESS: (state, {payload}) => ({
      ...state,
      checkWhitelistContract: {
        ...state.checkWhitelistContract,
        requesting: false,
        error: null,
        result: payload.data,
      },
    }),
    FETCH_WHITELIST_FROM_CONTRACT_FAIL: (state, {payload}) => ({
      ...state,
      checkWhitelistContract: {
        ...state.checkWhitelistContract,
        requesting: false,
        error: payload.error,
      },
    }),
    SET_IS_WHITELIST: (state, {payload}) => ({
      ...state,
      isWhitelist: payload,
    }),
    SET_REWARDED_AMOUNT: (state, {payload}) => ({
      ...state,
      rewardedAmount: payload,
    }),
    SET_REDEEMED: (state, {payload}) => ({
      ...state,
      redeemed: payload,
    }),
    SET_AMOUNT: (state, {payload}) => ({
      ...state,
      amount: payload,
    }),
    SET_MAX_PAYABLE_AMOUNT: (state, {payload}) => ({
      ...state,
      maxPayableAmount: payload,
    }),
    SET_MAX_ALLOCATION: (state, {payload}) => ({
      ...state,
      maxAllocation: payload,
    }),
    CLEAR_USER_DATA_ON_DISCONNECT_METAMASK: () => ({
      ...initialState,
    }),
  },
  initialState,
)

export default wallet
