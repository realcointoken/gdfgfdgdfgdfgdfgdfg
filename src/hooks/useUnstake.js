import {useCallback} from 'react'
import {sousUnstake} from '../utils/callHelpers'
import {useSousChef} from './useContract'
import {useDispatch} from 'react-redux'
import {
  updateUserBalance,
  updateUserPendingReward,
  updateUserStakedBalance,
} from '../actions/pools'

export const useSousUnstake = (sousId, account, pid, stakingPoolsData) => {
  const dispatch = useDispatch()
  const sousChefContract = useSousChef(sousId, stakingPoolsData)

  const handleUnstake = useCallback(
    async (amount, decimals) => {
      await sousUnstake(sousChefContract, amount, decimals, account, pid)
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, sousChefContract, sousId, pid],
  )

  return {onUnstake: handleUnstake}
}
