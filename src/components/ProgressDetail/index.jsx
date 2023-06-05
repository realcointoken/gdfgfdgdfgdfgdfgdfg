import React from 'react'
import style from './ProgressDetail.module.scss'
import cn from 'classnames'
import ProgressBar from '../ProgressBar'

export default function ProgressDetail(props) {
  const {progress, maxProgress, acceptedTokenSymbol, wrapperClass, loading} =
    props

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      <ProgressBar progress={progress / maxProgress} loading={loading} />
      <div className={style.progressDetail}>
        <div>
          {progress} / {maxProgress} {acceptedTokenSymbol}
        </div>
        {maxProgress > 0 && (
          <div>
            <span className={style.percent}>
              {Math.floor((Number(progress) / Number(maxProgress)) * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
