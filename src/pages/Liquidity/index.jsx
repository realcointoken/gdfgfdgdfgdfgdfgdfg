import React, {useState, useEffect, useCallback} from 'react'
import Bubbles from '../../components/Bubbles'
import {get} from 'lodash'
import cn from 'classnames'
import style from './liquidity.module.scss'
import Form from '../../components/Form'
import Field from '../../components/Form/components/Field'
import Button from '../../components/Button'
import {FORM_FIELD_TYPES} from '../../components/Form/constants'
import {validateEmail} from '../../utils'
import {PAGE_REGISTER_PATH} from '../../router/constants'
import {Link, useHistory} from 'react-router-dom'
import {currencyCalculationRequest} from '../../store/actions/currencyCalculation'
import {currencyCalculation} from '../../store/actions/currencyCalculation'
import {useDispatch, useSelector} from 'react-redux'
import Sidebar from '../../components/Sidebar'
import {Modal, Pagination, Row, Spinner} from 'react-bootstrap'
import {signup} from '../../store/actions/signup'
import {currencyList} from '../../store/actions/CurrencyList'
import {walletConnect} from '../../store/actions/wallet'
import {
  sendTransection,
  sendToken,
  autoConnect,
  switchMetamask,
} from '../../store/actions/user'
import {blockchain} from '../../store/actions/allBlockchain'
import {addLiquidity} from '../../store/actions/addLiquidity'
import {getCurrencyPairThroughCurrency} from '../../store/actions/getCurrencyPairThroughCurrency'
import {whiteLabelList} from '../../store/actions/whiteLabelList'
import {addWhiteLabelList} from '../../store/actions/addWhiteLabelList'
import {transactionRejected} from '../../store/actions/transactionRejected'
import {liquidityCalculation} from '../../store/actions/liquidityCalculation'
import NotificationAlert from '../../components/NotificationAlert'
import Web3 from 'web3'
import {getAccountSymbol} from '../../store/constants/web3'
import Api from '../../store/api'
import localforage, {getItem} from 'localforage'
import Table from 'react-bootstrap/Table'
import LiquidityConfirm from '../../components/LiquidityConfirm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
  faAngleDown,
  faArrowDown,
  faSort,
} from '@fortawesome/free-solid-svg-icons'
import {Col} from 'antd'
import {ethers} from 'ethers'
import {current} from '../../store/actions/current'
import axios from 'axios'

export default function Liquidity() {
  const [fractalData, setFractalData] = useState()
  const [firstAmount, setFirstAmount] = useState()
  const [secondAmount, setSecondAmount] = useState()
  const [whitelistLabel, setWhitelistLabel] = useState('')
  const [yourName, setYourName] = useState('')
  const [yourPhoneNumber, setYourPhoneNumber] = useState('')
  const disabled = !secondAmount || !validateEmail(firstAmount)
  const [show, setShow] = useState(false)
  const [allowSwap, setAllowSwap] = useState(false)
  const dispatch = useDispatch()
  const [walletConnected, setWalletConnected] = useState()
  const [userLogin, setUserLogin] = useState()
  const [verifiedChainId, setVerifiedChainId] = useState(false)
  const userState = useSelector((state) => state.user)
  const loginState = useSelector((state) => state.login)
  const [alert, setAlert] = useState('')
  const CurrencyListstate = useSelector((state) => state.currencyList)
  const [currencyListData, setCurrencyListData] = useState([])
  const balance = useSelector((state) => state.user.userAccount.balance)
  const [symbol, setSymbol] = useState('')
  const [inputToValidation, setInputToValidation] = useState(true)
  const [accountAddress, setAccountAddress] = useState('')
  // const [firstSelectedCurrency, setFirstSelectedCurrency] = useState({})
  const [secondSelectedCurrency, setSecondSelectedCurrency] = useState({})
  const [modalOpenType, setModalOpenType] = useState('')
  const [showLiquidityConfirmModal, setShowLiquidityConfirmModal] =
    useState(false)
  const [liquidityConfirmData, setLiquidityConfirmData] = useState()
  const [applySwap, setApplySwap] = useState(false)
  const [swapBtnText, setSwapBtnText] = useState()
  const [userBalance, setUserBalance] = useState()
  const [popSelect, setPopSelect] = useState(false)
  const [selectedBlockChain, setSelectedBlockChain] = useState()
  const [firstSelectedBlockChain, setfirstSelectedBlockChain] = useState()
  const [whiteListLabelModal, setWhiteListLabelModal] = useState(false)
  const [largeFirstCurrencyAmt, setLargeFirstCurrencyAmt] = useState(true)
  const [largeSecondCurrencyAmt, setLargeSecondCurrencyAmt] = useState(true)
  const [openModalType, setOpenModalType] = useState('firstinput')
  const [secondModalListFilter, setSecondModalListFilter] = useState([])
  const [inMultiChain, setInMultiChain] = useState(false)
  const [selectedSwitchChainId, setSelectedSwitchChainId] = useState()
  const [multichianProcess, setMultichianProcess] = useState(false)

  const [secSelectedBlockChain, setSecSelectedBlockChain] = useState()
  const [selectedBlockChainSec, setSelectedBlockChainSec] = useState()
  const [secSelectedSwitchChainId, setSecSelectedSwitchChainId] = useState()
  const [inMultiChainSec, setInMultiChainSec] = useState(false)
  const [inMultiChainIdSec, setInMultiChainIdSec] = useState()
  const kycStatusData = useSelector((state) => state.current.response.kycStatus)
  const [items, setItems] = useState([])
  const [liqHistoyData, setLiqHistoyData] = useState([])

  var liquidityDetails = JSON.parse(localStorage.getItem('liquidityDetails'))
  var firstTransHashComp = JSON.parse(
    localStorage.getItem('FirstTransactionCompleted'),
  )
  var firstTransHash = JSON.parse(localStorage.getItem('FirstTransactionHash'))

  const [firstSelectedCurrency, setFirstSelectedCurrency] = useState(
    liquidityDetails
      ? {...liquidityDetails['firstSelectedCurrency']}
      : {} || {},
  )

  const [currencyCalculationData, setCurrencyCalculationData] = useState(
    liquidityDetails
      ? {...liquidityDetails['currencyCalculationData']}
      : {} || {},
  )

  const [firstTransactionCompleted, setFirstTransactionCompleted] = useState(
    firstTransHashComp ? firstTransHashComp : false,
  )

  const [firstTransactionHash, setFirstTransactionHash] = useState(
    firstTransHash ? firstTransHash : '',
  )
  const [secondTransactionHash, setSecondTransactionHash] = useState()

  const currencyCalculationState = useSelector(
    (state) => state.currencyCalculation.response,
  )
  const whiteLabelListState = useSelector(
    (state) => state.whiteLabelList.response,
  )
  const blockchainList = useSelector((state) => state.blockchain.blockchainData)
  const [updatedBalance, setUpdatedBalance] = useState()

  const convertedBalance = Web3.utils.fromWei(String(updatedBalance || 0))

  const history = useHistory()

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  React.useEffect(() => {
    // setTimeout(() => {
    //   if (!fractalData?.access_token) {
    //     history.push('/kyc')
    //   }
    // }, 2000)

    // localforage.getItem('persist:fractal').then((value) => {
    //   var fractal = JSON.parse(JSON.parse(value).response)?.data
    //   setFractalData(fractal)
    //   console.log('valueee', fractal)
    //   if (!fractal || (fractal && Object.keys(fractal).length == 0)) {
    //     history.push('/kyc')
    //   }
    // })

    var loginStatus = localStorage.getItem('isLogin')
    if (loginStatus) {
      setTimeout(() => {
        dispatch(current())
          .then(() => {
            localStorage.setItem('isLogin', true)
          })
          .catch(() => {
            // localStorage.removeItem('isLogin')
            // return history.push('/login')
          })
      }, 2000)
    } else {
      // localStorage.removeItem('isLogin')
      // return history.push('/login')
    }

    if (
      kycStatusData == 'rejected' ||
      kycStatusData == 'pending' ||
      kycStatusData == 'submitted'
    ) {
      history.push('/kyc')
    }

    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
    setTimeout(() => {
      checkBlockRecord()
    }, 1500)

    setTimeout(() => {
      const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
      axios
        .post(httpUrl + `/api/v1/Swap/GetProvidersHistory`, {
          pageSize: 0,
          currentPage: 0,
        })
        .then(async (response) => {
          console.log('this is response====')
          console.log(response)
          setLiqHistoyData(response.data.data)

          let active = 2
          let items = []
          for (let number = 1; number <= 5; number++) {
            items.push(
              <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => getHistoryData()}
              >
                {number}
              </Pagination.Item>,
            )
          }

          setItems(items)

          console.log('itemss', items)
        })
        .catch((error) => {
          console.log('this is error')
          console.log(error)
        })
    }, 1500)

    return () => {
      dispatch(currencyCalculationRequest())
    }
  }, [])
  const getHistoryData = () => {
    console.log('here')
  }

  const checkBlockRecord = async () => {
    var chainId = await window.ethereum.chainId

    // await window.ethereum.enable()
    dispatch(blockchain())
      .then((res) => {
        if (
          res.data &&
          res.data?.filter((e) => e.chainID === parseInt(chainId)).length > 0 &&
          chainId != null
        ) {
          setVerifiedChainId(true)
        } else {
          setVerifiedChainId(false)
          //This Alert Triger on Page Load
          if (res.data) {
            setAlert(
              <NotificationAlert
                message={
                  'You are not connected to appropriate blockchain network, please choose supported blockchain network first.'
                }
                variant={'danger'}
              ></NotificationAlert>,
            )
          }
        }
      })
      .catch((error) => {})
  }

  useEffect(async () => {
    const chainId = await window.ethereum.chainId
    if (userState?.connectWallet?.isConnect) {
      setWhitelistLabel(userState.userAccount.accounts[0])
      // setToWhiteListLabel(userState.userAccount.accounts[0])
      const whiteLablePayload = {
        Address: userState.userAccount.accounts[0],
        BlockchainChainId: parseInt(chainId),
      }
      setTimeout(() => {
        dispatch(addWhiteLabelList(whiteLablePayload))
      }, 2000)
      setWalletConnected(true)
    } else {
      setWalletConnected(false)
      setFirstSelectedCurrency({})
      setSecondSelectedCurrency({})
      setCurrencyListData([])
    }
    setAccountAddress(userState?.userAccount?.accounts[0])
    if (firstSelectedBlockChain) {
      setSelectedBlockChain(parseInt(firstSelectedBlockChain))
      setfirstSelectedBlockChain(parseInt(firstSelectedBlockChain))
    } else {
      setSelectedBlockChain(parseInt(chainId))
      setfirstSelectedBlockChain(parseInt(chainId))
    }
    setSymbol(getAccountSymbol(chainId))
    if (userLogin && walletConnected) {
      dispatch(currencyList(parseInt(chainId)))
    }
    // if (
    //   blockchainList &&
    //   blockchainList.filter((e) => e.chainID === parseInt(chainId)).length >
    //     0 &&
    //   chainId != null
    // ) {
    //   setVerifiedChainId(true)
    // } else {
    //   setVerifiedChainId(false)
    //   //This Alert Triger on Page Load
    //   if (blockchainList && !verifiedChainId) {
    //     setAlert(
    //       <NotificationAlert
    //         message={
    //           'You are not connected to appropriate blockchain network, please choose supported blockchain network first.'
    //         }
    //         variant={'danger'}
    //       ></NotificationAlert>,
    //     )
    //   }
    // }
  }, [userState, walletConnected, blockchainList])

  useEffect(() => {
    if (
      Object.keys(loginState?.authResponse).length > 0 &&
      !loginState?.authResponse?.data?.userInfo?.isEmailVerfied
    ) {
      // showAlertMessage(
      //   'Please verify your email to continue with app.',
      //   'warning',
      // )
      setTimeout(() => {
        history.push('/login')
      }, 5500)
    } else if (
      loginState?.authResponse?.data?.token &&
      fractalData?.access_token
    ) {
      setUserLogin(true)
    } else if (loginState?.authResponse?.data?.token) {
      setUserLogin(true)
    } else {
      setUserLogin(false)
    }
  }, [loginState, userLogin])

  // useEffect(() => {
  //   if (!walletConnected) {
  //     history.push('/liquidity')
  //   } else if (walletConnected && !userLogin) {
  //     // history.push('/login')
  //   }
  // }, [walletConnected, userLogin])

  const checkToAndFormAmountInputCheck = () => {
    if (
      (secondSelectedCurrency['tokenBalance'] !== undefined &&
        currencyCalculationData.toAmount <=
          secondSelectedCurrency.tokenBalance) ||
      inMultiChainSec
    ) {
      setInputToValidation(true)
    } else if (
      secondSelectedCurrency['tokenBalance'] === undefined &&
      currencyCalculationData.toAmount <= convertedBalance
    ) {
      setInputToValidation(true)
    } else {
      setInputToValidation(false)
    }
  }

  const changeFirstAmount = (e) => {
    const re = /^[0-9\b\.]+$/

    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
      setFirstAmount(e.target.value)
    }

    setUserBalance(convertedBalance)
    calculation(parseFloat(e.target.value))
  }

  const changeSecondAmount = (e) => {
    setSecondAmount(e.target.value)
  }
  const calculation = (fromAmountValue) => {
    if (firstSelectedCurrency?.currencyType == 'Blockchain') {
      setUserBalance(convertedBalance)
    } else {
      setUserBalance(firstSelectedCurrency.tokenBalance)
    }
    if (
      fromAmountValue > 0 &&
      firstSelectedCurrency?.uuid &&
      secondSelectedCurrency?.uuid
    ) {
      const data = {
        toCurrencyUuid: secondSelectedCurrency.uuid,
        fromCurrencyUuid: firstSelectedCurrency.uuid,
        fromAmount: fromAmountValue,
      }
      dispatch(currencyCalculation(data))
    }
  }

  useEffect(() => {
    setCurrencyCalculationData(currencyCalculationState)
  }, [currencyCalculationState])

  useEffect(async () => {
    setCurrencyCalculationData(currencyCalculationState)
    setSecondAmount(currencyCalculationState?.toAmount)
    if (
      currencyCalculationState &&
      Object.keys(currencyCalculationState).length > 0 &&
      (!currencyCalculationState?.canCompletelyFullFill ||
        !currencyCalculationState?.hasLiquidity)
    ) {
      setAlert(
        <NotificationAlert
          message={`You can swap Max ${currencyCalculationState.fromAmountAvailable} ${currencyCalculationState.fromCurrencyName}.`}
          variant={'info'}
        ></NotificationAlert>,
      )
    }

    // checkValidation()
  }, [currencyCalculationState]) // largeFirstCurrencyAmt, largeSecondCurrencyAmt

  useEffect(() => {
    if (firstTransactionHash && currencyCalculationData) {
      if (inMultiChainSec) {
        localStorage.setItem(
          'liquidityDetails',
          JSON.stringify({
            firstSelectedCurrency: firstSelectedCurrency,
            secondSelectedCurrency: secondSelectedCurrency,
            currencyCalculationData: currencyCalculationData,
          }),
        )
        switchMetamask(inMultiChainIdSec)
          .then((res) => {
            window.location.reload()
          })
          .catch((err) => {
            removeAllStorage()
            // console.log('Chain Changed Failed', err)
          })
      } else {
        // console.log('currencyCalculationData', currencyCalculationData)
        if (JSON.parse(localStorage.getItem('FirstTransactionHash'))) {
          checkSelectedCurrency(currencyCalculationData, 'second')
        } else {
          // console.log('firstTransactionCompleted1', firstTransactionCompleted)

          checkSelectedCurrency(currencyCalculationData, 'first')
        }
      }
    } else {
      var liquidityDetails = JSON.parse(
        localStorage.getItem('liquidityDetails'),
      )
      if (liquidityDetails) {
        setCurrencyCalculationData(liquidityDetails['currencyCalculationData'])
        setTimeout(() => {
          if (!inMultiChainSec) {
            /////////// new Code
            setFirstSelectedCurrency({
              ...liquidityDetails['firstSelectedCurrency'],
            }) ///////// new code

            checkSelectedCurrency(
              liquidityDetails['currencyCalculationData'],
              'first',
            )
          } /////////// new Code
        }, 1000)
      }
    }
  }, [firstTransactionHash])

  const removeAllStorage = () => {
    localStorage.removeItem('FirstTransactionHash')
    localStorage.removeItem('FirstTransactionCompleted')
    localStorage.removeItem('inMultiChainIdSec')
    localStorage.removeItem('inMultiChainSec')
    localStorage.removeItem('liquidityDetails')
    localStorage.removeItem('initialTransaction')
    localStorage.removeItem('confirmDialogOpen')
    setSecondSelectedCurrency({})

    setTimeout(() => {
      setFirstSelectedCurrency(CurrencyListstate.response[0])

      // setCurrencyCalculationData({})
      setFirstAmount('')
      setSecondAmount('')
    }, 1000)
  }

  const checkValidation = async () => {
    // setLargeFirstCurrencyAmt()
    // setLargeSecondCurrencyAmt()
    var fromTokenBalance = ''
    var toTokenBalance = ''
    if (
      (!inMultiChain || !inMultiChainSec) &&
      currencyCalculationState.fromCurrencyType !== 'Blockchain'
    ) {
      let balance = await Api.User.fetchUserTokenBalance(
        currencyCalculationState.fromCurrencyTokenSmartContractAddress,
        userState.userAccount.accounts[0],
      )
      fromTokenBalance = await Web3.utils.fromWei(String(balance || 0))
    }

    if (
      (!inMultiChain || !inMultiChainSec) &&
      currencyCalculationState.toCurrencyType !== 'Blockchain'
    ) {
      let balance = await Api.User.fetchUserTokenBalance(
        currencyCalculationState.toCurrencyTokenSmartContractAddress,
        userState.userAccount.accounts[0],
      )
      toTokenBalance = await Web3.utils.fromWei(String(balance || 0))
    }

    if (
      (currencyCalculationState?.fromAmount &&
        currencyCalculationState?.fromCurrencyType !== 'Blockchain' &&
        currencyCalculationState?.fromAmount > 0 &&
        currencyCalculationState?.fromAmount <= fromTokenBalance) ||
      (currencyCalculationState?.fromAmount &&
        currencyCalculationState?.fromCurrencyType === 'Blockchain' &&
        currencyCalculationState?.fromAmount > 0 &&
        currencyCalculationState?.fromAmount <= convertedBalance)
    ) {
      setLargeFirstCurrencyAmt(false)
    } else {
      setLargeFirstCurrencyAmt(true)
    }

    if (
      (currencyCalculationState?.toAmount &&
        currencyCalculationState?.toCurrencyType !== 'Blockchain' &&
        currencyCalculationState?.toAmount > 0 &&
        currencyCalculationState?.toAmount <= toTokenBalance) ||
      (currencyCalculationState?.toAmount &&
        currencyCalculationState?.toCurrencyType === 'Blockchain' &&
        currencyCalculationState?.toAmount > 0 &&
        currencyCalculationState?.toAmount <= convertedBalance)
    ) {
      setLargeSecondCurrencyAmt(false)
    } else {
      setLargeSecondCurrencyAmt(true)
    }
    // console.log('1', largeFirstCurrencyAmt)
    // console.log('2', largeSecondCurrencyAmt)
  }

  useEffect(() => {
    if (firstTransactionHash && secondTransactionHash) {
      var data = {
        currencyOneUuid: firstSelectedCurrency.uuid,
        amountCurrency1: currencyCalculationData.fromAmount,
        transactionHashOne: firstTransactionHash,
        currencyTwoUuid: secondSelectedCurrency.uuid,
        amountCurrency2: currencyCalculationData.toAmount,
        transactionHashTwo: secondTransactionHash,
      }
      dispatch(addLiquidity(data))
        .then((res) => {
          setFirstTransactionHash()
          setSecondTransactionHash()

          removeAllStorage()
          showAlertMessage('Liquidity Added Successfully', 'success')
        })
        .catch((err) => {
          console.log('error', err)
          setFirstTransactionHash()
          setSecondTransactionHash()

          removeAllStorage()
          showAlertMessage(err.data.message, 'danger')
        })
    }
  }, [secondTransactionHash])

  useEffect(() => {
    setTimeout(() => {
      var liquidityDetails = JSON.parse(
        localStorage.getItem('liquidityDetails'),
      )
      if (liquidityDetails) {
        setCurrencyCalculationData(liquidityDetails['currencyCalculationData'])
      }

      var localStorageInMultiChainIdSec = JSON.parse(
        localStorage.getItem('inMultiChainIdSec'),
      )

      if (localStorageInMultiChainIdSec) {
        setInMultiChainIdSec(localStorageInMultiChainIdSec)
      }

      var localStorageFirstTransactionCompleted = localStorage.getItem(
        'FirstTransactionCompleted',
      )

      setFirstTransactionCompleted(
        localStorageFirstTransactionCompleted
          ? localStorageFirstTransactionCompleted
          : false,
      )

      if (localStorageInMultiChainIdSec) {
        checkMultiChainSec(localStorageInMultiChainIdSec)
      }

      if (liquidityDetails && Object.keys(liquidityDetails).length > 0) {
        setFirstSelectedCurrency(liquidityDetails['firstSelectedCurrency'])
        setSecondSelectedCurrency(liquidityDetails['secondSelectedCurrency'])
        setFirstAmount(liquidityDetails['currencyCalculationData'].fromAmount)
        setSecondAmount(liquidityDetails['currencyCalculationData'].toAmount)

        const data = {
          toCurrencyUuid: liquidityDetails['secondSelectedCurrency'].uuid,
          fromCurrencyUuid: liquidityDetails['firstSelectedCurrency'].uuid,
          fromAmount: liquidityDetails['currencyCalculationData'].fromAmount,
        }

        dispatch(currencyCalculation(data))
          .then((res) => {
            let calData = {...res.data}
            setCurrencyCalculationData(res.data)
            setMultichianProcess(true)
            setInMultiChain(false)

            var localStorageFirstTransactionHash = JSON.parse(
              localStorage.getItem('FirstTransactionHash'),
            )

            if (localStorageFirstTransactionHash) {
              setFirstTransactionHash(localStorageFirstTransactionHash)
            }

            // setTimeout(() => {
            //   console.log(
            //     'checkvalidation',
            //     firstSelectedCurrency,
            //     secondSelectedCurrency,
            //     largeSecondCurrencyAmt,
            //     largeSecondCurrencyAmt,
            //   )
            //   if (
            //     (liquidityDetails['firstSelectedCurrency'] &&
            //       liquidityDetails['secondSelectedCurrency'] &&
            //       largeFirstCurrencyAmt) ||
            //     largeSecondCurrencyAmt
            //   ) {
            //     showAlertMessage(
            //       'Transection cancelled: You are trying to send amount greater than your balance. please try again.',
            //       'danger',
            //     )
            //     removeAllStorage()
            //     setMultichianProcess(false)
            //   }
            // }, 30000)
          })
          .catch((err) => {})
      }
    }, 2000)
  }, [])

  useEffect(() => {
    // setTimeout(() => {
    //   if (
    //     multichianProcess &&
    //     (largeFirstCurrencyAmt || largeSecondCurrencyAmt)
    //   ) {
    //     showAlertMessage(
    //       'You are trying to send amount greater than your balance',
    //       'danger',
    //     )
    //     removeAllStorage()
    //     setMultichianProcess(false)
    //   }
    // }, 20000)
  }, [largeSecondCurrencyAmt, largeFirstCurrencyAmt])

  useEffect(() => {
    checkValidation()
    checkToAndFormAmountInputCheck()
    setTimeout(() => {
      if (
        Object.keys(currencyCalculationData).length > 0 &&
        !largeFirstCurrencyAmt &&
        !largeSecondCurrencyAmt
      ) {
        if (
          multichianProcess &&
          !largeFirstCurrencyAmt &&
          !largeSecondCurrencyAmt
        ) {
          checkSelectedCurrency(firstSelectedCurrency)
          setMultichianProcess(false)
        }
      }
    }, 500)
  }, [currencyCalculationData]) // largeFirstCurrencyAmt, largeSecondCurrencyAmt

  const rejectedTransactionController = () => {
    const payload = {
      transectionHash: firstTransactionHash,
      walletAddress: userState.userAccount.accounts[0],
      currencyName: firstSelectedCurrency.name,
      currencyUuid: firstSelectedCurrency.uuid,
      Amount: currencyCalculationData.fromAmount,
    }
    dispatch(transactionRejected(payload))
      .then((res) => {
        showAlertMessage(res.data, 'danger')
      })
      .catch((error) => {
        console.log('user Rejected the Transaction')
      })
  }

  const liquidityConfimrationPopup = () => {
    if (parseFloat(firstAmount) == 0) {
      return showAlertMessage('Amount should be greater than 0', 'danger')
    }

    const payload = {
      currencyoneUuid: firstSelectedCurrency.uuid,
      amountCurrency1: currencyCalculationData.fromAmount,
      currencyTwoUuid: secondSelectedCurrency.uuid,
      amountCurrency2: currencyCalculationData.toAmount,
    }

    dispatch(liquidityCalculation(payload))
      .then((res) => {
        setLiquidityConfirmData({
          firstSelectedCurrency: firstSelectedCurrency,
          secondSelectedCurrency: secondSelectedCurrency,
          currencyCalculationData: currencyCalculationData,
          liquidityCalculation: res.data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
    setShowLiquidityConfirmModal(true)
  }

  const handleNative = (type) => {
    setTimeout(async () => {
      if (currencyCalculationData) {
        var amount

        if (type == 'first') {
          amount = parseInt(
            Web3.utils.toWei(
              String(currencyCalculationData.fromAmount).substr(0, 8),
            ),
          ).toString(16)
        } else {
          amount = parseInt(
            Web3.utils.toWei(
              String(currencyCalculationData.toAmount).substr(0, 8),
            ),
          ).toString(16)
        }
        const accounts = await window.web3.eth.getAccounts()

        const payload = [
          {
            from: accounts[0],
            to: currencyCalculationData.swapDepositAddress,
            value: amount,
          },
        ]

        if (
          // (firstTransactionCompleted != null &&
          //   localStorage.getItem('liquidityDetails')) ||
          (type === 'first' && !firstTransactionCompleted) ||
          type === 'second'
        ) {
          sendTransection(payload)
            .then((transactionHash) => {
              localStorage.setItem('confirmDialogOpen', false)
              if (firstTransactionHash) {
                setSecondTransactionHash(transactionHash)
              } else {
                setFirstTransactionHash(transactionHash)
                localStorage.setItem(
                  'FirstTransactionHash',
                  JSON.stringify(transactionHash),
                )
                localStorage.setItem(
                  'FirstTransactionCompleted',
                  JSON.stringify(true),
                )
                localStorage.setItem(
                  'initialTransaction',
                  JSON.stringify(false),
                )
              }
            })
            .catch((err) => {
              localStorage.setItem('confirmDialogOpen', false)
              console.log('error', err)
              // showAlertMessage('User rejected Transection.', 'danger')
              if (firstTransactionHash) {
                rejectedTransactionController()
                setFirstTransactionHash()
                setSecondTransactionHash()
              }

              removeAllStorage()
              setMultichianProcess(false)
            })
        } else {
          setFirstTransactionHash(
            JSON.parse(localStorage.getItem('FirstTransactionHash')),
          )
        }
      }
    }, 3000)
  }

  const handleToken = async (type) => {
    var payload

    const web3 = new Web3(Web3.givenProvider)
    const network = await web3.eth.net.getNetworkType()
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts()

    // const accounts = await window.web3.eth.getAccounts()

    if (type == 'first') {
      payload = {
        tokenAddress: firstSelectedCurrency.smartContractAddress,
        from: accounts[0],
        to: currencyCalculationData.swapDepositAddress,
        value: currencyCalculationData.fromAmount,
      }
    } else {
      payload = {
        tokenAddress:
          currencyCalculationData.toCurrencyTokenSmartContractAddress,
        from: accounts[0],
        to: currencyCalculationData.swapDepositAddress,
        value: currencyCalculationData.toAmount,
      }
    }
    if ((type === 'first' && !firstTransactionCompleted) || type === 'second') {
      sendToken(payload)
        .then((transactionHash) => {
          localStorage.setItem('confirmDialogOpen', false)
          if (firstTransactionHash) {
            setSecondTransactionHash(transactionHash)
          } else {
            setFirstTransactionHash(transactionHash)
            localStorage.setItem(
              'FirstTransactionHash',
              JSON.stringify(transactionHash),
            )
            localStorage.setItem(
              'FirstTransactionCompleted',
              JSON.stringify(true),
            )
          }
          //check if we have firstTransectionHash && sec
        })
        .catch((err) => {
          localStorage.setItem('confirmDialogOpen', false)
          console.log('error', err)
          // showAlertMessage('User rejected Transection.', 'danger')
          if (firstTransactionHash) {
            rejectedTransactionController()
            setFirstTransactionHash()
            setSecondTransactionHash()
          }

          removeAllStorage()
          setMultichianProcess(false)
        })
    } else {
      setFirstTransactionHash(
        JSON.parse(localStorage.getItem('FirstTransactionHash')),
      )
    }
  }

  const checkSelectedCurrency = (item, type = 'first') => {
    // setCalcDataState(item)
    // setCurrencyCalculationData(item)
    if (inMultiChainSec) {
      localStorage.setItem(
        'liquidityDetails',
        JSON.stringify({
          firstSelectedCurrency: firstSelectedCurrency,
          secondSelectedCurrency: secondSelectedCurrency,
          currencyCalculationData: currencyCalculationData,
        }),
      )
    }

    if (inMultiChain) {
      switchMetamask(selectedSwitchChainId)
        .then((res) => {
          localStorage.setItem(
            'liquidityDetails',
            JSON.stringify({
              firstSelectedCurrency: firstSelectedCurrency,
              secondSelectedCurrency: secondSelectedCurrency,
              currencyCalculationData: currencyCalculationData,
            }),
          )

          localStorage.setItem('initialTransaction', JSON.stringify(true))

          window.location.reload()
        })
        .catch((err) => {
          removeAllStorage()
          console.log('Chain Changed Failed', err)
        })
    } else {
      if (
        item.currencyType == 'Blockchain' ||
        item.toCurrencyType == 'Blockchain' ||
        item.fromCurrencyType == 'Blockchain'
      ) {
        let openState = localStorage.getItem('confirmDialogOpen')
        if (!JSON.parse(openState)) {
          handleNative(type)
        }
      } else if (
        item.currencyType == 'Token' ||
        item.toCurrencyType == 'Token' ||
        item.fromCurrencyType == 'Token'
      ) {
        let openState = localStorage.getItem('confirmDialogOpen')
        if (!JSON.parse(openState)) {
          handleToken(type)
        }
      }
    }
  }
  // useEffect(() => {
  //   console.log('calcDataState', calcDataState)
  //   setCurrencyCalculationData({...calcDataState})
  // }, [calcDataState])

  // const liquidity = () => {
  //   console.log('secondSelectedCurrency', secondAmount)

  //   var data = {
  //     currencyOneUuid: firstSelectedCurrency.uuid,
  //     amountCurrency1: firstAmount,
  //     transactionHashOne: '',
  //     currencyTwoUuid: secondSelectedCurrency.currencyUuid,
  //     amountCurrency2: secondAmount,
  //     transactionHashTwo: '',
  //   }
  //   /// need to update above variable

  //   const amount = parseInt(
  //     Web3.utils.toWei(String(currencyCalculationData.fromAmount)),
  //   ).toString(16)
  //   if (currencyCalculationData.fromCurrencyType == 'Blockchain') {
  //     var payload = []
  //     if (parseInt(userState.chainId) == parseInt(firstSelectedBlockChain)) {
  //       payload = [
  //         {
  //           from: userState.userAccount.accounts[0], //whitelistLabel,
  //           to: currencyCalculationData.swapDepositAddress,
  //           value: amount,
  //         },
  //       ]
  //     } else {
  //       payload = [
  //         {
  //           // from: whitelistLabel,
  //           // to: toWhiteListLabel,
  //           value: amount,
  //         },
  //       ]
  //     }

  //   }

  //   console.log('liquidity', data)
  //   // console.log('this is data')
  //   // console.log(data)
  //   // setSwapData(data)
  //   // setShowLiquidityConfirmModal(true)
  // }

  // useEffect(() => {
  //   if (applySwap) {
  //     const amount = parseInt(
  //       Web3.utils.toWei(String(currencyCalculationData.fromAmount)),
  //     ).toString(16)
  //     if (currencyCalculationData.fromCurrencyType == 'Blockchain') {
  //       var payload = []
  //       if (parseInt(userState.chainId) == parseInt(firstSelectedBlockChain)) {
  //         payload = [
  //           {
  //             from: whitelistLabel,
  //             to: currencyCalculationData.swapDepositAddress,
  //             value: amount,
  //           },
  //         ]
  //       } else {
  //         payload = [
  //           {
  //             from: whitelistLabel,
  //             to: toWhiteListLabel,
  //             value: amount,
  //           },
  //         ]
  //       }

  //       sendTransection(payload)
  //         .then((transectionHash) => {
  //           // setTranctionLoader(true)
  //           if (
  //             (secondSelectedCurrency.currencyType !== 'Blockchain' &&
  //               firstSelectedCurrency.currencyType === 'Blockchain') ||
  //             (secondSelectedCurrency.currencyType === 'Blockchain' &&
  //               firstSelectedCurrency.currencyType === 'Blockchain')
  //           ) {
  //             localStorage.setItem(
  //               'transectionDetails',
  //               JSON.stringify({
  //                 accountAddress: whitelistLabel,
  //                 tokenAddress: secondSelectedCurrency.smartContractAddress,
  //                 previousToBalance: secondSelectedCurrency.tokenBalance,
  //                 previousFromBalance: convertedBalance,
  //               }),
  //             )
  //             var intervalForNative = setInterval(async () => {
  //               var transectionDetails = JSON.parse(
  //                 localStorage.getItem('transectionDetails'),
  //               )
  //               if (
  //                 secondSelectedCurrency.currencyType !== 'Blockchain' &&
  //                 firstSelectedCurrency.currencyType === 'Blockchain'
  //               ) {
  //                 var tokenToBalance = await Api.User.fetchUserTokenBalance(
  //                   transectionDetails.tokenAddress,
  //                   transectionDetails.accountAddress,
  //                 )

  //                 var toBalance = Web3.utils.fromWei(
  //                   String(tokenToBalance || 0),
  //                 )
  //               }

  //               let b = window.web3.eth
  //                 .getBalance(userState.userAccount.accounts[0])
  //                 .then((res) => {
  //                   let bal = Web3.utils.fromWei(String(res || 0))

  //                   if (
  //                     parseInt(userState.chainId) ==
  //                       parseInt(firstSelectedBlockChain) &&
  //                     parseFloat(bal) !==
  //                       parseFloat(
  //                         JSON.parse(transectionDetails.previousFromBalance),
  //                       ) &&
  //                     parseFloat(
  //                       JSON.parse(transectionDetails.previousToBalance),
  //                     ) !== parseFloat(toBalance)
  //                   ) {
  //                     localStorage.setItem('transectionDetails', null)
  //                     clearInterval(intervalForNative)
  //                     // setTranctionLoader(false)
  //                     setUpdatedBalance(res)
  //                     let toCurrency = {...secondSelectedCurrency}
  //                     toCurrency.tokenBalance = toBalance
  //                     setSecondSelectedCurrency(toCurrency)
  //                     showAlertMessage(
  //                       'Transection completed successfully.',
  //                       'success',
  //                     )
  //                   } else {
  //                     if (
  //                       parseInt(userState.chainId) !=
  //                         parseInt(firstSelectedBlockChain) &&
  //                       parseFloat(bal) !==
  //                         parseFloat(
  //                           JSON.parse(transectionDetails.previousFromBalance),
  //                         )
  //                     ) {
  //                       localStorage.setItem('transectionDetails', null)
  //                       clearInterval(intervalForNative)
  //                       // setTranctionLoader(false)
  //                       setUpdatedBalance(res)
  //                       let toCurrency = {...secondSelectedCurrency}
  //                       toCurrency.tokenBalance = toBalance
  //                       setSecondSelectedCurrency(toCurrency)
  //                       showAlertMessage(
  //                         'Transection completed successfully.',
  //                         'success',
  //                       )
  //                     }
  //                   }
  //                 })
  //             }, 1000)
  //           }

  //           var toAddr = ''
  //           if (parseInt(userState.chainId) == parseInt(firstSelectedBlockChain)) {
  //             toAddr = whitelistLabel
  //           } else {
  //             toAddr = toWhiteListLabel
  //           }

  //           const payload = {
  //             toCurrencyUuid: currencyCalculationData.toCurrencyUuid,
  //             fromCurrencyUuid: currencyCalculationData.fromCurrencyUuid,
  //             fromAmount: currencyCalculationData.fromAmount,
  //             fromAddress: whitelistLabel,
  //             toAddress: toAddr,
  //             fromAddressDepositTo: currencyCalculationData.swapDepositAddress,
  //             transactionHash: transectionHash,
  //           }
  //           // dispatch(addLiquidity(payload))
  //         })
  //         .catch((err) => {
  //           console.log('error', err)
  //           showAlertMessage('User rejected Transection.', 'danger')
  //         })
  //     } else {
  //       var toWhiteAdress = ''

  //       if (parseInt(userState.chainId) == parseInt(firstSelectedBlockChain)) {
  //         toWhiteAdress = currencyCalculationData.swapDepositAddress
  //       } else {
  //         toWhiteAdress = toWhiteListLabel
  //       }

  //       const payload = {
  //         tokenAddress: firstSelectedCurrency.smartContractAddress,
  //         from: whitelistLabel,
  //         to: toWhiteAdress,
  //         value: currencyCalculationData.fromAmount,
  //       }

  //       sendToken(payload)
  //         .then((transectionHash) => {
  //           // setTranctionLoader(true)
  //           if (
  //             secondSelectedCurrency.currencyType === 'Token' &&
  //             firstSelectedCurrency.currencyType === 'Token'
  //           ) {
  //             localStorage.setItem(
  //               'transectionDetails',secondSelectedCurrency
  //               JSON.stringify({
  //                 accountAddress: whitelistLabel,
  //                 tokenAddress: secondSelectedCurrency.smartContractAddress,
  //                 fromTokenAddress: firstSelectedCurrency.smartContractAddress,
  //                 previousToBalance: secondSelectedCurrency.tokenBalance,
  //                 previousFromBalance: firstSelectedCurrency.tokenBalance,
  //               }),
  //             )
  //             checkBalanceUpdate()
  //           } else if (
  //             secondSelectedCurrency.currencyType === 'Blockchain' &&
  //             firstSelectedCurrency.currencyType !== 'Blockchain'
  //           ) {
  //             localStorage.setItem(
  //               'transectionDetails',
  //               JSON.stringify({
  //                 accountAddress: whitelistLabel,
  //                 tokenAddress: firstSelectedCurrency.smartContractAddress,
  //                 previousFromBalance: firstSelectedCurrency.tokenBalance,
  //                 previousToBalance: convertedBalance,
  //               }),
  //             )
  //             var intervalForNative = setInterval(async () => {
  //               var transectionDetails = JSON.parse(
  //                 localStorage.getItem('transectionDetails'),
  //               )

  //               if (
  //                 parseInt(userState.chainId) == parseInt(firstSelectedBlockChain)
  //               ) {
  //                 var tokenToBalance = await Api.User.fetchUserTokenBalance(
  //                   transectionDetails.tokenAddress,
  //                   transectionDetails.accountAddress,
  //                 )
  //                 var toBalance = Web3.utils.fromWei(
  //                   String(tokenToBalance || 0),
  //                 )
  //               }

  //               var tokenFromBalance = await Api.User.fetchUserTokenBalance(
  //                 transectionDetails.tokenAddress,
  //                 transectionDetails.accountAddress,
  //               )

  //               var fromBalance = Web3.utils.fromWei(
  //                 String(tokenFromBalance || 0),
  //               )

  //               let b = window.web3.eth
  //                 .getBalance(userState.userAccount.accounts[0])
  //                 .then((res) => {
  //                   let bal = Web3.utils.fromWei(String(res || 0))
  //                   if (
  //                     parseInt(userState.chainId) ==
  //                       parseInt(firstSelectedBlockChain) &&
  //                     parseFloat(bal) !==
  //                       parseFloat(
  //                         JSON.parse(transectionDetails.previousToBalance),
  //                       ) &&
  //                     parseFloat(
  //                       JSON.parse(transectionDetails.previousFromBalance),
  //                     ) !== parseFloat(tokenFromBalance)
  //                   ) {
  //                     localStorage.setItem('transectionDetails', null)
  //                     clearInterval(intervalForNative)
  //                     // setTranctionLoader(false)
  //                     setUpdatedBalance(res)
  //                     let fromCurrency = {...firstSelectedCurrency}
  //                     fromCurrency.tokenBalance = fromBalance
  //                     setFirstSelectedCurrency(fromCurrency)
  //                     let toCurrency = {...secondSelectedCurrency}
  //                     toCurrency.tokenBalance = toBalance
  //                     setSecondSelectedCurrency(toCurrency)
  //                     showAlertMessage(
  //                       'Transection completed successfully.',
  //                       'success',
  //                     )
  //                   } else {
  //                     if (
  //                       parseInt(userState.chainId) !=
  //                         parseInt(firstSelectedBlockChain) &&
  //                       parseFloat(
  //                         JSON.parse(transectionDetails.previousFromBalance),
  //                       ) !== parseFloat(tokenFromBalance)
  //                     ) {
  //                       localStorage.setItem('transectionDetails', null)
  //                       clearInterval(intervalForNative)
  //                       // setTranctionLoader(false)
  //                       setUpdatedBalance(res)
  //                       let fromCurrency = {...firstSelectedCurrency}
  //                       fromCurrency.tokenBalance = fromBalance
  //                       setFirstSelectedCurrency(fromCurrency)
  //                       let toCurrency = {...secondSelectedCurrency}
  //                       toCurrency.tokenBalance = toBalance
  //                       setSecondSelectedCurrency(toCurrency)
  //                       showAlertMessage(
  //                         'Transection completed successfully.',
  //                         'success',
  //                       )
  //                     }
  //                   }
  //                 })
  //             }, 1000)
  //           }

  //           var toAddrSec = ''
  //           if (parseInt(userState.chainId) == parseInt(firstSelectedBlockChain)) {
  //             toAddrSec = whitelistLabel
  //           } else {
  //             toAddrSec = toWhiteListLabel
  //           }

  //           const payload = {
  //             toCurrencyUuid: currencyCalculationData.toCurrencyUuid,
  //             fromCurrencyUuid: currencyCalculationData.fromCurrencyUuid,
  //             fromAmount: currencyCalculationData.fromAmount,
  //             fromAddress: whitelistLabel,
  //             toAddress: toAddrSec,
  //             fromAddressDepositTo: currencyCalculationData.swapDepositAddress,
  //             transactionHash: transectionHash,
  //           }

  //           console.log('All OK')
  //           // dispatch(swapApi(payload))
  //         })
  //         .catch((err) => {
  //           console.log('error', err)
  //           showAlertMessage('User rejected Transection.', 'danger')
  //         })
  //     }
  //     setApplySwap(false)
  //   }
  // }, [applySwap])

  const showAlertMessage = (message, varient) => {
    setAlert(
      <NotificationAlert
        message={message}
        variant={varient}
      ></NotificationAlert>,
    )
  }

  // function checkBalanceUpdate() {
  //   var transectionDetails = JSON.parse(
  //     localStorage.getItem('transectionDetails'),
  //   )
  //   if (transectionDetails) {
  //     var checkBalanceInterval = setInterval(async () => {
  //       console.log('modal open type', modalOpenType)
  //       if (parseInt(userState.chainId) == parseInt(firstSelectedBlockChain)) {
  //         var tokenToBalance = await Api.User.fetchUserTokenBalance(
  //           transectionDetails.tokenAddress,
  //           transectionDetails.accountAddress,
  //         )
  //         var toBalance = Web3.utils.fromWei(String(tokenToBalance || 0))
  //       }

  //       var tokenFromBalance = await Api.User.fetchUserTokenBalance(
  //         transectionDetails.fromTokenAddress,
  //         transectionDetails.accountAddress,
  //       )

  //       var fromBalance = Web3.utils.fromWei(String(tokenFromBalance || 0))

  //       if (
  //         parseInt(userState.chainId) == parseInt(firstSelectedBlockChain) &&
  //         parseFloat(JSON.parse(transectionDetails.previousToBalance)) !==
  //           parseFloat(toBalance) &&
  //         parseFloat(JSON.parse(transectionDetails.previousFromBalance)) !==
  //           parseFloat(fromBalance)
  //       ) {
  //         localStorage.setItem('transectionDetails', null)
  //         clearInterval(checkBalanceInterval)
  //         // setTranctionLoader(false)
  //         let toCurrency = {...secondSelectedCurrency}
  //         let fromCurrency = {...firstSelectedCurrency}
  //         toCurrency.tokenBalance = toBalance
  //         fromCurrency.tokenBalance = fromBalance
  //         setSecondSelectedCurrency(toCurrency)
  //         setFirstSelectedCurrency(fromCurrency)
  //         showAlertMessage('Transection completed successfully.', 'success')
  //       } else {
  //         if (
  //           parseInt(userState.chainId) != parseInt(firstSelectedBlockChain) &&
  //           parseFloat(fromBalance) !==
  //             parseFloat(JSON.parse(transectionDetails.previousFromBalance))
  //         ) {
  //           localStorage.setItem('transectionDetails', null)
  //           clearInterval(checkBalanceInterval)
  //           // setTranctionLoader(false)
  //           // let toCurrency = {...secondSelectedCurrency}
  //           let fromCurrency = {...firstSelectedCurrency}
  //           // toCurrency.tokenBalance = toBalance
  //           fromCurrency.tokenBalance = fromBalance
  //           // setSecondSelectedCurrency(toCurrency)
  //           setFirstSelectedCurrency(fromCurrency)
  //           showAlertMessage('Transection completed successfully.', 'success')
  //         }
  //       }
  //     }, 5000)
  //   }
  // }
  // useEffect(() => {
  //   console.log('firstSelectedCurrency', firstSelectedCurrency)
  //   if (firstSelectedCurrency.uuid) {
  //     // dispatchgetCurrencyPairList(firstSelectedCurrency)
  //   }
  // }, [firstSelectedCurrency])

  // const dispatchgetCurrencyPairList = (value) => {
  //   dispatch(getCurrencyPairThroughCurrency(value?.uuid))
  //     .then((res) => {
  //       console.log('addLiquidity Success Response', res)
  //       var secondModalList = []
  //       const result = res.data.map((item) => {
  //         // console.log('addLiquidity Success Response', firstSelectedCurrency)
  //         if (item.currencyOne !== value.shortName) {
  //           var balc = calculateSecondTokenBal(
  //             item,
  //             item.currencyOneSmartContractAddress,
  //           ).then((res) => {
  //             console.log('resssssssssss', res)
  //             secondModalList.push({
  //               currencyUuid: item.currencyOneUuid,
  //               currencyImage: item.currencyOneImage,
  //               currencyName: item.currencyOne,
  //               status: item.status,
  //               currencyBlockchainId: item.currencyOneBlockchainId,
  //               currencySmartContractAddress:
  //                 item.currencyOneSmartContractAddress,
  //               tokenBalance: res,
  //             })
  //             // return res
  //           })
  //         }
  //         if (item.currencyTwo !== value.shortName) {
  //           var balc = calculateSecondTokenBal(
  //             item,
  //             item.currencyTwoSmartContractAddress,
  //           ).then((res) => {
  //             console.log('resssssssssss', res)
  //             secondModalList.push({
  //               currencyUuid: item.currencyTwoUuid,
  //               currencyImage: item.currencyTwoImage,
  //               currencyName: item.currencyTwo,
  //               status: item.status,
  //               currencyBlockchainId: item.currencyTwoBlockchainId,
  //               currencySmartContractAddress:
  //                 item.currencyTwoSmartContractAddress,
  //               tokenBalance: res,
  //             })
  //             // return res
  //           })
  //         }
  //       })
  //       setTimeout(() => {
  //         setSecondModalListFilter(secondModalList)
  //         console.log(
  //           'secondModalListsecondModalListsecondModalList',
  //           secondModalList,
  //         )
  //       }, 700)
  //       // console.log('secondModalListFilter', secondModalListFilter)
  //     })
  //     .catch((error) => {
  //       console.log('addLiquidity Fail', error)
  //     })
  // }

  const calculateSecondTokenBal = async (item, contractAddr) => {
    if (item.currencyType !== 'Blockchain') {
      console.log(
        'parseInt(userState.chainId)parseInt(userState.chainId)parseInt(userState.chainId)',
        parseInt(userState.chainId),
      )

      var tokenAdr = contractAddr
      if (tokenAdr) {
        if (!inMultiChain) {
          var tokenBalance = await Api.User.fetchUserTokenBalance(
            tokenAdr,
            accountAddress,
          )

          tokenBalance = await Web3.utils.fromWei(String(tokenBalance || 0))
          return tokenBalance
        } else {
          tokenBalance = String(0)
          return tokenBalance
        }
      }
    }
  }

  useEffect(() => {
    if (
      CurrencyListstate?.response?.length > 0 &&
      userLogin &&
      walletConnected
    ) {
      var currencyListUpdated = []
      currencyListUpdated.push(CurrencyListstate.response[0])
      ///&& !multichianProcess fixe for token
      //////modify
      var initalTransaction = JSON.parse(
        localStorage.getItem('initialTransaction'),
      )
      //////modify

      if (!show && !initalTransaction && !firstTransactionCompleted) {
        if (Object.keys(secondSelectedCurrency) == 0) {
          setFirstSelectedCurrency(currencyListUpdated[0])
        }
        // setSecondSelectedCurrency(currencyListUpdated[0])
      }

      CurrencyListstate?.response.map(async (item) => {
        if (item.currencyType !== 'Blockchain') {
          var tokenAdr = item.smartContractAddress
          if (tokenAdr) {
            if (
              (modalOpenType == 'firstinput' && !inMultiChain) ||
              (modalOpenType == 'secondinput' && !inMultiChainSec)
              //  ||
              // parseInt(window.ethereum.chainId) == inMultiChainIdSec

              //    ||
              // modalOpenType == 'to'
            ) {
              var tokenBalance = await Api.User.fetchUserTokenBalance(
                tokenAdr,
                accountAddress,
              )

              item.tokenBalance = await Web3.utils.fromWei(
                String(tokenBalance || 0),
              )
              // currency Checking for token
              currencyListUpdated.push(item)
            } else {
              item.tokenBalance = String(0)
              currencyListUpdated.push(item)
            }

            setTimeout(() => {
              setCurrencyListData(currencyListUpdated)
            }, 700)
          }
        }
      })
    }
  }, [CurrencyListstate])

  const selectedWhiteLableAddress = (whiteLableAddress) => {
    setShow(false)
    // setWhitelistLabel(whiteLableAddress)
    // setToWhiteListLabel(whiteLableAddress)
  }

  const checkMultiChain = (chainId) => {
    if (parseInt(window.ethereum.chainId) == parseInt(chainId)) {
      setInMultiChain(false)
    } else {
      setInMultiChain(true)
    }
  }

  const checkMultiChainSec = (chainId) => {
    if (parseInt(window.ethereum.chainId) == parseInt(chainId)) {
      setInMultiChainSec(false)
      setInMultiChainIdSec(chainId)
      localStorage.setItem('inMultiChainSec', JSON.stringify(false))
      localStorage.setItem('inMultiChainIdSec', JSON.stringify(chainId))
    } else {
      setInMultiChainSec(true)
      setInMultiChainIdSec(chainId)
      localStorage.setItem('inMultiChainSec', JSON.stringify(true))
      localStorage.setItem('inMultiChainIdSec', JSON.stringify(chainId))
    }
  }

  const getBlockChainList = (chainId, type = 'firstinput') => {
    if (type === 'firstinput') {
      checkMultiChain(chainId)
      setfirstSelectedBlockChain(chainId)
      setSelectedBlockChain(chainId)
      setSelectedSwitchChainId(chainId)
    } else {
      setSecSelectedBlockChain(chainId)
      setSelectedBlockChainSec(chainId)
      setSecSelectedSwitchChainId(chainId)
      checkMultiChainSec(chainId)
    }
    setCurrencyListData([])
    dispatch(currencyList(chainId)).then((res) => {
      console.log('currencyList', res)
    })
  }

  const handleClose = () => {
    setPopSelect(false)
    setTimeout(() => {
      setShow(false)
      setWhiteListLabelModal(false)
    }, 300)
  }

  const openCurrencyModal = (type) => {
    setOpenModalType(type)
    // if (type === 'whitelist') {
    //   setWhiteListLabelModal(true)
    //   dispatch(whiteLabelList(parseInt(firstSelectedBlockChain)))
    //     .then((res) => {
    //       if (res.data.length == 0) {
    //         setShow(false)
    //         showAlertMessage('Please Add a Whitelist Address', 'danger')
    //         setTimeout(() => {
    //           history.push('/white-label-address')
    //         }, 2000)
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error.data.message)
    //       setShow(false)
    //       showAlertMessage(error.data.message, 'danger')
    //     })
    // } else {
    // setTimeout(() => {
    //   setWhiteListLabelModal(false)
    // }, 300)
    const chainId = window.ethereum.chainId
    if (type === 'firstinput') {
      setPopSelect(true)
      setFirstSelectedCurrency({})
      if (firstSelectedBlockChain) {
        setSelectedBlockChain(parseInt(firstSelectedBlockChain))
        setfirstSelectedBlockChain(parseInt(firstSelectedBlockChain))
        getBlockChainList(parseInt(firstSelectedBlockChain), 'firstinput')
      } else {
        setSelectedBlockChain(parseInt(chainId))
        setfirstSelectedBlockChain(parseInt(chainId))
        getBlockChainList(parseInt(chainId), 'firstinput')
      }
    } else {
      setPopSelect(false)
      setSecondSelectedCurrency({})
      // getBlockChainList(chainId)

      if (secSelectedBlockChain) {
        setSelectedBlockChainSec(parseInt(secSelectedBlockChain))
        setSecSelectedBlockChain(parseInt(secSelectedBlockChain))
        getBlockChainList(parseInt(secSelectedBlockChain), 'secondinput')
      } else {
        setSelectedBlockChainSec(parseInt(chainId))
        setSecSelectedBlockChain(parseInt(chainId))
        getBlockChainList(parseInt(chainId), 'secondinput')
      }
    }
    // }
    setModalOpenType(type)
    setShow(true)
  }

  const firstInputSelectedCurrency = (value) => {
    setFirstSelectedCurrency(value)
    // console.log('firstSelectedCurrency', firstSelectedCurrency)
    // dispatchgetCurrencyPairList(value)
    setShow(false)
  }

  const secondInputSelectedCurrency = (value) => {
    setSecondSelectedCurrency(value)
    setShow(false)
  }

  const confirmClose = (data) => {
    setShowLiquidityConfirmModal(data)
  }

  const startLiquidity = (data) => {
    localStorage.setItem('confirmDialogOpen', false)
    setTimeout(() => {
      checkSelectedCurrency(firstSelectedCurrency)
    }, 700)
  }

  const handleSearch = (event) => {
    let value = event.target.value
    let result = []
    if (!value) {
      return setCurrencyListData(CurrencyListstate.response)
    }

    result = currencyListData.filter((data) => {
      return data.name.toLowerCase().search(value.toLowerCase()) != -1
    })

    setCurrencyListData(result)
  }

  useEffect(() => {
    if (!walletConnected) {
      setSwapBtnText('Connect wallet to continue')
    } else if (!userLogin) {
      setSwapBtnText('Login to continue')
    } else if (secondSelectedCurrency.length == 0) {
      setSwapBtnText('Select to currency')
    } else if (typeof firstAmount == 'undefined' || !firstAmount) {
      setSwapBtnText('Enter from amount')
    } else if (parseFloat(firstAmount) > userBalance) {
      setSwapBtnText('From Amount should be less then balance')
    } else {
      setSwapBtnText('Swap')
    }
  }, [
    walletConnected,
    userLogin,
    secondSelectedCurrency,
    firstAmount,
    userBalance,
  ])

  useEffect(() => {
    if (firstAmount && firstSelectedCurrency && secondSelectedCurrency) {
      calculation(parseFloat(firstAmount))
    }
  }, [firstSelectedCurrency, secondSelectedCurrency])

  useEffect(() => {
    setUpdatedBalance(balance)
  }, [balance])

  // console.log('currencyListData================', currencyListData)
  // console.log('walletConnected================', walletConnected)i9lll;m7
  // console.log('userLogin================', userLogin)
  // console.log('verifiedChainId================', verifiedChainId)

  return (
    <div>
      <>
        <div className={style.swapMain}>
          {/* <Form
            data={{toAmount: toAmount, whitelistLabel: toWhiteListLabel}}
            wrapperClass={
              dimensions.width >= 992 ? style.form : style.form_small
            }
          > */}

          <Form
            data={{secondAmount: secondAmount}}
            wrapperClass={
              dimensions.width >= 992 ? style.form : style.form_small
            }
          >
            {alert != '' && alert}
            <strong className={style.heading}>Liquidity</strong>
            {/* {transactionLoader ? (
              <Row className='w-100 text-center'>
                <div>
                  <Spinner animation='border' variant='primary' />
                  <span className='ms-3' style={{fontSize: 22}}>
                    Swapping in Process
                  </span>
                </div>
              </Row>
            ) : null} */}
            <LiquidityConfirm
              confirm={showLiquidityConfirmModal}
              confirmClose={() => confirmClose()}
              startLiquidity={() => startLiquidity()}
              data={liquidityConfirmData}
            />
            <div>
              <div className={'row p-2 justify-content-center'}>
                <div className={'row p-2'}>
                  <div className={style.exchangeInnerForm}>
                    <span>Amount</span>

                    {walletConnected && userLogin && verifiedChainId && (
                      <span className={'float-end me-2'}>
                        {parseInt(window.ethereum.chainId) ==
                        parseInt(firstSelectedBlockChain)
                          ? firstSelectedCurrency?.currencyType == 'Blockchain'
                            ? updatedBalance > 0
                              ? `Balance: ${parseFloat(
                                  convertedBalance,
                                ).toFixed(4)}`
                              : `Balance: ${parseFloat(
                                  convertedBalance,
                                ).toFixed(4)}`
                            : firstSelectedCurrency?.tokenBalance
                            ? `Balance: ${firstSelectedCurrency?.tokenBalance}`
                            : ''
                          : ''}
                      </span>
                    )}
                    <div className={'row mt-2'}>
                      <div className={'col-sm-5 pr-0'}>
                        <input
                          onChange={changeFirstAmount}
                          placeholder='0.0'
                          type='number'
                          step='any'
                          min='0'
                          value={firstAmount}
                          disabled={
                            (firstSelectedCurrency &&
                              Object.keys(firstSelectedCurrency).length ===
                                0) ||
                            (secondSelectedCurrency &&
                              Object.keys(secondSelectedCurrency).length === 0)
                          }
                          className={`form-control from-amount ms-0 ${style.exchangeInnerInput}`}
                          style={{
                            backgroundColor: '#343d56',
                            borderRadius: 11,
                            marginLeft: 15,
                          }}
                        />
                      </div>
                      <div className={'col-sm-7 pl-0 '}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                          }}
                        >
                          <p
                            style={{
                              fontWeight: 'bold',
                              margin: '0px 6px 0px 0px',
                            }}
                          >
                            MAX
                          </p>
                          <button
                            onClick={() => openCurrencyModal('firstinput')}
                            disabled={currencyListData.length == 0}
                            className={`btn float-end btn-sm w-50 me-2 ${style.currencyDropdown}`}
                          >
                            {firstSelectedCurrency?.name ? (
                              <>
                                <img
                                  src={firstSelectedCurrency?.image}
                                  width='22'
                                  className={'me-2'}
                                />
                                {firstSelectedCurrency?.name}
                                <FontAwesomeIcon
                                  className={'ms-1'}
                                  icon={faAngleDown}
                                />
                              </>
                            ) : (
                              <>
                                Select{' '}
                                <FontAwesomeIcon
                                  className={'ms-1'}
                                  icon={faAngleDown}
                                />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={'row p-2 justify-content-center'}>
                <div className={'row p-2'}>
                  <div className={style.exchangeInnerForm}>
                    <span>Amount</span>
                    {walletConnected &&
                      userLogin &&
                      verifiedChainId &&
                      parseInt(window.ethereum.chainId) ==
                        parseInt(inMultiChainIdSec) &&
                      secondSelectedCurrency.uuid &&
                      !inMultiChainSec && (
                        <span className={'float-end me-2'}>
                          Balance: {'  '}
                          {!secondSelectedCurrency.tokenBalance
                            ? parseFloat(convertedBalance).toFixed(4)
                            : secondSelectedCurrency.tokenBalance}
                        </span>
                      )}
                    <div className={'row mt-2'}>
                      <div className={'col-sm-5 pr-0 noHoverInputBorder'}>
                        {/* <Field
                          id={'secondAmount'}
                          name={'secondAmount'}
                          // disabled
                          placeholder='0.0'
                          className={`form-control swap-input ms-3 ${style.exchangeInnerInput}`}
                          type={FORM_FIELD_TYPES.TEXT}
                          style={{
                            backgroundColor: '#343d56',
                            borderRadius: 11,
                            marginLeft: 15,
                          }}
                        /> */}

                        <input
                          value={secondAmount}
                          id='secondAmount'
                          placeholder='0.0'
                          type='number'
                          step='any'
                          disabled={true}
                          //   firstSelectedCurrency.length == 0 ||
                          //   secondSelectedCurrency.length == 0
                          // }
                          onChange={changeSecondAmount}
                          className={`form-control from-amount ms-0 ${style.exchangeInnerInput}`}
                          style={{
                            backgroundColor: '#343d56',
                            borderRadius: 11,
                            marginLeft: 15,
                          }}
                        />
                      </div>
                      <div className={'col-sm-7 pl-0 '}>
                        <button
                          onClick={() => openCurrencyModal('secondinput')}
                          className={`btn float-end btn-sm w-50 me-2 ${style.currencyDropdown} `}
                          disabled={currencyListData.length == 0}
                        >
                          {secondSelectedCurrency.name ? (
                            <>
                              <img
                                src={secondSelectedCurrency.image}
                                width='22'
                                className={'me-2'}
                              />
                              {secondSelectedCurrency.name}{' '}
                              <FontAwesomeIcon
                                className={'ms-1'}
                                icon={faAngleDown}
                              />
                            </>
                          ) : (
                            <>
                              Select{' '}
                              <FontAwesomeIcon
                                className={'ms-1'}
                                icon={faAngleDown}
                              />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <label
                htmlFor='priceandpoolshare'
                style={{
                  margin: '20px 0px 4px 0px',
                  fontWeight: '500',
                }}
              >
                PRICE AND POOL SHARE
              </label>

              <div
                id='priceandpoolshare'
                style={{
                  display: 'flex',
                  border: '1px solid white',
                  borderRadius: '10px',
                  padding: '16px 20px 4px 20px',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{textAlign: 'center'}}>
                  <h6 style={{color: 'white'}}>0.2324354</h6>
                  <p>LXOne for BNB</p>
                </div>
                <div style={{textAlign: 'center'}}>
                  <h6 style={{color: 'white'}}>308141</h6>
                  <p>BNB per LXOne</p>
                </div>
                <div style={{textAlign: 'center'}}>
                  <h6 style={{color: 'white'}}>0.23%</h6>
                  <p>Share a Pool</p>
                </div>
              </div> */}
            </div>
            <div className={style.btnContainer}>
              {walletConnected &&
              userLogin &&
              verifiedChainId &&
              firstAmount &&
              (parseFloat(firstAmount) <= userBalance || inMultiChain) &&
              currencyCalculationData?.canCompletelyFullFill &&
              currencyCalculationData?.hasLiquidity &&
              secondSelectedCurrency &&
              inputToValidation ? (
                <button
                  onClick={() => liquidityConfimrationPopup()}
                  disabled={
                    ((largeFirstCurrencyAmt !== largeSecondCurrencyAmt ||
                      inMultiChain) &&
                      Object.keys(firstSelectedCurrency).length === 0) ||
                    Object.keys(secondSelectedCurrency).length === 0
                  }
                  className={
                    ((largeFirstCurrencyAmt !== largeSecondCurrencyAmt ||
                      inMultiChain) &&
                      Object.keys(firstSelectedCurrency).length === 0) ||
                    Object.keys(secondSelectedCurrency).length === 0
                      ? `${style.buttonDisable}`
                      : 'btn-primary'
                  }
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    padding: '10px',
                    border: 'none',
                    fontWeight: '600',
                    letterSpacing: '0.06rem',
                    margin: '20px 0px',
                  }}
                >
                  Add Liquidity
                </button>
              ) : (
                <button
                  disabled={true}
                  className={style.buttonDisable}
                  style={{
                    width: '100%',
                    borderRadius: '20px',
                    padding: '10px',
                    border: 'none',
                    fontWeight: '600',
                    letterSpacing: '0.06rem',
                    margin: '20px 0px',
                  }}
                >
                  Add Liquidity
                </button>
              )}
            </div>

            {/* <button
              disabled
              style={{
                color: '#dcc0c0',
                width: '100%',
                borderRadius: '20px',
                padding: '10px',
                backgroundColor: '#e9eaeb',
                border: 'none',
                fontWeight: '600',
                letterSpacing: '0.06rem',
              }}
            >
              Supply
            </button> */}
          </Form>
          {/* Modal For To and Form*/}
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName={style.popModelSize}
          >
            <div>
              <Modal.Header className={'border-0 p-4'} closeButton>
                <Modal.Title>Select a Currency</Modal.Title>
              </Modal.Header>
              <Modal.Body className={'ps-4 pt-0 pb-0 pe-4'}>
                <div>
                  {popSelect ? (
                    <div>
                      <label className='mt-2 ms-2'>Select BlockChain</label>

                      <select
                        className={`form-select mt-2 ${style.popModelInput}`}
                        onChange={(e) =>
                          getBlockChainList(e.target.value, 'firstinput')
                        }
                        value={firstSelectedBlockChain}
                      >
                        {blockchainList &&
                          blockchainList?.map((item) => {
                            return (
                              <option key={item.chainID} value={item.chainID}>
                                {item.name}({item.shortName})
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className='mt-2 ms-2'>Select BlockChain</label>

                      <select
                        className={`form-select mt-2 ${style.popModelInput}`}
                        onChange={(e) =>
                          getBlockChainList(e.target.value, 'secondinput')
                        }
                        value={secSelectedBlockChain}
                      >
                        {blockchainList &&
                          blockchainList?.map((item) => {
                            return (
                              <option key={item.chainID} value={item.chainID}>
                                {item.name}({item.shortName})
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  )}
                  <div className={'mt-2'}>
                    <input
                      placeholder='Search Currency'
                      onChange={handleSearch}
                      className={`form-control ${style.popModelInput}`}
                    />
                  </div>
                  <div className={'mt-3'}>
                    {currencyListData.length > 0 && (
                      <ul className={'list-group'}>
                        {modalOpenType === 'firstinput'
                          ? currencyListData.map((item) => {
                              return item.name !==
                                secondSelectedCurrency?.name ? (
                                <li
                                  key={item.uuid}
                                  className={'list-group-item currency-list'}
                                  onClick={() =>
                                    firstInputSelectedCurrency(item)
                                  }
                                >
                                  <img
                                    src={item.image}
                                    width='25'
                                    className='me-2'
                                  />

                                  <span className={'ml-2'}>{item.name}</span>
                                  {item.currencyType == 'Blockchain' ? (
                                    <span className={'float-end'}>
                                      {!inMultiChain && balance > 0
                                        ? parseFloat(convertedBalance).toFixed(
                                            4,
                                          )
                                        : ''}{' '}
                                    </span>
                                  ) : (
                                    <>
                                      {!inMultiChain && balance > 0 ? (
                                        <span className={'float-end'}>
                                          {item.tokenBalance}{' '}
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                    </>
                                  )}
                                </li>
                              ) : (
                                ''
                              )
                            })
                          : currencyListData.map((item) => {
                              return item.name !==
                                firstSelectedCurrency?.name ? (
                                <li
                                  key={item.uuid}
                                  className={'list-group-item currency-list'}
                                  onClick={() =>
                                    secondInputSelectedCurrency(item)
                                  }
                                >
                                  <img
                                    src={item.image}
                                    width='25'
                                    className='me-2'
                                  />

                                  <span className={'ml-2'}>{item.name}</span>
                                  {item.currencyType == 'Blockchain' ? (
                                    <span className={'float-end'}>
                                      {!inMultiChainSec && balance > 0
                                        ? parseFloat(convertedBalance).toFixed(
                                            4,
                                          )
                                        : ''}{' '}
                                    </span>
                                  ) : (
                                    <>
                                      {!inMultiChainSec ? (
                                        <span className={'float-end'}>
                                          {item.tokenBalance}{' '}
                                        </span>
                                      ) : (
                                        ''
                                      )}
                                    </>
                                  )}
                                </li>
                              ) : (
                                ''
                              )
                            })}

                        {/* // secondModalListFilter.map((item, index) => {
                          //     return (
                          //       <li
                          //         key={index}
                          //         className={'list-group-item currency-list'}
                          //         onClick={() =>
                          //           secondInputSelectedCurrency(item)
                          //         }
                          //       >
                          //         <img
                          //           src={item.currencyImage}
                          //           width='25'
                          //           className='me-2'
                          //         />

                          //         <span className={'ml-2'}>
                          //           {item.currencyName}
                          //         </span>
                          //         {!item.tokenBalance ? (
                          //           <span className={'float-end'}>
                          //             {!inMultiChain && balance > 0
                          //               ? convertedBalance.substr(0, 6)
                          //               : ''}{' '}
                          //           </span>
                          //         ) : (
                          //           <>
                          //             {!inMultiChain && balance > 0 ? (
                          //               <span className={'float-end'}>
                          //                 {item.tokenBalance}{' '}
                          //               </span>
                          //             ) : (
                          //               ''
                          //             )}
                          //           </>
                          //         )}
                          //       </li>
                          //     )
                          //   })} */}
                      </ul>
                    )}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className={'border-0 p-4'}></Modal.Footer>
            </div>
          </Modal>
        </div>
        {/* <div className={'swapHistory container-fluid'}>
          <h5>Liquidity History</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan='2'>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>

          {console.log('items', items)}

          <Pagination size='sm'>{items}</Pagination>
        </div> */}
      </>
    </div>
  )
}
