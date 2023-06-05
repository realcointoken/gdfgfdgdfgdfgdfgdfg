import React from 'react'
import cn from 'classnames'
import Heading from '../Heading'
import Text from '../Text'

import style from './Cta.module.scss'

export default function Cta(props) {
  const {title, text, primary, children, wrapperClass} = props

  return (
    <section className={cn( wrapperClass)}>
      {title && (
        <Heading
          text={title}
          primary={primary}
          center
          wrapperClass={style.heading}
        />
      )}
      {text && <Text text={text} center wrapperClass={style.text} />}
      <div className={style.children}>{children}</div>
    </section>
  )
}
