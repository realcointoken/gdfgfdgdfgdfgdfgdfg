import React from 'react'
import CongratesIcon from '../assets/congrates.svg'
import style from './boxes.module.scss'
const Winning = () => {
  return (
    <div
      style={{
        padding: '25px 50px',
        textAlign: 'center',
        background: '#171A29',
        borderRadius: '16px',
      }}
    >
      <img
        src={CongratesIcon}
        alt='congrates'
        width='80.68px'
        height='80.35px'
      />
      <p className={style.congrates}>Congrates</p>
      <p className={style.congratessubmsg}>You have won allocations.</p>
      <button className={style.winningbtn}>2,500</button>
    </div>
  )
}

export default Winning
