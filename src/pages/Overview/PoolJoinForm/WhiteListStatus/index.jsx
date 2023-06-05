import React from 'react'
import {useSelector} from 'react-redux'
import {get} from 'lodash'
import cn from 'classnames'
import style from './WhitelistStatus.module.scss'
import {formatBlockchainAddress} from '../../../../utils'
import success from './success.png'
import error from './error.png'

export default function WhitelistStatus(props) {
  const {loading, wrapperClass} = props
  const isWhitelist = useSelector((state) => state.wallet.isWhitelist)
  const walletAddress = useSelector((state) =>
    get(state, 'user.userAccount.accounts.0'),
  )
  const text = isWhitelist
    ? 'Is Curently on The Whitelist'
    : 'Not Curently on Whitelist'

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      <img src={isWhitelist ? success : error} alt='' className={style.image} />
      <div className={style.detail}>
        <span className={style.address}>
          Address {formatBlockchainAddress(walletAddress)}
        </span>
        <strong className={style.text}>{text}</strong>
      </div>
    </div>
  )
}
