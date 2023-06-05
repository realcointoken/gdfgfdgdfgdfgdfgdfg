import React from 'react'
import style from './CoinAvatar.module.scss'
import cn from 'classnames'

export default function CoinAvatar(props) {
  const {image, icon, showBlockchain = true, wrapperClass} = props

  return (
    <div
      className={cn(style.container, wrapperClass)}
      style={{backgroundImage: `url(${image})`}}
    >
      {showBlockchain && (
        <div className={style.icon}>
          {icon && <img src={icon} className={style.iconImage} alt={''} />}
        </div>
      )}
    </div>
  )
}
