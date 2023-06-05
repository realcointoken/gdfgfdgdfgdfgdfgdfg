import React from 'react'
import HandUpIcon from './assets/handsup.svg'
import style from './IDOOver.module.scss'
const IDOOver = () => {
  return (
    <div
      style={{
        padding: '25px 50px',
        textAlign: 'center',
        background: '#171A29',
        borderRadius: '16px',
      }}
    >
      <img src={HandUpIcon} alt='hands' width='100px' height='100px' />
      <p className={style.idoovermsg}>
        The IDO is over. Thank you for participation!
      </p>
      <div className={style.btnwrongchain}>Purchase</div>
    </div>
  )
}

export default IDOOver
