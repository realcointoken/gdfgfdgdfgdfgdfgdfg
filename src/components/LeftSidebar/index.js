import cn from 'classnames'
import React, {useState, useEffect} from 'react'
import Nav from 'react-bootstrap/Nav'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useLocation} from 'react-router'
import style from './sidebar.module.scss'
import kycIcon from './assets/kyc.svg'
import liquidityIcon from './assets/liquidity.svg'
import whitelabelIcon from './assets/whitelabel.svg'
import swapIcon from './assets/swap.svg'
import stakingIcon from './assets/staking.svg'

import {NavLink} from 'react-router-dom'
import Swap from '../../pages/Swap'
import {current} from '../../store/actions/current'
import {currencyCalculationRequest} from '../../store/actions/currencyCalculation'
export default function LeftSidebar(props) {
  const loginState = useSelector((state) => state.login.authResponse)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  return (
    <>
      <div className={style.customNav}>
        {/* <NavLink
          className={style.navlink}
          activeClassName={style.active_link}
          className={style.navlink}
          style={{paddingLeft: '30px'}}
          to='/swap'
        >
          <img
            src={swapIcon}
            alt='swap'
            height='25px'
            width='25px'
            style={{marginRight: '14px'}}
          />
          Swap
        </NavLink> */}

        {/* <NavLink
          className={style.navlink}
          activeClassName={style.active_link}
          // disabled={!loginState.isSuccess}
          to='/liquidity'
          onClick={() => dispatch(currencyCalculationRequest())}
          style={{paddingLeft: '30px'}}
        >
          <img
            src={liquidityIcon}
            alt='liquidity'
            height='25px'
            width='25px'
            style={{marginRight: '14px'}}
          />
          Liquidity
        </NavLink> */}

        {/* <NavLink
          className={style.navlink}
          activeClassName={style.active_link}
          disabled={!loginState.isSuccess}
          to='/staking-page'
        >
          Staking
        </NavLink> */}

        <NavLink
          className={style.navlink}
          activeClassName={style.active_link}
          to='/kyc'
          // disabled={!loginState.isSuccess}
        >
          <img
            src={kycIcon}
            alt='kyc'
            height='25px'
            width='35px'
            style={{marginRight: '10px'}}
          />
          KYC
        </NavLink>

        {/* <NavLink
          activeClassName={style.active_link}
          className={style.navlink}
          to='/white-label-address'
          // disabled={!loginState.isSuccess}
        >
          <img
            src={whitelabelIcon}
            alt='whitelabel'
            height='25px'
            width='30px'
            style={{marginRight: '12px'}}
          />
          Favourite Address
        </NavLink> */}

        <NavLink
          activeClassName={style.active_link}
          className={style.navlink}
          to='/staking'
          // disabled={!loginState.isSuccess}
        >
          <img
            src={stakingIcon}
            alt='staking'
            height='25px'
            width='30px'
            style={{marginRight: '12px'}}
          />
          IDO
        </NavLink>
        {/* <NavLink
          className={style.navlink}
          activeClassName={style.active_link}
          to='/overview'
          // disabled={!loginState.isSuccess}
        >
          <img
            src={kycIcon}
            alt='kyc'
            height='25px'
            width='35px'
            style={{marginRight: '10px'}}
          />
          Overview
        </NavLink> */}
      </div>
    </>
  )
}
