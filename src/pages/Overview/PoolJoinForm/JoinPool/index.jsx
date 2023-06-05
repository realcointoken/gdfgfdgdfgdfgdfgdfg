import React from 'react'
import {useSelector} from 'react-redux'
import cn from 'classnames'
import Button from '../../../../components/Button'
import {formatNumber} from '../../../../utils'
import ProgressDetail from '../../../../components/ProgressDetail'
import style from './JoinPool.module.scss'
import WhitelistStatus from '../WhiteListStatus'
import {formatUnits} from '../../../../store/constants/web3'
import {get, parseInt} from 'lodash'
import AllocationsList from '../SwapCoins/AllocationList'

export default function JoinPool(props) {
  const {data, requesting, loading, setOnJoinPool, wrapperClass, onClaim} =
    props
  const isWhitelist = useSelector((state) => state.wallet.isWhitelist)

  const {tokenDecimals, acceptedTokenSymbol, chainId, symbol, contractIsStart} =
    data
  const projectState = useSelector((state) => state.project.project.result)
  let total = get(data, 'totalRaise', 0)
  if (data.extraContractTotalRaise && data.extraAcceptedTokenDecimals) {
    total = formatUnits(
      data.extraContractTotalRaise,
      data.extraAcceptedTokenDecimals,
    )
  }
  const totalRaise = Number(get(projectState, 'totalRaise', 0))
  const contractTotalRaise = Number(get(projectState, 'contractTotalRaise', 0))
  const availableForPurchase = Number(
    get(projectState, 'availableForPurchase', 0),
  )
  const maxAllocation = useSelector((state) =>
    parseInt(get(state, 'wallet.maxAllocation', 0)),
  )
  const exchangeRate = totalRaise / availableForPurchase
  // const exchangeRate = totalRaise / availableForPurchase;
  const maxAcceptAllocationToken = maxAllocation * exchangeRate
  const contractSoldAmount = Number(get(projectState, 'contractSoldAmount', 0))
  const extraContractSoldAmount = Number(
    get(projectState, 'extraContractSoldAmount', contractSoldAmount),
  )
  const contractTotalParticipant = Number(
    get(projectState, 'contractTotalParticipant', 0),
  )
  const extraContractTotalParticipant = Number(
    get(
      projectState,
      'extraContractTotalParticipant',
      contractTotalParticipant,
    ),
  )
  const contractIsFinished = get(projectState, 'contractIsFinished', false)
  const extraAcceptedTokenSymbol = get(
    projectState,
    'extraAcceptedTokenSymbol',
    '',
  )
  const soldProcess =
    formatUnits(extraContractSoldAmount, tokenDecimals) / availableForPurchase
  // const soldAcceptToken = formatUnits(extraContractSoldAmount, tokenDecimals) * exchangeRate;
  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      <h3 className={style.heading}>Sale Live Now</h3>
      <h1 className={style.heading_name_token}>
        <div
          style={{backgroundImage: `url(${data.logoUrl})`}}
          className={style.image}
        />{' '}
        {Math.floor(soldProcess * 100).toFixed()}% {symbol} Sold
      </h1>
      <ProgressDetail
        wrapperClass={style.progress}
        progress={formatUnits(contractTotalRaise, tokenDecimals) || 0}
        maxProgress={total}
        extraTokenDecimals={tokenDecimals || 18}
        acceptedTokenSymbol={extraAcceptedTokenSymbol}
        loading={loading}
      />
      <ul className={style.stats}>
        <li className={style.statsItem}>
          <div className={style.statsLabel}>{data.symbol} Price</div>
          <div className={style.statsValue}>
            {exchangeRate} {acceptedTokenSymbol}
          </div>
        </li>
        <li className={style.statsItem}>
          <div className={style.statsLabel}>{data.symbol} Sold</div>
          <div className={style.statsValue}>
            {formatNumber(
              formatUnits(extraContractSoldAmount, tokenDecimals),
              '',
              0,
            )}{' '}
            {symbol}
          </div>
        </li>
        <li className={style.statsItem}>
          <div className={style.statsLabel}>Max Allocation</div>
          <div className={style.statsValue}>
            {formatNumber(maxAllocation, '', 0)} {data.symbol}
          </div>
        </li>
        <li className={style.statsItem}>
          <div className={style.statsLabel}>Max {acceptedTokenSymbol} Swap</div>
          <div className={style.statsValue}>
            {formatNumber(
              isFinite(maxAcceptAllocationToken)
                ? maxAcceptAllocationToken
                : 'NaN',
              '',
              0,
            )}{' '}
            {acceptedTokenSymbol}
          </div>
        </li>
        <li className={style.statsItem}>
          <div className={style.statsLabel}>Participants</div>
          <div className={style.statsValue}>
            {extraContractTotalParticipant || 0}
          </div>
        </li>
      </ul>
      <WhitelistStatus wrapperClass={style.status} />
      {!contractIsFinished && (
        <Button
          wrapperClass={style.button}
          text={'JOIN POOL'}
          primary
          blue
          onClick={() => setOnJoinPool && setOnJoinPool(true)}
          loading={requesting}
          disabled={
            !isWhitelist ||
            !contractIsStart ||
            chainId !== window.ethereum.chainId
          }
        />
      )}
      {isWhitelist && contractIsStart && chainId === window.ethereum.chainId ? (
        <div>
          <h4 className={style.label}>My Allocations</h4>
          <AllocationsList
            wrapperClass={style.allocations}
            {...{data, onClaim}}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
