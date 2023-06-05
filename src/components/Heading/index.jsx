import React from 'react'
import cn from 'classnames'
import style from './Title.module.scss'

export default function Heading(props) {
  const {tagName, primary, wrapperClass, children, text, center} = props
  const TagName = tagName ? tagName : primary ? 'h1' : 'h2'

  return (
    <TagName
      className={cn(style.title, wrapperClass, {
        [style.titlePrimary]: primary,
        [style.titleCenter]: center,
      })}
    >
      {text}
      {children}
    </TagName>
  )
}
