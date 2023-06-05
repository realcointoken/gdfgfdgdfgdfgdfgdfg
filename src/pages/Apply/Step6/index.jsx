import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {get, isEmpty} from 'lodash'
import {Form, message} from 'antd'

import style from '../Apply.module.scss'
import UploadValidation from '../../../components/Form/components/UploadValidation'
import Button from '../../../components/Button'
import HCaptchaInput from '../../../components/Hcapcha'
import {uploadApplications} from '../../../store/actions/applications'
import {uploadMedia} from '../../../store/actions/common'
import axios from 'axios'
import http from '../../../store/api/http'
import Loader from '../../../components/Layout/Loader'
import ConfirmPoolModel from '../../../components/ConfirmPoolModel'
import {sendToken, switchMetamask} from '../../../store/actions/user'

import detectEthereumProvider from '@metamask/detect-provider'
import {ethers} from 'ethers'
import Web3 from 'web3'
import API from '../../../store/api'

export default function StepFive({step, onContinue, data}) {
  console.log('data', data)
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const dispatch = useDispatch()
  const [file, setFile] = useState()
  const [file2, setFile2] = useState()
  // const [tokenCapcha, setTokenCapcha] = useState('')
  const [uploadProgress] = useState(0)
  const [uploadSuccess] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)
  const [showConfirmPoolModal, setShowConfirmPoolModal] = useState(false)
  const [isLoaderVisible, setIsLoaderVisible] = useState(false)
  // const [tokenBalance, setTokenBalance] = useState()
  const [whitelistLabel, setWhitelistLabel] = useState('')
  const [poolConfirmStatus, setPoolConfirmStatus] = useState(false)
  const userState = useSelector((state) => state.user)

  // useEffect(() => {
  //   console.log('this is user state')
  //   console.log(userState)
  //   const chainId = window.ethereum.chainId
  //   if (userState?.connectWallet?.isConnect) {
  //     setWhitelistLabel(userState.userAccount.accounts[0])
  //     console.log('this is  address')
  //     console.log(userState?.connectWallet?.isConnect)
  //   } else {
  //     console.log('user not connected')
  //   }
  // }, [])

  const isRequesting = useSelector(
    (state) => state.applications.uploadApply.requesting,
  )
  const errorSubmit = useSelector(
    (state) => state.applications.uploadApply.error,
  )

  const handleOnChange = (err) => (file) => {
    setError(err)
    if (!err) {
      setFile(file)
    } else {
      setFile(null)
    }
  }

  const handleOnChangetwo = (err) => (file) => {
    setError2(err)
    if (!err) {
      setFile2(file)
    } else {
      setFile2(null)
    }
  }

  const confirmClose = (boolean) => {
    console.log(boolean)
    setShowConfirmPoolModal(boolean)
  }

  // const doAddPool = () => {
  //   // setApplySwap(true)
  //   // setPoolConfirmStatus(true)
  //   console.log('true')
  //   onSubmit()
  //   // onSubmit()
  // }

  // const handleVerify = (token) => {
  //   setTokenCapcha(token)
  // }
  // const onSubmit = () => {
  //   // console.log('dataaaa', data)
  //   axios
  //     .get(httpUrl + '/api/v1/Pool/GetPoolWallet')
  //     .then(async (response) => {
  //       console.log('this  is wallet address')
  //       console.log(response.data.data.walletAddress)

  //       if (data.blockchain.blockId != parseInt(window.ethereum.chainId)) {
  //         switchMetamask(data.blockchain.blockId)
  //           .then((res) => {
  //             console.log('Chain Changed Success', res)
  //           })
  //           .catch((err) => {
  //             console.log('Chain Changed Failed', err)
  //           })
  //       } else {
  //         const web3 = new Web3(Web3.givenProvider)
  //         const network = await web3.eth.net.getNetworkType()
  //         await window.ethereum.enable()
  //         const accounts = await web3.eth.getAccounts()
  //         console.log(accounts[0])
  //         console.log(data.contractAddress)
  //         var tokenBalGet = await API.User.fetchUserTokenBalance(
  //           data.contractAddress,
  //           accounts[0],
  //         )
  //         var tokenBal = await Web3.utils.fromWei(String(tokenBalGet || 0))
  //         // setTokenBalance(tokenBal)
  //         console.log(tokenBal)

  //         if (data.supplyAmount * data.tokenRate <= tokenBal) {
  //           sendTokenToWallet(response.data.data.walletAddress)
  //         } else {
  //           setIsAlert(true)

  //           setTimeout(() => {
  //             setIsAlert(false)
  //           }, 3000)
  //         }
  //       }

  //       //sendTransection(payload)

  //       //onContinue(step + 1)
  //     })
  //     .catch((error) => {
  //       console.log('this  is error')
  //       console.log(error)
  //     })
  // }

  // const sendTokenToWallet = async (walletAddress) => {
  //   const accounts = await window.ethereum.request({
  //     method: 'eth_requestAccounts',
  //   })
  //   const account = accounts[0]

  //   console.log('this is account')
  //   console.log(account)

  //   const payload = {
  //     tokenAddress: data.contractAddress,
  //     from: account,
  //     to: walletAddress,
  //     value: data.supplyAmount * data.tokenRate,
  //   }

  //   sendToken(payload)
  //     .then((transectionHash) => {
  //       data = {...data, SupplyTransactionHash: transectionHash}
  //       addPool()
  //     })
  //     .catch((error) => {
  //       console.log('error in transaction')
  //       console.log(error)
  //     })
  // }

  const addPool = () => {
    console.log('this  is data')
    console.log(data)
    const formData = new FormData()
    formData.append('FullName', data.fullName)
    formData.append('Title', data.title)
    formData.append('Telegram', data.yourTelegram)
    formData.append('Email', data.yourEmail)
    formData.append('ProjectName', data.projectName)
    formData.append('WebsiteURL', data.websiteURL)
    formData.append('WhitepaperURL', data.whitepaperURL)
    formData.append('LinktoDeck', data.linkToDeck)
    formData.append('ProjectTwitter', data.projectTwitter)
    formData.append('ProjectTelegram', data.projectTelegram)
    formData.append('ProjectGithub', data.projectGithub)
    formData.append('ProjectDescription', data.projectDescription)
    formData.append('TokenInformation', data.tokenInformation)
    formData.append('ProductDevelopmentState', data.developmentState)
    formData.append('DevelopmentRoadmap', data.developmentRoadmap)
    formData.append('UniqueValueProposition', data.uniqueValueProposition)
    formData.append('CardonoContribution', data.cardanoContribution)
    formData.append('ProjectFinancingStructure', data.financingStructure)
    formData.append('BlockChainChainId', data.blockchain.blockId)
    formData.append('TokenRate', data.tokenRate)
    formData.append('BlockChainName', data.blockchain.name)
    formData.append('ContractAddress', data.contractAddress)
    formData.append('ShortDescription', data.shortDescription)
    formData.append('RaiseTarget', data.raiseTarget.toString())
    formData.append('EndDate', data.expectedLaunchDate)
    formData.append('LiveDate', data.liveDate)
    formData.append('SupplyTransactionHash', null)
    formData.append('SupplyAmount', parseFloat(data.supplyAmount))
    formData.append('tokenName', data.tokenName)
    formData.append('tokenSymbol', data.tokenSymbol)
    formData.append('Image', file)
    formData.append('BackgroundImage', file2)
    setIsLoaderVisible(true)
    axios
      .post(httpUrl + '/api/v1/Pool/AddPool', formData)
      .then((response) => {
        setIsLoaderVisible(false)
        console.log('this  is  response')
        console.log(response)
        onContinue(step + 1)
      })
      .catch((error) => {
        message.error(error?.data?.message)
        setIsLoaderVisible(false)
        console.log('this  is error')
        console.log(error)
      })
  }

  return (
    <section className={style.header}>
      <ConfirmPoolModel
        confirm={showConfirmPoolModal}
        confirmClose={confirmClose}
        poolConfirmed={addPool}
        data={data}
      />

      <Loader isVisible={isLoaderVisible} />
      <h1 className={style.title}>Step {step + 1}/6</h1>
      <p className={style.heading}>Resource</p>
      <p className={style.description}>Upload your icon for your project</p>

      <div className={style.form}>
        <h1 className={style.headingText}>Logo</h1>

        <UploadValidation
          onChange={handleOnChange}
          uploadProgress={uploadProgress}
          uploadSuccess={uploadSuccess}
          notPDF
        />

        <h1 className={style.headingText}>Background Image</h1>

        <UploadValidation
          onChange={handleOnChangetwo}
          uploadProgress={uploadProgress}
          uploadSuccess={uploadSuccess}
          notPDF
        />

        {/* <Form name='basic' onFinish={(e) => console.log('onFinish', e)}>
          <Form.Item name='capcha'>
            <HCaptchaInput handleVerify={handleVerify} />
          </Form.Item>
        </Form>
        {isAlert ? (
          <>
            <div
              style={{
                backgroundColor: 'hsla(0, 100%, 49%, 0.5)',
                padding: 20,
                borderRadius: 10,
              }}
            >
              You Don't have enough balance
            </div>{' '}
          </>
        ) : (
          ''
        )} */}

        <div className={style.btnContainer}>
          <Button
            wrapperClass={style.backBtn}
            text={'BACK'}
            primary
            dark
            onClick={() => onContinue(step - 1)}
          />
          <Button
            wrapperClass={style.nextBtn}
            text={
              // data.blockchain.blockId != parseInt(window.ethereum.chainId)
              // ? 'Switch Network'
              'SUBMIT'
            }
            primary
            blue
            onClick={() => confirmClose(true)}
            // onClick={sendTransection}
            loading={isRequesting || uploadSuccess}
            disabled={error || isEmpty(file) || isEmpty(file2)}
          />
        </div>
      </div>
    </section>
  )
}
