import React from 'react'
import {InputNumber} from 'antd'

import style from './TextInput.module.scss'

export default function NumberInput(props) {
  const {id, value, placeholder, onChange, onFocus} = props
  return (
    <InputNumber
      className={style.container}
      {...{id, value, placeholder, onFocus}}
      onChange={(value) => onChange(value)}
      bordered={false}
      //usama's change start, contact me incase of inconvience
      min={0}
      stringMode={false}
      // usama's change end
    />
  )
}
