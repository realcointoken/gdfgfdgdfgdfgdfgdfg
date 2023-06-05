import React from 'react'
import ClockIcon from '../assets/clock.svg'
import style from './boxes.module.scss'
const Comingsoon = () => {
  return (
    <div
      style={{
        padding: '25px 40px',
        textAlign: 'center',
        background: '#171A29',
        borderRadius: '16px',
      }}
    >
      <img src={ClockIcon} alt='alert' width='88px' height='88px' />
      <p className={style.comingsoon}>Token sale coming soon</p>
      <div className={style.comingbtntext}>
        <span className={style.comingbtntextnumber}>0</span>
        <span className={style.comingbtntexttime}>Days</span>
        <span className={style.comingbtntextnumber}>0</span>{' '}
        <span className={style.comingbtntexttime}>Hours</span>
        <span className={style.comingbtntextnumber}>0</span>{' '}
        <span className={style.comingbtntexttime}>Minuts</span>
        <span className={style.comingbtntextnumber}>0</span>{' '}
        <span className={style.comingbtntexttime}>Seconds</span>
      </div>
    </div>
  )
}

export default Comingsoon
