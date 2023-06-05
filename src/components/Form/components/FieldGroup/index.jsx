import React from 'react'
import cn from 'classnames'
import style from './FieldGroup.module.scss'

export default function FieldGroup(props) {
  const {wrapperClass, children} = props

  return <div className={cn(style.container, wrapperClass)}>{children}</div>
}
