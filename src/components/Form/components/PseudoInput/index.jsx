import React from 'react'
import cn from 'classnames'
import style from './PseudoInput.module.scss'

export default function PseudoInput(props) {
  const {wrapperClass, children, light, textColor} = props

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.containerLight]: !!light,
      })}
      style={{color: textColor}}
    >
      {children}
    </div>
  )
}
