import React from 'react'
import LosefaceIcon from './assets/loseface.svg'
import style from './LoseAllocation.module.scss'
const LoseAllocation = () => {
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
        src={LosefaceIcon}
        alt='congrates'
        width='80.68px'
        height='80.35px'
      />

      <p className={style.losemsg}>You weren`t lucky this time</p>
    </div>
  )
}

export default LoseAllocation
