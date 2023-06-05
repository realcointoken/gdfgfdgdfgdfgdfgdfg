import React from 'react'
import style from './Modal.module.scss'
import cn from 'classnames'
import {Modal as AntdModal} from 'antd'
import CloseIcon from './CloseIcon'

export default function Modal(props) {
  const {wrapperClass, title, children, onCancel, ...restProps} = props

  return (
    <AntdModal
      wrapClassName={cn(style.container, wrapperClass)}
      closable={false}
      footer={null}
      onCancel={onCancel}
      {...restProps}
    >
      <div className={style.head}>
        <div />
        <h3 className={style.heading}>{title}</h3>
        <div onClick={onCancel}>
          <CloseIcon />
        </div>
      </div>
      <div className={style.body}>{children}</div>
    </AntdModal>
  )
}
