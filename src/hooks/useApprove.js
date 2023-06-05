// Approve a Pool
import {useDispatch} from 'react-redux'
import {useCallback} from 'react'
import {approve} from '../utils/callHelpers'
import {updateUserAllowance} from '../actions/pools'

export const useSousApprove = (
  stakeTokenAddress,
  id,
  account,
  stakingPoolsData,
) => {
  const dispatch = useDispatch()
  const handleApprove = useCallback(async () => {
    try {
      if (id) {
        const pool = stakingPoolsData.find((pool) => pool.id === id)
        const tx = await approve(
          stakeTokenAddress,
          pool.stakeContractAddress,
          account,
        )
        dispatch(updateUserAllowance(id, account))
        return tx
      }
      return false
    } catch (e) {
      return false
    }
  }, [account, dispatch, stakeTokenAddress, id, stakingPoolsData])

  return {onApprove: handleApprove}
}
