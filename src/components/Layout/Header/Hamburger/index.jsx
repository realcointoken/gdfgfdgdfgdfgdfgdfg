import React from 'react'
import style from './Hamburger.module.scss'
import cn from 'classnames'

export default function Hamburger(props) {
  const {isOpen, onClick, color = '#000'} = props

  return (
    <button
      className={cn(style.container, {
        [style.containerOpen]: isOpen,
      })}
      style={{color: color}}
      onClick={onClick}
    >
      <span className={style.dash} />
      <span className={style.dash} />
      <span className={style.dash} />
    </button>
  )
}
