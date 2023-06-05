import Web3 from 'web3'
import {createAction, createActions} from 'redux-actions'
import {get, find, set} from 'lodash'
import {ethers} from 'ethers'

import Api from '../api'
import {
  fetchWhitelistFromContract,
  setIsWhiteList,
  setMaxAllocation,
} from './wallet'
import launchXAbi from '../constants/launchXContractAbi.json'
import idoTokenSaleAbi from '../constants/idoTokenSaleAbi.json'
import acceptTokenAbi from '../constants/erc20.abi.json'
import {getAmountTokenAllowTransfer, setUserAccounts} from './user'
import stakingAbi from '../constants/stakingAbi.json'

const listenLaunchXContract = createAction('LISTEN_LAUNCH_X_CONTRACT')

export const listenContractChange = () => async (dispatch, getState) => {
  if (window.web3 && (window.location.pathname || '').includes('overview')) {
    const {project, user} = getState()
    const walletAddress = get(user, 'userAccount.accounts.0', '').toLowerCase()

    if (project && project.project.result) {
      const {smartContractAddress, contractTokenAddress} =
        project.project.result
      if (smartContractAddress) {
        try {
          const launchXContract = new window.web3.eth.Contract(
            launchXAbi,
            smartContractAddress,
          )
          const listen = launchXContract.events.allEvents(
            {},
            (error, event) => {
              if (process.env.REACT_APP_DEV === '1') {
                const eventName = event.event
                const eventValues = event.returnValues
                if (eventName) {
                  console.log(
                    `\${eventName} TEST:`,
                    JSON.stringify(eventValues),
                  )
                }
              }
              dispatch(
                fetchProjectInfoFromContract(
                  smartContractAddress,
                  contractTokenAddress,
                ),
              )
              dispatch(
                fetchWhitelistFromContract(walletAddress, smartContractAddress),
              )
            },
          )
          set(window, `listenProjects.${smartContractAddress}`, listen)
          dispatch(listenLaunchXContract(smartContractAddress))
        } catch (error) {}
      }
    }
  }
}

const {fetchAllProjectsRequest, fetchAllProjectsSuccess, fetchAllProjectsFail} =
  createActions({
    FETCH_ALL_PROJECTS_REQUEST: () => {},
    FETCH_ALL_PROJECTS_SUCCESS: (data) => ({data}),
    FETCH_ALL_PROJECTS_FAIL: (error) => ({error}),
  })

// export const updateProjectPools = () => (dispatch, getState) => {
//   const { project } = getState();
//   const { allProjects } = project;
//   const { all } = allProjects;
//   if (!isEmpty(all)) {
//     const upComingPools = [];
//     const livePools = [];
//     const completedPools = [];
//     console.log('updateProjectPools: ');
//     all.forEach(item => {
//       if (!item.extraContractIsStart) {
//         upComingPools.push(item);
//       } else if (item.extraContractIsFinished) {
//         completedPools.push(item);
//       } else {
//         livePools.push(item);
//       }
//     });
//     return dispatch(fetchAllProjectsSuccess({ all, upComingPools, livePools, completedPools }));
//   }
// };

export const fetchAllProjects = () => (dispatch) => {
  dispatch(fetchAllProjectsRequest())

  return Api.Project.fetchAllProjects()
    .then(({data}) => {
      const interval = setInterval(() => {
        if (window.web3) {
          dispatch(listenChangeProjects())
          return clearInterval(interval)
        }
      }, 300)

      const upComingPools = []
      const livePools = []
      const completedPools = []
      const all = data

      data.forEach((item) => {
        livePools.push(item)

        // TODO: uncomment (and remove above) when the backend returns proper isComplete property
        // if (
        //   !item.extraContractIsStart &&
        //   !item.extraContractIsFinished &&
        //   !item.isComplete
        // ) {
        //   upComingPools.push(item)
        // } else if (
        //   item.extraContractIsFinished ||
        //   (item.isComplete && !item.extraContractIsStart)
        // ) {
        //   completedPools.push(item)
        // } else {
        //   livePools.push(item)
        // }
      })
      return dispatch(
        fetchAllProjectsSuccess({
          all,
          upComingPools,
          livePools,
          completedPools,
        }),
      )
    })
    .catch((error) => {
      return dispatch(fetchAllProjectsFail(error))
    })
}

export const listenChangeProjects = () => async (dispatch, getState) => {
  const {project} = getState()
  const data = get(project, 'allProjects.all', [])

  for (const proj of data) {
    const {smartContractAddress, contractTokenAddress} = proj
    if (smartContractAddress && contractTokenAddress) {
      const launchXContract = new window.web3.eth.Contract(
        launchXAbi,
        smartContractAddress,
      )
      const listen = launchXContract.events.allEvents({}, (error, event) => {
        if (process.env.REACT_APP_DEV === '1') {
          const eventName = event.event
          const eventValues = event.returnValues
          if (eventName) {
            console.log(`\${eventName} TEST:`, JSON.stringify(eventValues))
          }
        }
        dispatch(
          fetchProjectInfoFromContract(
            smartContractAddress,
            contractTokenAddress,
            true,
          ),
        )
        // dispatch(updateProjectPools());
      })
      set(window, `listenProjects.${smartContractAddress}`, listen)
    }
  }
}

const {fetchTotalTvlRequest, fetchTotalTvlSuccess, fetchTotalTvlFail} =
  createActions({
    FETCH_TOTAL_TVL_REQUEST: () => {},
    FETCH_TOTAL_TVL_SUCCESS: (data) => ({data}),
    FETCH_TOTAL_TVL_FAIL: (error) => ({error}),
  })

export const fetchTotalTVL = () => (dispatch) => {
  dispatch(fetchTotalTvlRequest())

  return Api.Project.fetchTotalTVL()
    .then(({data}) => {
      const result = data.totalTVL
      return dispatch(fetchTotalTvlSuccess({result}))
    })
    .catch((error) => {
      return dispatch(fetchTotalTvlFail(error))
    })
}

const setProjectInfoFromContract = createAction(
  'SET_PROJECT_INFO_FROM_CONTRACT',
)

const handleSetValueProjectFromContract =
  (smartContract, data, isMultiple) => (dispatch, getState) => {
    const newData = {
      smartContract,
      data,
    }
    if (!isMultiple) {
      dispatch(setProjectInfoFromContract(newData))
    } else {
      const {project} = getState()
      const {allProjects} = project
      let {all} = allProjects
      let target = find(all, {smartContractAddress: smartContract})
      target = {
        ...target,
        data,
      }
      all = all.map((item) => {
        if (item.smartContractAddress === smartContract) {
          return target
        }
        return item
      })

      const upComingPools = []
      const livePools = []
      const completedPools = []

      all.forEach((item) => {
        livePools.push(item)

        // TODO: uncomment (and remove above) when the backend returns proper isComplete property
        // if (
        //   !item.extraContractIsStart &&
        //   !item.extraContractIsFinished &&
        //   !item.isComplete
        // ) {
        //   upComingPools.push(item)
        // } else if (
        //   item.extraContractIsFinished ||
        //   (item.isComplete && !item.extraContractIsStart)
        // ) {
        //   completedPools.push(item)
        // } else {
        //   livePools.push(item)
        // }
      })
      dispatch(
        fetchAllProjectsSuccess({
          all,
          upComingPools,
          livePools,
          completedPools,
        }),
      )
    }
  }

// Method call
const contractCall = async (contract, method, defaultVal) => {
  try {
    if (contract && contract.methods[method]) {
      return await contract.methods[method]().call()
    }
  } catch (e) {
    return defaultVal
  }
}

const extractLaunchContract = (
  launchXContract,
  smartContractAddress,
  isMultiple,
  dispatch,
) => {
  try {
    // contractCall(launchXContract, 'exchangeRate')
    //   .then(exchangeRate => {
    //     dispatch(handleSetValueProjectFromContract(smartContractAddress, { extraContractExchangeRate: Number(exchangeRate) }, isMultiple));
    //   });

    contractCall(launchXContract, 'getAcceptedAddress').then(
      (acceptedTokenAddress) => {
        dispatch(
          handleSetValueProjectFromContract(
            smartContractAddress,
            {extraContractAcceptedTokenAddress: String(acceptedTokenAddress)},
            isMultiple,
          ),
        )
      },
    )

    contractCall(launchXContract, 'totalParticipant').then(
      (totalParticipant) => {
        dispatch(
          handleSetValueProjectFromContract(
            smartContractAddress,
            {extraContractTotalParticipant: Number(totalParticipant)},
            isMultiple,
          ),
        )
      },
    )

    contractCall(launchXContract, 'totalRaise').then((totalRaise) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractTotalRaise: Number(totalRaise)},
          isMultiple,
        ),
      )
    })

    contractCall(launchXContract, 'startTime').then((startTime) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractStartTime: Number(startTime)},
          isMultiple,
        ),
      )
    })

    contractCall(launchXContract, 'getTokenAddress').then((tokenAddress) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {contractTokenAddress: String(tokenAddress)},
          isMultiple,
        ),
      )
    })

    contractCall(launchXContract, 'getTotalToken').then((totalToken) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractTotalToken: Number(totalToken)},
          isMultiple,
        ),
      )
    })

    contractCall(launchXContract, 'isFinished').then((isFinished) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractIsFinished: Boolean(isFinished)},
          isMultiple,
        ),
      )
    })

    contractCall(launchXContract, 'isInitialized').then((isInitialized) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractIsInitialized: Boolean(isInitialized)},
          isMultiple,
        ),
      )
    })

    contractCall(launchXContract, 'isStart').then((isStart) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractIsStart: Boolean(isStart)},
          isMultiple,
        ),
      )
    })

    // contractCall(launchXContract, 'getMaxPayableAmount')
    //   .then(maxPayableAmount => {
    //     dispatch(handleSetValueProjectFromContract(smartContractAddress, { extraContractMaxPayableAmount: Number(maxPayableAmount) }, isMultiple));
    //   });

    contractCall(launchXContract, 'soldAmount').then((soldAmount) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractSoldAmount: Number(soldAmount)},
          isMultiple,
        ),
      )
    })

    contractCall(launchXContract, 'totalRedeemed').then((totalRedeemed) => {
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraContractTotalRedeemed: Number(totalRedeemed)},
          isMultiple,
        ),
      )
    })
  } catch (e) {
    return {}
  }
}

// Extract sale token info
const extractTokenContract = (
  tokenContract,
  smartContractAddress,
  isMultiple,
  dispatch,
) => {
  try {
    contractCall(tokenContract, 'name').then((extraTokenName) =>
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraTokenName},
          isMultiple,
        ),
      ),
    )
    contractCall(tokenContract, 'symbol').then((extraTokenSymbol) =>
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraTokenSymbol},
          isMultiple,
        ),
      ),
    )
    contractCall(tokenContract, 'decimals').then((extraTokenDecimals) =>
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraTokenDecimals},
          isMultiple,
        ),
      ),
    )
    contractCall(tokenContract, 'totalSupply').then((extraTokenTotalSupply) =>
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraTokenTotalSupply},
          isMultiple,
        ),
      ),
    )
  } catch (e) {
    return {}
  }
}

export const extractAcceptedTokenContract = (
  tokenContract,
  smartContractAddress,
  isMultiple,
  dispatch,
) => {
  try {
    contractCall(tokenContract, 'name').then((extraAcceptedTokenName) =>
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraAcceptedTokenName},
          isMultiple,
        ),
      ),
    )
    contractCall(tokenContract, 'symbol').then((extraAcceptedTokenSymbol) =>
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraAcceptedTokenSymbol},
          isMultiple,
        ),
      ),
    )
    contractCall(tokenContract, 'decimals').then((extraAcceptedTokenDecimals) =>
      dispatch(
        handleSetValueProjectFromContract(
          smartContractAddress,
          {extraAcceptedTokenDecimals},
          isMultiple,
        ),
      ),
    )
    contractCall(tokenContract, 'totalSupply').then(
      (extraAcceptedTokenTotalSupply) =>
        dispatch(
          handleSetValueProjectFromContract(
            smartContractAddress,
            {extraAcceptedTokenTotalSupply},
            isMultiple,
          ),
        ),
    )
  } catch (e) {
    return {}
  }
}

// Extract accepted token info
// const extractAcceptedTokenContract = async (tokenContract) => {
//   try {
//     return {
//       extraAcceptedTokenName: await contractCall(tokenContract, 'name'),
//       extraAcceptedTokenSymbol: await contractCall(tokenContract, 'symbol'),
//       extraAcceptedTokenDecimals: await contractCall(tokenContract, 'decimals'),
//       extraAcceptedTokenTotalSupply: await contractCall(tokenContract, 'totalSupply'),
//     };
//   } catch (e) {
//     console.log('e:::', e);
//     return {};
//   }
// };

export const fetchProjectInfoFromContract =
  (
    smartContractAddress,
    tokenAddress,
    isMultiple,
    acceptedTokenContract = undefined,
  ) =>
  async (dispatch) => {
    if (!smartContractAddress || !tokenAddress) return false
    if (window.web3) {
      const launchXContract = new window.web3.eth.Contract(
        launchXAbi,
        smartContractAddress,
      )
      const tokenContract = new window.web3.eth.Contract(
        acceptTokenAbi,
        tokenAddress,
      )
      extractLaunchContract(
        launchXContract,
        smartContractAddress,
        isMultiple,
        dispatch,
      )
      extractTokenContract(
        tokenContract,
        smartContractAddress,
        isMultiple,
        dispatch,
      )
    }
  }

const {fetchProjectRequest, fetchProjectSuccess, fetchProjectFail} =
  createActions({
    FETCH_PROJECT_REQUEST: () => {},
    FETCH_PROJECT_SUCCESS: (data) => ({data}),
    FETCH_PROJECT_FAIL: (error) => ({error}),
  })

export const fetchProject = (id) => (dispatch, getState) => {
  dispatch(fetchProjectRequest())
  return Api.Project.fetchProject(id)
    .then(async ({data}) => {
      const {
        whitelists,
        contractIsStart,
        smartContractAddress,
        contractTokenAddress,
        chainId,
      } = data
      const {user} = getState()
      const walletAddress = get(
        user,
        'userAccount.accounts.0',
        '',
      ).toLowerCase()
      dispatch(fetchProjectSuccess(data))
      console.log('fetchProject:::', data)
      if (smartContractAddress && walletAddress) {
        dispatch(
          fetchWhitelistFromContract(walletAddress, smartContractAddress),
        )
      }
      // Whitelist exist & constract is start
      if (whitelists && contractIsStart) {
        const walletWhiteAddress =
          whitelists.length > 0
            ? whitelists.filter(
                (user) => user.walletAddress.toLowerCase() === walletAddress,
              )
            : []
        console.log('walletWhiteAddress::', walletWhiteAddress)
        const maxAllocation =
          walletWhiteAddress && walletWhiteAddress.length > 0
            ? walletWhiteAddress[0].maxAllocation
            : 'N/A'
        dispatch(setIsWhiteList(walletWhiteAddress.length > 0))
        dispatch(setMaxAllocation(maxAllocation))
      } else {
        dispatch(setIsWhiteList(false))
        dispatch(setMaxAllocation(0))
      }

      // Connected && Project Chain Id = Connecting Chain Id
      if (walletAddress && chainId === window.ethereum.chainId) {
        dispatch(listenContractChange())
        dispatch(
          fetchProjectInfoFromContract(
            smartContractAddress,
            contractTokenAddress,
          ),
        )
        dispatch(getAmountTokenAllowTransfer())
      }
      try {
        const {
          extraContractAcceptedTokenAddress,
          extraAcceptedTokenDecimals,
          extraAcceptedTokenSymbol,
        } = data
        console.log(
          'fetchProject:::extraContractAcceptedTokenAddress:::',
          extraContractAcceptedTokenAddress,
        )
        if (extraContractAcceptedTokenAddress) {
          const acceptTokenBalance = await Api.User.fetchUserTokenBalance(
            extraContractAcceptedTokenAddress,
            walletAddress,
          )
          dispatch(
            setUserAccounts({
              acceptTokenBalance: ethers.utils.formatUnits(
                String(acceptTokenBalance),
                extraAcceptedTokenDecimals,
              ),
              acceptTokenAddress: extraContractAcceptedTokenAddress,
              acceptTokenSymbol: extraAcceptedTokenSymbol,
              acceptTokenDecimals: extraAcceptedTokenDecimals,
            }),
          )
        }
      } catch (e) {}
      return data
    })
    .catch((error) => {
      dispatch(fetchProjectFail(error))
      return false
    })
}

export const reconnectProject = () => async (dispatch, getState) => {
  const {project, user} = getState()

  const walletAddress = get(user, 'userAccount.accounts.0', '').toLowerCase()
  if (project && project.project.result) {
    const {
      whitelists,
      contractIsStart,
      smartContractAddress,
      contractTokenAddress,
      chainId,
    } = project.project.result

    if (smartContractAddress && walletAddress) {
      dispatch(fetchWhitelistFromContract(walletAddress, smartContractAddress))
    }
    if (chainId !== window.ethereum.chainId) {
      return false
    }
    if (whitelists && contractIsStart) {
      const walletWhiteAddress =
        whitelists.length > 0
          ? whitelists.filter(
              (user) => user.walletAddress.toLowerCase() === walletAddress,
            )
          : []
      console.log('walletWhiteAddress::', walletWhiteAddress)
      const maxAllocation =
        walletWhiteAddress && walletWhiteAddress.length > 0
          ? walletWhiteAddress[0].maxAllocation
          : 'N/A'
      dispatch(setIsWhiteList(walletWhiteAddress.length > 0))
      dispatch(setMaxAllocation(maxAllocation))
    } else {
      dispatch(setIsWhiteList(false))
      dispatch(setMaxAllocation(0))
    }

    // Connected && Project Chain Id = Connecting Chain Id
    if (walletAddress && chainId === window.ethereum.chainId) {
      dispatch(listenContractChange())
      dispatch(
        fetchProjectInfoFromContract(
          smartContractAddress,
          contractTokenAddress,
        ),
      )
      dispatch(getAmountTokenAllowTransfer())
    }
    // if (whitelists && !extraContractIsStart) {
    //   const wallets = whitelists.map(item => item.walletAddress.toLowerCase());
    //   const isWhitelist = wallets.includes(walletAddress);
    //   dispatch(setIsWhiteList(isWhitelist));
    // } else if (walletAddress && chainId === window.ethereum.chainId) {
    //   dispatch(listenContractChange());
    //   dispatch(fetchProjectInfoFromContract(smartContractAddress, contractTokenAddress));
    //   dispatch(getAmountTokenAllowTransfer());
    // }

    try {
      const {
        extraContractAcceptedTokenAddress,
        extraAcceptedTokenDecimals,
        extraAcceptedTokenSymbol,
      } = project.project.result
      const acceptTokenBalance = await Api.User.fetchUserTokenBalance(
        extraContractAcceptedTokenAddress,
        walletAddress,
      )
      dispatch(
        setUserAccounts({
          acceptTokenBalance: ethers.utils.formatUnits(
            String(acceptTokenBalance),
            extraAcceptedTokenDecimals,
          ),
          acceptTokenAddress: extraContractAcceptedTokenAddress,
          acceptTokenSymbol: extraAcceptedTokenSymbol,
          acceptTokenDecimals: extraAcceptedTokenDecimals,
        }),
      )
    } catch (e) {}
  }
}

export const fetchUserTokenBalance =
  (walletAddress) => async (dispatch, getState) => {
    const {project} = getState()
    try {
      const {
        extraContractAcceptedTokenAddress,
        extraAcceptedTokenDecimals,
        extraAcceptedTokenSymbol,
      } = project.project.result
      console.log(
        'fetchUserTokenBalance:::',
        extraContractAcceptedTokenAddress,
        walletAddress,
      )
      const acceptTokenBalance = await Api.User.fetchUserTokenBalance(
        extraContractAcceptedTokenAddress,
        walletAddress,
      )
      console.log(
        'fetchUserTokenBalance:::acceptTokenBalance:::',
        acceptTokenBalance,
      )
      dispatch(
        setUserAccounts({
          acceptTokenBalance: ethers.utils.formatUnits(
            String(acceptTokenBalance),
            extraAcceptedTokenDecimals,
          ),
          acceptTokenAddress: extraContractAcceptedTokenAddress,
          acceptTokenSymbol: extraAcceptedTokenSymbol,
          acceptTokenDecimals: extraAcceptedTokenDecimals,
        }),
      )
    } catch (e) {}
  }

const fetchStakingContactsRequest = createAction(
  'FETCH_STAKING_CONTRACTS_REQUEST',
)
const fetchStakingContactsSuccess = createAction(
  'FETCH_STAKING_CONTRACTS_SUCCESS',
)
const fetchStakingContactsFail = createAction('FETCH_STAKING_CONTRACTS_FAIL')

export const fetchStakingContract = (address) => (dispatch, getState) => {
  window.web3 = new Web3(window.web3.currentProvider)
  if (window.web3) {
    const stakingContract = new window.web3.eth.Contract(stakingAbi, address)

    extractStakingContract(stakingContract, dispatch)
  }
}

const extractStakingContract = (stakingContract, dispatch) => {
  contractCall(stakingContract, 'getLockStartTimestamp').then((res) => {
    dispatch(handleSetStakingContract({startTimestamp: Number(res)}))
  })
  contractCall(stakingContract, 'getLockEndTimestamp').then((res) => {
    dispatch(handleSetStakingContract({endTimestamp: Number(res)}))
  })
  contractCall(stakingContract, 'getNumberOfStakers').then((res) => {
    dispatch(handleSetStakingContract({numberOfStakers: Number(res)}))
  })
  contractCall(stakingContract, 'getStakingToken').then((res) => {
    dispatch(handleSetStakingContract({stakingToken: res}))
  })
  contractCall(stakingContract, 'getStakingSyntheticToken').then((res) => {
    dispatch(handleSetStakingContract({stakingSyntheticToken: res}))
  })
}

const handleSetStakingContract = (data) => (dispatch, getState) => {
  dispatch(fetchStakingContactsRequest())
  try {
    return dispatch(
      fetchStakingContactsSuccess({
        data,
      }),
    )
  } catch (error) {
    return dispatch(fetchStakingContactsFail(error))
  }
}

const fetchIdoTokenSaleRequest = createAction('FETCH_IDO_TOKEN_SAKE_REQUEST')
const fetchIdoTokenSaleSuccess = createAction('FETCH_IDO_TOKEN_SAKE_SUCCESS')
const fetchIdoTokenSaleFail = createAction('FETCH_IDO_TOKEN_SAKE_FAIL')

export const fetchIdoTokenSale = (address) => (dispatch, getState) => {
  window.web3 = new Web3(window.web3.currentProvider)
  if (window.web3) {
    const {user} = getState()
    const idoTokenSale = new window.web3.eth.Contract(idoTokenSaleAbi, address)

    extractIdoTokenSale(idoTokenSale, dispatch)
    idoTokenSale.methods
      .totalTokensSoldByAddress(user?.userAccount.accounts[0])
      .call()
      .then((res) =>
        dispatch(
          fetchIdoTokenSaleSuccess({
            data: {totalTokensSoldByAddress: Number(res)},
          }),
        ),
      )
      .catch((err) => dispatch(fetchIdoTokenSaleFail()))
  }
}

const extractIdoTokenSale = (idoTokenSale, dispatch) => {
  contractCall(idoTokenSale, 'getNumberOfParticipants').then((res) => {
    dispatch(handleSetIdoTokenSale({numberOfParticipants: res}))
  })
  contractCall(idoTokenSale, 'totalTokensSold').then((res) => {
    dispatch(handleSetIdoTokenSale({totalTokensSold: Number(res)}))
  })
  contractCall(idoTokenSale, 'currency_token_address').then((res) => {
    dispatch(handleSetIdoTokenSale({currencyTokenAddress: Number(res)}))
  })
  contractCall(idoTokenSale, 'getTokenPrice').then((res) => {
    dispatch(handleSetIdoTokenSale({tokenPrice: res}))
  })
}

const handleSetIdoTokenSale = (data) => (dispatch, getState) => {
  dispatch(fetchIdoTokenSaleRequest())
  try {
    return dispatch(
      fetchIdoTokenSaleSuccess({
        data,
      }),
    )
  } catch (error) {
    return dispatch(fetchIdoTokenSaleFail(error))
  }
}
export const clearProjectData = createAction('CLEAR_PROJECT_DATA')
