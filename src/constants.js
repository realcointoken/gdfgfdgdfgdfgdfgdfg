import ethereum from './assets/img/blockchain_icons/ethereum.png'
import ethereumColorful from './assets/img/blockchain_icons/ethereumColorful.png'
import binance from './assets/img/blockchain_icons/binance.png'
import binanceColorful from './assets/img/blockchain_icons/binanceColorful.png'
import polkadot from './assets/img/blockchain_icons/polkadot.png'
import polkadotColorful from './assets/img/blockchain_icons/polkadotColorful.png'
import all from './assets/img/blockchain_icons/all.svg'
import bnb from './assets/img/acceptable_tokens/binance.png'
import {blockchainIcon} from './store/constants/web3'

export const BLOCKCHAIN_TYPES = {
  ALL: 'All Blockchain',
  ETHEREUM: 'Ethereum',
  BINANCE: 'Binance Smart Chain',
  POLKADOT: 'Polkadot',
}

export const BLOCKCHAINS_TYPES = [
  {name: 'All Blockchain', slug: 'all', label: '', chainId: '0x0'},
  {name: 'Ethereum', slug: 'ethereum', label: 'Ethereum', chainId: '0x1'},
  {name: 'Binance Smart Chain', slug: 'bsc', label: 'Binance', chainId: '0x38'},
  // { name: 'Polkadot', slug: 'polkadot' }
]

export const BLOCKCHAIN_SLUGS = {
  [BLOCKCHAIN_TYPES.ALL]: '',
  [BLOCKCHAIN_TYPES.ETHEREUM]: 'ethereum',
  [BLOCKCHAIN_TYPES.BINANCE]: 'bsc',
  [BLOCKCHAIN_TYPES.POLKADOT]: 'polkadot',
}

export const BLOCKCHAIN_SYMBOLS = {
  [BLOCKCHAIN_TYPES.ALL]: '',
  [BLOCKCHAIN_TYPES.ETHEREUM]: 'ETH',
  [BLOCKCHAIN_TYPES.BINANCE]: 'BSC',
  [BLOCKCHAIN_TYPES.POLKADOT]: 'DOT',
}

export const BLOCKCHAIN_ICONS = {
  [BLOCKCHAIN_TYPES.ALL]: {
    icon: all,
  },
  [BLOCKCHAIN_TYPES.ETHEREUM]: {
    icon: ethereum,
    iconColorful: ethereumColorful,
  },
  [BLOCKCHAIN_TYPES.BINANCE]: {
    icon: binance,
    iconColorful: binanceColorful,
  },
  [BLOCKCHAIN_TYPES.POLKADOT]: {
    icon: polkadot,
    iconColorful: polkadotColorful,
  },
}

export const BLOCKCHAIN_TYPES_LIST = BLOCKCHAINS_TYPES.map((item) => ({
  name: item.name,
  slug: item.slug,
  label: item.label,
  ...blockchainIcon(item.chainId),
}))

export const LOADING_STATUSES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
}

export const ACCEPTED_TOKENS = {
  BNB: 'BNB',
  ETH: 'ETH',
}

export const ACCEPTED_TOKEN_ICONS = {
  [ACCEPTED_TOKENS.BNB]: bnb,
  [ACCEPTED_TOKENS.ETH]: ethereumColorful,
}
