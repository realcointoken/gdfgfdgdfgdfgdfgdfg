import React from 'react'
import style from './Modal.module.scss'
import cn from 'classnames'
import {Modal as AntdModal} from 'antd'
import CloseIcon from './CloseIcon'

export default function Modal(props) {
  const {wrapperClass, title, children, ...restProps} = props

  return (
    <AntdModal
      wrapClassName={cn(style.container, wrapperClass)}
      footer={null}
      closeIcon={<CloseIcon />}
      {...restProps}
    >
      <div className={style.head}>
        <h3 className={style.title}>{title}</h3>
      </div>
      <div className={style.body}>{children}</div>
    </AntdModal>
  )
}
