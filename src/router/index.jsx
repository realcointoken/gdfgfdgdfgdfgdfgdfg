import React, {PureComponent} from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import {
  PAGE_APPLY_PATH,
  PAGE_HOME_PATH,
  PAGE_OVERVIEW_PATH,
  PAGE_TERMS_PATH,
  PAGE_PRIVACY_PATH,
  PAGE_ABOUT_PATH,
  PAGE_ALL_PROJECTS_PATH,
  PAGE_LOGIN_PATH,
  PAGE_REGISTER_PATH,
  PAGE_SWAP_PATH,
  PAGE_SWAP_HISTORY_PATH,
  PAGE_KYC_PATH,
  PAGE_WHITE_LABEL_ADDRESS_PATH,
  PAGE_LIQUIDITY_PATH,
  PAGE_LIQUIDITY_HISTORY_PATH,
  PAGE_EMAIL_VERIFY,
  PAGE_STAKING_PATH,
  PAGE_POOLDETAIL_PATH,
} from './constants'
import Home from '../pages/Home'
import Apply from '../pages/Apply'
import Terms from '../pages/Terms'
import Privacy from '../pages/PrivacyPolicy'
import NotFound from '../pages/NotFound'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import Ovrview from '../pages/Ovrview/Overview'
import About from '../pages/About'
import AllProjects from '../pages/AllProjects'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Swap from '../pages/Swap'
import KYC from '../pages/KYC'
//import Overview from '../pages/Overview'

import Verify from '../pages/Verify'
import WhiteLabelAddress from '../pages/WhiteLabelAddress'
import Liquidity from '../pages/Liquidity'
import LiquidityHistory from '../pages/LiquidityHistory'
import PoolDetail from '../pages/Staking'
import Staking from '../pages/StakingPage'
import SwapHistory from '../pages/SwapHistory'
import {useDispatch, useSelector} from 'react-redux'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {
  clearUserDataOnDisconnectMetamask,
  connectMetaMask,
} from '../store/actions/user'
@withRouter
class Router extends PureComponent {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {location} = this.props

    if (location.key !== prevProps.location.key) {
      window.scrollTo(0, 0)
    }
  }

  componentDidMount(prevProps, prevState, snapshot) {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        if (
          this.props.blockchainList &&
          this.props.blockchainList?.blockchainData?.filter(
            (e) => e.chainID === parseInt(chainId),
          ).length > 0
        ) {
          this.props.connectWallet()
        } else {
          this.props.resetUser()
        }
      })
    }

    // window.ethereum.on('message', (params: ProviderMessage) => {
    //   console.log('params', params)
    // })
  }

  render() {
    const {location} = this.props
    var isUserLogedIn = false
    var isConnectedWithWallet = false
    if (
      this.props.login.authResponse &&
      this.props.login.authResponse.data &&
      this.props.login.authResponse.data.token
    ) {
      isUserLogedIn = true
    } else {
      isUserLogedIn = false
    }

    if (
      this.props.user.connectWallet &&
      this.props.user.connectWallet.isConnect
    ) {
      isConnectedWithWallet = true
    } else {
      isConnectedWithWallet = false
    }

    function PrivateRoute({component: Component, authed, ...rest}) {
      return (
        <Route
          {...rest}
          render={(props) =>
            authed === true ? <Component {...props} /> : <Redirect to={'/'} />
          }
        />
      )
    }

    return (
      <TransitionGroup>
        <CSSTransition
          timeout={800}
          classNames={'fade'}
          key={location.pathname.split('/')[1] || '*'}
        >
          <Switch>
            <Route
              exact
              path={PAGE_HOME_PATH}
              component={Home}
              key={PAGE_HOME_PATH}
            />
            <Route
              exact
              path={PAGE_STAKING_PATH}
              component={Staking}
              key={PAGE_STAKING_PATH}
            />
            <Route
              exact
              path={PAGE_ALL_PROJECTS_PATH}
              component={AllProjects}
              key={PAGE_ALL_PROJECTS_PATH}
            />
            <Route
              exact
              path={PAGE_APPLY_PATH}
              component={Apply}
              key={PAGE_APPLY_PATH}
            />
            <Route
              exact
              path={PAGE_OVERVIEW_PATH}
              component={Ovrview}
              key={PAGE_OVERVIEW_PATH}
            />
            {/* <Route
              exact
              path={PAGE_TERMS_PATH}
              component={Terms}
              key={PAGE_TERMS_PATH}
            />
            <Route
              exact
              path={PAGE_PRIVACY_PATH}
              component={Privacy}
              key={PAGE_PRIVACY_PATH}
            /> */}
            <Route
              exact
              path={PAGE_ABOUT_PATH}
              component={About}
              key={PAGE_ABOUT_PATH}
            />

            <Route
              authed={isConnectedWithWallet}
              exact
              path={PAGE_LOGIN_PATH}
              component={Login}
              key={PAGE_LOGIN_PATH}
            />
            <PrivateRoute
              authed={isConnectedWithWallet}
              exact
              path={PAGE_REGISTER_PATH}
              component={Register}
              key={PAGE_REGISTER_PATH}
            />
            <Route
              // authed={isUserLogedIn}
              exact
              path={PAGE_SWAP_PATH}
              component={Swap}
              key={PAGE_SWAP_PATH}
            />
            <Route
              // authed={isUserLogedIn}
              exact
              path={PAGE_SWAP_HISTORY_PATH}
              component={SwapHistory}
              key={PAGE_SWAP_HISTORY_PATH}
            />
            <Route
              exact
              path={PAGE_KYC_PATH}
              component={KYC}
              key={PAGE_KYC_PATH}
            />

            <Route
              exact
              path={PAGE_WHITE_LABEL_ADDRESS_PATH}
              component={WhiteLabelAddress}
              key={PAGE_WHITE_LABEL_ADDRESS_PATH}
            />
            <Route
              exact
              path={PAGE_LIQUIDITY_PATH}
              component={Liquidity}
              key={PAGE_LIQUIDITY_PATH}
            />
            <Route
              exact
              path={PAGE_LIQUIDITY_HISTORY_PATH}
              component={LiquidityHistory}
              key={PAGE_LIQUIDITY_HISTORY_PATH}
            />
            <Route
              path={PAGE_EMAIL_VERIFY}
              component={Verify}
              key={PAGE_EMAIL_VERIFY}
            />
            {/* <Route
                          exact

              path={PAGE_STAKING_PATH}
              component={Staking}
              key={PAGE_STAKING_PATH}
            /> */}
            <Route
              exact
              path={PAGE_POOLDETAIL_PATH}
              component={PoolDetail}
              key={PAGE_POOLDETAIL_PATH}
            />

            <Route component={NotFound} key='*' />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    login: state.login,
    blockchainList: state.blockchain,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetUser: () => dispatch(clearUserDataOnDisconnectMetamask()),
    connectWallet: () => dispatch(connectMetaMask()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
