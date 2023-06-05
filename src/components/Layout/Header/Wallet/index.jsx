import React, {useEffect, useRef, useState} from 'react'
import {formatBlockchainAddress} from '../../../../utils'
import Web3 from 'web3'
import jazzicon from 'jazzicon'
import cn from 'classnames'
import {useSelector, useDispatch} from 'react-redux'
import WalletModal from './WalletModal'
import {Modal} from 'antd'
import {useHistory} from 'react-router-dom'
import style from './Wallet.module.scss'
import {PROVIDER_TYPES} from '../../ConnectToWalletModal/constants'
import {logout as logoutApp} from '../../../../store/actions/logout'

import {loginRequestClear} from '../../../../store/actions/login'

import {
  clearTransactionLog,
  fetchTransactionLogs,
  clearUserDataOnDisconnectMetamask,
} from '../../../../store/actions/user'
import {fractal, fractalRequest} from '../../../../store/actions/fractal'

export default function Wallet(props) {
  const dispatch = useDispatch()
  const {
    balance,
    address,
    chainId,
    symbol,
    wrapperClass,
    wrongNetworkBtn,
    wrongNetwork,
  } = props
  const convertedBalance = Web3.utils.fromWei(String(balance || 0))
  const [walletModalVisible, setWalletModalVisible] = useState(false)
  const transactionLogs = useSelector((state) => state.user.transactionLogs)
  const [transactionList, setTransactionList] = useState([])
  const history = useHistory()
  const iconContainerRef = useRef(null)
  const loginUser = useSelector((state) => state.login)
  const logoutUser = useSelector((state) => state.logout)

  useEffect(() => {
    if (iconContainerRef && iconContainerRef.current && address) {
      const intIcon = address.replace('0x', '').slice(0, 8)
      const icon = jazzicon(
        window.innerWidth > 767 ? 14 : 11,
        parseInt(intIcon, 16),
      )

      iconContainerRef.current.innerHTML = ''
      iconContainerRef.current.appendChild(icon)
    }
  }, [iconContainerRef, address, chainId])

  useEffect(() => {
    setTransactionList(dispatch(fetchTransactionLogs()))
  }, [dispatch, transactionLogs])

  const logout = () => {
    // dispatch(clearUserDataOnDisconnectMetamask())
    // setWalletModalVisible(false)
    dispatch(logoutApp())
      .then((res) => {
        // localStorage.removeItem('isLogin')
        // if (res.data.message == 'The header Authorization is missing') {
        //   dispatch('LOGIN_REQUEST_CLEAR')
        // }
        history.push('/')
      })
      .catch((error) => {
        // localStorage.removeItem('isLogin')
        // console.log('logout', error.data.message)
        // if (error.data?.message == 'The header Authorization is missing') {
        //   history.push('/login')
        // }
        history.push('/')
      })
    // dispatch(fractalRequest())
    // dispatch(loginRequestClear())
  }

  useEffect(() => {
    if (logoutUser.isSuccess) {
      // dispatch(clearUserDataOnDisconnectMetamask())
      setWalletModalVisible(false)
      dispatch(loginRequestClear())
      // history.push('/login')
    }
  }, [logoutUser])

  const onClearTransactions = () => {
    Modal.confirm({
      title: 'Are you sure you want clear it ?',
      onOk: () => dispatch(clearTransactionLog()),
    })
  }

  if (wrongNetwork && address) {
    return wrongNetworkBtn()
  }

  return (
    <>
      <div
        onClick={() => {
          if (!wrongNetwork) {
            setWalletModalVisible(true)
          }
        }}
        className={cn(style.wallet, wrapperClass)}
      >
        {wrongNetwork && address ? (
          wrongNetworkBtn()
        ) : (
          <>
            <span className={style.walletBalance}>
              {balance > 1
                ? convertedBalance.substr(0, 6)
                : convertedBalance.substr(0, 8)}{' '}
              {symbol}
            </span>
            <span className={style.walletAddress}>
              {formatBlockchainAddress(address)}
              <div ref={iconContainerRef} className={style.walletIcon} />
            </span>
          </>
        )}
      </div>
      <WalletModal
        address={address}
        visible={walletModalVisible && address}
        onCancel={() => setWalletModalVisible(false)}
        chainId={chainId}
        // TODO: implement API
        transactionList={transactionList}
        providerType={PROVIDER_TYPES.METAMASK}
        onClearTransactions={onClearTransactions}
        logout={logout}
        onChange={() => {}}
        requestingClearTransactions={false}
        // ------------------
      />
    </>
  )
}
