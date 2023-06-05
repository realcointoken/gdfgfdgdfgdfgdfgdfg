import React from 'react'
import style from './TextGradient.module.scss'

export default function TextGradient(props) {
  const {children, text} = props
  return (
    <span className={style.gradient}>
      {text}
      {children}
    </span>
  )
}
