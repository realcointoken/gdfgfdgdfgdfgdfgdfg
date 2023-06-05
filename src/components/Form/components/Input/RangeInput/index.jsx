import React from 'react'
import {Slider} from 'antd'
import {formatNumber} from '../../../../../utils'

import style from './RangeInput.module.scss'

export default function RangeInput(props) {
  const {
    id,
    value,
    unit,
    rangeLabel,
    min,
    max,
    step,
    disabled,
    placeholder,
    onChange,
    onFocus,
  } = props
  return (
    <label className={style.container}>
      <div className={style.top}>
        <div className={style.label}>{rangeLabel}</div>
        <strong className={style.value}>
          {formatNumber(value ? value : 0, '', 0)} {unit}
        </strong>
      </div>
      <Slider
        className={style.input}
        {...{id, value, min, max, step, disabled, placeholder, onFocus}}
        onChange={(value) => onChange(value)}
      />
    </label>
  )
}
