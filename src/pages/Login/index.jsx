import React, {useState, useEffect} from 'react'
import Bubbles from '../../components/Bubbles'
import {get} from 'lodash'
import cn from 'classnames'
import style from './Login.module.scss'
import Form from '../../components/Form'
import Field from '../../components/Form/components/Field'
import Button from '../../components/Button'
import {FORM_FIELD_TYPES} from '../../components/Form/constants'
import {validateEmail} from '../../utils'
import {PAGE_REGISTER_PATH} from '../../router/constants'
import {Link} from 'react-router-dom'
import {login} from '../../store/actions/login'
import {current} from '../../store/actions/current'
import {fractal} from '../../store/actions/fractal'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import NotificationAlert from '../../components/NotificationAlert'
import http from '../../store/api/http'
import localForage from 'localforage'
import {PulseLoader} from 'react-spinners'

export default function Login() {
  const [yourEmail, setYourEmail] = useState('')
  const [yourPassword, setYourPassword] = useState('')
  const disabled = !yourPassword || !validateEmail(yourEmail)
  const dispatch = useDispatch()
  const history = useHistory()
  const [alert, setAlert] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // const currentData = useSelector((state) => state.current.response)
  const [verifiedChainId, setVerifiedChainId] = useState(false)
  const userState = useSelector((state) => state.user)
  const [walletConnected, setWalletConnected] = useState()
  const blockchainList = useSelector((state) => state.blockchain.blockchainData)
  const verifiedEmailState = useSelector((state) => state.verifyEmail.response)
  // const [kycStatus, setKycStatus] = useState('')
  // const kycArray = ['pending', 'approve', 'rejected', 'submitted']
  const kycStatusData = useSelector(
    (state) => state.current?.response?.kycStatus,
  )

  const changeHandler = (e) => {
    setYourEmail(e)
  }
  const changeHandlerPassword = (e) => {
    setYourPassword(e)
  }

  const state = useSelector((state) => state.login)

  useEffect(() => {
    const data = state.authResponse
    console.log('data', data)
    if (data && Object.keys(data).length) {
      if (!data?.data?.userInfo?.isEmailVerfied) {
        // setAlert(
        //   <NotificationAlert
        //     message={'Please verify email.'}
        //     variant={'warning'}
        //   ></NotificationAlert>,
        // )
      } else {
        setAlert(
          <NotificationAlert
            message={data.message}
            variant={data.isSuccess ? 'success' : 'danger'}
          ></NotificationAlert>,
        )
      }
      // && data.data.userInfo?.isEmailVerfied
      if (data.isSuccess && data.data.userInfo?.isEmailVerfied) {
        // updateAxiosAuthorization()
        setTimeout(() => {
          var authResponse = {}
          // var fractal = {}

          localForage.getItem('persist:login').then((value) => {
            authResponse = JSON.parse(JSON.parse(value).authResponse)
            if (Object.keys(authResponse).length) {
              const token = authResponse.data.token
              http.setAuthorizationHeader(token)
              localStorage.setItem('isLogin', true)
              setIsLoading(true)
              setTimeout(() => {
                // localForage.getItem('persist:fractal').then((value) => {
                // var fractal = JSON.parse(JSON.parse(value).response)?.data
                // // var fractal = JSON.parse(value)
                // console.log('valueee', fractal)

                dispatch(current())
                  .then((res) => {
                    setIsLoading(false)

                    // if (res.response.kycStatus !== 'approve') {
                    console.log('kycStatus', res.data.kycStatus)
                    localStorage.setItem('isLogin', true)
                    if (
                      Object.keys(authResponse).length > 0 &&
                      Object.keys(res.data).length > 0 &&
                      res?.data?.kycStatus == 'approve'
                    ) {
                      history.push('/staking')
                    } else if (
                      Object.keys(authResponse).length > 0 &&
                      Object.keys(res.data).length > 0 &&
                      (res?.data?.kycStatus == 'pending' ||
                        res?.data?.kycStatus == 'rejected' ||
                        res?.data?.kycStatus == 'submitted')
                    ) {
                      history.push('/kyc')
                    }
                    // }
                    // else {
                    //   history.push('/kyc')
                    // }
                  })
                  .catch((error) => {
                    setIsLoading(false)
                  })

                // })
              }, 3000)
            }
          })
        }, 700)
      }
    }
  }, [state.authResponse])

  const showAlertMessage = (message, varient) => {
    setAlert(
      <NotificationAlert
        message={message}
        variant={varient}
      ></NotificationAlert>,
    )
  }

  useEffect(() => {
    const chainId = window.ethereum.chainId
    if (!userState?.connectWallet?.isConnect) {
      history.push('/staking')
    }
  }, [userState])

  useEffect(() => {
    // KycVerificationStatus(kycArray[3])
  }, [])

  const loginUser = async () => {
    setIsLoading(true)

    const chainId = await window.ethereum.chainId
    window.web3.eth.getAccounts().then((result) => {
      let userData = {
        email: yourEmail,
        password: yourPassword,
        address: result[0],
        chainId: parseInt(chainId),
      }

      dispatch(login(userData))
        .then((res) => {
          setIsLoading(false)
          // window.open(
          //   'https://next.fractal.id/authorize?client_id=BeIq0NGuzn09WEKgEhZ2P6p1a42n3J-xuhI6BEYMaTQ&redirect_uri=http%3A%2F%2Flocalhost%3A3008%2Fkyc&response_type=code&scope=contact%3Aread%20verification.basic%3Aread%20verification.basic.details%3Aread%20verification.liveness%3Aread%20verification.liveness.details%3Aread',
          // )
        })
        .catch((error) => {
          setIsLoading(false)
          showAlertMessage('Invalid username or password', 'danger')
          console.log(error)
        })
    })
  }
  return (
    <div className={cn(style.container, 'content')}>
      <Bubbles />

      <>
        <section className={style.section4} style={{marginTop: '50px'}}>
          <strong className={style.heading}>Login</strong>
        </section>
        <Form wrapperClass={style.form}>
          {alert != '' && alert}
          <Field
            id={'yourEmail'}
            name={'yourEmail'}
            label={'Email'}
            placeholder={'Enter Your Email'}
            type={FORM_FIELD_TYPES.EMAIL}
            required
            onChange={changeHandler}
            wrapperClass={style.removeBorderRadius}
          />

          <Field
            id={'yourPassword'}
            name={'yourPassword'}
            label={'Password'}
            placeholder={'Enter Your Password'}
            type={FORM_FIELD_TYPES.PASSWORD}
            onChange={changeHandlerPassword}
            required
            wrapperClass={style.removeBorderRadius}
          />
          <div className={style.registerLink}>
            Don't have account?
            <Link
              className={style.menuLink}
              to={{pathname: PAGE_REGISTER_PATH}}
            >
              {' '}
              Register here
            </Link>
          </div>
          <div className={style.btnContainer}>
            {isLoading ? (
              <Button
                wrapperClass={style.nextBtn}
                text={<PulseLoader color='white' size='11' />}
                disabled={disabled}
                primary
                blue
              />
            ) : (
              <Button
                wrapperClass={style.btnSubmit}
                type={FORM_FIELD_TYPES.SUBMIT}
                text={'Login'}
                disabled={disabled}
                primary
                blue
                onClick={() => loginUser()}
              />
            )}
          </div>
        </Form>
      </>
    </div>
  )
}
