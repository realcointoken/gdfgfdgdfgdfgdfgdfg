import React from 'react'

export const AppContextType = React.createContext({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isReady: false,

  navigationLoading: false,
  setNavigationLoading: () => {},

  connectToWalletModalVisible: false,
  setConnectToWalletModalVisible: () => {},

  wrongNetworkVisible: false,
  setWrongNetworkVisible: () => {},
})

export const UserContextType = React.createContext({
  isConnected: false,
  requestingConnection: false,
  balance: 0,
  address: null,
  symbol: '',
  setIsConnected: () => {},
  connect: () => {},
})

export const PoolDataContextType = React.createContext({
  load: () => {},
  loaded: false,

  setBlockchainType: () => {},
  selectedBlockchainType: null,

  blockchainTypes: [],
  requestingBlockchainTypes: false,
  getBlockchainTypes: () => {},

  upcomingPools: [],
  requestingUpcomingPools: false,
  getBUpcomingPools: () => {},

  completedPools: [],
  requestingCompletedPools: false,
  getBCompletedPools: () => {},
})
