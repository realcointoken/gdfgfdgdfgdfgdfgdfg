import React from 'react'
import cn from 'classnames'
import AllocationsItem from './AllocationItem'

import style from './AllocationsList.module.scss'

export default function AllocationsList(props) {
  const {data, onClaim, wrapperClass} = props

  return (
    <ul className={cn(style.container, wrapperClass)}>
      <li className={style.item}>
        <AllocationsItem {...{data, onClaim}} />
      </li>
    </ul>
  )
}
