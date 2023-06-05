import React, {useContext, useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import cn from 'classnames'
import {get} from 'lodash'
import style from './Layout.module.scss'
import Header from './Header'
import Footer from './Footer'
import Modal from '../Modal'
import Loader from './Loader'
import NavigationProgress from './NavigationProgress'
import ConnectToWalletModal from './ConnectToWalletModal'
import WelcomeModal from '../../components/WelcomeModal'
import {useLocation} from 'react-router-dom'
import {AppContextType} from '../../context/context_types'
import {getNameFromChainId} from '../../store/constants/web3'
import LeftSidebar from '../LeftSidebar'
import {Row, Col} from 'react-bootstrap'
import {PAGE_HOME_PATH} from '../../router/constants'
import logo from '../../assets/svg/logo.png'
import collapse from './img/collapse.png'
import collapseOut from './img/collapse-out.png'
import {Link} from 'react-router-dom'
import {height} from 'dom-helpers'

export default function Layout(props) {
  const location = useLocation()
  const [isToggle, setIsToggle] = useState(false)

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
  }, [])

  let isAppPage = false

  if (
    location.pathname == '/swap' ||
    location.pathname == '/kyc' ||
    location.pathname == '/liquidity' ||
    location.pathname == '/white-label-address' ||
    location.pathname == '/staking' ||
    location.pathname == '/overview'
  ) {
    isAppPage = true
  }

  const handdleOnToggle = () => {
    setIsToggle(!isToggle)
  }

  const projectChainId = useSelector((state) =>
    get(state.project, 'project.result.chainId', ''),
  )
  const address = useSelector((state) =>
    state.user.userAccount.accounts ? state.user.userAccount.accounts[0] : '',
  )
  const chainId = useSelector((state) => state.user.chainId)

  const {
    isReady,
    navigationLoading,
    connectToWalletModalVisible,
    setConnectToWalletModalVisible,
    wrongNetworkVisible,
  } = useContext(AppContextType)

  const [isModal, setIsModal] = useState(wrongNetworkVisible)

  useEffect(() => {
    if (
      !isModal &&
      window.location.pathname !== '/' &&
      projectChainId &&
      wrongNetworkVisible
    ) {
      setIsModal(wrongNetworkVisible)
    } else if (
      isModal &&
      window.location.pathname !== '/' &&
      projectChainId &&
      !wrongNetworkVisible
    ) {
      setIsModal(false)
    }
    // eslint-disable-next-line
  }, [wrongNetworkVisible, address, chainId, projectChainId])

  const [isModalVisible, setIsModalVisible] = useState(true)
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <div
      style={{position: 'relative'}}
      className={cn(style.container, {
        [style.containerLoaded]: isReady,
      }
      )
    }
    >
      <Header />
      <NavigationProgress
        wrapperClass={style.progress}
        loading={navigationLoading}
      />

      {
        location.pathname != '/swap' &&
          location.pathname != '/login' &&
          location.pathname != '/kyc' &&
          location.pathname != '/overview'
        //  &&<WelcomeModal visible={isModalVisible} onCancel={handleCancel} />
      }

      {isAppPage && (
        <Row>
          <Col
            lg={2}
            md={4}
            style={{
              borderRight:
                dimensions.width >= 768 ? '1px solid #FFFFFF22' : null,
              position: 'absolute',
              // zIndex: '1000',
              bottom: dimensions.width < 768 ? null : '0',
              top: '0',
              paddingRight: '0px',
              boxSizing: 'border-box',
            }}
          >
            <Link to={PAGE_HOME_PATH}>
              <img
                src={logo}
                alt={''}
                style={{
                  width:
                    dimensions.width >= 768 && dimensions.width < 992
                      ? '150px'
                      : '120px',

                  width: '200px',
                  height: '70px',
                  margonTop: '15px',
                  marginLeft: '5px',
                  marginBottom: dimensions.width < 768 ? '20px' : '80px',
                  // margin: '4px 0px 100px 20px',
                }}
              />
            </Link>
          </Col>
          {isAppPage ? <Col md={4} lg={2}></Col> : null}
          <Col lg={10} md={8}>
            <main
              className={style.main}
              style={{
                marginTop:
                  dimensions.width < 768 && !isToggle ? '100px' : '0px',
              }}
            >
              {props.children}
            </main>
          </Col>
        </Row>
      )}

      {!isAppPage && <main className={style.main}>{props.children}</main>}
      <Row>
        {isAppPage && <Col lg={2} md={4}></Col>}

        <Col lg={isAppPage ? 10 : 12} md={isAppPage ? 8 : 12}>
          <Footer />
        </Col>
      </Row>
      <Loader isVisible={!isReady} />
      <ConnectToWalletModal
        visible={connectToWalletModalVisible}
        onCancel={() => setConnectToWalletModalVisible(false)}
      />
      <Modal
        title={'Wrong Network'}
        width={390}
        footer={null}
        visible={isModal && address}
        maskClosable={true}
        onCancel={() => setIsModal(false)}
      >
        <div>
          <p>
            Please connect to the appropriate{' '}
            {getNameFromChainId(projectChainId)} network.
          </p>
        </div>
      </Modal>
    </div>
  )
}
