import {useCallback} from 'react'
import {soushHarvest} from '../utils/callHelpers'
import {useSousChef} from './useContract'
import {useDispatch} from 'react-redux'
import {updateUserBalance, updateUserPendingReward} from '../actions/pools'

export const useSousHarvest = (sousId, account, stakingPoolsData) => {
  const dispatch = useDispatch()
  const sousChefContract = useSousChef(sousId, stakingPoolsData)

  const handleHarvest = useCallback(async () => {
    await soushHarvest(sousChefContract, account)
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, sousChefContract, sousId])

  return {onReward: handleHarvest}
}
