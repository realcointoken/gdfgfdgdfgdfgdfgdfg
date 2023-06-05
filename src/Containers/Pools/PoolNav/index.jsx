import React from 'react'

import cn from 'classnames'

import style from './PoolNav.module.scss'

export default function PoolNav(props) {
  const {items, selectedItem, onChange, loading} = props

  const renderPoolNav = () => {
    return (
      <div
        className={cn(style.container, {
          [style.containerLoading]: loading,
        })}
      >
        <nav className={style.wrapper}>
          <ul className={style.items}>
            {(!items || loading ? new Array(4).fill({}) : items).map(
              (item, i) => (
                <li
                  className={cn(style.item, {
                    [style.itemSelected]: selectedItem === item.name,
                  })}
                  key={i}
                >
                  <button
                    className={style.button}
                    onClick={() => item && onChange && onChange(item)}
                  >
                    {item.icon && (
                      <img src={item.icon} alt={''} className={style.icon} />
                    )}
                    <span className={style.name}>{item.name}</span>
                  </button>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    )
  }

  return renderPoolNav()
}
