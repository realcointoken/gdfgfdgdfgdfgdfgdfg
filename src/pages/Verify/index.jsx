import React, {useState, useEffect} from 'react'
import Bubbles from '../../components/Bubbles'
import {get} from 'lodash'
import cn from 'classnames'
import style from './Verify.module.scss'
import {verifyEmail} from '../../store/actions/verifyEmail'

import {Link, useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import NotificationAlert from '../../components/NotificationAlert'
import {Button, Col, Row} from 'react-bootstrap'

export default function Verify() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const [verificationStatus, setVerificationStatus] = useState(false)
  const [verificationStatusMessage, setVerificationStatusMessage] = useState('')
  const history = useHistory()

  useEffect(() => {
    dispatch(verifyEmail({token: id}))
      .then((res) => {
        console.log('Verified Success', res)
        setVerificationStatus(true)
        setVerificationStatusMessage(res.data)
        setTimeout(() => {
          history.push('/login')
        }, 5000)
      })
      .catch((err) => {
        console.log('Verified Fail', err)
        setVerificationStatus(false)
        setVerificationStatusMessage(err)
      })
  }, [])

  return (
    <div className={cn(style.container, 'content')}>
      <section className={style.section4}>
        <strong className={style.heading}>Verify</strong>
      </section>

      <div className={`text-center ${style.verifyBlock}`}>
        {verificationStatusMessage === '' ? (
          <p>Please Wait we are Verifying Your Email</p>
        ) : (
          <p>{verificationStatusMessage}</p>
        )}

        {/* <div className={'w-100 text-center'}>
          <Button variant='primary' className={'text-center'}>
            Login
          </Button>
        </div> */}
      </div>
    </div>
  )
}
