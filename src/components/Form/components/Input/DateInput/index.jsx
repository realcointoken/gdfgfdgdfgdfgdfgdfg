import React from 'react'
import {DatePicker} from 'antd'
import moment from 'moment'
import icon from './icon.svg'
import style from './DateInput.module.scss'

export default function DateInput(props) {
  const {id, value, placeholder, onChange, onFocus} = props
  return (
    <DatePicker
      {...{id, placeholder, onFocus}}
      className={style.container}
      dropdownClassName={style.dropdown}
      onChange={(momentDate, string) => onChange(string)}
      value={value ? moment(value) : null}
      suffixIcon={<img src={icon} alt={'icon'} />}
    />
  )
}
