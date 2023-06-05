import * as common from './common'
import * as user from './user'
import * as wallet from './wallet'
import * as project from './project'
import * as applications from './applications'
import * as signup from './signup'
import * as login from './login'
import * as logout from './logout'
import * as currencyList from './currencyList'
import * as currencyCalculation from './currencyCalculation'
import * as current from './current'
import * as swap from './swap'
import * as kycRegister from './kycRegister'
import * as kycGet from './getkyc'
import * as blockchain from './allBlockchain'
import * as whiteLabelList from './whiteListLabelList'
import * as addwhiteLabelList from './addWhiteLabelList'
import * as addLiquidity from './addLiquidity'
import * as verifyEmail from './verifyEmail'
import * as getCurrencyPairThroughCurrency from './getCurrencyPairThroughCurrency'
import * as transactionRejected from './transactionRejected'
import * as liquidityCalculation from './liquidityCalculation'
import * as fractal from './fractal'
import * as getAllInvestmentByProjectId from './getAllInvestmentbyProjectId'

export default {
  ...common,
  ...user,
  ...wallet,
  ...project,
  ...applications,
  ...signup,
  ...login,
  ...logout,
  ...currencyList,
  ...currencyCalculation,
  ...swap,
  ...kycRegister,
  ...kycGet,
  ...blockchain,
  ...whiteLabelList,
  ...addwhiteLabelList,
  ...current,
  ...addLiquidity,
  ...verifyEmail,
  ...getCurrencyPairThroughCurrency,
  ...transactionRejected,
  ...liquidityCalculation,
  ...fractal,
  ...getAllInvestmentByProjectId,
}
