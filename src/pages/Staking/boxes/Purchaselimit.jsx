import React from 'react'
import PurchaselimitIcon from '../assets/purchaselimit.svg'
import style from './boxes.module.scss'
const Purchaselimit = () => {
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
        src={PurchaselimitIcon}
        alt='meter'
        width='100.68px'
        height='100.35px'
      />
      <p className={style.purchaselimit}>
        You have reached your purchase limits. Thank you for participating in
        this IDO.
      </p>
    </div>
  )
}

export default Purchaselimit
