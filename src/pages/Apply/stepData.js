import stepOneActive from './img/step-status/step-1-active.png'
import stepOneDeactive from './img/step-status/step-1-deactive.png'
import stepTwoActive from './img/step-status/step-2-active.png'
import stepTwoDeactive from './img/step-status/step-2-deactive.png'
import stepThreeActive from './img/step-status/step-3-active.png'
import stepThreeDeactive from './img/step-status/step-3-deactive.png'
import stepFourActive from './img/step-status/step-4-active.png'
import stepFourDeactive from './img/step-status/step-4-deactive.png'
import stepFiveActive from './img/step-status/step-5-active.png'
import stepFiveDeactive from './img/step-status/step-5-deactive.png'
import stepSixActive from './img/step-status/step-6-active.png'
import stepSixDeactive from './img/step-status/step-6-deactive.png'

import etheeum from './img/blockchain/eth.png'
import binance from './img/blockchain/binance.png'
import polygon from './img/smartcontract/polygon.svg'
import avalanche from './img/smartcontract/avalanche.svg'
// import polkadot from './img/blockchain/polkadot.png';

export const stepsData = [
  {
    title: 'Basic Details',
    key: 'basicDetails',
    iconActive: stepOneActive,
    iconDeactive: stepOneDeactive,
  },
  {
    title: 'Project Information',
    key: 'projectName',
    iconActive: stepTwoActive,
    iconDeactive: stepTwoDeactive,
  },

  {
    title: 'Project Details',
    key: 'productDetails',
    iconActive: stepThreeActive,
    iconDeactive: stepThreeDeactive,
  },

  {
    title: 'Blockchain',
    key: 'blockchain',
    iconActive: stepFourActive,
    iconDeactive: stepFourDeactive,
  },
  {
    title: 'Project Description',
    key: 'poolInformation',
    iconActive: stepFiveActive,
    iconDeactive: stepFiveDeactive,
  },
  {
    title: 'Resources',
    key: 'resources',
    iconActive: stepSixActive,
    iconDeactive: stepSixDeactive,
  },
]

export const blockchainData = [
  {
    title: 'Ethereum',
    icon: etheeum,
    value: 'Ethereum',
    id: 3,
    stableCoin: 'USDT',
  },
  {
    title: 'Binance Smat Chain',
    icon: binance,
    value: 'Binance Smart Chain',
    id: 97,
    stableCoin: 'BUSD',
  },
  {
    title: 'Avalanche',
    icon: avalanche,
    value: 'Avalanche                            ',
    id: 43113,
    stableCoin: 'USDC',
  },
  {
    title: 'Polygon',
    icon: polygon,
    value: 'Polygon',
    id: 80001,
    stableCoin: 'USDC',
  },
  // {
  //   title: 'Polkadot',
  //   icon: polkadot,
  //   value: 'polkadot'
  // }
]
