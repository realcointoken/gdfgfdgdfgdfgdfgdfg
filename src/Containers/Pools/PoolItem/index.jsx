import React from 'react'
import style from './PoolItem.module.scss'
import moment from 'moment'
import {get} from 'lodash'
import TextGradient from '../../../components/TextGradient'
import cn from 'classnames'
import flash from './flash.svg'
import CoinAvatar from '../../../components/CoinAvatar'
import StatusLabel from '../../../components/StatusLabel'
import ProgressDetail from '../../../components/ProgressDetail'
import {blockchainIcon, formatUnits} from '../../../store/constants/web3'

export default function PoolItem(props) {
  const {
    isLive,
    data = {},
    // blockchainType = {},
    loading,
    wrapperClass,
    onClick,
    isUpcoming,
  } = props

  const name = get(data, 'name')
  const logoUrl = get(data, 'logoUrl')
  const symbol = get(data, 'symbol')
  const launchDate = get(data, 'launchDate')
  const tokenSymbol = get(data, 'tokenSymbol', '')
  const availableForPurchase = get(data, 'availableForPurchase', '-')

  const contractTotalRaise = get(data, 'contractTotalRaise', 0)
  const tokenDecimals = get(data, 'tokenDecimals', 18)
  const progress = formatUnits(contractTotalRaise, tokenDecimals)

  let total = get(data, 'totalRaise', 0)
  if (data.extraContractTotalRaise && data.extraAcceptedTokenDecimals) {
    total = formatUnits(
      data.extraContractTotalRaise,
      data.extraAcceptedTokenDecimals,
    )
  }
  let raiseSymbol = get(data, 'acceptedTokenSymbol', '-')
  const isPopular = get(data, 'isPopular', false)

  const daysToComplete = moment(launchDate).diff(moment.now(), 'days')

  const statusText = isUpcoming
    ? daysToComplete === 0
      ? 'Today'
      : `in ${daysToComplete} ${daysToComplete === 1 ? 'day' : 'days'}`
    : isLive
    ? 'Live'
    : 'Filled'

  const blockchainType = blockchainIcon(data.chainId)

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.containerLoading]: loading,
      })}
      onClick={() => onClick(data, blockchainType)}
    >
      {isPopular && (
        <span className={style.popular}>
          <TextGradient text={'MOST POPULAR'} />{' '}
          <img src={flash} alt='' className={style.popularIcon} />
        </span>
      )}
      <div className={style.head}>
        <CoinAvatar
          wrapperClass={style.picture}
          image={logoUrl}
          icon={blockchainType && blockchainType.icon}
        />
        <StatusLabel text={statusText} loading={loading} isLive={isLive} />
      </div>
      <strong className={style.title}>{name}</strong>
      {!isUpcoming && <span className={style.type}>{symbol}</span>}
      <div className={style.label}>Total Raise</div>
      <div className={style.totalRaise}>
        {total} {raiseSymbol}
      </div>
      {!isUpcoming && (
        <>
          <div className={style.label}>Progress</div>
          <ProgressDetail
            wrapperClass={style.progress}
            progress={progress}
            maxProgress={total}
            acceptedTokenSymbol={raiseSymbol}
          />
        </>
      )}
      <div className={style.stats}>
        <div className={style.statsItem}>
          <div className={style.statsLabel}>Total Raise</div>
          <div className={style.statsValue}>
            {total ? `${total} ${raiseSymbol}` : '-'}
          </div>
        </div>
        <div className={style.statsItem}>
          <div className={style.statsLabel}>
            {tokenSymbol ? 'COIN' : tokenSymbol ? `${tokenSymbol}` : 'COIN'} For
            Sale
          </div>
          <div className={style.statsValue}>
            {availableForPurchase ? availableForPurchase : '-'}
          </div>
        </div>
        <div className={style.statsItem}>
          <div className={style.statsLabel}>Buying Coin</div>
          <div className={style.statsValue}>{raiseSymbol}</div>
        </div>
      </div>
    </div>
  )
}
