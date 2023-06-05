import React from 'react'
import {Pagination as AntPagination} from 'antd'
import left from './left.svg'
import cn from 'classnames'

import style from './Pagination.module.scss'

export default function Pagination(props) {
  return (
    <div className={style.container}>
      <AntPagination {...props} itemRender={renderItem} />
    </div>
  )
}

function renderItem(current, type, originalElement) {
  switch (type) {
    case 'prev': {
      return (
        <button className={style.buttonArrow}>
          <img src={left} alt='' className={style.arrow} />
        </button>
      )
    }

    case 'next': {
      return (
        <button className={style.buttonArrow}>
          <img
            src={left}
            alt=''
            className={cn(style.arrow, style.arrowRight)}
          />
        </button>
      )
    }

    default:
      return originalElement
  }
}
