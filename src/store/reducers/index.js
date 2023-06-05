import localForage from 'localforage'
import {persistReducer} from 'redux-persist'
import common from './common'
import user from './user'
import wallet from './wallet'
import project from './project'
import applications from './applications'
import whitelists from './whitelists'
import signup from './signup'
import login from './login'
import logout from './logout'
import currencyList from './currencyList'
import currencyCalculation from './currencyCalculation'
import swap from './swap'
import kycRegister from './kycRegister'
import kycGet from './getkyc'
import blockchain from './allBlockchain'
import whiteLabelList from './whiteLableList'
import addWhitelableList from './addWhiteLabelList'
import current from './current'
import addLiquidity from './addLiquidity'
import verifyEmail from './verifyEmail'
import getCurrencyPairThroughCurrency from './getCurrencyPairThroughCurrency'
import transactionRejected from './transactionRejected'
import liquidityCalculation from './liquidityCalculation'
import fractal from './fractal'
import getAllInvestmentbyProjectId from './getAllInvestmentbyProjectId'
import GetAllinvestmentreducer from './GetAllinvestmentreducer'

const commonConfig = {
  key: 'common',
  storage: localForage,
  whitelist: ['count'],
}

const userConfig = {
  key: 'user',
  storage: localForage,
  whitelist: ['userAccount', 'transactionLogs', 'chainId'],
}

const loginConfig = {
  key: 'login',
  storage: localForage,
}

const fractalConfig = {
  key: 'fractal',
  storage: localForage,
}

const reducers = {
  common: persistReducer(commonConfig, common),
  user: persistReducer(userConfig, user),
  wallet,
  project,
  applications,
  whitelists,
  signup,
  login: persistReducer(loginConfig, login),
  logout,
  currencyList,
  currencyCalculation,
  current,
  swap,
  kycRegister,
  kycGet,
  blockchain,
  whiteLabelList,
  addWhitelableList,
  addLiquidity,
  verifyEmail,
  getCurrencyPairThroughCurrency,
  transactionRejected,
  liquidityCalculation,
  fractal: persistReducer(fractalConfig, fractal),
  getAllInvestmentbyProjectId,
  GetAllinvestment: GetAllinvestmentreducer,
}

export default reducers
