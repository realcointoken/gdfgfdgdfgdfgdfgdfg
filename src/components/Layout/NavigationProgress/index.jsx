import React, {useEffect, useState, useRef} from 'react'
import cn from 'classnames'
import style from './NavigationProgress.module.scss'

export default function NavigationProgress(props) {
  const {wrapperClass, loading} = props
  const [stateProgress, setStateProgress] = useState(0)
  const scale = stateProgress > 1 ? 1 : stateProgress < 0 ? 0 : stateProgress
  const intervalId = useRef(0)
  const progressMem = useRef(0)
  const started = useRef(false)

  useEffect(() => {
    if (loading) {
      started.current = true
      intervalId.current = setInterval(() => {
        progressMem.current = progressMem.current + (Math.random() * 40) / 100
        setStateProgress(progressMem.current)
      }, 500)
    } else {
      started.current = false
      setStateProgress(1)
      clearInterval(intervalId.current)
      setTimeout(() => {
        progressMem.current = 0
        setStateProgress(progressMem.current)
      }, 500)
    }

    return () => {
      clearInterval(intervalId.current)
    }
  }, [loading])

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      <div className={style.filler} style={{transform: `scaleX(${scale})`}} />
    </div>
  )
}
