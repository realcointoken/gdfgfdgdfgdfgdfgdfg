import React from 'react'
import style from './Bubbles.module.scss'
import c1 from './img/1.png'
import c2 from './img/2.png'
import c3 from './img/3.png'
import cn from 'classnames'

export default function Bubbles() {
  return (
    <div className={cn(style.container, 'content')}>
      <div className={style.content}>
        <img src={c1} alt={''} className={style.circle1} />
        <img src={c2} alt={''} className={style.circle2} />
        <img src={c3} alt={''} className={style.circle3} />
      </div>
    </div>
  )
}
