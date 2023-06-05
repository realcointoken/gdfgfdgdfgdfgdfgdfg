import React from 'react'
import style from './StatusLabel.module.scss'
import cn from 'classnames'

export default function StatusLabel(props) {
  const {text, wrapperClass, loading, isLive} = props
  const divStyle = isLive ? style.containerLive : style.container
  return (
    <div
      className={cn(divStyle, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      {text}
    </div>
  )
}
