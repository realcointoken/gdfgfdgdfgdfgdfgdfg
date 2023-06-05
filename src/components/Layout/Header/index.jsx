import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom'

import { Row, Col } from 'antd'
import { get, parseInt, isEmpty } from 'lodash'

import jazzicon from 'jazzicon'
import cn from 'classnames'

import { HEADER_NAVIGATION_ITEMS } from './constants'
import wrongIcon from './img/beat.png'
import collapse from './img/collapse.png'
import collapseBlack from './img/collapse-black.png'
import collapseOut from './img/collapse-out.png'
import collapseOutBlack from './img/collapse-out-black.png'

import Button from '../../Button'
import { AppContextType } from '../../../context/context_types'
import { PAGE_HOME_PATH } from '../../../router/constants'
import logo from '../../../assets/svg/logo.png'
import logoBlack from '../../../assets/svg/logoBlack.png'
import { getAccountSymbol } from '../../../store/constants/web3'
import { autoConnect, switchNetwork } from '../../../store/actions/user'
import { checkWrongNetwork } from '../../../store/actions/common'
import Wallet from './Wallet'
import style from './Header.module.scss'
import Tabs from '../../Tabs'
import NotificationAlert from '../../../components/NotificationAlert'
import Parser from 'html-react-parser'
import { ButtonGroup, Container } from 'react-bootstrap'

import { PAGE_STAKING_PATH } from '../../../router/constants'

export default function Header(props) {
  const [isToggle, setToggle] = useState(false)



  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  useEffect(() => {
    if (size.width > 992) {
      setToggle(false)
    }
  }, [size.width])




  const dispatch = useDispatch()
  const { wrapperClass } = props
  const [scrolled, setScrolled] = useState(false)
  const { setConnectToWalletModalVisible } = useContext(AppContextType)
  const { setWrongNetworkVisible } = useContext(AppContextType)
  const location = useLocation()
  let isAppPage = false

  if (
    location.pathname == '/'
  ) {
    isAppPage = true
  }

  const isConnected = useSelector((state) => state.user.connectWallet.isConnect)
  const address = useSelector((state) =>
    state.user.userAccount.accounts ? state.user.userAccount.accounts[0] : '',
  )
  const balance = useSelector((state) => state.user.userAccount.balance)
  const wrongNetwork = useSelector((state) => state.common.wrongNetwork)
  const chainId = useSelector((state) => state.user.chainId)
  const symbol = getAccountSymbol(chainId)
  const iconContainerRef = useRef(null)
  const project = useSelector((state) => state.project.project)
  const chainIdProject = get(project, 'result.chainId', chainId)

  const history = useHistory()
  const [alert, setAlert] = useState('')

  const handleScroll = useCallback(
    (e) => {
      if (!scrolled && window.scrollY > 1) {
        setScrolled(true)
      } else if (scrolled && window.scrollY < 1) {
        setScrolled(false)
      }
    },
    [scrolled],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  useEffect(() => {
    if (iconContainerRef && iconContainerRef.current && address) {
      const intIcon = address.replace('0x', '').slice(0, 8)
      const icon = jazzicon(18, parseInt(intIcon, 16))
      iconContainerRef.current.innerHTML = ''
      iconContainerRef.current.appendChild(icon)
    }
  }, [iconContainerRef, address, chainId, wrongNetwork])

  useEffect(() => {
    const dispatchAutoConnect = () => dispatch(autoConnect())
    if (window.ethereum) {
      dispatchAutoConnect()
      setWrongNetworkVisible(false)
    }
  }, [dispatch, setWrongNetworkVisible])

  useEffect(() => {
    if (chainIdProject) {
      setWrongNetworkVisible(false)
      return dispatch(checkWrongNetwork(false))
    }
    if (!isEmpty(project)) {
      setWrongNetworkVisible(true)
      dispatch(checkWrongNetwork(true))
    }
  }, [dispatch, chainIdProject, chainId, setWrongNetworkVisible, project])

  const wrongNetworkBtn = () => {
    return (
      <div
        role='button'
        onClick={() => switchNetwork(chainIdProject)}
        className={style.wrongBtn}
      >
        <img src={wrongIcon} alt='wrong' className={style.wrongIcon} />{' '}
        <span>Wrong Network</span>
      </div>
    )
  }


  const handdleOnToggle = () => {
    setToggle(!isToggle)
  }

  return (
    <header
      className={cn(style.container, wrapperClass, {
        [style.containerScrolled]: scrolled,
      })}
      style={{
        backgroundColor: location.pathname === "/" ? 'white' : "#060D20",
        padding: '20px 100px'
      }}
    >
      {isConnected ? (

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {
            size.width < 992 &&
            <div
              className={style.collapse}
              onClick={handdleOnToggle}
            >
              {isToggle ? (
                <div
                // style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
                ><img
                    style={{ cursor: "pointer" }}
                    src={location.pathname == "/" ? collapseOutBlack : collapseOut} alt='collapse' />
                  <ul
                    className='mt-2'
                    style={{ position: "relative", right: 20 }}

                  // className={style.menu}
                  >
                    {HEADER_NAVIGATION_ITEMS.map((item, i) => (
                      <li
                        style={{ listStyleType: "none" }}
                        key={i}>
                        <Link
                          style={{ color: location.pathname == "/" ? "black" : "white" }}
                          className={style.menuLink}
                          to={{ pathname: item.path }}
                          target={item.external && '_blank'}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}

                    {
                      location.pathname === "/" ?
                        <li
                          className='mt-2'
                          style={{ listStyleType: "none" }}>
                          <Button
                            wrapperClass={style.button}
                            text={'Launch App'}
                            compact
                            dark
                            onClick={() => {
                              history.push(PAGE_STAKING_PATH)
                            }}
                          />
                        </li> :
                        <li className='mt-2' style={{ listStyleType: "none" }}>
                          <Wallet
                            wrapperClass={style.wallet}
                            {...{
                              address,
                              chainId,
                              balance,
                              symbol,
                              wrongNetwork,
                              wrongNetworkBtn,
                            }}
                          />
                        </li>}

                  </ul>

                </div>
              ) : (
                <img src={location.pathname == "/" ? collapseBlack : collapse} alt='collapse' style={{ cursor: "pointer" }} />
              )}
            </div>}

          <div
            className={`${style.logoLink} text-center`}
            style={{ marginTop: 5 }}
          >
            <Link to={PAGE_HOME_PATH}>
              <img src={isAppPage ? logo : logoBlack} alt={''}
                className={style.logo}
              />
            </Link>
          </div>
          {
            size.width >= 992 && <div
              style={{ width: "100%" }}

              className='d-flex justify-content-end'
            >
              <ul className={style.menu}>
                {HEADER_NAVIGATION_ITEMS.map((item, i) => (
                  <li className={style.menuItem} key={i}>
                    <Link
                      style={{ color: location.pathname !== "/" ? "white" : null }}
                      className={style.menuLink}
                      to={{ pathname: item.path }}
                      target={item.external && '_blank'}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                {
                  location.pathname === "/" ?
                    <li className='ms-4' style={{ listStyleType: "none" }}>
                      <Button
                        wrapperClass={style.button}
                        text={'Launch App'}
                        compact
                        dark
                        onClick={() => {
                          history.push(PAGE_STAKING_PATH)
                        }}
                      />
                    </li> :
                    <li className='ms-4' style={{ listStyleType: "none" }}>
                      <Wallet
                        wrapperClass={style.wallet}
                        {...{
                          address,
                          chainId,
                          balance,
                          symbol,
                          wrongNetwork,
                          wrongNetworkBtn,
                        }}
                      />
                    </li>}
              </ul>
            </div>
          }
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {
            size.width < 992 &&
            <div
              className={style.collapse}
              onClick={handdleOnToggle}
            >
              {isToggle ? (
                <div ><img
                  style={{ cursor: "pointer" }}
                  src={location.pathname == "/" ? collapseOutBlack : collapseOut} alt='collapse' />
                  <ul
                    className='mt-2'
                    style={{ position: "relative", right: 20 }}
                  >
                    {HEADER_NAVIGATION_ITEMS.map((item, i) => (
                      <li
                        style={{ listStyleType: "none", color: location.pathname == "/" ? "black" : "white" }}
                        key={i}>
                        <Link
                          style={{ color: location.pathname == "/" ? "black" : "white" }}
                          className={style.menuLink}
                          to={{ pathname: item.path }}
                          target={item.external && '_blank'}
                        >

                          {item.name}
                        </Link>
                      </li>
                    ))}
                    {
                      location.pathname === "/" ?
                        <li
                          className='mt-2'
                          style={{ listStyleType: "none" }}>
                          <Button
                            wrapperClass={style.button}
                            text={'Launch App'}
                            compact
                            dark
                            onClick={() => {
                              history.push(PAGE_STAKING_PATH)
                            }}
                          />
                        </li> :
                        <li className='mt-2'
                        
                        style={{ listStyleType: "none" }}
                        >
                          <Button
                            wrapperClass={style.button}
                            text={'Wallet Connect'}
                            compact
                            dark
                            onClick={() => {
                              setConnectToWalletModalVisible(true)
                            }}
                          />
                        </li>

                      // <li className='mt-2' style={{ listStyleType: "none" }}>
                      //   <Wallet
                      //     wrapperClass={style.wallet}
                      //     {...{
                      //       address,
                      //       chainId,
                      //       balance,
                      //       symbol,
                      //       wrongNetwork,
                      //       wrongNetworkBtn,
                      //     }}
                      //   />
                      // </li>


                    }

                  </ul>

                </div>
              ) : (
                <img src={location.pathname == "/" ? collapseBlack : collapse} alt='collapse' style={{ cursor: "pointer" }} />
              )}
            </div>}

          <div
            className={`${style.logoLink} text-center`}
            style={{ marginTop: 5 }}
          >
            <Link to={PAGE_HOME_PATH}>
              <img src={isAppPage ? logo : logoBlack} alt={''}
                className={style.logo}
              />
            </Link>
          </div>
          {
            size.width >= 992 && <div
              style={{ width: "100%" }}

              className='d-flex justify-content-end'
            >
              <ul className={style.menu}>
                {HEADER_NAVIGATION_ITEMS.map((item, i) => (
                  <li className={style.menuItem} key={i}>
                    <Link
                      style={{ color: location.pathname !== "/" ? "white" : null }}
                      className={style.menuLink}
                      to={{ pathname: item.path }}
                      target={item.external && '_blank'}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                {
                  location.pathname === "/" ?
                    <li className='ms-4'>
                      <Button
                        wrapperClass={style.button}
                        text={'Launch App'}
                        compact
                        dark
                        onClick={() => {
                          history.push(PAGE_STAKING_PATH)
                        }}
                      />
                    </li>
                    :
                    <li className='ms-4'>
                      <Button
                        wrapperClass={style.button}
                        text={'Wallet Connect'}
                        compact
                        dark
                        onClick={() => {
                          setConnectToWalletModalVisible(true)
                        }}
                      />
                    </li>
                }
              </ul>
            </div>
          }
        </div>

      )}


      {/* </div> */}






      {/* </Col>
        </Row> */}

      {alert != '' && alert}
      {/* </Container> */}
    </header>
  )
}
