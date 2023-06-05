import React from 'react'
import classNames from 'classnames'

import style from './Error.module.scss'

export default function Error(props) {
  const {isVisible, text, children, wrapperClass, address} = props

  return (
    <div
      style={{position: 'relative', left: address ? '-17px' : '0px'}}
      className={classNames(style.container, wrapperClass, {
        [style.containerVisible]: isVisible,
      })}
    >
      {text || children}
    </div>
  )
}
