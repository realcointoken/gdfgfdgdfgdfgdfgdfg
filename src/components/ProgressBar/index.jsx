import React from 'react'
import cn from 'classnames'
import style from './ProgressBar.module.scss'

export default function ProgressBar(props) {
  const {wrapperClass, progress, loading} = props
  const scale = progress > 1 ? 1 : progress < 0 ? 0 : progress

  return (
    <div className={style.container} style={{height: '20px'}}>
      <div className={style.filler} style={{transform: `scaleX(${scale})`}} />
    </div>
  )
}
