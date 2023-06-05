import React, {useState, useEffect} from 'react'
import cn from 'classnames'
import copy from './copy.svg'
import check from './check-mark.svg'
import Button from '../Button'
import {Tooltip} from 'antd'

import style from './CopyToClipboard.module.scss'

export default function CopyToClipboard(props) {
  const {text, buttonText, tooltip, wrapperClass, buttonClass, icon} = props
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000)
    }
  }, [copied])

  return (
    <Tooltip
      visible={copied ? false : undefined}
      overlayClassName={style.tooltip}
      placement='top'
      title={tooltip ? tooltip : 'Copy to clipboard'}
    >
      <div className={cn(style.wrapper, wrapperClass)}>
        <Button
          wrapperClass={cn(style.copy, buttonClass)}
          text={copied ? 'Copied' : buttonText}
          icon={copied ? check : icon ? icon : copy}
          iconWidth={13}
          iconAlignStart
          gray
          onClick={() =>
            navigator.clipboard.writeText(text).then(() => setCopied(true))
          }
        />
      </div>
    </Tooltip>
  )
}
