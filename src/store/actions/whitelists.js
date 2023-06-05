import {createAction} from 'redux-actions'
import http from '../api/http'

const fetchWhitelistRequest = createAction('FETCH_WHITELISTS_REQUEST')
const fetchWhitelistSuccess = createAction('FETCH_WHITELISTS_SUCCESS')
const fetchWhitelistFail = createAction('FETCH_WHITELISTS_FAIL')
export const getWhitelists =
  (projectId, walletAddress) => (dispatch, getState) => {
    dispatch(fetchWhitelistRequest())
    try {
      http
        .get(
          `/Whitelists/detail?projectId=${projectId}&walletAddress=${walletAddress}`,
        )
        .then((res) => {
          dispatch(fetchWhitelistSuccess(res?.data ?? {}))
        })
    } catch (error) {
      dispatch(fetchWhitelistFail(error))
    }
  }
