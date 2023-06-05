import {useCallback} from 'react'
import {sousStake} from '../utils/callHelpers'
import {useSousChef} from './useContract'
import {useDispatch} from 'react-redux'
import {updateUserBalance, updateUserStakedBalance} from '../actions/pools'

export const useSousStake = (sousId, account, pid, stakingPoolsData) => {
  const dispatch = useDispatch()
  const sousChefContract = useSousChef(sousId, stakingPoolsData)

  const handleStake = useCallback(
    async (amount, decimals) => {
      await sousStake(sousChefContract, amount, decimals, account, pid)
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, sousChefContract, sousId, pid],
  )

  return {onStake: handleStake}
}
