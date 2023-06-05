import React, {useState, useEffect} from 'react'
import Bubbles from '../../components/Bubbles'
import {get} from 'lodash'
import cn from 'classnames'
import style from './Register.module.scss'
import Form from '../../components/Form'
import Field from '../../components/Form/components/Field'
import Button from '../../components/Button'
import {FORM_FIELD_TYPES} from '../../components/Form/constants'
import {validateEmail} from '../../utils'
import {PAGE_REGISTER_PATH, PAGE_LOGIN_PATH} from '../../router/constants'
import {Link} from 'react-router-dom'
import {signup} from '../../store/actions/signup'
import {useDispatch, useSelector} from 'react-redux'
import NotificationAlert from '../../components/NotificationAlert'
import {useHistory} from 'react-router-dom'
import {signupClear} from '../../store/actions/signup'
import LoadingOverlay from 'react-loading-overlay'
import {PulseLoader} from 'react-spinners'

export default function Register() {
  const [yourEmail, setYourEmail] = useState('')
  const [yourPassword, setYourPassword] = useState('')
  const [yourName, setYourName] = useState('')
  const [yourPhoneNumber, setYourPhoneNumber] = useState('')
  const disabled = !yourPassword || !validateEmail(yourEmail)
  const [alert, setAlert] = useState('')
  const [isInvalidEmail, setIsInvalidEmail] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const state = useSelector((state) => state.signup)

  const WrongEmailAddress = (event) => {
    const {value} = event.target
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(value)) {
      setIsInvalidEmail(false)
    } else {
      setIsInvalidEmail(true)
    }
    // alert('Please enter a valid email address')
  }
  useEffect(() => {
    console.log('All State', state)

    const data = state.authResponse
    if (data && Object.keys(data).length) {
      setAlert(
        <NotificationAlert
          message={data.isSuccess ? data.data : data.message}
          variant={data.isSuccess ? 'success' : 'danger'}
        ></NotificationAlert>,
      )
      if (data.isSuccess) {
        dispatch(signupClear())

        setTimeout(() => {
          // history.push('/swap')
          history.push('/login')
        }, 1000)
      }
    }
  }, [state.authResponse])

  const changeHandlerEmail = (e) => {
    setYourEmail(e)
  }
  const changeHandlerName = (e) => {
    setYourName(e)
  }
  const changeHandlerPhoneNumber = (e) => {
    setYourPhoneNumber(e)
  }
  const changeHandlerPassword = (e, name) => {
    setYourPassword(e)
  }
  const registerUser = () => {
    setIsLoading(true)

    const chainId = window.ethereum.chainId
    window.web3.eth.getAccounts().then((result) => {
      let userData = {
        name: yourName,
        email: yourEmail,
        password: yourPassword,
        phoneNumber: yourPhoneNumber,
        address: result[0],
        chainId: parseInt(chainId),
      }

      dispatch(signup(userData))
        .then((res) => {
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
        })
    })
  }
  return (
    <div className={cn(style.container, 'content', 'mt-4')}>
      <Bubbles />

      <>
        <section className={style.section4}>
          <strong className={style.heading}>Register</strong>
        </section>
        <Form wrapperClass={style.form}>
          {alert != '' && alert}
          <Field
            id={'yourName'}
            name={'yourName'}
            label={'Name'}
            placeholder={'Enter Your Name'}
            type={FORM_FIELD_TYPES.TEXT}
            required
            onChange={changeHandlerName}
          />
          <Field
            id={'yourEmail'}
            name={'yourEmail'}
            label={'Email'}
            placeholder={'Enter Your Email'}
            type={FORM_FIELD_TYPES.EMAIL}
            onBlur={(e) => WrongEmailAddress(e)}
            required
            onChange={changeHandlerEmail}
            wrapperClass={style.removeBorderRadius}
          />
          {isInvalidEmail && (
            <div style={{color: 'red'}}>Please enter correct email address</div>
          )}

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
          <Field
            id={'yourPhoneNumber'}
            name={'yourPhoneNumber'}
            label={'Phone Number'}
            placeholder={'Enter Your Phone Number'}
            type={FORM_FIELD_TYPES.TEXT}
            onChange={changeHandlerPhoneNumber}
          />
          <div className={style.registerLink}>
            Already have account?
            <Link className={style.menuLink} to={{pathname: PAGE_LOGIN_PATH}}>
              {' '}
              login here
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
                text={'Signup'}
                disabled={disabled}
                primary
                blue
                onClick={() => registerUser()}
              />
            )}
          </div>
        </Form>
      </>
    </div>
  )
}
