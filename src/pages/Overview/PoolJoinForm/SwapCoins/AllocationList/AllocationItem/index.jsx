import React from 'react'
import {useSelector} from 'react-redux'
import {get} from 'lodash'
import Button from '../../../../../../components/Button'
import cn from 'classnames'
import style from './AllocationItem.module.scss'
import {formatUnits} from '../../../../../../store/constants/web3'

export default function AllocationsItem(props) {
  let rewardedAmount = useSelector((state) => state.wallet.rewardedAmount)
  let requesting = useSelector((state) => state.user.redeemTokens.requesting)
  let redeemed = useSelector((state) => state.wallet.redeemed)
  const projectState = useSelector((state) => state.project.project.result)
  const extraContractIsFinished = Number(
    get(projectState, 'extraContractIsFinished', false),
  )
  const {data, onClaim, wrapperClass} = props
  rewardedAmount = formatUnits(
    rewardedAmount,
    get(data, 'extraTokenDecimals', 18),
  )

  return (
    <div className={cn(style.container, wrapperClass)}>
      <div className={style.left}>
        {/*<img src={data.logoUrl} alt="" className={style.picture} />*/}
        <div
          style={{backgroundImage: `url(${data.logoUrl})`}}
          className={style.picture}
        />
        <div className={style.value}>
          {projectState?.totalSupply} {data.symbol}
        </div>
      </div>
      {redeemed ? (
        <span className={style.label}>Claimed</span>
      ) : extraContractIsFinished && Number(rewardedAmount) > 0 ? (
        <Button
          wrapperClass={style.button}
          text={'Claim'}
          blue
          small
          onClick={() => onClaim && onClaim(data)}
          loading={requesting}
        />
      ) : (
        <span className={style.countdown}> {'Claim'}</span>
      )}
    </div>
  )
}
