import metamask from './img/metamask.png'
import walletconnect from './img/walletconnect.png'
import coinbase from './img/coinbase.png'
import formatic from './img/formatic.png'
import portis from './img/portis.png'
import tokenpocket from './img/tokenpocket.png'

export const PROVIDER_TYPES = {
  METAMASK: 'MetaMask',
  TRUSTWALLET: 'TrustWallet',
  WALLETCONNECT: 'WalletConnect',
  COINBASE: 'Coinbase Wallet',
  FORMATIC: 'Formatic',
  PORTIS: 'Portis',
  TOKENPOCKET: 'TokenPocket',
}

export const CONNECTION_TYPES = {
  metamask: 'metamask',
}

export const PROVIDER_ITEMS = [
  {
    name: PROVIDER_TYPES.METAMASK,
    connector: CONNECTION_TYPES.metamask,
    description: 'Easy to use browser extension.',
    picture: metamask,
  },
  {
    name: PROVIDER_TYPES.TRUSTWALLET,
    connector: CONNECTION_TYPES.metamask,
    description: '',
    picture: walletconnect,
  },
  {
    name: PROVIDER_TYPES.WALLETCONNECT,
    connector: '',
    description: '',
    picture: walletconnect,
  },
  {
    name: PROVIDER_TYPES.COINBASE,
    connector: '',
    description: '',
    picture: coinbase,
  },
  {
    name: PROVIDER_TYPES.FORMATIC,
    connector: '',
    description: '',
    picture: formatic,
  },
  {
    name: PROVIDER_TYPES.PORTIS,
    connector: '',
    description: '',
    picture: portis,
  },

  {
    name: PROVIDER_TYPES.TOKENPOCKET,
    connector: CONNECTION_TYPES.metamask,
    description: '',
    picture: tokenpocket,
  },
]
