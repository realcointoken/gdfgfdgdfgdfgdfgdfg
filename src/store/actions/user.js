import Web3 from 'web3'
import {filter, get, isEmpty} from 'lodash'
import {createAction, createActions} from 'redux-actions'
import detectEthereumProvider from '@metamask/detect-provider'
import {ethers} from 'ethers'
import tokenAbi from 'human-standard-token-abi'
import fromExponential from 'from-exponential'
import {fetchWhitelistFromContract, walletConnect} from './wallet'
import {defaultAcceptToken, formatUnits, getBlockchain} from '../constants/web3'
import launchXAbi from '../constants/launchXContractAbi.json'
import Api from '../api'
import ustdAbi from '../constants/ustdAbi.json'
import idoTokenSaleAbi from '../constants/idoTokenSaleAbi.json'
import {reconnectProject, listenChangeProjects} from './project'
import {nodes, testNodes} from '../../utils/getRpcUrl'
import {APPROVE_TOKEN_DATA} from '../../constants/index'
import NotificationAlert from '../../components/NotificationAlert'
import {logout} from './logout'
import {loginRequestClear} from './login'
import localForage from 'localforage'
import http from '../../store/api/http'
import {addWhiteLabelList} from '../actions/addWhiteLabelList'
import Blockchain from '../api/allBlockchain'

var blockchainList = []

// Will use it later
// import tokenAbi from 'human-standard-token-abi';

/** SET NETWORK **/
export const setNetwork = createAction('SET_NETWORK')

/** SET USER ACCOUNTS **/
export const setUserAccounts = createAction('SET_USER_ACCOUNTS')

/* CLEAR USER DATA ON DISCONNECT METAMASK */
export const clearUserDataOnDisconnectMetamask = createAction(
  'CLEAR_USER_DATA_ON_DISCONNECT_METAMASK',
)

/** CONNECT TO METAMASK **/
const {connectWalletRequest, connectWalletSuccess, connectWalletFail} =
  createActions({
    CONNECT_WALLET_REQUEST: () => {},
    CONNECT_WALLET_SUCCESS: (data) => ({data}),
    CONNECT_WALLET_FAIL: (error) => ({error}),
  })

export const switchNetwork = (poolChainId) => {
  if (window.ethereum) {
    const chainId = parseInt(poolChainId)
    try {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Binance Smart Chain Mainnet',
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18,
            },
            rpcUrls: chainId === 56 ? nodes : testNodes,
            blockExplorerUrls: [
              chainId === 56
                ? 'https://bscscan.com/'
                : 'https://testnet.bscscan.com/',
            ],
          },
        ],
      })
      return true
    } catch (e) {
      return false
    }
  }
  return false
}

export const connectMetaMask = () => async (dispatch) => {
  dispatch(connectWalletRequest())

  // Check metamask is install or not
  if (window.ethereum) {
    const provider = await detectEthereumProvider()
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      window.web3 = new Web3(provider)
    } else {
      window.web3 = new Web3(window.ethereum)
    }

    return window.ethereum
      .request({method: 'eth_requestAccounts'})
      .then(async () => {
        const listenProjects = get(window, 'listenProjects', {})
        if (!isEmpty(listenProjects)) {
          Object.keys(listenProjects).forEach(
            (key) => delete listenProjects[key],
          )
        }
        const chainId = window.ethereum.chainId
        const accounts = await window.web3.eth.getAccounts()
        console.log('accounts balance chainId ', chainId)
        const balance = await window.web3.eth.getBalance(accounts[0])
        dispatch(connectWalletSuccess())

        const blockchain = getBlockchain(chainId)

        return Blockchain.getAllBlockChain()
          .then(async (res) => {
            blockchainList = res.data.data
            if (
              blockchainList.length > 0 &&
              blockchainList.filter((e) => e.chainID === parseInt(chainId))
                .length > 0
            ) {
              console.log('working herer')
              // window.location.reload()

              const storeWalletBody = {
                walletAddress: accounts[0],
                blockchain,
              }
              dispatch(walletConnect(storeWalletBody))
              try {
                const acceptToken = defaultAcceptToken(chainId)
                const {address: acceptTokenAddress, symbol: acceptTokenSymbol} =
                  acceptToken

                const acceptTokenBalance = await Api.User.fetchUserTokenBalance(
                  acceptTokenAddress,
                  accounts[0],
                )
                const decimals = await Api.User.fetchTokenDecimals(
                  acceptTokenAddress,
                )

                dispatch(
                  setUserAccounts({
                    accounts,
                    balance,
                    chainId,
                    acceptTokenBalance: ethers.utils.formatUnits(
                      String(acceptTokenBalance),
                      decimals,
                    ),
                    acceptTokenAddress,
                    acceptTokenSymbol,
                    acceptTokenDecimals: decimals,
                  }),
                )

                dispatch(listenChangeProjects())
              } catch (e) {}
              return true
            } else {
              console.log('clearing')
              dispatch(clearUserDataOnDisconnectMetamask())
              // dispatch(logout())
              // dispatch(loginRequestClear())
              return false
            }
            // return false
          })
          .catch((error) => {
            
            console.log('error', error)
          })
      })
      .catch((error) => {
        console.log('error::::', error)
        dispatch(connectWalletFail(error))
        return false
      })
  }
}

export const autoConnect = () => async (dispatch) => {
  console.log('auto connect working')
  if (window.ethereum) {
    const provider = await detectEthereumProvider()
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      window.web3 = new Web3(provider)
    } else {
      window.web3 = new Web3(window.ethereum)
    }

    window.ethereum.request({method: 'eth_chainId'}).then((chainId) => {
      const listenProjects = get(window, 'listenProjects', {})
      if (!isEmpty(listenProjects)) {
        Object.keys(listenProjects).forEach((key) => delete listenProjects[key])
      }
      // Set network when first time enter page
      dispatch(setNetwork(chainId))
    })

    window.ethereum.request({method: 'eth_accounts'}).then((accounts) => {
      const chainId = window.ethereum.chainId

      Blockchain.getAllBlockChain()
        .then((res) => {
          blockchainList = res.data.data

          if (
            blockchainList.length > 0 &&
            blockchainList.filter((e) => e.chainID === parseInt(chainId))
              .length > 0
          ) {
            console.log('chain iddd acc', chainId)
            const listenProjects = get(window, 'listenProjects', {})
            if (!isEmpty(listenProjects)) {
              Object.keys(listenProjects).forEach(
                (key) => delete listenProjects[key],
              )
            }
            if (isEmpty(accounts)) {
              dispatch(setUserAccounts({accounts: [], balance: 0}))
            } else {
              dispatch(setUserAccounts({accounts}))
              window.web3.eth
                .getBalance(accounts[0])
                .then((balance) => dispatch(setUserAccounts({balance})))
            }

            dispatch(listenChangeProjects())
            // check if user loged in. if not login user
          } else {
            console.log('change chainID error')
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    })

    window.ethereum &&
      window.ethereum.on('accountsChanged', async (accounts) => {
        console.log('account changing', accounts)
        const chainId = window.ethereum.chainId
        Blockchain.getAllBlockChain()
          .then(async (res) => {
            blockchainList = res.data.data

            if (
              blockchainList.length > 0 &&
              blockchainList.filter((e) => e.chainID === parseInt(chainId))
                .length > 0
            ) {
              const accounts = await window.web3.eth.getAccounts()
              const whiteLablePayload = {
                Address: accounts[0],
                BlockchainChainId: parseInt(chainId),
              }
              console.log('Data send', whiteLablePayload)
              dispatch(addWhiteLabelList(whiteLablePayload))

              const listenProjects = get(window, 'listenProjects', {})
              if (!isEmpty(listenProjects)) {
                Object.keys(listenProjects).forEach(
                  (key) => delete listenProjects[key],
                )
              }
              dispatch(setUserAccounts({accounts}))
              if (!accounts || !accounts[0]) {
                dispatch(clearUserDataOnDisconnectMetamask())
              } else {
                dispatch(reconnectProject())
              }

              dispatch(listenChangeProjects())
            }
          })
          .catch((error) => {
            console.log('error', error)
          })
      })
    window.ethereum &&
      window.ethereum.on('chainChanged', async (chainId) => {
        console.log('chainChanged............')

        Blockchain.getAllBlockChain()
          .then(async (res) => {
            blockchainList = res.data.data

            if (
              blockchainList.length > 0 &&
              blockchainList.filter((e) => e.chainID === parseInt(chainId))
                .length > 0
            ) {
              console.log('window.location.href', window.location.pathname)
              if (
                window.location.pathname == '/swap' ||
                window.location.pathname == '/liquidity' ||
                window.location.pathname.includes('/pooldetail') ||
                window.location.pathname.includes('/staking')
              )
                window.location.reload()
              const accounts = await window.web3.eth.getAccounts()
              const whiteLablePayload = {
                Address: accounts[0],
                BlockchainChainId: parseInt(chainId),
              }
              console.log('Data send', whiteLablePayload)
              dispatch(addWhiteLabelList(whiteLablePayload))

              console.log('chain iddd', chainId)
              window.web3 = new Web3(window.ethereum)
              const listenProjects = get(window, 'listenProjects', {})
              if (!isEmpty(listenProjects)) {
                Object.keys(listenProjects).forEach(
                  (key) => delete listenProjects[key],
                )
              }
              let balance

              dispatch(setNetwork(chainId))

              if (accounts && accounts[0]) {
                balance = await window.web3.eth.getBalance(accounts[0])
                const acceptToken = defaultAcceptToken(chainId)
                const {address: acceptTokenAddress, symbol: acceptTokenSymbol} =
                  acceptToken

                const acceptTokenBalance = await Api.User.fetchUserTokenBalance(
                  acceptTokenAddress,
                  accounts[0],
                )
                const decimals = await Api.User.fetchTokenDecimals(
                  acceptTokenAddress,
                )

                dispatch(
                  setUserAccounts({
                    accounts,
                    balance,
                    chainId,
                    acceptTokenBalance: ethers.utils.formatUnits(
                      String(acceptTokenBalance),
                      decimals,
                    ),
                    acceptTokenAddress,
                    acceptTokenSymbol,
                    acceptTokenDecimals: decimals,
                  }),
                )

                dispatch(reconnectProject())
              }

              dispatch(listenChangeProjects())
            } else {
              window.location.reload()
            }
          })
          .catch((error) => {
            console.log('error', error)
          })
      })
  }
}

export const storeTransactionLog = createAction('STORE_TRANSACTION_LOG')

/** CLEAR TRANSACTION LOGS **/
export const clearTransactionLogs = createAction('CLEAR_TRANSACTION_LOGS')

export const clearTransactionLog = () => async (dispatch, getState) => {
  const walletAddress = get(
    getState().user,
    'userAccount.accounts.0',
    '',
  ).toLowerCase()
  const chainId = window.ethereum.chainId
  const transactionLogs = getState().user.transactionLogs
  const logData = transactionLogs.result

  const filterLog = filter(logData, (item) => {
    return (
      item.chainId !== chainId &&
      get(item, 'walletAddress', '').toLowerCase() !==
        walletAddress.toLowerCase()
    )
  })

  dispatch(clearTransactionLogs(filterLog))
}

export const fetchTransactionLogs = () => (dispatch, getState) => {
  const walletAddress = get(
    getState().user,
    'userAccount.accounts.0',
    '',
  ).toLowerCase()
  const chainId = window.ethereum.chainId
  const transactionLogs = getState().user.transactionLogs
  const logData = transactionLogs.result

  const filterLog = filter(logData, (item) => {
    return (
      item.chainId === chainId &&
      get(item, 'walletAddress', '').toLowerCase() ===
        walletAddress.toLowerCase()
    )
  })
  return filterLog
}

/** GET AMOUNT OF TOKEN ALLOW TRANSFER **/
const {
  getAmountTokenAllowTransferRequest,
  getAmountTokenAllowTransferSuccess,
  getAmountTokenAllowTransferFail,
} = createActions({
  GET_AMOUNT_TOKEN_ALLOW_TRANSFER_REQUEST: () => {},
  GET_AMOUNT_TOKEN_ALLOW_TRANSFER_SUCCESS: (data) => ({data}),
  GET_AMOUNT_TOKEN_ALLOW_TRANSFER_FAIL: (error) => ({error}),
})

export const getAmountTokenAllowTransfer = () => async (dispatch, getState) => {
  dispatch(getAmountTokenAllowTransferRequest())

  const {project, user, wallet} = getState()
  const walletAddress = get(user, 'userAccount.accounts.0', '').toLowerCase()
  const isWhitelist = get(wallet, 'isWhitelist')
  if (project && project.project.result && walletAddress) {
    const {
      extraContractIsStart,
      smartContractAddress,
      extraContractAcceptedTokenAddress,
      extraAcceptedTokenDecimals,
      extraContractMaxPayableAmount,
    } = project.project.result
    if (extraContractIsStart && isWhitelist) {
      try {
        window.web3 = new Web3(window.web3.currentProvider)
        if (extraContractAcceptedTokenAddress) {
          const acceptedTokenContract = new window.web3.eth.Contract(
            tokenAbi,
            extraContractAcceptedTokenAddress,
          )
          const amountRes = await acceptedTokenContract.methods
            .allowance(walletAddress, smartContractAddress)
            .call()
          const amount = Number(
            ethers.utils.formatUnits(
              fromExponential(amountRes),
              extraAcceptedTokenDecimals,
            ),
          )
          const amountWallet = get(wallet, 'amount', 0)
          const amountWalletBought = Number(
            formatUnits(amountWallet || 0, extraAcceptedTokenDecimals),
          )
          const maxPayableAmount = Number(
            formatUnits(
              extraContractMaxPayableAmount || 0,
              extraAcceptedTokenDecimals,
            ),
          )

          const maxAllow = maxPayableAmount - amountWalletBought

          dispatch(
            getAmountTokenAllowTransferSuccess(Math.min(amount, maxAllow)),
          )
          return Math.min(amount, maxAllow)
        }
      } catch (error) {
        return dispatch(getAmountTokenAllowTransferFail(error))
      }
    }
  }
}

/** APPROVE LOCK TOKEN **/
const {approveTokenRequest, approveTokenSuccess, approveTokenFail} =
  createActions({
    APPROVE_TOKEN_REQUEST: () => {},
    APPROVE_TOKEN_SUCCESS: (data) => ({data}),
    APPROVE_TOKEN_FAIL: (error) => ({error}),
  })

export const approveToken = (amount) => async (dispatch, getState) => {
  window.web3 = new Web3(window.web3.currentProvider)
  if (window.web3) {
    dispatch(approveTokenRequest())
    const {project, user} = getState()
    const {currencyTokenAddress, IDOContract, acceptedTokenDecimals} =
      project?.project?.result
    const walletAddress = user?.userAccount?.accounts?.[0].toLowerCase()
    const usdtTokenContract = new window.web3.eth.Contract(
      ustdAbi,
      currencyTokenAddress,
    )
    try {
      console.log('approveToken::', {
        amount: ethers.utils.parseUnits(
          amount.toString(),
          acceptedTokenDecimals,
        ),
      })
      usdtTokenContract.methods
        .approve(
          IDOContract,
          ethers.utils.parseUnits(amount.toString(), acceptedTokenDecimals),
        )
        .send({from: walletAddress})
        .then((res) => {
          localStorage.setItem(
            APPROVE_TOKEN_DATA,
            JSON.stringify({amount, walletAddress, currencyTokenAddress, res}),
          )
          dispatch(approveTokenSuccess(res))
        })
    } catch (error) {
      dispatch(approveTokenFail(error))
    }
  }
}
const {buyTokenRequest, buyTokenSuccess, buyTokenFail} = createActions({
  BUY_TOKEN_REQUEST: () => {},
  BUY_TOKEN_SUCCESS: (data) => ({data}),
  BUY_TOKEN_FAIL: (error) => ({error}),
})

export const buyToken = (purchase) => (dispatch, getState) => {
  window.web3 = new Web3(window.web3.currentProvider)
  if (window.web3) {
    dispatch(buyTokenRequest())
    const {project, user, whitelists} = getState()
    const {IDOContract, acceptedTokenDecimals, extraTokenDecimals} =
      project?.project?.result
    const walletAddress = user?.userAccount?.accounts?.[0].toLowerCase()
    const idoTokenSaleContract = new window.web3.eth.Contract(
      idoTokenSaleAbi,
      IDOContract,
    )
    try {
      const whitelistDTO = whitelists?.whitelist?.data
      console.log('BuyToken::', {
        purchase: ethers.utils.parseUnits(
          purchase.toString(),
          extraTokenDecimals,
        ),
        maxAllocation: ethers.utils.parseUnits(
          whitelistDTO?.maxAllocation.toString(),
          extraTokenDecimals,
        ),
        signature: whitelistDTO?.signature,
      })
      idoTokenSaleContract.methods
        .tokenPurchase(
          ethers.utils.parseUnits(purchase.toString(), extraTokenDecimals),
          ethers.utils.parseUnits(
            whitelistDTO?.maxAllocation.toString(),
            extraTokenDecimals,
          ),
          whitelistDTO?.signature,
        )
        .send({from: walletAddress})
        .then((res) => {
          localStorage.removeItem(APPROVE_TOKEN_DATA)
          dispatch(buyTokenSuccess(res))
        })
    } catch (error) {
      console.log({error})
      dispatch(buyTokenFail(error))
    }
  }
}
// export const approveToken = (amount) => async (dispatch, getState) => {
//   const {project, user, wallet} = getState()
//   const walletAddress = get(user, 'userAccount.accounts.0', '').toLowerCase()
//   const isWhitelist = get(wallet, 'isWhitelist')
//   if (project && project.project.result && walletAddress) {
//     const {
//       smartContractAddress,
//       extraContractAcceptedTokenAddress,
//       extraAcceptedTokenDecimals,
//       extraContractIsStart,
//       extraAcceptedTokenSymbol,
//       extraTokenName,
//       extraTokenSymbol,
//       extraTokenDecimals,
//     } = project.project.result

//     if (extraContractIsStart && isWhitelist) {
//       try {
//         const acceptedTokenContract = new window.web3.eth.Contract(
//           tokenAbi,
//           extraContractAcceptedTokenAddress,
//         )
//         const amountRes = await acceptedTokenContract.methods
//           .allowance(walletAddress, smartContractAddress)
//           .call()
//         const oldAmount = ethers.utils.formatUnits(
//           fromExponential(amountRes),
//           extraAcceptedTokenDecimals,
//         )
//         if (oldAmount && Number(oldAmount) >= Number(amount)) {
//           return dispatch(approveTokenSuccess(true))
//         }

//         const chainId = window.ethereum.chainId
//         let log = {
//           amount,
//           chainId,
//           walletAddress,
//           smartContractAddress,
//           extraAcceptedTokenDecimals,
//           extraAcceptedTokenSymbol,
//           extraContractAcceptedTokenAddress,
//           extraTokenName,
//           extraTokenSymbol,
//           extraTokenDecimals,
//           eventName: 'Approval',
//           display: `Approved ${amount} ${extraAcceptedTokenSymbol} to ${extraTokenSymbol}`,
//         }

//         dispatch(approveTokenRequest())

//         window.web3 = new Web3(window.web3.currentProvider)
//         if (extraContractAcceptedTokenAddress) {
//           const acceptedTokenContract = new window.web3.eth.Contract(
//             tokenAbi,
//             extraContractAcceptedTokenAddress,
//           )
//           const acceptedAmount = window.web3.utils.toHex(
//             String(
//               ethers.utils.parseUnits(
//                 String(amount),
//                 extraAcceptedTokenDecimals,
//               ),
//             ),
//           )
//           acceptedTokenContract.methods
//             .approve(smartContractAddress, acceptedAmount)
//             .send({from: walletAddress})
//             .then((response) => {
//               // handle transaction and save it to db
//               log = {
//                 ...log,
//                 ...response,
//               }
//               dispatch(storeTransactionLog(log))
//               dispatch(approveTokenSuccess(log))
//               dispatch(getAmountTokenAllowTransfer())
//             })
//             .catch((error) => {
//               return dispatch(approveTokenFail(error))
//             })
//         }
//       } catch (error) {
//         return dispatch(approveTokenFail(error))
//       }
//     }
//   }
// }

/** APPROVE LOCK TOKEN **/

// export const buyToken =
//   (amount, setAmount, setPurchase) => async (dispatch, getState) => {
//     dispatch(buyTokenRequest())

//     const {project, user, wallet} = getState()
//     // const amount = get(user, 'buyTokenProcess.amount', 0);
//     const convertAmount = fromExponential(amount)
//     const walletAddress = get(user, 'userAccount.accounts.0', '').toLowerCase()
//     const isWhitelist = get(wallet, 'isWhitelist')
//     if (project && project.project.result && walletAddress) {
//       const {
//         extraContractIsStart,
//         smartContractAddress,
//         extraContractAcceptedTokenAddress,
//         extraAcceptedTokenDecimals,
//         extraAcceptedTokenSymbol,
//         extraTokenName,
//         extraTokenSymbol,
//         extraTokenDecimals,
//         extraContractExchangeRate,
//       } = project.project.result
//       if (extraContractIsStart && isWhitelist) {
//         try {
//           window.web3 = new Web3(window.web3.currentProvider)
//           const chainId = window.ethereum.chainId

//           let log = {
//             convertAmount,
//             chainId,
//             walletAddress,
//             smartContractAddress,
//             extraAcceptedTokenDecimals,
//             extraAcceptedTokenSymbol,
//             extraContractAcceptedTokenAddress,
//             extraTokenName,
//             extraTokenSymbol,
//             extraTokenDecimals,
//             eventName: 'EBuyTokens',
//             display: `Bought ${
//               Number(amount) * Number(extraContractExchangeRate)
//             } ${extraTokenSymbol}`,
//           }

//           if (smartContractAddress) {
//             const launchXContract = new window.web3.eth.Contract(
//               launchXAbi,
//               smartContractAddress,
//             )
//             const acceptedAmount = window.web3.utils.toHex(
//               String(
//                 ethers.utils.parseUnits(
//                   String(amount),
//                   extraAcceptedTokenDecimals,
//                 ),
//               ),
//             )

//             return launchXContract.methods
//               .buyTokens(acceptedAmount)
//               .send({from: walletAddress})
//               .then(async (response) => {
//                 log = {
//                   ...log,
//                   ...response,
//                 }
//                 dispatch(storeTransactionLog(log))
//                 dispatch(buyTokenSuccess(log))
//                 setAmount(0)
//                 setPurchase(0)
//                 const balance = await window.web3.eth.getBalance(walletAddress)
//                 const acceptTokenBalance = await Api.User.fetchUserTokenBalance(
//                   extraContractAcceptedTokenAddress,
//                   walletAddress,
//                 )
//                 dispatch(
//                   setUserAccounts({
//                     balance,
//                     chainId,
//                     acceptTokenBalance: ethers.utils.formatUnits(
//                       String(acceptTokenBalance),
//                       extraAcceptedTokenDecimals,
//                     ),
//                     acceptTokenAddress: extraContractAcceptedTokenAddress,
//                     acceptTokenSymbol: extraAcceptedTokenSymbol,
//                     acceptTokenDecimals: extraAcceptedTokenDecimals,
//                   }),
//                 )
//                 dispatch(
//                   fetchWhitelistFromContract(
//                     walletAddress,
//                     smartContractAddress,
//                   ),
//                 )
//               })
//               .catch((error) => {
//                 setAmount(0)
//                 setPurchase(0)
//                 return dispatch(buyTokenFail(error))
//               })
//           }
//         } catch (error) {
//           return dispatch(buyTokenFail(error))
//         }
//       }
//     }
//   }

const {redeemTokensRequest, redeemTokensSuccess, redeemTokensFail} =
  createActions({
    REDEEM_TOKENS_REQUEST: () => {},
    REDEEM_TOKENS_SUCCESS: (data) => ({data}),
    REDEEM_TOKENS_FAIL: (error) => ({error}),
  })

export const redeemTokens = () => (dispatch, getState) => {
  dispatch(redeemTokensRequest())

  const {project, user, wallet} = getState()
  const {rewardedAmount} = wallet
  const walletAddress = get(user, 'userAccount.accounts.0', '').toLowerCase()
  if (project && project.project.result && walletAddress) {
    const {
      extraContractIsFinished,
      smartContractAddress,
      extraAcceptedTokenDecimals,
      extraAcceptedTokenSymbol,
      extraContractAcceptedTokenAddress,
      extraTokenName,
      extraTokenSymbol,
      extraTokenDecimals,
    } = project.project.result
    if (extraContractIsFinished) {
      try {
        window.web3 = new Web3(window.web3.currentProvider)
        const chainId = window.ethereum.chainId
        let log = {
          chainId,
          walletAddress,
          smartContractAddress,
          extraAcceptedTokenDecimals,
          extraAcceptedTokenSymbol,
          extraContractAcceptedTokenAddress,
          extraTokenName,
          extraTokenSymbol,
          extraTokenDecimals,
          eventName: 'redeemTokens',
          display: `Claimed ${formatUnits(
            rewardedAmount,
            extraTokenDecimals,
          )} ${extraTokenSymbol}`,
        }
        if (smartContractAddress) {
          const launchXContract = new window.web3.eth.Contract(
            launchXAbi,
            smartContractAddress,
          )
          launchXContract.methods
            .redeemTokens()
            .send({from: walletAddress})
            .then((response) => {
              log = {
                ...log,
                ...response,
              }
              console.log('log: ', log)
              dispatch(storeTransactionLog(log))
              dispatch(redeemTokensSuccess(log))
              dispatch(
                fetchWhitelistFromContract(walletAddress, smartContractAddress),
              )
            })
            .catch((error) => {
              return dispatch(redeemTokensFail(error))
            })
        }
      } catch (error) {
        return dispatch(redeemTokensFail(error))
      }
    }
  }
}

export async function sendTransection(payload) {
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }
  console.log('payload', payload)
  return new Promise((res, rej) => {
    console.log('here')
    localStorage.setItem('confirmDialogOpen', true)
    if (window.ethereum) {
      window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: payload,
        })
        .then(async (data) => {
          console.log('data Transaction Completed ', data)
          res(data)
        })
        .catch((error) => {
          console.log('error::::', error)
          rej(error)
        })
    }
  })
}

export async function getTransactionReceipt(txHash) {
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }
  return new Promise((res, rej) => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        })
        .then(async (data) => {
          res(data)
        })
        .catch((error) => {
          console.log('error::::', error)
          rej(error)
        })
    }
  })
}

export async function sendToken(payload) {
  console.log('payloaddddddddddddd', payload)
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }

  return new Promise((res, rej) => {
    localStorage.setItem('confirmDialogOpen', true)
    let minABI = [
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        type: 'function',
      },
    ]
    let decimals = window.web3.utils.toBN(18)
    const amount1 = Web3.utils.toWei(String(payload.value))
    const tokenAddress = payload.tokenAddress
    let contract = new window.web3.eth.Contract(minABI, tokenAddress)
    // let value = amount.mul(window.web3.utils.toBN(10).pow(decimals))
    contract.methods
      .transfer(payload.to, amount1)
      .send({from: payload.from})
      .on('transactionHash', function (hash) {
        res(hash)
      })
      .catch((error) => {
        console.log('error::::', error)
        rej(error)
      })
  })
}

export async function approveContract(payload) {
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      'function approve(address _spender, uint256 _value) public returns (bool success)',
    ]
    let decimals = window.web3.utils.toBN(18)
    const amount1 = Web3.utils.toWei(String(payload.value))
    const tokenAddress = payload.tokenAddress
    const provider1 = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider1.getSigner()

    let contract = new ethers.Contract(
      payload.stableContractAdress,
      minABI,
      signer,
    )
    await contract
      .approve(payload.idoContractAddress, amount1, {
        gasLimit: 250000,
      })
      .then((res) => {
        console.log('ressss', res)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
        console.log('errrrrrrr')
      })
  })
}

export async function stackAmount(payload) {
  console.log('approve', payload)
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }

  return new Promise(async (resolve, reject) => {
    let minABI = [
      'function stake(uint256 _value) public returns (bool success)',
    ]
    let decimals = window.web3.utils.toBN(18)
    const amount1 = Web3.utils.toWei(String(payload.value))
    const tokenAddress = payload.tokenAddress
    const provider1 = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider1.getSigner()
    // '0xCeeD223AbD796FD862AB707E86B46E4700dab8cE'
    let contract = new ethers.Contract(
      payload.idoContractAddress,
      minABI,
      signer,
    )
    await contract
      .stake(amount1, {
        gasLimit: 250000,
      })
      .then((res) => {
        console.log('ressss stake', res)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
        console.log('errrrrrrr', err)
      })
  })
}

export async function claim(stableAddress) {
  console.log('approve', stableAddress)
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }

  return new Promise(async (resolve, reject) => {
    let minABI = ['function claimRewards() public returns (bool success)']
    let decimals = window.web3.utils.toBN(18)
    const provider1 = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider1.getSigner()

    let contract = new ethers.Contract(stableAddress, minABI, signer)
    await contract
      .claimRewards({
        gasLimit: 250000,
      })
      .then((res) => {
        console.log('ressss rewardssss', res)
        resolve(res)
      })
      .catch((err) => {
        reject(err)
        console.log('errrrrrrr', err)
      })
  })
}

export async function switchMetamask(chainId) {
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }
  var chain = window.web3.utils.toHex(chainId)
  console.log('chain', chain)
  return new Promise((res, rej) => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: chain}],
        })
        .then(async (data) => {
          console.log('data Transaction Completed ', data)
          res(data)
        })
        .catch((error) => {
          console.log('error::::', error)
          rej(error)
        })
    }
  })
}

export const setTransactionLogs = createAction('SET_TRANSACTION_LOGS')
