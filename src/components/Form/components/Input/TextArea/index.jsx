import React from 'react'
import {Input} from 'antd'

import style from './TextArea.module.scss'

const {TextArea} = Input

export default function TextAreaInput(props) {
  const {id, value, placeholder, onChange, onFocus, isAddress} = props
  return (
    <TextArea
      {...(isAddress && {autoSize: {minRows: 3, maxRows: 5}})}
      className={style.container}
      {...{id, value, placeholder, onFocus}}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
