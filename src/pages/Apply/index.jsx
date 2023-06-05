import React, {useState} from 'react'
import cn from 'classnames'

import {ApplyStep} from './ApplyStep'
import Bubble from '../../components/Bubbles'
import style from './Apply.module.scss'

export default function Apply() {
  const [data, setData] = useState({blockchain: {name: 'ethereum', id: 0}})
  const [statusValue, setStatusValue] = useState(0)

  const onStepChange = (index) => {
    setStatusValue(index)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  return (
    <section className={cn(style.container, 'content')}>
      <Bubble />
      <ApplyStep
        step={statusValue}
        data={data}
        onStepChange={onStepChange}
        onChange={setData}
      />
    </section>
  )
}
