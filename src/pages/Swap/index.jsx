import React, {useState, useEffect, useCallback} from 'react'
import Bubbles from '../../components/Bubbles'
import {get} from 'lodash'
import cn from 'classnames'
import style from './Swap.module.scss'
import Form from '../../components/Form'
import Field from '../../components/Form/components/Field'
import Button from '../../components/Button'
import {FORM_FIELD_TYPES} from '../../components/Form/constants'
import {validateEmail} from '../../utils'
import {PAGE_REGISTER_PATH} from '../../router/constants'
import {Link, useHistory} from 'react-router-dom'
import {signup} from '../../store/actions/signup'
import {currencyList} from '../../store/actions/CurrencyList'
import {currencyCalculation} from '../../store/actions/currencyCalculation'
import {currencyCalculationRequest} from '../../store/actions/currencyCalculation'
import {useDispatch, useSelector} from 'react-redux'
import Sidebar from '../../components/Sidebar'
import {Modal, Row, Spinner} from 'react-bootstrap'
import {walletConnect} from '../../store/actions/wallet'

import NotificationAlert from '../../components/NotificationAlert'
import Web3 from 'web3'
import {getAccountSymbol} from '../../store/constants/web3'
import Api from '../../store/api'
import localforage, {getItem} from 'localforage'

import {
  sendTransection,
  sendToken,
  getTransactionReceipt,
  autoConnect,
} from '../../store/actions/user'
import {blockchain} from '../../store/actions/allBlockchain'
import {swap as swapApi} from '../../store/actions/swap'
import ConfirmModel from '../../components/ConfirmModel'
import ReceiptModal from '../../components/ReceiptModal'
import {current} from '../../store/actions/current'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {whiteLabelList} from '../../store/actions/whiteLabelList'
import {addWhiteLabelList} from '../../store/actions/addWhiteLabelList'

import {
  faAngleDown,
  faArrowDown,
  faSort,
} from '@fortawesome/free-solid-svg-icons'
import {Col} from 'antd'
import {ethers} from 'ethers'

export default function Swap() {
  const [fromAmount, setFromAmount] = useState()
  const [toAmount, setToAmount] = useState()
  const [whitelistLabel, setWhitelistLabel] = useState('')
  const [yourName, setYourName] = useState('')
  const [yourPhoneNumber, setYourPhoneNumber] = useState('')
  const disabled = !toAmount || !validateEmail(fromAmount)
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
  const [accountAddress, setAccountAddress] = useState('')
  const [selectedFromCurrency, setSelectedFromCurrency] = useState([])
  const [selectedToCurrency, setSelectedToCurrency] = useState([])
  const [modalOpenType, setModalOpenType] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [swapData, setSwapData] = useState()
  const [applySwap, setApplySwap] = useState(false)
  const [swapBtnText, setSwapBtnText] = useState()
  const [currencyCalculationData, setCurrencyCalculationData] = useState('')
  const [userBalance, setUserBalance] = useState()
  const [transactionLoader, setTranctionLoader] = useState(false)
  const [popSelect, setPopSelect] = useState(false)
  const [selectedBlockChain, setSelectedBlockChain] = useState()
  const [toSelectedBlockChain, setToSelectedBlockChain] = useState()
  const [toWhiteListLabel, setToWhiteListLabel] = useState()
  const [whiteListLabelModal, setWhiteListLabelModal] = useState(false)
  const [openModalType, setOpenModalType] = useState('from')
  const [selectWhiteLabelHeading, setSelectWhiteLabelHeading] = useState('')
  const [txHashId, setTxHashId] = useState()
  const [fromSelectBlockChainURL, setFromSelectBlockChainURL] = useState('')
  const kycStatusData = useSelector((state) => state.current.response)

  const currencyCalculationState = useSelector(
    (state) => state.currencyCalculation.response,
  )
  const whiteLabelListState = useSelector(
    (state) => state.whiteLabelList.response,
  )
  const fractalData = useSelector((state) => state.fractal.response.data)

  // const kycRegisterState = useSelector((state) => state.kycRegister.payload)

  const blockchainList = useSelector((state) => state.blockchain.blockchainData)
  const [updatedBalance, setUpdatedBalance] = useState()
  const convertedBalance = Web3.utils.fromWei(String(updatedBalance || 0))
  const history = useHistory()
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  React.useEffect(() => {
    setTimeout(() => {
      // setTimeout(() => {

      //   if (!fractalData?.access_token) {
      //     history.push('/kyc')
      //   }
      // }, 500)

      localforage.getItem('persist:fractal').then((value) => {
        var fractal = JSON.parse(JSON.parse(value)?.response)?.data
        // setFractalData(fractal)
        if (!fractal || (fractal && Object.keys(fractal).length == 0)) {
          // history.push('/kyc')
        }
      })

      checkBlockRecord()
      //   localforage.getItem('persist:fractal').then((value) => {
      //     var fractal = JSON.parse(JSON.parse(value).response)?.data
      //     console.log('valueee', fractal)
      //     if (
      //       Object.keys(loginState?.authResponse).length > 0 &&
      //       loginState?.authResponse?.data?.userInfo?.isEmailVerfied &&
      //       (!fractal || (fractal && Object.keys(fractal).length == 0))
      //     ) {
      //       history.push('/kyc')
      //     }
      //     // else {
      //     // history.push('/login')
      //     // }
      //   })
      // }, 1000)

      dispatch(current())
        .then((res) => {
          if (
            res.data.kycStatus == 'rejected' ||
            res.data.kycStatus == 'pending' ||
            res.data.kycStatus == 'submitted'
          ) {
            history.push('/kyc')
          }
        })
        .catch((error) => {
          console.log(error)
        })

      function handleResize() {
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        })
      }
      window.addEventListener('resize', handleResize)
    }, 1500)
    return () => {
      dispatch(currencyCalculationRequest())
    }
  }, [])

  const checkBlockRecord = async () => {
    const chainId = await window.ethereum.chainId
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
          if (res.data && !verifiedChainId) {
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

  useEffect(() => {
    if (
      kycStatusData?.kycStatus == 'rejected' ||
      kycStatusData?.kycStatus == 'pending' ||
      kycStatusData?.kycStatus == 'submitted'
    ) {
      history.push('/kyc')
    }
  }, [kycStatusData])

  useEffect(() => {
    const chainId = window.ethereum.chainId
    if (userState?.connectWallet?.isConnect) {
      setWhitelistLabel(userState.userAccount.accounts[0])
      // if (parseInt(userState.chainId) == parseInt(toSelectedBlockChain)) {
      //   setToWhiteListLabel(userState.userAccount.accounts[0])
      // }
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
      setSelectedFromCurrency([])
      setSelectedToCurrency([])
      setCurrencyListData([])
    }
    setAccountAddress(userState?.userAccount?.accounts[0])
    if (toSelectedBlockChain) {
      setSelectedBlockChain(parseInt(toSelectedBlockChain))
      setToSelectedBlockChain(parseInt(toSelectedBlockChain))
    } else {
      setSelectedBlockChain(parseInt(chainId))
      setToSelectedBlockChain(parseInt(chainId))
    }
    setSymbol(getAccountSymbol(chainId))
    if (userLogin && walletConnected) {
      dispatch(currencyList(parseInt(chainId)))
    }

    //blockChainList Modified
    // if (
    //   blockchainList &&
    //   blockchainList?.filter((e) => e.chainID === parseInt(chainId)).length >
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
    if (blockchainList?.length) {
      var currencyForRecepit = blockchainList.filter((item) => {
        return item.chainID === parseInt(window.ethereum.chainId)
      })
      setFromSelectBlockChainURL({
        blockChainURL: currencyForRecepit[0]?.blockExplorerUrl,
        shortName: currencyForRecepit[0]?.shortName,
      })
    }
    //////////////////
    // checkWhiteListAddress(chainId)
  }, [userState, walletConnected, blockchainList])

  useEffect(() => {
    const chainId = window.ethereum.chainId
    checkWhiteListAddress(chainId)
  }, [])

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
      loginState?.authResponse?.data?.userInfo?.isKycVerified
      // loginState?.authResponse?.data?.userInfo?.isKycVerified
    ) {
      let localStorageProjectId = JSON.parse(localStorage.getItem('productId'))
      let localStorageHomeProductId = JSON.parse(
        localStorage.getItem('homeProductId'),
      )

      if (localStorageProjectId) {
        history.push(`/pooldetail/${parseInt(localStorageProjectId)}`)
      }
      if (localStorageHomeProductId) {
        history.push(`/pooldetail/${parseInt(localStorageHomeProductId)}`)
      }
      setUserLogin(true)
    } else if (loginState?.authResponse?.data?.token) {
      setUserLogin(true)
      // history.push('/kyc')
    } else {
      setUserLogin(false)
    }

    // else if (
    //   loginState?.authResponse?.data?.token &&
    //   !fractalData?.access_token
    // ) {
    //   setUserLogin(true)
    //   history.push('/kyc')
    // }
  }, [loginState, userLogin])

  useEffect(() => {
    if (!walletConnected) {
      history.push('/swap')
    } else if (walletConnected && !userLogin) {
      history.push('/login')
    }
  }, [walletConnected, userLogin])

  const changeFromAmount = (e) => {
    const re = /^[0-9\b\.]+$/

    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
      setFromAmount(e.target.value)
    }
    // setFromAmount(e.target.value)
    setUserBalance(convertedBalance)
    calculation(parseFloat(e.target.value))
  }

  const changeToAmount = (e) => {
    setToAmount(e.target.value)
  }
  const calculation = (fromAmountValue) => {
    if (selectedFromCurrency?.currencyType == 'Blockchain') {
      setUserBalance(convertedBalance)
    } else {
      setUserBalance(selectedFromCurrency.tokenBalance)
    }

    if (
      fromAmountValue >= 0 &&
      selectedFromCurrency?.uuid &&
      selectedToCurrency?.uuid
    ) {
      const data = {
        toCurrencyUuid: selectedToCurrency.uuid,
        fromCurrencyUuid: selectedFromCurrency.uuid,
        fromAmount: fromAmountValue,
      }
      dispatch(currencyCalculation(data))
        .then((res) => {
          var calcData = res.data
          if (
            calcData &&
            Object.keys(calcData).length > 0 &&
            (!calcData?.canCompletelyFullFill || !calcData?.hasLiquidity)
          ) {
            setAlert(
              <NotificationAlert
                message={`You can swap Max ${calcData.fromAmountAvailable} ${calcData.fromCurrencyName}.`}
                variant={'info'}
              ></NotificationAlert>,
            )
            setTimeout(() => {
              setAlert('')
            }, 5500)
          }
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
  }

  useEffect(() => {
    setCurrencyCalculationData(currencyCalculationState)
  }, [currencyCalculationState])

  useEffect(() => {
    setCurrencyCalculationData(currencyCalculationState)
    setToAmount(currencyCalculationState?.toAmount)
  }, [currencyCalculationState])

  const swap = () => {
    if (parseFloat(fromAmount) == 0) {
      return showAlertMessage('Amount should be greater than 0', 'danger')
    }

    var data = {
      fromAmount: currencyCalculationData.fromAmount,
      fromCurrencyShortName: currencyCalculationData.fromCurrencyShortName,
      fromCurrencyImage: selectedFromCurrency.image,
      toAmount: currencyCalculationData.toAmount,
      toCurrencyShortName: currencyCalculationData.toCurrencyShortName,
      toCurrencyImage: selectedToCurrency.image,
    }
    setSwapData(data)
    setShowConfirmModal(true)
  }

  useEffect(() => {
    if (applySwap) {
      const amount = parseInt(
        Web3.utils.toWei(String(currencyCalculationData.fromAmount)),
      ).toString(16)

      if (currencyCalculationData.fromCurrencyType == 'Blockchain') {
        var payload = []
        if (parseInt(userState.chainId) == parseInt(toSelectedBlockChain)) {
          payload = [
            {
              from: whitelistLabel,
              to: currencyCalculationData.swapDepositAddress,
              value: amount,
            },
          ]
        } else {
          // to: toWhiteListLabel
          payload = [
            {
              from: whitelistLabel,
              to: currencyCalculationData.swapDepositAddress,
              value: amount,
            },
          ]
        }

        sendTransection(payload)
          .then((transectionHash) => {
            setTxHashId(transectionHash)
            transactionReceipt(transectionHash)
            // setTranctionLoader(true)
            setTimeout(() => {
              setShowReceiptModal(true)
            }, 1000)
            if (
              (selectedToCurrency.currencyType !== 'Blockchain' &&
                selectedFromCurrency.currencyType === 'Blockchain') ||
              (selectedToCurrency.currencyType === 'Blockchain' &&
                selectedFromCurrency.currencyType === 'Blockchain')
            ) {
              localStorage.setItem(
                'transectionDetails',
                JSON.stringify({
                  accountAddress: whitelistLabel,
                  tokenAddress: selectedToCurrency.smartContractAddress,
                  previousToBalance: selectedToCurrency.tokenBalance,
                  previousFromBalance: convertedBalance,
                }),
              )

              var intervalForNative = setInterval(async () => {
                var transectionDetails = JSON.parse(
                  localStorage.getItem('transectionDetails'),
                )
                if (
                  selectedToCurrency.currencyType !== 'Blockchain' &&
                  selectedFromCurrency.currencyType === 'Blockchain'
                ) {
                  var tokenToBalance = await Api.User.fetchUserTokenBalance(
                    transectionDetails.tokenAddress,
                    transectionDetails.accountAddress,
                  )

                  var toBalance = Web3.utils.fromWei(
                    String(tokenToBalance || 0),
                  )
                }

                let b = window.web3.eth
                  .getBalance(userState.userAccount.accounts[0])
                  .then((res) => {
                    let bal = Web3.utils.fromWei(String(res || 0))

                    if (
                      parseInt(userState.chainId) ==
                        parseInt(toSelectedBlockChain) &&
                      parseFloat(bal) !==
                        parseFloat(
                          JSON.parse(transectionDetails.previousFromBalance),
                        ) &&
                      parseFloat(
                        JSON.parse(transectionDetails.previousToBalance),
                      ) !== parseFloat(toBalance)
                    ) {
                      localStorage.setItem('transectionDetails', null)
                      clearInterval(intervalForNative)
                      // setTranctionLoader(false)
                      setUpdatedBalance(res)
                      let toCurrency = {...selectedToCurrency}
                      toCurrency.tokenBalance = toBalance
                      setSelectedToCurrency(toCurrency)
                      // showAlertMessage(
                      //   'Transection completed successfully.',
                      //   'success',
                      // )
                    } else {
                      if (
                        parseInt(userState.chainId) !=
                          parseInt(toSelectedBlockChain) &&
                        parseFloat(bal) !==
                          parseFloat(
                            JSON.parse(transectionDetails.previousFromBalance),
                          )
                      ) {
                        localStorage.setItem('transectionDetails', null)
                        clearInterval(intervalForNative)
                        // setTranctionLoader(false)
                        setUpdatedBalance(res)
                        let toCurrency = {...selectedToCurrency}
                        toCurrency.tokenBalance = toBalance
                        setSelectedToCurrency(toCurrency)
                        // showAlertMessage(
                        //   'Transection completed successfully.',
                        //   'success',
                        // )
                      }
                    }
                  })
              }, 1000)
            }

            var toAddr = ''
            if (parseInt(userState.chainId) == parseInt(toSelectedBlockChain)) {
              toAddr = whitelistLabel
            } else {
              toAddr = toWhiteListLabel
            }

            const payload = {
              toCurrencyUuid: currencyCalculationData.toCurrencyUuid,
              fromCurrencyUuid: currencyCalculationData.fromCurrencyUuid,
              fromAmount: currencyCalculationData.fromAmount,
              fromAddress: whitelistLabel,
              toAddress: toAddr,
              fromAddressDepositTo: currencyCalculationData.swapDepositAddress,
              transactionHash: transectionHash,
            }
            dispatch(swapApi(payload))
          })
          .catch((err) => {
            console.log('error', err)
            showAlertMessage('User rejected Transaction.', 'danger')
          })
      } else {
        var toWhiteAdress = ''

        if (parseInt(userState.chainId) == parseInt(toSelectedBlockChain)) {
          toWhiteAdress = currencyCalculationData.swapDepositAddress
        } else {
          // toWhiteListLabel
          toWhiteAdress = currencyCalculationData.swapDepositAddress
        }

        const payload = {
          tokenAddress: selectedFromCurrency.smartContractAddress,
          from: whitelistLabel,
          to: toWhiteAdress,
          value: currencyCalculationData.fromAmount,
        }

        sendToken(payload)
          .then((transectionHash) => {
            setTxHashId(transectionHash)
            transactionReceipt(transectionHash)
            // setTranctionLoader(true)
            setTimeout(() => {
              setShowReceiptModal(true)
            }, 1000)
            if (
              selectedToCurrency.currencyType === 'Token' &&
              selectedFromCurrency.currencyType === 'Token'
            ) {
              localStorage.setItem(
                'transectionDetails',
                JSON.stringify({
                  accountAddress: whitelistLabel,
                  tokenAddress: selectedToCurrency.smartContractAddress,
                  fromTokenAddress: selectedFromCurrency.smartContractAddress,
                  previousToBalance: selectedToCurrency.tokenBalance,
                  previousFromBalance: selectedFromCurrency.tokenBalance,
                }),
              )
              checkBalanceUpdate()
            } else if (
              selectedToCurrency.currencyType === 'Blockchain' &&
              selectedFromCurrency.currencyType !== 'Blockchain'
            ) {
              localStorage.setItem(
                'transectionDetails',
                JSON.stringify({
                  accountAddress: whitelistLabel,
                  tokenAddress: selectedFromCurrency.smartContractAddress,
                  previousFromBalance: selectedFromCurrency.tokenBalance,
                  previousToBalance: convertedBalance,
                }),
              )
              var intervalForNative = setInterval(async () => {
                var transectionDetails = JSON.parse(
                  localStorage.getItem('transectionDetails'),
                )

                if (
                  parseInt(userState.chainId) == parseInt(toSelectedBlockChain)
                ) {
                  var tokenToBalance = await Api.User.fetchUserTokenBalance(
                    transectionDetails.tokenAddress,
                    transectionDetails.accountAddress,
                  )
                  var toBalance = Web3.utils.fromWei(
                    String(tokenToBalance || 0),
                  )
                }

                var tokenFromBalance = await Api.User.fetchUserTokenBalance(
                  transectionDetails.tokenAddress,
                  transectionDetails.accountAddress,
                )

                var fromBalance = Web3.utils.fromWei(
                  String(tokenFromBalance || 0),
                )

                let b = window.web3.eth
                  .getBalance(userState.userAccount.accounts[0])
                  .then((res) => {
                    let bal = Web3.utils.fromWei(String(res || 0))
                    if (
                      parseInt(userState.chainId) ==
                        parseInt(toSelectedBlockChain) &&
                      parseFloat(bal) !==
                        parseFloat(
                          JSON.parse(transectionDetails.previousToBalance),
                        ) &&
                      parseFloat(
                        JSON.parse(transectionDetails.previousFromBalance),
                      ) !== parseFloat(tokenFromBalance)
                    ) {
                      localStorage.setItem('transectionDetails', null)
                      clearInterval(intervalForNative)
                      // setTranctionLoader(false)
                      setUpdatedBalance(res)
                      let fromCurrency = {...selectedFromCurrency}
                      fromCurrency.tokenBalance = fromBalance
                      setSelectedFromCurrency(fromCurrency)
                      let toCurrency = {...selectedToCurrency}
                      toCurrency.tokenBalance = toBalance
                      setSelectedToCurrency(toCurrency)
                      // showAlertMessage(
                      //   'Transection completed successfully.',
                      //   'success',
                      // )
                    } else {
                      if (
                        parseInt(userState.chainId) !=
                          parseInt(toSelectedBlockChain) &&
                        parseFloat(
                          JSON.parse(transectionDetails.previousFromBalance),
                        ) !== parseFloat(tokenFromBalance)
                      ) {
                        localStorage.setItem('transectionDetails', null)
                        clearInterval(intervalForNative)
                        // setTranctionLoader(false)
                        setUpdatedBalance(res)
                        let fromCurrency = {...selectedFromCurrency}
                        fromCurrency.tokenBalance = fromBalance
                        setSelectedFromCurrency(fromCurrency)
                        let toCurrency = {...selectedToCurrency}
                        toCurrency.tokenBalance = toBalance
                        setSelectedToCurrency(toCurrency)
                        // showAlertMessage(
                        //   'Transection completed successfully.',
                        //   'success',
                        // )
                      }
                    }
                  })
              }, 1000)
            }

            var toAddrSec = ''
            if (parseInt(userState.chainId) == parseInt(toSelectedBlockChain)) {
              toAddrSec = whitelistLabel
            } else {
              toAddrSec = toWhiteListLabel
            }

            const payload = {
              toCurrencyUuid: currencyCalculationData.toCurrencyUuid,
              fromCurrencyUuid: currencyCalculationData.fromCurrencyUuid,
              fromAmount: currencyCalculationData.fromAmount,
              fromAddress: whitelistLabel,
              toAddress: toAddrSec,
              fromAddressDepositTo: currencyCalculationData.swapDepositAddress,
              transactionHash: transectionHash,
            }
            dispatch(swapApi(payload))
          })
          .catch((err) => {
            console.log('error', err)
            showAlertMessage('User rejected Transaction.', 'danger')
          })
      }
      setApplySwap(false)
    }
  }, [applySwap])

  useEffect(() => {
    setFromAmount(fromAmount)
  }, [fromAmount])

  const transactionReceipt = (transectionHash) => {
    var transReceiptInt = setInterval(() => {
      getTransactionReceipt(transectionHash)
        .then((receipt) => {
          if (receipt) {
            clearInterval(transReceiptInt)
            showAlertMessage(
              'Swap completed successfully. Your wallet will be updated shortly',
              'success',
            )

            resetState()
          }
        })
        .catch((err) => {
          console.log('getting err', err)
        })
    }, 2000)
  }

  const resetState = () => {
    dispatch(currencyCalculationRequest())
    setSelectedToCurrency([])
    setFromAmount('')
    // changeFromAmount('')
  }

  const showAlertMessage = (message, varient) => {
    setAlert(
      <NotificationAlert
        message={message}
        variant={varient}
      ></NotificationAlert>,
    )
  }

  function checkBalanceUpdate() {
    var transectionDetails = JSON.parse(
      localStorage.getItem('transectionDetails'),
    )
    if (transectionDetails) {
      var checkBalanceInterval = setInterval(async () => {
        if (parseInt(userState.chainId) == parseInt(toSelectedBlockChain)) {
          var tokenToBalance = await Api.User.fetchUserTokenBalance(
            transectionDetails.tokenAddress,
            transectionDetails.accountAddress,
          )
          var toBalance = Web3.utils.fromWei(String(tokenToBalance || 0))
        }

        var tokenFromBalance = await Api.User.fetchUserTokenBalance(
          transectionDetails.fromTokenAddress,
          transectionDetails.accountAddress,
        )

        var fromBalance = Web3.utils.fromWei(String(tokenFromBalance || 0))

        if (
          parseInt(userState.chainId) == parseInt(toSelectedBlockChain) &&
          parseFloat(JSON.parse(transectionDetails.previousToBalance)) !==
            parseFloat(toBalance) &&
          parseFloat(JSON.parse(transectionDetails.previousFromBalance)) !==
            parseFloat(fromBalance)
        ) {
          localStorage.setItem('transectionDetails', null)
          clearInterval(checkBalanceInterval)
          // setTranctionLoader(false)
          let toCurrency = {...selectedToCurrency}
          let fromCurrency = {...selectedFromCurrency}
          toCurrency.tokenBalance = toBalance
          fromCurrency.tokenBalance = fromBalance
          setSelectedToCurrency(toCurrency)
          setSelectedFromCurrency(fromCurrency)
          // showAlertMessage('Transection completed successfully.', 'success')
        } else {
          if (
            parseInt(userState.chainId) != parseInt(toSelectedBlockChain) &&
            parseFloat(fromBalance) !==
              parseFloat(JSON.parse(transectionDetails.previousFromBalance))
          ) {
            localStorage.setItem('transectionDetails', null)
            clearInterval(checkBalanceInterval)
            // setTranctionLoader(false)
            // let toCurrency = {...selectedToCurrency}
            let fromCurrency = {...selectedFromCurrency}
            // toCurrency.tokenBalance = toBalance
            fromCurrency.tokenBalance = fromBalance
            // setSelectedToCurrency(toCurrency)
            setSelectedFromCurrency(fromCurrency)
            // showAlertMessage('Transection completed successfully.', 'success')
          }
        }
      }, 5000)
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
      if (!show) {
        setSelectedFromCurrency(currencyListUpdated[0])
      }
      CurrencyListstate?.response.map(async (item) => {
        if (item.currencyType !== 'Blockchain') {
          var tokenAdr = item.smartContractAddress
          if (tokenAdr) {
            if (
              parseInt(userState.chainId) == parseInt(toSelectedBlockChain) ||
              modalOpenType == 'from'
            ) {
              var tokenBalance = await Api.User.fetchUserTokenBalance(
                tokenAdr,
                accountAddress,
              )
              item.tokenBalance = await Web3.utils.fromWei(
                String(tokenBalance || 0),
              )
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
    setToWhiteListLabel(whiteLableAddress)
  }

  const getBlockChainList = (chainId, type = 'from') => {
    if (type === 'to') {
      setToWhiteListLabel()
      setToSelectedBlockChain(chainId)
      setSelectedBlockChain(chainId)
      checkWhiteListAddress(chainId)
    }
    setCurrencyListData([])
    dispatch(currencyList(chainId))
  }

  const checkWhiteListAddress = (chainId) => {
    dispatch(whiteLabelList(parseInt(chainId))).then((res) => {
      if (res.data?.length) {
        setToWhiteListLabel(res.data[0].address)
      } else {
        setToWhiteListLabel()
        showAlertMessage(
          'Please add a whitelabel address to continue swap',
          'danger',
        )
      }
    })
  }

  const handleClose = () => {
    setShow(false)
    setPopSelect(false)
    setTimeout(() => {
      setWhiteListLabelModal(false)
    }, 300)
  }

  const openCurrencyModal = (type) => {
    var whiteLabelHeading =
      blockchainList &&
      blockchainList.filter((item) => {
        return item.chainID == toSelectedBlockChain
      })

    if (whiteLabelHeading) {
      setSelectWhiteLabelHeading(whiteLabelHeading[0].name)
    }
    setOpenModalType(type)
    if (type === 'whitelist') {
      setWhiteListLabelModal(true)
      dispatch(whiteLabelList(parseInt(toSelectedBlockChain)))
        .then((res) => {
          if (res.data.length == 0) {
            setShow(false)
            showAlertMessage('Please Add a Favourite Address', 'danger')
            setTimeout(() => {
              history.push('/white-label-address')
            }, 2000)
          }
        })
        .catch((error) => {
          console.log(error.data.message)
          setShow(false)
          showAlertMessage(error.data.message, 'danger')
        })
    } else {
      setTimeout(() => {
        setWhiteListLabelModal(false)
      }, 300)
      const chainId = window.ethereum.chainId
      if (type === 'to') {
        setPopSelect(true)
        setSelectedToCurrency([])
        setToWhiteListLabel()
        if (toSelectedBlockChain) {
          setSelectedBlockChain(parseInt(toSelectedBlockChain))
          setToSelectedBlockChain(parseInt(toSelectedBlockChain))
          getBlockChainList(parseInt(toSelectedBlockChain), 'to')
        } else {
          setSelectedBlockChain(parseInt(chainId))
          setToSelectedBlockChain(parseInt(chainId))
          getBlockChainList(parseInt(chainId), 'to')
        }
      } else {
        getBlockChainList(chainId)
        setPopSelect(false)
      }
    }
    setModalOpenType(type)
    setShow(true)
  }

  const setSelectedCurrency = (value) => {
    if (modalOpenType == 'from') {
      setSelectedFromCurrency(value)
    } else {
      setSelectedToCurrency(value)
    }
    setShow(false)
  }

  const receiptClose = (data) => {
    setShowReceiptModal(data)
  }

  const confirmClose = (data) => {
    setShowConfirmModal(data)
  }

  const doSwapping = (data) => {
    setApplySwap(true)
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
    } else if (selectedToCurrency.length == 0) {
      setSwapBtnText('Select to currency')
    } else if (typeof fromAmount == 'undefined' || !fromAmount) {
      setSwapBtnText('Enter from amount')
    } else if (parseFloat(fromAmount) > userBalance) {
      setSwapBtnText('From Amount should be less than balance')
    } else {
      setSwapBtnText('Swap')
    }
  }, [walletConnected, userLogin, selectedToCurrency, fromAmount, userBalance])

  useEffect(() => {
    if (fromAmount && selectedFromCurrency && selectedToCurrency) {
      calculation(parseFloat(fromAmount))
    }
  }, [selectedFromCurrency, selectedToCurrency])

  useEffect(() => {
    setUpdatedBalance(balance)
  }, [balance])

  return (
    <div>
      <>
        <div className={style.swapMain}>
          <Form
            data={{toAmount: toAmount, whitelistLabel: toWhiteListLabel}}
            wrapperClass={
              dimensions.width >= 992 ? style.form : style.form_small
            }
          >
            {alert != '' && alert}
            <strong className={style.heading}>Swap</strong>
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
            <ConfirmModel
              confirm={showConfirmModal}
              confirmClose={confirmClose}
              swapConfirmed={doSwapping}
              data={swapData}
            />
            <div>
              <div className={'row p-2 justify-content-center'}>
                <div className={'row p-2'}>
                  <div className={style.exchangeInnerForm}>
                    <span>From</span>

                    {walletConnected && userLogin && verifiedChainId && (
                      <span className={'float-end me-2'}>
                        Balance: {'  '}
                        {selectedFromCurrency.currencyType == 'Blockchain'
                          ? updatedBalance > 1
                            ? convertedBalance.substr(0, 6)
                            : convertedBalance.substr(0, 8)
                          : selectedFromCurrency.tokenBalance}
                      </span>
                    )}
                    <div className={'row mt-2'}>
                      <div className={'col-sm-5 pr-0'}>
                        <input
                          onChange={changeFromAmount}
                          placeholder='0.0'
                          value={fromAmount}
                          type='number'
                          step='any'
                          min='0'
                          disabled={
                            selectedFromCurrency.length == 0 ||
                            selectedToCurrency.length == 0
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
                        <button
                          onClick={() => openCurrencyModal('from')}
                          disabled={currencyListData.length == 0}
                          className={`btn float-end btn-sm w-50 me-2 ${style.currencyDropdown}`}
                        >
                          {selectedFromCurrency.name ? (
                            <>
                              <img
                                src={selectedFromCurrency.image}
                                width='22'
                                className={'me-2'}
                              />
                              {selectedFromCurrency.name}
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

              <div className={'row p-2 justify-content-center'}>
                <div className={'row p-2'}>
                  <div className={style.exchangeInnerForm}>
                    <span>To</span>
                    {walletConnected &&
                      userLogin &&
                      verifiedChainId &&
                      selectedToCurrency.currencyType &&
                      parseInt(userState.chainId) ==
                        parseInt(toSelectedBlockChain) && (
                        <span className={'float-end me-2'}>
                          Balance: {'  '}
                          {selectedToCurrency.currencyType == 'Blockchain'
                            ? updatedBalance > 0
                              ? parseFloat(convertedBalance).toFixed(4)
                              : parseFloat(convertedBalance).toFixed(4)
                            : selectedToCurrency.tokenBalance}
                        </span>
                      )}
                    <div className={'row mt-2'}>
                      <div className={'col-sm-5 pr-0 noHoverInputBorder'}>
                        <Field
                          id={'toAmount'}
                          name={'toAmount'}
                          disabled
                          placeholder='0.0'
                          className={`form-control swap-input ms-3 ${style.exchangeInnerInput}`}
                          type={FORM_FIELD_TYPES.TEXT}
                          style={{
                            backgroundColor: '#343d56',
                            borderRadius: 11,
                            marginLeft: 15,
                          }}
                        />
                      </div>
                      <div className={'col-sm-7 pl-0 '}>
                        <button
                          onClick={() => openCurrencyModal('to')}
                          className={`btn float-end btn-sm w-50 me-2 ${style.currencyDropdown} `}
                          disabled={currencyListData.length == 0}
                        >
                          {selectedToCurrency.name ? (
                            <>
                              <img
                                src={selectedToCurrency.image}
                                width='22'
                                className={'me-2'}
                              />
                              {selectedToCurrency.name}{' '}
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

              <div className={'row p-2 justify-content-center'}>
                <div>
                  <div className={style.exchangeInnerForm}>
                    <div className={'row p-2'}>
                      <div className={'col-sm-6'}>
                        {' '}
                        <span>Favourite Address</span>
                      </div>
                      <div className={`col-sm-6 ${style.selectLabel}`}>
                        <button
                          onClick={() => openCurrencyModal('whitelist')}
                          className={`btn float-end btn-sm me-2 ${style.currencyDropdown}`}
                          disabled={currencyListData.length == 0}
                        >
                          Select Address
                          <FontAwesomeIcon
                            className={'ms-1'}
                            icon={faAngleDown}
                          />
                        </button>
                      </div>
                    </div>

                    <div className={'row mt-2'}>
                      <div className={`col-sm-12 noHoverInputBorder`}>
                        <Field
                          id={'whitelistLabel'}
                          name={'whitelistLabel'}
                          disabled
                          className={`form-control swap-input ms-3 ${style.exchangeInnerInput}`}
                          type={FORM_FIELD_TYPES.TEXT}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.btnContainer}>
              {walletConnected &&
              userLogin &&
              verifiedChainId &&
              fromAmount &&
              parseFloat(fromAmount) <= userBalance &&
              currencyCalculationData?.canCompletelyFullFill &&
              currencyCalculationData?.hasLiquidity &&
              toWhiteListLabel ? (
                <Button
                  onClick={() => swap()}
                  wrapperClass={(style.nextBtn, style.swapBtn)}
                  type={FORM_FIELD_TYPES.SUBMIT}
                  text={'Swap'}
                  primary
                  blue
                />
              ) : (
                <Button
                  wrapperClass={(style.nextBtn, style.swapBtn)}
                  type={FORM_FIELD_TYPES.SUBMIT}
                  text={swapBtnText}
                  disabled={disabled}
                  primary
                  blue
                />
              )}
            </div>
          </Form>
          {/* Modal For To and Form*/}
          <Modal
            show={show}
            onHide={handleClose}
            dialogClassName={style.popModelSize}
          >
            {!whiteListLabelModal ? (
              <div>
                <Modal.Header className={'border-0 p-4'} closeButton>
                  <Modal.Title>Select a token</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'ps-4 pt-0 pb-0 pe-4'}>
                  <div>
                    {popSelect ? (
                      <div>
                        <label className='mt-2 ms-2'>Select Blockchain</label>

                        <select
                          className={`form-select mt-2 ${style.popModelInput}`}
                          onChange={(e) =>
                            getBlockChainList(e.target.value, 'to')
                          }
                          value={toSelectedBlockChain}
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
                    ) : null}
                    <div className={'mt-2'}>
                      <input
                        placeholder='Search Currency'
                        onChange={handleSearch}
                        className={`form-control ${style.popModelInput}`}
                      />
                    </div>
                    {/* && item.name !== selectedToCurrency?.name */}
                    <div className={'mt-3'}>
                      {/* {currencyListData} */}
                      {currencyListData.length > 0 && (
                        <ul className={'list-group'}>
                          {currencyListData.map((item) => {
                            return item.name !== selectedFromCurrency?.name &&
                              item.name !== selectedToCurrency?.name ? (
                              <li
                                key={item.uuid}
                                className={'list-group-item currency-list'}
                                onClick={() => setSelectedCurrency(item)}
                              >
                                <img
                                  src={item.image}
                                  width='25'
                                  className='me-2'
                                />
                                <span className={'ml-2'}>{item.name}</span>
                                {item.currencyType == 'Blockchain' ? (
                                  <span className={'float-end'}>
                                    {(openModalType === 'from' ||
                                      parseInt(userState.chainId) ==
                                        parseInt(toSelectedBlockChain)) &&
                                    balance > 0
                                      ? parseFloat(convertedBalance).toFixed(4)
                                      : ''}{' '}
                                  </span>
                                ) : (
                                  <>
                                    {openModalType === 'from' ||
                                    parseInt(userState.chainId) ==
                                      parseInt(toSelectedBlockChain) ? (
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
                        </ul>
                      )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className={'border-0 p-4'}></Modal.Footer>
              </div>
            ) : (
              <div>
                <Modal.Header className={'border-0 p-4'} closeButton>
                  <Modal.Title>{selectWhiteLabelHeading} Address</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'ps-4 pt-0 pb-0 pe-4'}>
                  <div>
                    <div className={'mt-3'}>
                      {whiteLabelListState.length > 0 && (
                        <ul className={'list-group'}>
                          {whiteLabelListState.map((item) => {
                            return (
                              <div>
                                <span>{item.label}</span>
                                <li
                                  key={item.uuid}
                                  className={`list-group-item currency-list ${style.whiteLableListSelect}`}
                                  onClick={() =>
                                    selectedWhiteLableAddress(item.address)
                                  }
                                >
                                  {item.address}
                                </li>
                              </div>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className={'border-0 p-4'}></Modal.Footer>
              </div>
            )}
          </Modal>
        </div>
      </>
      <ReceiptModal
        showReceipt={showReceiptModal}
        receiptClose={receiptClose}
        txHash={txHashId}
        fromCurrencyUrl={fromSelectBlockChainURL}
      />
    </div>
  )
}
