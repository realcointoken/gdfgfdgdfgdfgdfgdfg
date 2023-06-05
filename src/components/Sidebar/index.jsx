import style from './Sidebar.module.scss'
import cn from 'classnames'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {SidebarData} from './sidebarData'

export default function Sidebar(props) {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
      <nav className={style.navMenu}>
        <ul className={style.navMenuItems} onClick={showSidebar}>
          <li className={style.singleItem}>
            <span>Swap</span>
          </li>
        </ul>
      </nav>
    </>
  )
}
