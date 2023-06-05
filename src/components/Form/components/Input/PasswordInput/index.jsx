import React from 'react'
import {Input} from 'antd'
import cn from 'classnames'

import style from './PasswordInput.module.scss'

export default function PasswordInput(props) {
  const {id, value, placeholder, onChange, onFocus, light, icon, disabled} =
    props
  return (
    <Input.Password
      className={cn(style.container, {
        [style.containerLight]: light,
        [style.containerIcon]: icon,
      })}
      prefix={<img src={icon} className={style.prefix} alt='' />}
      {...{id, value, placeholder, onFocus, disabled}}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
