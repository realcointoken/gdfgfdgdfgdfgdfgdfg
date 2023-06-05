import {isEmpty, has, get} from 'lodash'
import {handleActions} from 'redux-actions'

const initialState = {
  connectWallet: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  amountTokenAllowTransfer: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  approveToken: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  buyToken: {
    error: null,
    isConnect: false,
    requesting: false,
  },
  buyTokenProcess: {
    step: 1,
    amount: 0,
    approved: false,
    completed: false,
  },
  userAccount: {
    balance: 0,
    accounts: [],
    error: null,
    requesting: false,
    acceptTokenBalance: 0,
    acceptTokenAddress: null,
    acceptTokenSymbol: 'ETH',
    acceptTokenDecimals: 18,
  },
  chainId: '0x38',
  transactionLogs: {
    result: [],
  },
  redeemTokens: {
    error: null,
    result: null,
    requesting: false,
  },
}

export const user = handleActions(
  {
    SET_NETWORK: (state, {payload}) => ({
      ...state,
      chainId: payload,
    }),

    /** SET USER ACCOUNTS **/
    SET_USER_ACCOUNTS: (state, {payload}) => ({
      ...state,
      userAccount: {
        ...state.userAccount,
        accounts: has(payload, 'accounts')
          ? payload.accounts
          : state.userAccount.accounts,
        balance: has(payload, 'balance')
          ? payload.balance
          : state.userAccount.balance,
        acceptTokenBalance: has(payload, 'acceptTokenBalance')
          ? payload.acceptTokenBalance
          : state.userAccount.acceptTokenBalance,
        acceptTokenAddress: has(payload, 'acceptTokenAddress')
          ? payload.acceptTokenAddress
          : state.userAccount.acceptTokenAddress,
        acceptTokenSymbol: has(payload, 'acceptTokenSymbol')
          ? payload.acceptTokenSymbol
          : state.userAccount.acceptTokenSymbol,
        acceptTokenDecimals: has(payload, 'acceptTokenDecimals')
          ? payload.acceptTokenDecimals
          : state.userAccount.acceptTokenDecimals,
      },
      connectWallet: {
        ...state.connectWallet,
        ...{
          isConnect: has(payload, 'accounts')
            ? !isEmpty(payload.accounts)
            : !isEmpty(state.userAccount.accounts),
        },
      },
      chainId: has(payload, 'chainId') ? payload.chainId : state.chainId,
    }),

    /** CONNECT WALLET **/
    CONNECT_WALLET_REQUEST: (state) => ({
      ...state,
      connectWallet: {
        ...state.connectWallet,
        requesting: true,
      },
    }),
    CONNECT_WALLET_SUCCESS: (state) => ({
      ...state,
      connectWallet: {
        ...state.connectWallet,
        requesting: false,
        isConnect: true,
        error: null,
      },
    }),
    CONNECT_WALLET_FAIL: (state, {payload}) => ({
      ...state,
      connectWallet: {
        ...state.connectWallet,
        requesting: false,
        error: payload.error,
      },
    }),

    /* STORE TRANSACTION LOG */
    STORE_TRANSACTION_LOG: (state, {payload}) => ({
      ...state,
      transactionLogs: {
        result: [payload, ...state.transactionLogs.result],
      },
    }),

    /* CLEAR TRANSACTION LOGS */
    CLEAR_TRANSACTION_LOGS: (state, {payload}) => ({
      ...state,
      transactionLogs: {
        result: payload,
      },
    }),

    /* GET AMOUNT OF TOKEN ALLOW TRANSFER */
    GET_AMOUNT_TOKEN_ALLOW_TRANSFER_REQUEST: (state) => ({
      ...state,
      amountTokenAllowTransfer: {
        ...state.amountTokenAllowTransfer,
        requesting: true,
        error: null,
      },
    }),
    GET_AMOUNT_TOKEN_ALLOW_TRANSFER_SUCCESS: (state, {payload}) => ({
      ...state,
      amountTokenAllowTransfer: {
        ...state.amountTokenAllowTransfer,
        requesting: false,
        result: get(payload, 'data', 0),
        error: null,
      },
      buyTokenProcess: {
        ...state.buyTokenProcess,
        amount: get(payload, 'data', 0),
        // approved: Number(get(payload, 'data', 0)) > 0
      },
    }),
    GET_AMOUNT_TOKEN_ALLOW_TRANSFER_FAIL: (state, {payload}) => ({
      ...state,
      amountTokenAllowTransfer: {
        ...state.amountTokenAllowTransfer,
        requesting: false,
        error: payload,
      },
      buyTokenProcess: {
        ...state.buyTokenProcess,
        amount: 0,
        approved: false,
      },
    }),

    /* APPROVE TOKEN */
    APPROVE_TOKEN_REQUEST: (state) => ({
      ...state,
      approveToken: {
        ...state.approveToken,
        requesting: true,
        error: null,
      },
    }),
    APPROVE_TOKEN_SUCCESS: (state, {payload}) => ({
      ...state,
      approveToken: {
        ...state.approveToken,
        requesting: false,
        result: payload.data,
        error: null,
      },
      buyTokenProcess: {
        ...state.buyTokenProcess,
        approved: true,
      },
    }),
    APPROVE_TOKEN_FAIL: (state, {payload}) => ({
      ...state,
      approveToken: {
        ...state.approveToken,
        requesting: false,
        error: payload,
      },
    }),

    /* APPROVE TOKEN */
    BUY_TOKEN_REQUEST: (state) => ({
      ...state,
      buyToken: {
        ...state.buyToken,
        requesting: true,
        error: null,
      },
    }),
    BUY_TOKEN_SUCCESS: (state, {payload}) => ({
      ...state,
      buyToken: {
        ...state.buyToken,
        requesting: false,
        result: payload.data,
        error: null,
      },
      buyTokenProcess: {
        ...initialState.buyTokenProcess,
        completed: true,
        approved: false,
      },
    }),
    BUY_TOKEN_FAIL: (state, {payload}) => ({
      ...state,
      buyToken: {
        ...state.buyToken,
        requesting: false,
        error: payload,
      },
      buyTokenProcess: {
        ...state.buyTokenProcess,
        approved: false,
        completed: false,
      },
    }),
    REDEEM_TOKENS_REQUEST: (state) => ({
      ...state,
      redeemTokens: {
        ...state.redeemTokens,
        requesting: true,
      },
    }),
    REDEEM_TOKENS_SUCCESS: (state, {payload}) => ({
      ...state,
      redeemTokens: {
        ...state.redeemTokens,
        requesting: false,
        result: payload.data,
      },
    }),
    REDEEM_TOKENS_FAIL: (state, {payload}) => ({
      ...state,
      redeemTokens: {
        ...state.redeemTokens,
        requesting: false,
        result: null,
        error: payload.data,
      },
    }),
    CLEAR_USER_DATA_ON_DISCONNECT_METAMASK: () => ({
      ...initialState,
    }),
  },
  initialState,
)

export default user
