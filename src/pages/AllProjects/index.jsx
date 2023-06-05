import React from 'react'
import cn from 'classnames'
import Bubbles from '../../components/Bubbles'
import AllProjectsContainer from '../../Containers/AllProjectsContainer'

import style from './AllProjects.module.scss'

export default function AllProjects(props) {
  return (
    <div className={cn(style.container, 'content')}>
      <Bubbles />
      <AllProjectsContainer />
    </div>
  )
}
