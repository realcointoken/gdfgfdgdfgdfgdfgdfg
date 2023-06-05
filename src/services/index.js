import fakeUpcoming from '../data/fakeUpcomingPools'
import fakeCompleted from '../data/fakeCompletedPools'
import fakePoolData from '../data/fakePoolData'
import fakeWalletData from '../data/fakeWalletData'

const DELAY = 1000 // artificial delay

export function getUpcomingPools(blockchainType) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeUpcoming), DELAY),
  )
}

export function getCompletedPools(blockchainType) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeCompleted), DELAY),
  )
}

export function getPoolData(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakePoolData), DELAY),
  )
}

export function connect(data) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(fakeWalletData), DELAY),
  )
}
