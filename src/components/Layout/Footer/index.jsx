import React from 'react'
import {useLocation} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import {Row, Col} from 'antd'
import cn from 'classnames'

// import logo from '../../../assets/svg/logowhite.png'
import logo from '../../../assets/svg/logo.png'

import {FOOTER_LINK_GROUPS} from './constants'
import LinkGroup from './LinkGroup'

import style from './Footer.module.scss'

export default function Footer() {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition timeout={800} classNames={'fade'} key={location.key}>
        <footer
          className={cn(style.container, 'mt-3')}
          style={{
            backgroundColor: '#000000',
          }}
        >
          <Row type='flex' align='top' className={`${style.grid} `}>
            <Col
              xs={24}
              sm={24}
              md={6}
              lg={6}
              className={`${style.brand} d-flex justify-content-center`}
            >
              <div style={{float: 'right', textAlign: 'right'}}>
                <img src={logo} alt={''} className={style.logo} style={{width:"200px"}}/>
                <span className={`${style.copy} text-center`}>
                  ©2022 LavaX
                </span>
              </div>
            </Col>

            {FOOTER_LINK_GROUPS.map((item, i) => (
              <Col
                xs={12}
                sm={12}
                md={6}
                lg={6}
                className={`${style.linkGroup}`}
                key={i}
              >
                <LinkGroup title={item.title} items={item.links} />
              </Col>
            ))}
            {/* </Row> */}
            {/* </Col> */}
          </Row>
        </footer>
      </CSSTransition>
    </TransitionGroup>
  )
}
