import React from 'react'
import {Select} from 'antd'
import arrows from './arrows.svg'
import dropdown from './dropdown.svg'
import cn from 'classnames'

import style from './DropDownInput.module.scss'

const {Option} = Select

export default function DropDownInput(props) {
  const {
    id,
    value,
    defaultValue,
    options,
    placeholder,
    onChange,
    onFocus,
    iconDropdown,
  } = props

  return (
    <Select
      {...{id, value, placeholder, onFocus, defaultValue}}
      className={cn(style.container, {[style.iconDropdown]: iconDropdown})}
      dropdownClassName={style.dropdown}
      suffixIcon={
        <img
          src={iconDropdown ? dropdown : arrows}
          alt='arrow'
          className={style.arrow}
        />
      }
      onChange={(option) => onChange(option)}
    >
      {options &&
        options.map((item, i) => (
          <Option className={style.option} value={item.value} key={i}>
            {item.icon && (
              <div className={style.iconContainer}>
                <img className={style.icon} alt={''} src={item.icon} />
              </div>
            )}
            {item.label}
          </Option>
        ))}
    </Select>
  )
}
