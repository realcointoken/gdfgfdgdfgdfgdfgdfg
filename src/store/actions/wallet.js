import {createActions, createAction} from 'redux-actions'
import {get} from 'lodash'

import Api from '../api'
import launchXAbi from '../constants/launchXContractAbi.json'

export const {walletConnectRequest, walletConnectSuccess, walletConnectFail} =
  createActions({
    WALLET_CONNECT_REQUEST: () => {},
    WALLET_CONNECT_SUCCESS: (data) => ({data}),
    WALLET_CONNECT_FAIL: (error) => ({error}),
  })

export const walletConnect = (body) => (dispatch) => {
  dispatch(walletConnectRequest())
  return Api.Wallet.walletConnect(body)
    .then(({data}) => {
      return dispatch(walletConnectSuccess(data))
    })
    .catch((error) => {
      return dispatch(walletConnectFail(error))
    })
}

const {checkWhitelistRequest, checkWhitelistSuccess, checkWhitelistFail} =
  createActions({
    CHECK_WHITELIST_REQUEST: () => {},
    CHECK_WHITELIST_SUCCESS: (data) => ({data}),
    CHECK_WHITELIST_FAIL: (error) => ({error}),
  })

export const checkWhitelist = (body) => (dispatch) => {
  dispatch(checkWhitelistRequest())
  return Api.Wallet.checkWhitelist(body)
    .then(({data}) => {
      const {inWhitelist} = data
      console.log('vo ne::', inWhitelist)
      return dispatch(checkWhitelistSuccess(inWhitelist))
    })
    .catch((error) => {
      return dispatch(checkWhitelistFail(error))
    })
}
export const setIsWhiteList = createAction('SET_IS_WHITELIST')
export const setRewardedAmount = createAction('SET_REWARDED_AMOUNT')
export const setRedeemed = createAction('SET_REDEEMED')
export const setAmount = createAction('SET_AMOUNT')
export const setMaxPayableAmount = createAction('SET_MAX_PAYABLE_AMOUNT')
export const setMaxAllocation = createAction('SET_MAX_ALLOCATION')

const {
  fetchWhitelistFromContractRequest,
  fetchWhitelistFromContractSuccess,
  fetchWhitelistFromContractFail,
} = createActions({
  FETCH_WHITELIST_FROM_CONTRACT_REQUEST: () => {},
  FETCH_WHITELIST_FROM_CONTRACT_SUCCESS: (data) => ({data}),
  FETCH_WHITELIST_FROM_CONTRACT_FAIL: (error) => ({error}),
})

export const fetchWhitelistFromContract =
  (address, smartContractAddress) => async (dispatch) => {
    dispatch(fetchWhitelistFromContractRequest())
    if (window.web3) {
      try {
        if (address) {
          const launchXContract = new window.web3.eth.Contract(
            launchXAbi,
            smartContractAddress,
          )

          return launchXContract.methods['getWhitelist'](address)
            .call()
            .then((whitelistRes) => {
              const whitelist = get(whitelistRes, '_whitelist', false)
              const rewardedAmount = get(whitelistRes, '_rewardedAmount', '0')
              const redeemed = get(whitelistRes, '_redeemed', false)
              const amount = get(whitelistRes, '_amount', '0')
              const maxPayableAmount = get(
                whitelistRes,
                '_maxPayableAmount',
                '0',
              )
              dispatch(setIsWhiteList(whitelist))
              dispatch(setRewardedAmount(rewardedAmount))
              dispatch(setRedeemed(redeemed))
              dispatch(setAmount(amount))
              dispatch(setMaxPayableAmount(maxPayableAmount))
              dispatch(fetchWhitelistFromContractSuccess(whitelistRes))
            })
            .catch((e) => {
              dispatch(fetchWhitelistFromContractFail(e.toString()))
              dispatch(setIsWhiteList(false))
              dispatch(setRewardedAmount(0))
              dispatch(setRedeemed(false))
              dispatch(setAmount(0))
              dispatch(setMaxPayableAmount(0))
            })
        }
      } catch (error) {
        dispatch(fetchWhitelistFromContractFail(error.toString()))
      }
    }
  }
