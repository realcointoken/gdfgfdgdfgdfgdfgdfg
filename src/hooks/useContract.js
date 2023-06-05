import {useMemo} from 'react'
import useWeb3 from './useWeb3'
import {getSouschefContract} from '../utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useSousChef = (id, stakingPoolsData) => {
  const web3 = useWeb3()
  return useMemo(
    () => getSouschefContract(id, stakingPoolsData, web3),
    [id, stakingPoolsData, web3],
  )
}
