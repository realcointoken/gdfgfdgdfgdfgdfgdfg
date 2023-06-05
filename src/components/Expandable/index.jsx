import React, {useRef, useEffect, useState, useCallback} from 'react'
import style from './Expandable.module.scss'
import cn from 'classnames'

const MAX_HEGHT_DEFAULT = 1000

export default function Expandable(props) {
  const {
    wrapperClass,
    contentClass,
    children,
    isOpen,
    updateHeight,
    minHeight = 0,
    onOverflow,
  } = props
  const contentRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState(MAX_HEGHT_DEFAULT)
  const containerMaxHeight = isOpen
    ? maxHeight
    : updateHeight
    ? getMaxHeight(contentRef)
    : minHeight

  useEffect(() => {
    setMaxHeight(getMaxHeight(contentRef))
  }, [children])

  useEffect(() => {
    setMaxHeight(getMaxHeight(contentRef))

    if (onOverflow && !isOpen) {
      if (getMaxHeight(contentRef) > minHeight) {
        onOverflow(true)
      } else {
        onOverflow(false)
      }
    }
  }, [children, minHeight, onOverflow, isOpen])

  const onResize = useCallback(() => setMaxHeight(getMaxHeight(contentRef)), [])
  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  return (
    <div
      className={cn(style.container, wrapperClass)}
      style={{
        maxHeight: containerMaxHeight,
        opacity: isOpen || updateHeight ? 1 : minHeight,
      }}
    >
      <span ref={contentRef} className={cn(style.content, contentClass)}>
        {children}
      </span>
    </div>
  )
}

function getMaxHeight(ref) {
  if (ref && ref.current) {
    const rect = ref.current.getBoundingClientRect()

    return rect.height
  }

  return MAX_HEGHT_DEFAULT
}
