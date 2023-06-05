import React from 'react'
import {Input} from 'antd'
import cn from 'classnames'

import style from './TextInput.module.scss'

export default function TextInput(props) {
  const {
    id,
    value,
    placeholder,
    onChange,
    onFocus,
    light,
    icon,
    disabled,
    onBlur,
  } = props
  return (
    <Input
      className={cn(style.container, {
        [style.containerLight]: light,
        [style.containerIcon]: icon,
      })}
      prefix={<img src={icon} className={style.prefix} alt='' />}
      {...{id, value, placeholder, onFocus, disabled, onBlur}}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
