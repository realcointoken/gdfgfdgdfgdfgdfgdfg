import React from 'react'
import AlertIcon from '../assets/purchase.svg'
import style from './boxes.module.scss'
const Purchase = () => {
  return (
    <div
      style={{
        padding: '25px 50px',
        textAlign: 'center',
        background: '#171A29',
        borderRadius: '16px',
      }}
    >
      <img src={AlertIcon} alt='alert' width='138.68px' height='76.35px' />
      <p className={style.prchasemsg}>
        Your address has been whitelisted and you are granted to purchase
        tokens.
      </p>
      <div className={style.btnwrongchain}>Purchase</div>
    </div>
  )
}

export default Purchase
