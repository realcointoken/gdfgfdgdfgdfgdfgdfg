import React from 'react'
import AlertIcon from '../assets/alert.svg'
import style from './boxes.module.scss'
const WrongBlockchain = () => {
  return (
    <div
      style={{
        padding: '25px 50px',
        textAlign: 'center',
        background: '#171A29',
        borderRadius: '16px',
      }}
    >
      <img src={AlertIcon} alt='alert' width='55.68px' height='52.35px' />
      <p className={style.switchblockchain}>
        Please switch your blochain to Binance Smart Chain
      </p>
      <div className={style.btnwrongchain}>Wrong blockchain connected</div>
    </div>
  )
}

export default WrongBlockchain
