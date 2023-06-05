import style from './Tabs.module.scss'
import cn from 'classnames'
import React, {useState, useEffect} from 'react'
import Nav from 'react-bootstrap/Nav'
import {useSelector} from 'react-redux'
import {useHistory, useLocation} from 'react-router'

export default function Sidebar(props) {
  const loginState = useSelector((state) => state.login.authResponse)
  const location = useLocation()
  const history = useHistory()

  return (
    <>
      <div className='custom-tabs'>
        <Nav
          variant='pills'
          defaultActiveKey='link-1'
          className={style.customNav}
        >
          <Nav.Item>
            <Nav.Link
              active={location.pathname == '/swap'}
              eventKey='link-1'
              className={style.navLinks}
              onClick={() => {
                history.push('/swap')
              }}
            >
              Swap
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              active={location.pathname == '/staking-page'}
              eventKey='link-2'
              className={style.navLinks}
              disabled={!loginState.isSuccess}
              onClick={() => {
                history.push('/staking-page')
              }}
            >
              Liquidity
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              active={location.pathname == '/kyc'}
              eventKey='link-3'
              className={style.navLinks}
              onClick={() => {
                history.push('/kyc')
              }}
              disabled={!loginState.isSuccess}
            >
              KYC
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              active={location.pathname == '/white-label-address'}
              eventKey='link-4'
              className={style.navLinks}
              onClick={() => {
                history.push('/white-label-address')
              }}
              disabled={!loginState.isSuccess}
            >
              Favourite Address
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </>
  )
}
