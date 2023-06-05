import React, {useState, useEffect} from 'react'
import {Modal} from 'antd'

import CloseIcon from '../assets/x-circle.svg'
import USTDIcon from '../assets/ustd.svg'
import PRJIcon from '../assets/prj.svg'
import CheckIcon from '../assets/check-circle.svg'

// import BNB from '../../../assets/img/blockchain_icons/binanceColorful.png'
// import ETH from '../../../assets/img/blockchain_icons/ethereumColorful.png'
// import AVA from '../../../assets/img/blockchain_icons/Avalanche.png'
// import Polygon from '../../../assets/img/blockchain_icons/Polygon.png'

import style from './modal.module.scss'
import axios from 'axios'
import {sendTransection} from '../../../store/actions/user'
import {getAllInvestmentByProjectId} from '../../../store/actions/getAllInvestmentbyProjectId'
import {currencyList} from '../../../store/actions/CurrencyList'
import {blockchain} from '../../../store/actions/allBlockchain'
import {useDispatch, useSelector} from 'react-redux'
import Web3 from 'web3'
import {blockchainData} from '../blockchainConstants'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {useHistory, useParams} from 'react-router'
import {current} from '../../../store/actions/current'
import {
  approveContract,
  stackAmount,
  switchMetamask,
} from '../../../store/actions/user'
import API from '../../../store/api'

const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
const PurchaseModal = (props) => {
  const [purhcaseCalculationData, setPurchaseCalculationData] = useState({})
  const [amount, setAmount] = useState()
  const [isPurchaseBtn, setIsPurchaseBtn] = useState(false)
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false)
  const [isTransactionFailed, setIsTransactionFailed] = useState(false)
  const [currencyImage, setCurrencyImage] = useState([])
  const loginState = useSelector((state) => state.login)
  const [accountBalance, setAccountBalance] = useState()
  const [isWrongChainId, setIsWrongChainId] = useState(false)
  const [investDateEnd, setInvestDateEnd] = useState(false)
  const [firstInput, setFirstInput] = useState('')
  const [selectedBlockChain, setSelectedBlockChain] = useState('')
  const [isBlocked, setIsBlocked] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [isWhiteListed, setIsWhiteListed] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [showPurchaseBtn, setShowPurchaseBtn] = useState(false)
  const [
    getAllInvestmentByProjectIdRecord,
    setgetAllInvestmentByProjectIdRecord,
  ] = useState()

  const [transactionMessage, setTransactionMessage] = useState('')
  const dispatch = useDispatch()

  const userState = useSelector((state) => state.user)
  const {id} = useParams()
  const history = useHistory()
  const isConnected = useSelector((state) => state.user.connectWallet.isConnect)

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllInvestmentByProjectId(id)).then((res) => {
        setgetAllInvestmentByProjectIdRecord(res.data[0])
        // console.log('setgetAllInvestmentByProjectIdRecord', res.data[0])
      })
    }, 2000)

    // setTimeout(() => {
    //   dispatch(currencyList(props.purchaseModalShowData.blockChainChainId))
    //     .then((res) => {
    //       setCurrencyImage(res.data[0].image)
    //       console.log(res)
    //     })
    //     .catch((error) => {
    //       console.log('error', error)
    //     })
    // }, 3000)
    console.log('props.purchaseModalShowData.blockChainChainId', props)
  }, [])

  useEffect(() => {
    setTimeout(async () => {
      var chain = await window.ethereum.chainId

      if (
        parseInt(props.purchaseModalShowData?.blockChainChainId) !==
        parseInt(chain)
      ) {
        setIsWrongChainId(true)
      } else {
        setIsWrongChainId(false)
      }
    }, 300)
  }, [props.purchaseModalShowData?.blockChainChainId])

  // useEffect(async () => {
  //   const web3 = new Web3(Web3.givenProvider)
  //   const network = await web3.eth.net.getNetworkType()
  //   await window.ethereum.enable()
  //   const accounts = await web3.eth.getAccounts()

  //   var tokenAdr = props?.purchaseModalShowData?.stableContractAdress
  //   if (tokenAdr) {
  //     var tokenBalance = await API.User.fetchUserTokenBalance(
  //       tokenAdr,
  //       accounts[0],
  //     )

  //     const havetoConvertedBalance = await window.web3.eth.getBalance(
  //       accounts[0],
  //     )

  //     var bal = await Web3.utils.fromWei(String(havetoConvertedBalance || 0))
  //     // currency Checking for token
  //     // console.log('accounts', bal)
  //     setAccountBalance(bal)
  //   } else {
  //     var bal = String(0)
  //     setAccountBalance(bal)
  //   }
  // }, [props?.purchaseModalShowData?.stableContractAdress])
  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider)
    web3.eth.net.getNetworkType().then((network) => {
      // window.ethereum.enable()
      web3.eth.getAccounts().then((accounts) => {
        var tokenAdr = props.data.ContractAddress
        if (tokenAdr) {
          API.User.fetchUserTokenBalance(tokenAdr, accounts[0]).then(
            (tokenBalance) => {
              var bal = Web3.utils.fromWei(String(tokenBalance || 0))
              setAccountBalance(bal)
            },
          )

          
        } else {
          var bal = String(0)
          setAccountBalance(bal)
        }
      })
    })
  })

  useEffect(() => {
    if (props.purchaseModalShowData && props.purchaseModalShowData?.endDate) {
      const d = new Date(props.purchaseModalShowData?.endDate)
      const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
      const mo = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(d)
      const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
      const endDate = `${ye}-${mo}-${da}`

      const today = new Date()
      const todayYear = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(
        today,
      )
      const todayMonth = new Intl.DateTimeFormat('en', {
        month: 'numeric',
      }).format(today)
      const todayDay = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(
        today,
      )
      const TodayDateFormate = `${todayYear}-${todayMonth}-${todayDay}`
      console.log('InvestDateEnd', TodayDateFormate < endDate)
      setInvestDateEnd(TodayDateFormate < endDate)
    }
  }, [props.purchaseModalShowData?.endDate])

  useEffect(() => {
    console.log('props.purchaseModalShowData.blockChainChainId', props)
    setTimeout(() => {
      if (props.purchaseModalShowData?.blockChainChainId) {
        // dispatch(currencyList(props.purchaseModalShowData.blockChainChainId))
        //   .then((res) => {
        //     setCurrencyImage(res.data[0].image)
        //     console.log(res)
        //   })
        //   .catch((error) => {
        //     console.log('error', error)
        //   })

        // if (props.purchaseModalShowData?.blockChainChainId == 3) {
        //   setImageUrl(ETH)
        // } else if (props.purchaseModalShowData?.blockChainChainId == 97) {
        //   setImageUrl(BNB)
        // } else if (props.purchaseModalShowData?.blockChainChainId == 80001) {
        //   setImageUrl(Polygon)
        // } else if (props.purchaseModalShowData?.blockChainChainId == 43113) {
        //   setImageUrl(AVA)
        // }
        dispatch(blockchain())
          .then(async (res) => {
            console.log('currencyList', res)
            const extractedChainRecord = res?.data.find(
              (record) =>
                record.chainID ==
                props.purchaseModalShowData?.blockChainChainId,
            )
            setSelectedBlockChain(extractedChainRecord)
            if (`/img/blockchain-images/${extractedChainRecord?.chainID}.png`) {
              setImageUrl(
                `/img/blockchain-images/${extractedChainRecord?.chainID}.png`,
              )
            } else {
              setImageUrl(`/img/blockchain-images/default.png`)
            }
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    }, 2000)
  }, [props.purchaseModalShowData?.blockChainChainId])

  const hitCalculation = (e) => {
    setFirstInput(e.target.value)

    setTimeout(() => {
      console.log('props.data', props.data)
      if (
        e.target.value &&
        e.target.value <= props.purchaseModalShowData?.remainingSupplyAmount
      ) {
        // setIsLoaderVisible(true)
        axios
          .get(httpUrl + '/api/v1/Pool/InvestCalculations', {
            params: {
              ...props.data,
              Amount: e.target.value,
            },
          })
          .then((response) => {
            // setIsLoaderVisible(false)
            console.log('e.target.value', e.target.value)
            setAmount(e.target.value)
            setIsPurchaseBtn(true)
            setPurchaseCalculationData(response.data.data)

            // console.log(
            //   'purhcaseCalculationData',
            //   purhcaseCalculationData.currency.uuid,
            // )
          })
          .catch((error) => {
            // message.error(error?.data?.message)
            // setIsLoaderVisible(false)
            console.log('this  is error')
            setIsPurchaseBtn(false)
            console.log(error)
          })
      } else {
        setAmount(e.target.value)
        var Message = 'You Enter the amount larger then available amount'
        setTransactionMessage(Message)

        setIsPurchaseBtn(false)
      }
      // console.log('isPurchase', isPurchaseBtn)
    }, 500)
  }
  // console.log(
  //   'userState.userAccount.accounts[0]',
  //   userState.userAccount.accounts[0],
  // )
  const purchase = () => {
    // dispatch(current())
    //   .then((res) => {
    // setIsBlocked(res?.data?.isBlocked)
    // setIsWhiteListed(res?.data?.isWhiteListed)
    // confirmedPurchased(res?.data?.isBlocked, res?.data?.isWhiteListed)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  }

  const confirmedPurchased = () => {
    // if (blocked || !whitelist) {
    // if (!whitelist) {
    //   setAlertMessage('Your address is not white listed.')
    // } else if (blocked) {
    //   setAlertMessage('You are blocked by admin.')
    // }

    // setTimeout(() => {
    //   setAlertMessage('')
    // }, 3000)
    // } else {
    // setShowPurchaseBtn(false)
    // if (
    //   Object.keys(loginState?.authResponse).length == 0 &&
    //   loginState?.authResponse?.data?.token == undefined
    // ) {
    //   localStorage.setItem('productId', JSON.stringify(id))
    //   return history.push('/login')
    // } else {
    //   localStorage.removeItem('productId')
    // }

    if (isConnected) {
      axios
        .get(httpUrl + '/api/v1/Pool/GetPoolWallet')
        .then((response) => {
          console.log(response.data.data.walletAddress)

          var amount1 = parseInt(
            Web3.utils.toWei(String(amount).substr(0, 8)),
          ).toString(16)
          console.log(
            'userState.userAccount.accounts[0]',
            userState.userAccount.accounts[0],
          )
          const payload = {
            from: userState.userAccount.accounts[0],
            to: response.data.data.walletAddress,
            value: amount,
            idoContractAddress: props.purchaseModalShowData?.idoContractAddress,
          }

          //amount1
          stackAmount(payload)
            .then((transactionHash) => {
              axios
                .post(httpUrl + '/api/v1/Pool/AddPoolInvestment', {
                  Amount: amount,
                  transactionHash: transactionHash.hash,
                  projectId: purhcaseCalculationData.projectId,
                  currencyUuid: purhcaseCalculationData.currency.uuid,
                  walletAddress: userState.userAccount.accounts[0],
                })
                .then((response) => {
                  setIsTransactionSuccess(true)
                  setTransactionMessage(response.data?.data)
                  setShowPurchaseBtn(false)
                  setTimeout(() => {
                    setIsTransactionSuccess(false)
                    // setIsPurchaseBtn(true)
                    setTransactionMessage('')
                  }, 5000)

                  setTimeout(() => {
                    dispatch(
                      getAllInvestmentByProjectId(
                        purhcaseCalculationData.projectId,
                      ),
                    )
                  }, 2000)
                  // setIsLoaderVisible(false)
                })
                .catch((error) => {
                  // message.error(error?.data?.message)
                  // setIsLoaderVisible(false)
                  setIsTransactionFailed(true)

                  setTransactionMessage(error.data?.message)
                  setTimeout(() => {
                    setIsTransactionFailed(false)
                    setTransactionMessage('')
                  }, 5000)
                  console.log('this  is error')
                  console.log(error)
                })
            })
            .catch((err) => {
              setIsTransactionFailed(true)

              setTransactionMessage(err.message)
              setTimeout(() => {
                setIsTransactionFailed(false)
                setTransactionMessage('')
              }, 5000)
            })
        })
        .catch((error) => {
          // message.error(error.data.message)
          console.log('this  is error')
          console.log(error)
        })
    } else {
      window.ethereum.enable()
    }
    // }
  }

  const approve = () => {
    console.log('🚀 ~ file: PurchaseModal.jsx ~ line 393 ~ approve ~ props.purchaseModalShowData', props.purchaseModalShowData)
    const payload = {
      contractAddress: props.purchaseModalShowData.contractAddress,
      stableContractAdress: props.purchaseModalShowData.contractAddress,
      from: userState.userAccount.accounts[0],
      value: amount,
      idoContractAddress: props.purchaseModalShowData?.idoContractAddress,
    }
    approveContract(payload)
      .then((transactionHash) => {
        console.log('trans hash', transactionHash)
        setShowPurchaseBtn(true)
      })
      .catch((err) => {
        console.log('error', err)
      })
  }

  const selectMaxCurrency = () => {
    setFirstInput(parseFloat(accountBalance).toFixed(8))
    // console.log('hit', firstInput)
  }

  // useEffect(() => {
  //   setFirstInput(firstInput)
  // }, [firstInput])

  useEffect(() => {
    setIsTransactionFailed(isTransactionFailed)
    setIsTransactionSuccess(isTransactionSuccess)
  }, [isTransactionFailed, isTransactionSuccess])

  return (
    <div
      className='mt-3 h-100'
      style={{
        padding: '25px 11px',
        textAlign: 'center',
        background: '#000000',
        borderRadius: '16px',
        border: '1px solid #ffffff',
      }}
    >
      {/* <Modal
        visible={props.open}
        footer={false}
        closeIcon={<img src={CloseIcon} />}
        onCancel={props.close}
        centered
        bodyStyle={{
          backgroundColor: '#262c40',
          padding: '40px 30px',
        }}
      > */}

      <span className={style.heading}>Purchase</span>
      <div className='mt-3'>
        {imageUrl && (
          <div className={style.ustddiv}>
            {imageUrl && <img src={imageUrl} width='24px' height='24px' />}

            <span className={style.ustdtext}>
              {selectedBlockChain.stableCoinSymbol}
            </span>
          </div>
        )}
      </div>
      <div>
        <div className={style.flexdiv} style={{marginTop: '23px'}}>
          <span className={style.lefttext}>
            Enter {selectedBlockChain.stableCoinSymbol}
          </span>
         {props.purchaseModalShowData?.maximumInvestment>0&& <span className={style.righttext}>
            MAX {props.purchaseModalShowData?.maximumInvestment}{' '}
            {selectedBlockChain.stableCoinSymbol}{" || "}
          </span> }
          <span className={style.righttext}>
            Bal. {accountBalance}{' '}
            {selectedBlockChain.stableCoinSymbol}
          </span>
        </div>
        <div
          className={style.flexdiv}
          style={{
            border: '1px solid #3a435a',
            padding: '10px',
            borderRadius: '6px',
            margin: '6px 0px',
          }}
        >
          <input
            type='number'
            className={`${style.purchaseInput} w-100`}
            onChange={hitCalculation}
            min={0}
            value={firstInput}
          />
          {/* <span className={style.vlaueleft}>100</span> */}
          {
            // props?.purchaseModalShowData?.stableContractAdress &&
            !isWrongChainId && (
              <span
                className={style.valueright}
                style={{
                  padding: '4px 14px',
                  backgroundColor: '#3a435a',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                onClick={selectMaxCurrency}
              >
                MAX
              </span>
            )
          }
        </div>
        {/* <span className={style.bottomtext}>
          {!isWrongChainId
            ? 'Balance:' + parseFloat(accountBalance).toFixed(4)
            : 'You are in wrong chain'}
        </span> */}
      </div>

      <div
        style={{
          height: '1px',
          backgroundColor: '#3A435A',
          margin: '36px 0px',
        }}
      />
      <div className={style.ustddiv}>
        <img
          src={`${httpUrl}/${props.purchaseModalShowData?.image}`}
          alt='icon'
          width='26px'
          height='24px'
          style={{
            borderRadius: 50,
          }}
        />
        <span className={style.ustdtext}>
          {`${props.purchaseModalShowData?.tokenName} (${props.purchaseModalShowData?.tokenSymbol})`}
        </span>
      </div>
      <div>
        <div className={style.flexdiv} style={{marginTop: '23px'}}>
          <span className={style.lefttext}>
            Amount {props.purchaseModalShowData?.fullName}
          </span>
          {/* <span className={style.righttext}>
            MAX {props.purchaseModalShowData.remainingSupplyAmount}{' '}
            {props.purchaseModalShowData.blockChainName}
          </span> */}
        </div>
        <div
          className={style.flexdiv}
          style={{
            border: '1px solid #3a435a',
            padding: '10px',
            borderRadius: '6px',
            margin: '6px 0px',
          }}
        >
          <input
            type='number'
            value={purhcaseCalculationData.calculatedAmount}
            className={`${style.purchaseInput} w-100`}
            disabled
          />
          {/* <span className={style.vlaueleft}>100</span> */}
          {/* <span
            className={style.valueright}
            style={{
              padding: '4px 14px',
              backgroundColor: '#3a435a',
              borderRadius: '6px',
            }}
          >
            MAX
          </span> */}
        </div>
        {/* <span className={style.bottomtext}>Balance: 2300 USDT</span> */}
      </div>

      <div className={style.currencyequation}>
        1 {selectedBlockChain?.stableCoinSymbol} ={' '}
        {props.purchaseModalShowData?.tokenRate}{' '}
        {props.purchaseModalShowData?.tokenSymbol}
      </div>
      {!isPurchaseBtn && amount && transactionMessage ? (
        <>
          <div
            style={{
              padding: '13.5px 0px',
              backgroundColor: 'rgba(230, 83, 83, 0.26)',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center',
            }}
          >
            <span className={style.warning}>{transactionMessage}</span>
          </div>
        </>
      ) : (
        ''
      )}
      {''}
      {isTransactionSuccess ? (
        <>
          <div
            style={{
              padding: '13.5px 0px',
              background: 'rgba(91, 245, 156, 0.17)',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center',
            }}
          >
            <span className={style.confirmtext}>
              <span>
                <img
                  src={CheckIcon}
                  alt=''
                  width='22px'
                  height='22px'
                  style={{marginRight: '12px'}}
                />
              </span>
              {transactionMessage}
            </span>
          </div>
        </>
      ) : (
        ''
      )}
      {''}
      {isTransactionFailed ? (
        <>
          <div
            style={{
              padding: '13.5px 0px',
              backgroundColor: 'rgba(230, 83, 83, 0.26)',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center',
            }}
          >
            <span className={style.warning}>{transactionMessage}</span>
          </div>
        </>
      ) : (
        ''
      )}
      <div
        className={style.flexdiv}
        style={{justifyContent: 'center', marginTop: '36px', gap: 30}}
      >
        {/* {props.purchaseModalShowData?.poolStatus === 'ComingSoon' && (
          <div
            style={{
              padding: '13.5px 0px',
              background: 'rgba(230, 83, 83, 0.26)',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center',
            }}
            className='w-100'
          >
            <span className={style.warning}>Comming Soon</span>
          </div>
        )} */}

        {/* {props.purchaseModalShowData?.poolStatus === 'Live' ? (
          <button
            style={{marginBottom: '3px'}}
            className={style.btnPurchase}
            onClick={() => approve()}
          >
            Approve
          </button>
        ) : (
          ''
        )} */}

        {props.purchaseModalShowData?.poolStatus === 'Live' &&
        !showPurchaseBtn ? (
          <button
            style={{marginBottom: '3px'}}
            className={style.btnPurchase}
            onClick={() => approve()}
            disabled={
              !isPurchaseBtn ||
              props.data.chainId !== parseInt(window.ethereum.chainId)
            }
          >
            Approve
          </button>
        ) : (
          ''
        )}

        {props.purchaseModalShowData?.poolStatus === 'Live' &&
        showPurchaseBtn ? (
          <button
            style={{marginBottom: '3px'}}
            className={style.btnPurchase}
            onClick={() => confirmedPurchased()}
            disabled={
              !isPurchaseBtn ||
              props.data.chainId !== parseInt(window.ethereum.chainId)
            }
          >
            Purchase
          </button>
        ) : (
          ''
        )}

        {props.purchaseModalShowData?.poolStatus === 'Ended' ? (
          <div
            style={{
              padding: '13.5px 0px',
              backgroundColor: 'rgba(230, 83, 83, 0.26)',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center',
            }}
            className='w-100'
          >
            <span className={style.warning}>Investment Date End</span>
          </div>
        ) : (
          ''
        )}
      </div>

      {/* <div>
        {isBlocked || !isWhiteListed ? (
          <div
            style={{
              padding: '13.5px 0px',
              backgroundColor: 'rgba(230, 83, 83, 0.26)',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center',
            }}
            className='w-100'
          >
            <span className={style.warning}>{alertMessage}</span>
          </div>
        ) : (
          ''
        )}
      </div> */}

      {/* </Modal> */}
    </div>
  )
}

export default PurchaseModal
