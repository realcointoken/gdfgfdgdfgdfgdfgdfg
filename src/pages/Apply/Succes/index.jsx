import React from 'react'
import {Link} from 'react-router-dom'
import style from '../Apply.module.scss'

import Button from '../../../components/Button'
import {PAGE_HOME_PATH} from '../../../router/constants'
import successIcon from '../img/success.png'

export default function Success() {
  return (
    <div className={style.successBox}>
      <img src={successIcon} alt='success' className={style.successImg} />
      <h1 className={style.successHeading}>Your Application Has Been Sent</h1>
      <p className={style.successDetail}>
        Expect to hear back from a team member in a few days regarding your
        submission
      </p>

      <Link to={PAGE_HOME_PATH}>
        <Button
          wrapperClass={style.nextBtn}
          text={'RETURN HOME'}
          primary
          blue
          href={'/'}
        />
      </Link>
    </div>
  )
}
