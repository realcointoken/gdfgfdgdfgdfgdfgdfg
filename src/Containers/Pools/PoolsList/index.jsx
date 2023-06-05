import React from 'react'
import style from './PoolList.module.scss'
import cn from 'classnames'
import PoolItem from '../PoolItem'

export default function PoolsList(props) {
  const {
    items,
    title,
    loading,
    blockchainType,
    onItemClick,
    wrapperClass,
    isLive,
    isUpcoming,
  } = props

  if ((!items || !items.length) && !loading) {
    return null
  }

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.containerLoading]: loading,
      })}
    >
      {title && <h3 className={style.title}>{title}</h3>}
      <ul className={style.items}>
        {(!items || loading ? new Array(3).fill({}) : items).map((item, i) => (
          <li className={style.item} key={i}>
            <PoolItem
              blockchainType={blockchainType}
              data={item}
              loading={loading}
              onClick={onItemClick}
              isLive={isLive}
              isUpcoming={isUpcoming}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
