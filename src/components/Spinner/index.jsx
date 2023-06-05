import React from 'react'
import style from './Spinner.module.scss'
import cn from 'classnames'
import spinner from './spinner.png'

export default function Spinner(props) {
  const {wrapperClass} = props

  return (
    <img src={spinner} alt='' className={cn(wrapperClass, style.container)} />
  )
}
