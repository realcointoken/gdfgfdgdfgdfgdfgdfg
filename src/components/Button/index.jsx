import React from 'react'
import style from './Button.module.scss'
import cn from 'classnames'
import spinner from '../../assets/img/spinner.png'

export default function Button(props) {
  const {
    // PROPS
    wrapperClass,
    text,
    children,
    icon,
    iconWidth,
    iconAlignStart = false,
    preventDefault = false,
    stopPropagation = false,
    disabled,
    loading,

    // EVENTS
    onClick,

    // STYLES
    // --sizes--
    primary,
    compact,
    small,
    // --colors--
    light,
    blue,
    green,
    dark,
    gray,
    // --misc--
    outline,
  } = props

  const buttonIcon = icon && getIconLayout(icon, iconAlignStart, iconWidth)

  return (
    <button
      onClick={(e) =>
        !disabled &&
        !loading &&
        handleClick(e, onClick, preventDefault, stopPropagation)
      }
      disabled={disabled || loading}
      className={cn(style.button, wrapperClass, {
        [style.buttonCompact]: compact,
        [style.buttonPrimary]: primary,
        [style.buttonSmall]: small,
        [style.buttonBlue]: blue,
        [style.buttonDark]: dark,
        [style.buttonGreen]: green,
        [style.buttonLight]: light,
        [style.buttonGray]: gray,
        [style.buttonOutline]: outline,
        [style.buttonDisabled]: disabled || loading,
      })}
    >
      {!loading && iconAlignStart && buttonIcon}
      {!loading && text}
      {!loading && children}
      {!loading && !iconAlignStart && buttonIcon}
      {loading && <img src={spinner} alt='' className={style.spinner} />}
    </button>
  )
}

function handleClick(e, callback, preventDefault, stopPropagation) {
  if (preventDefault) {
    e.preventDefault()
  }

  if (stopPropagation) {
    e.stopPropagation()
  }

  if (callback) {
    callback(e)
  }
}

function getIconLayout(icon, alignStart, width) {
  let iconStyle = width ? {width} : {}
  if (typeof icon === 'string') {
    return (
      <img
        className={cn(style.icon, {
          [style.iconAlignStart]: alignStart,
        })}
        style={iconStyle}
        src={icon}
        alt={'icon'}
      />
    )
  }

  return (
    <span
      className={cn(style.icon, {
        [style.iconAlignStart]: alignStart,
      })}
      style={style}
    >
      {icon}
    </span>
  )
}
