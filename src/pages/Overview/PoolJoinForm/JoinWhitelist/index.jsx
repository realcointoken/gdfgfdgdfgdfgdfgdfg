import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import style from './JoinPool.module.scss'
import moment from 'moment'
import ProgressBar from '../../../../components/ProgressBar'
import cn from 'classnames'
import Button from '../../../../components/Button'
import WhitelistStatus from '../WhiteListStatus'
import {defaultAcceptToken, formatUnits} from '../../../../store/constants/web3'
// import formatNumber from "../../../../utils";
import {formatNumber} from '../../../../utils'
import {get, parseInt} from 'lodash'

export default function JoinWhitelist(props) {
  const {data, requesting, loading, wrapperClass, isConnected, onConnect} =
    props
  const [countdownData, setCountdownData] = useState(
    moment.duration(0, 'milliseconds'),
  )
  const [progress, setProgress] = useState(0)
  const intervalId = useRef(0)

  const isWhitelist = useSelector((state) => state.wallet.isWhitelist)

  const {
    // extraTokenDecimals,
    // extraContractTotalToken,
    // extraContractTotalRaise,
    // extraAcceptedTokenDecimals,
    chainId,
    // swapAmount,
    extraContractSoldAmount,
    extraTokenDecimals,
    symbol,
  } = data
  let {
    // totalRaise,
    extraAcceptedTokenSymbol,
  } = data
  // if (extraContractTotalRaise && extraAcceptedTokenDecimals) {
  //   totalRaise = formatUnits(extraContractTotalToken, extraAcceptedTokenDecimals);
  // }
  // const totalToken = formatUnits(extraContractTotalToken, extraTokenDecimals);
  if (!extraAcceptedTokenSymbol) {
    extraAcceptedTokenSymbol = defaultAcceptToken(chainId).symbol
  }
  const onJoinWhitelist = () => {
    window.open('#')
  }
  const projectState = useSelector((state) => state.project.project.result)
  const totalRaise = Number(get(projectState, 'totalRaise', 0))
  const availableForPurchase = Number(
    get(projectState, 'availableForPurchase', 0),
  )
  const exchangeRate = totalRaise / availableForPurchase
  const maxAllocation = useSelector((state) =>
    parseInt(get(state, 'wallet.maxAllocation', 0)),
  )
  const maxAcceptAllocationToken = maxAllocation * exchangeRate
  useEffect(() => {
    const interval = 1000
    const event = moment(data.launchDate).unix()
    console.log('event::', event)
    const created = moment(data.createdAt).unix()
    const now = moment(new Date()).unix()
    console.log('now::', now)
    let duration = moment.duration((event - now) * 1000, 'milliseconds')
    console.log('duration::', duration.asDays())
    const totalDuration = moment.duration(
      (event - created) * 1000,
      'milliseconds',
    )
    clearInterval(intervalId.current)

    if (data.launchDate && duration && duration.asMilliseconds() >= 0) {
      intervalId.current = setInterval(() => {
        duration = moment.duration(
          duration.asMilliseconds() - interval,
          'milliseconds',
        )
        console.log('duration::', duration)
        setCountdownData(duration)
        setProgress(duration.asMilliseconds() / totalDuration.asMilliseconds())
      }, interval)
    }

    return () => {
      clearInterval(intervalId.current)
    }
  }, [data.launchDate, data.createdAt])

  return (
    <div
      className={cn(style.container, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      <h3 className={style.heading}>Swap Countdown</h3>
      <ul className={style.countDown}>
        <li>
          <div className={style.countDownValue}>
            {Math.floor(countdownData.asDays())}
          </div>
          <div className={style.countDownLabel}>Days</div>
        </li>
        <li>
          <div className={style.countDownValue}>{countdownData.hours()}</div>
          <div className={style.countDownLabel}>Hours</div>
        </li>
        <li>
          <div className={style.countDownValue}>{countdownData.minutes()}</div>
          <div className={style.countDownLabel}>Minutes</div>
        </li>
        <li>
          <div className={style.countDownValue}>{countdownData.seconds()}</div>
          <div className={style.countDownLabel}>Seconds</div>
        </li>
      </ul>
      <ProgressBar wrapperClass={style.progress} progress={progress} />
      <ul className={style.data}>
        <li className={style.dataRow}>
          <div className={style.dataLabel}>{data.symbol} Price</div>
          <div className={style.dataValue}>
            {exchangeRate} {extraAcceptedTokenSymbol}
          </div>
        </li>
        <li className={style.dataRow}>
          <div className={style.dataLabel}>{data.symbol} Sold</div>
          <div className={style.dataValue}>
            {formatNumber(
              formatUnits(extraContractSoldAmount, extraTokenDecimals),
              '',
              0,
            )}{' '}
            {symbol}
          </div>
        </li>
        <li className={style.dataRow}>
          <div className={style.dataLabel}>Max Allocation</div>
          <div className={style.dataValue}>
            {formatNumber(maxAllocation, '', 0)} {data.symbol}
          </div>
        </li>
        <li className={style.dataRow}>
          <div className={style.dataLabel}>
            Max {extraAcceptedTokenSymbol} Swap
          </div>
          <div className={style.dataValue}>
            {formatNumber(
              isFinite(maxAcceptAllocationToken)
                ? maxAcceptAllocationToken
                : 'NaN',
              '',
              0,
            )}{' '}
            {extraAcceptedTokenSymbol}
          </div>
        </li>
      </ul>
      {isConnected && <WhitelistStatus wrapperClass={style.status} />}
      {!isWhitelist && (
        <Button
          wrapperClass={style.button}
          text={isConnected ? 'JOIN WHITELIST' : 'CONNECT WALLET'}
          primary
          light
          onClick={() =>
            isConnected
              ? onJoinWhitelist && onJoinWhitelist()
              : onConnect && onConnect()
          }
          loading={requesting}
        />
      )}
    </div>
  )
}
