import React, {useEffect, useState} from 'react'

import Form from '../../components/Form'
import {FORM_FIELD_TYPES} from '../../components/Form/constants'
import style from './KYC.module.scss'
import Field from '../../components/Form/components/Field'
import cn from 'classnames'
import UploadValidation from '../../components/Form/components/UploadValidation'
import {Container, Row, Col, Card} from 'react-bootstrap'
import {kycRegister} from '../../store/actions/kycRegister'
import {fractal} from '../../store/actions/fractal'
import {useDispatch, useSelector} from 'react-redux'
import {kycGet} from '../../store/actions/getkyc'
import {message, Modal} from 'antd'
import Loader from '../../components/Layout/Loader'
import LeftSidebar from '../../components/LeftSidebar'
import {Link, useHistory, useLocation} from 'react-router-dom'
import {current} from '../../store/actions/current'
import {loginRequestClear} from '../../store/actions/login'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import localforage from 'localforage'
import {PulseLoader} from 'react-spinners'
import {logoutClear} from '../../store/actions/logout'

const KYC = () => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [address, setaddress] = useState('')
  const registerKyc = useSelector((state) => state.kycRegister)
  const getKyc = useSelector((state) => state.kycGet)
  const [isKYCRegistered, setIsKYCRegistered] = useState(false)
  const [isModelVisible, setIsModelVisible] = useState(false)
  const userState = useSelector((state) => state.user)
  const loginState = useSelector((state) => state.login)
  const [uploadProgressFront] = useState(0)
  const [uploadSuccessFront] = useState(false)
  const [errorFront, setErrorFront] = useState(false)
  const [fileFront, setFileFront] = useState(null)
  const [uploadProgressBack] = useState(0)
  const [uploadSuccessBack] = useState(false)
  const [errorBack, setErrorBack] = useState(false)
  const [fileBack, setFileBack] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  const [numberOfCallsGet, setNumberOfCallsGet] = useState(0)
  const [accessToken, setAccessToken] = useState()
  const fractalData = useSelector((state) => state.fractal.response.data)
  const [fractalError, setFractalError] = useState('')
  const [fractalErrorDescription, setFractalErrorDescription] = useState('')
  const [kycStatus, setKycStatus] = useState('')
  const [kycStatusData, setKycStatusData] = useState('')
  const [isWhiteListed, setIsWhiteListed] = useState(false)

  // const kycArray = ['pending', 'approve', 'rejected', 'submitted']
  // const kycStatusData = useSelector((state) => state.current.response.kycStatus)

  // console.log('kycArray', kycStatus)
  const history = useHistory()

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  React.useEffect(() => {
    if (Object.keys(loginState?.authResponse).length == 0) {
      dispatch(logoutClear())
      dispatch(loginRequestClear())

      setTimeout(() => {
        history.push('/login')
      }, 500)
    }
    setTimeout(() => {
      currentReq()
    }, 500)
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    console.log('this is register useeffect')
    if (registerKyc.payload?.isSuccess === true) {
      message.success('KYC is registered successfully')
      setIsModelVisible(false)
      setIsKYCRegistered(true)
    } else if (registerKyc.payload?.isSuccess === false) {
      setIsModelVisible(false)
      if (isSubmit) message.error(registerKyc.payload?.message)
    }
  }, [registerKyc])

  const handleLastNameChange = (e) => {
    setlastName(e)
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e)
  }
  const handleAddressChange = (e) => {
    setaddress(e)
  }

  const registerKYC = () => {
    setIsSubmit(true)
    if (isKYCRegistered) {
      message.error('KYC is already registered')
    } else {
      if (fileFront != null) {
        if (fileBack != null) {
          setIsModelVisible(true)
          var bodyFormData = new FormData()
          bodyFormData.append('FirstName', firstName)
          bodyFormData.append('LastName', lastName)
          bodyFormData.append('Address', address)
          bodyFormData.append('CNICFrontUrl', fileFront)
          bodyFormData.append('CNICBackUrl', fileBack)
          dispatch(kycRegister(bodyFormData)).then((res) => {
            console.log('resssssssss', res.isSuccess)
            if (res.isSuccess) {
              dispatch(loginRequestClear())
              setTimeout(() => {
                history.push('/login')
              }, 1000)
            }
          })
        }
      }
    }
  }

  const handleOnChangeBack = (err) => (file) => {
    setErrorBack(err)
    if (!err) {
      setFileBack(file)
    } else {
      setFileBack(null)
    }
  }

  const handleOnChangeFront = (err) => (file) => {
    setErrorFront(err)
    if (!err) {
      setFileFront(file)
    } else {
      setFileFront(null)
    }
  }

  const redirectURL = () => {
    window.open('#')
  }

  let {search} = useLocation()
  useEffect(() => {
    setTimeout(() => {
      const query = new URLSearchParams(search)
      const code = query.get('code')
      const state = query.get('sub1')
      const error = query.get('error')
      setFractalError(error)
      const errorDescription = query.get('error_description')
      setFractalErrorDescription(errorDescription)
      if (code) {
        dispatch(fractal({code, state})).then((res) => {
          setTimeout(() => {
            // history.push('/swap')
            currentReq()
          }, 2000)
        })
      }
      dispatch(kycGet())
        .then((res) => {
          console.log('resss', res)
          setIsKYCRegistered(true)
          KycVerificationStatus(res.data.kycStatus)
          setKycStatusData(res.data.kycStatus)
        })
        .catch((err) => {
          setIsKYCRegistered(false)
        })
    }, 2000)
  }, [])

  const currentReq = () => {
    dispatch(current())
      .then((res) => {
        setIsWhiteListed(res?.data?.isWhiteListed)
        if (res.data.kycStatus == 'approve') {
          // history.push('/swap')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    setFractalErrorDescription(fractalErrorDescription)
  }, [fractalErrorDescription])

  useEffect(() => {
    setFractalError(fractalError)
  }, [fractalError])

  const KycVerificationStatus = (statusData) => {
    console.log('statusData', statusData)
    switch (statusData) {
      case 'pending':
        return setKycStatus(
          ' In order to use LavaX platform, please verify your KYC',
        )
      case 'submitted':
        return setKycStatus('Your KYC is Submited please wait for the Approval')
      case 'approve':
        return setKycStatus('Your KYC is verified')
      case 'rejected':
        return setKycStatus('Your KYC is Rejected')
      // default:
      //   return setKycStatus(
    }
  }

  return (
    <div>
      <Row className='justify-content-center'>
        <Col sm={8} className={'text-center'}>
          <>
            <Card
              className='text-center mt-4'
              style={{backgroundColor: '#050c1f'}}
            >
              <Card.Header
                style={{backgroundColor: '#343D56', fontWeight: 'bold'}}
              >
                {isWhiteListed
                  ? kycStatusData &&
                    (kycStatusData == 'pending' || kycStatusData == 'rejected')
                    ? 'Verify Yourself'
                    : kycStatusData == 'approve'
                    ? 'Verified user'
                    : ''
                  : 'Address is not WhiteListed'}
              </Card.Header>
              <Card.Body className='p-5'>
                <Card.Text>
                  {isWhiteListed
                    ? kycStatus || <PulseLoader color='white' size='11' />
                    : 'You address is not whitelisted please contact to the admin'}
                </Card.Text>
              </Card.Body>
              <Card.Footer className='text-muted'>
                {isWhiteListed ? (
                  kycStatusData == 'pending' || kycStatusData == 'rejected' ? (
                    <Button onClick={redirectURL} className='w-100'>
                      Fractal ID Verification
                    </Button>
                  ) : (
                    ''
                  )
                ) : (
                  ''
                )}
              </Card.Footer>
            </Card>
          </>
        </Col>
      </Row>
    </div>
  )
}
export default KYC
