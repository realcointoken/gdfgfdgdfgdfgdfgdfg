import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {get, isEmpty} from 'lodash'
import Field from '../../../../components/Form/components/Field'
import {FORM_FIELD_TYPES} from '../../../../components/Form/constants'
import arrow from '../arrow.png'
import Form from '../../../../components/Form'
import Button from '../../../../components/Button'
import back from './back.svg'
// import AllocationsList from './AllocationList'
import useWeb3 from '../../../../hooks/useWeb3'

import style from './SwapCoins.module.scss'
import {defaultAcceptToken} from '../../../../store/constants/web3'
import {
  approveToken,
  buyToken,
  getAmountTokenAllowTransfer,
} from '../../../../store/actions/user'
import {notification} from 'antd'
import {APPROVE_TOKEN_DATA} from '../../../../constants/index'
import BigNumber from 'bignumber.js'
// import {formatNumber} from '../../../../utils'

export default function SwapCoins(props) {
  const dispatch = useDispatch()
  const {data, onBack} = props
  // const active = formData.from && formData.from > 0 && formData.purchase && formData.purchase > 0;
  const approveTokenState = useSelector((state) => state.user.approveToken)
  const whitelist = useSelector((state) => state.whitelists?.whitelist?.data)
  const buyTokenState = useSelector((state) => state.user.buyToken)
  const maxAllocation = whitelist?.maxAllocation
  const tokenPrice = 0.025
  const projectState = useSelector((state) => state.project.project.result)
  const [amount, setAmount] = useState(maxAllocation * tokenPrice)
  const [purchase, setPurchase] = useState(0)
  const stakingState = useSelector((state) => state?.project?.staking)
  const web3 = useWeb3()

  // const tokenPrice = Number(tokenPrice)
  const {totalTokensSoldByAddress} = stakingState ?? {}

  const total = new BigNumber(totalTokensSoldByAddress ?? 0)
  // const walletBalance = useSelector((state) =>
  //   parseInt(get(state, 'user.userAccount.acceptTokenBalance', 0)),
  // )
  // const amountWalletBought = useSelector((state) =>
  //   parseInt(get(state, 'wallet.amount', 0)),
  // )
  // const extraContractMaxPayableAmount = useSelector((state) =>
  //   parseInt(get(state, 'wallet.maxPayableAmount', 0)),
  // )

  // const extraContractSoldAmount = Number(
  //   get(projectState, 'extraContractSoldAmount', 0),
  // )
  // const extraContractTotalToken = Math.max(
  //   Number(get(projectState, 'extraContractTotalToken', 0)),
  //   extraContractSoldAmount,
  // )
  // // const extraContractMaxPayableAmount = get(projectState, 'extraContractMaxPayableAmount', 0);
  // const extraAcceptedTokenDecimals = get(
  //   projectState,
  //   'extraAcceptedTokenDecimals',
  //   18,
  // )
  const extraAcceptedTokenSymbol = get(
    projectState,
    'extraAcceptedTokenSymbol',
    '',
  )
  const extraContractIsFinished = get(projectState, 'extraContractIsFinished')
  const totalRaise = Number(get(projectState, 'totalRaise', 0))
  const availableForPurchase = Number(
    get(projectState, 'availableForPurchase', 0),
  )
  const exchangeRate = totalRaise / availableForPurchase
  // const extraTokenDecimals = get(projectState, 'extraTokenDecimals', 18)
  // const rewardedAmount =
  //   useSelector((state) => state.wallet.rewardedAmount) ?? 0
  // const remaining = formatUnits(
  //   extraContractTotalToken - extraContractSoldAmount,
  //   extraTokenDecimals,
  // )
  // const maxPayableAmount =
  //   Number(
  //     formatUnits(extraContractMaxPayableAmount, extraAcceptedTokenDecimals),
  //   ) - Number(formatUnits(amountWalletBought || 0, extraAcceptedTokenDecimals))
  // console.log('maxPayableAmount::', maxPayableAmount)

  const handleApprove = () => {
    dispatch(approveToken(amount))
  }
  const handleBuyToken = () => {
    dispatch(buyToken(purchase))
  }

  useEffect(() => {
    if (amount) setPurchase(amount / tokenPrice)
  }, [amount, tokenPrice])

  // useEffect(() => {
  //   if (purchase) setAmount(purchase * Number(tokenPrice ?? 1))
  // }, [tokenPrice, purchase])

  const approveTxHash = approveTokenState?.result?.transactionHash
  const buyTxHash = buyTokenState?.result?.transactionHash
  useEffect(() => {
    if (!!approveTxHash) successNotification(approveTxHash)
    if (!!buyTxHash) successNotification(buyTxHash)
  }, [approveTxHash, buyTxHash])

  // const onClaim = () => {
  //   dispatch(redeemTokens());
  // };
  useEffect(() => {
    dispatch(getAmountTokenAllowTransfer())
  }, [dispatch])

  const approveData = JSON.parse(localStorage.getItem(APPROVE_TOKEN_DATA))
  useEffect(() => {
    if (!isEmpty(approveData)) {
      setAmount(approveData?.amount)
    }
  }, [approveData])

  return (
    <div className={style.container}>
      <h3 className={style.head}>
        {onBack && (
          <Button
            wrapperClass={style.back}
            icon={back}
            onClick={() =>
              !approveTokenState.requesting &&
              !buyTokenState.requesting &&
              onBack &&
              onBack()
            }
          />
        )}
        Swap Coins
      </h3>
      <p className={style.allocation}>
        Max allocation is {maxAllocation} {data.symbol}
      </p>
      <Form wrapperClass={style.form}>
        <Field
          type={FORM_FIELD_TYPES.EXCHANGE}
          id={'from'}
          name={'from'}
          labelLeft={'From'}
          labelRight={projectState?.acceptedTokenSymbol}
          symbol={extraAcceptedTokenSymbol}
          icon={defaultAcceptToken(data.chainId).iconColorful}
          // showMaxButton
          value={amount}
          onChange={(amount) => {
            setAmount(amount)
            setPurchase(amount / tokenPrice)
          }}
          min={0}
          // min={maxAllocation * tokenPrice}
          max={maxAllocation}
          disabled={extraContractIsFinished}
        />
        <img src={arrow} alt='' className={style.arrow} />
        <Field
          type={FORM_FIELD_TYPES.EXCHANGE}
          id={'purchase'}
          name={'purchase'}
          labelLeft={'Purchase'}
          // showMaxButton
          // labelRight={`Remaining: ${formatNumber(remaining)}`}
          symbol={data.symbol}
          icon={data.logoUrl}
          // min={maxAllocation}
          min={0}
          max={
            maxAllocation -
              web3.utils.fromWei(total?.toFixed()?.toString(), 'ether') ?? 0
          }
          value={purchase}
          disabled={extraContractIsFinished}
          onChange={(purchase) => {
            setPurchase(purchase)
            setAmount(purchase * tokenPrice)
          }}
        />
        <div className={style.info}>
          <span>Price</span>
          <span>
            {tokenPrice} {projectState?.symbol} per 1{' '}
            {projectState?.acceptedTokenSymbol}
          </span>
        </div>
        <div className={style.buttonContainer}>
          <Button
            // type={FORM_FIELD_TYPES.SUBMIT}
            wrapperClass={style.button}
            text='Approve'
            disabled={
              purchase > maxAllocation
                ? true
                : isEmpty(approveData)
                ? false
                : isEmpty(approveTokenState?.result)
                ? true
                : false
            }
            primary
            blue
            loading={approveTokenState.requesting}
            onClick={handleApprove}
          />
          <Button
            type={FORM_FIELD_TYPES.SUBMIT}
            wrapperClass={style.button}
            text='Swap'
            disabled={approveData?.amount ? false : true}
            primary
            blue
            onClick={handleBuyToken}
            loading={buyTokenState.requesting}
          />
        </div>
        {/* <p
          style={{
            fontSize: '1rem',
            paddingBlockStart: '1rem',
            color: 'green',
          }}
        >
          Transaction successful. Your Transaction Hash:{' '}
        </p> */}
      </Form>
      {/* <h4 className={style.label}>My Allocations</h4>
      <AllocationsList
        wrapperClass={style.allocations}
        {...{data, allocations, onClaim}}
      /> */}
    </div>
  )

  function successNotification(txHash) {
    notification['success']({
      message: 'Transaction successful',
      description: `Transaction hash: ${txHash}`,
    })
  }
}
