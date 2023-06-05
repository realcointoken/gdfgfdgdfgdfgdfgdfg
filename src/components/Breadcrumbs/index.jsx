import React from 'react'
import style from './Breadcrumbs.module.scss'
import cn from 'classnames'
import {Link} from 'react-router-dom'

export default function Breadcrumbs(props) {
  const {items, wrapperClass, loading} = props

  return (
    <ul
      className={cn(style.container, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      {(!items || loading ? new Array(3).fill({}) : items).map(
        (item, i, items) => (
          <li className={style.item} key={i}>
            {i === items.length - 1 || loading ? (
              item.name
            ) : (
              <>
                <Link to={item.path} className={style.link}>
                  {item.name}
                </Link>
                <span className={style.arrow}>></span>
              </>
            )}
          </li>
        ),
      )}
    </ul>
  )
}
