import React from 'react'
import cn from 'classnames'
import style from './Text.module.scss'

export default function Text(props) {
  const {tagName, wrapperClass, text, children, center} = props
  const CustomTag = tagName ? tagName : 'p'

  return (
    <CustomTag
      className={cn(style.text, wrapperClass, {
        [style.textCenter]: center,
      })}
    >
      {text}
      {children}
    </CustomTag>
  )
}
