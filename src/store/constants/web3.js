import {ethers} from 'ethers'
import fromExponential from 'from-exponential'

import ethereum from '../../assets/img/blockchain_icons/ethereum.png'
import ethereumColorful from '../../assets/img/blockchain_icons/ethereumColorful.png'
import binance from '../../assets/img/blockchain_icons/binance.png'
import binanceColorful from '../../assets/img/blockchain_icons/binanceColorful.png'
import all from '../../assets/img/blockchain_icons/all.svg'

import {formatNumber} from '../../utils'

export const getAccountSymbol = (chainId) => {
  if (chainId === '0x38' || chainId === '0x61') {
    return 'BNB'
  }
  return 'ETH'
}

export const etherscanApiUrl = (chainId) => {
  const address = {
    '0x1': {
      url: 'https://api.etherscan.io/api',
      key: 'MD4RTDCE3VUR5UFY1D56D5G4CMB1BFH44T',
    },
    '0x3': {
      url: 'https://ropsten.etherscan.io/api',
      key: 'MD4RTDCE3VUR5UFY1D56D5G4CMB1BFH44T',
    },
    '0x38': {
      url: 'https://api.bscscan.com/api',
      key: 'SW3NDDQ817781FMEG27QAE93A79EUIJ3P2',
    },
    '0x61': {
      url: 'https://testnet.bscscan.com/api',
      key: 'SW3NDDQ817781FMEG27QAE93A79EUIJ3P2',
    },
  }
  return address[chainId] || address['0x1']
}

export const getProvider = (chainId) => {
  const address = {
    '0x1': 'wss://mainnet.infura.io/ws/v3/05916f0f9bca48b5ad8d86da6a377c8b',
    '0x3':
      'wss://restless-snowy-snowflake.ropsten.quiknode.pro/eaa781c59ad6621bb58f94a1c5fac1194ef72b7a/',
    '0x38': 'https://bsc-dataseed1.ninicoin.io',
    '0x61':
      'wss://apis.ankr.com/wss/121cde4b5d834755af4cb16f78ac189f/c884ce6f57bf677e1ecd607efe6df3b7/binance/full/test',
  }
  return address[chainId] || address['0x1']
}

export const getBlockchain = (chainId) => {
  if (['0x1', '0x3'].includes(chainId)) {
    return 'ethereum'
  }

  if (['0x38', '0x61'].includes(chainId)) {
    return 'bsc'
  }

  return 'polkadot'
}

export const getNameFromBlockchain = (blockchain) => {
  if (blockchain === 'ethereum') {
    return 'Ethereum'
  }
  if (blockchain === 'bsc') {
    return 'Binance Smart Chain'
  }
  return 'Polkadot'
}

export const getNameFromChainId = (chainId) => {
  let str = 'Polkadot'
  switch (chainId) {
    case '0x1':
      str = 'Ethereum'
      break
    case '0x3':
      str = 'Ethereum Testnet'
      break
    case '0x38':
      str = 'Binance Smart Chain'
      break
    case '0x61':
      str = 'Binance Smart Chain Testnet'
      break
    default:
      break
  }
  return str
}

export const getAcceptedToken = (project) => {
  if (!project.extraContractAcceptedTokenAddress) return {}
  return {
    address: project.extraContractAcceptedTokenAddress,
    name: project.extraAcceptedTokenName,
    symbol: project.extraAcceptedTokenSymbol,
    decimals: project.extraAcceptedTokenDecimals,
  }
}

export const defaultAcceptToken = (chainId) => {
  const address = {
    '0x1': {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      symbol: 'USDT',
      icon: ethereum,
      iconColorful: ethereumColorful,
    },
    '0x3': {
      address: '0xf7fbda3cee61a4c8445d654973ce62e6fb7c1eb5',
      symbol: 'USDT',
      icon: ethereum,
      iconColorful: ethereumColorful,
    },
    '0x38': {
      address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      symbol: 'BUSD',
      icon: binance,
      iconColorful: binanceColorful,
    },
    '0x61': {
      address: '0x8c1a1cc0c8108b1f19725eff45a72737f97494c0',
      symbol: 'BUSD',
      icon: binance,
      iconColorful: binanceColorful,
    },
  }
  return address[chainId] || address['0x1']
}

export const formatUnitsToString = (
  amount,
  decimals = 18,
  prefix = '',
  fixedAmount = 0,
) => {
  return formatNumber(
    ethers.utils.formatUnits(fromExponential(amount || 0), decimals),
    prefix,
    fixedAmount,
  )
}

export const formatUnits = (amount, decimals = 18) => {
  return ethers.utils.formatUnits(fromExponential(amount || 0), decimals)
}

export const viewTokenAddressUrl = (chainId, address) => {
  const urls = {
    '0x1': `https://etherscan.io/address/${address}`,
    '0x3': `https://ropsten.etherscan.io/address/${address}`,
    '0x38': `https://bscscan.com/address/${address}`,
    '0x61': `https://testnet.bscscan.com/address/${address}`,
  }
  return urls[chainId] || urls['0x1']
}
export const viewTXUrl = (chainId, hash) => {
  const urls = {
    '0x1': `https://etherscan.io/tx/${hash}`,
    '0x3': `https://ropsten.etherscan.io/tx/${hash}`,
    '0x38': `https://bscscan.com/tx/${hash}`,
    '0x61': `https://testnet.bscscan.com/tx/${hash}`,
  }
  return urls[chainId] || urls['0x1']
}

export const blockchainIcon = (chainId) => {
  const icon = {
    '0x0': {
      icon: all,
      iconColorful: all,
    },
    '0x1': {
      icon: ethereum,
      iconColorful: ethereumColorful,
    },
    '0x3': {
      icon: ethereum,
      iconColorful: ethereumColorful,
    },
    '0x38': {
      icon: binance,
      iconColorful: binanceColorful,
    },
    '0x61': {
      icon: binance,
      iconColorful: binanceColorful,
    },
  }
  return icon[chainId] || icon['0x1']
}
