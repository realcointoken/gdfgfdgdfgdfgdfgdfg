import React, {useEffect, useRef, useState, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import moment from 'moment'

import style from './PoolJoinForm.module.scss'
import cn from 'classnames'
import SwapCoins from './SwapCoins'

import {reconnectProject} from '../../../store/actions/project'
import {redeemTokens} from '../../../store/actions/user'

// import {Divider} from 'antd'
import Modal from '../../../components/Modal'
// import Form from '../../../components/Form'
// import Field from '../../../components/Form/components/Field'
// import PseudoInput from '../../../components/Form/components/PseudoInput'
import Button from '../../../components/Button'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'

// import signMatrix from '../../../assets/svg/sign-matrix.svg'
// import signCongrats from '../../../assets/svg/sign-congrats.svg'
import signSorry from '../../../assets/svg/sign-sorry.svg'
import comingSoon from '../../../assets/svg/coming-soon.svg'
import limitReached from '../../../assets/svg/limit-reached.svg'
import congrats from '../../../assets/svg/congrats.svg'
import saleFinished from '../../../assets/svg/sale-finished.svg'
import stakingAbi from '../../../store/constants/stakingAbi.json'
import lnchxAbi from '../../../store/constants/lnchxAbi.json'
import lnchxpAbi from '../../../store/constants/lnchxpAbi.json'
import {getWhitelists} from '../../../store/actions/whitelists'
import useWeb3 from '../../../hooks/useWeb3'
import {BigNumber} from 'bignumber.js'

export default function PoolJoinForm(props) {
  const dispatch = useDispatch()
  const {
    data,
    walletBalance,
    wrapperClass,
    onFormDataChange,
    onFormSubmit,
    formData,
    loading,
    requesting,
    requestingAllocation,
    allocations,
  } = props
  const web3 = useWeb3()
  const [joinLottery, setJoinLottery] = useState(null)
  const [joinGuarantee, setJoinGuarantee] = useState(null)
  const projectResult = useSelector((state) => state?.project?.project?.result)
  const stakingState = useSelector((state) => state?.project?.staking)
  const whitelistState = useSelector(
    (state) => state?.whitelists?.whitelist?.data,
  )
  const user = useSelector((state) => state?.user)

  const {startIDODateTimestamp, endIDODateTimestamp} = projectResult ?? {}

  const {totalTokensSoldByAddress} = stakingState ?? {}
  const total = new BigNumber(totalTokensSoldByAddress ?? 0)
  const launchDate = projectResult?.launchDate
  const [countdownData, setCountdownData] = useState(
    moment.duration(0, 'milliseconds'),
  )
  useEffect(() => {
    const interval = 1000
    const event = moment(data.launchDate).unix()
    const now = moment(new Date()).unix()
    let duration = moment.duration((event - now) * 1000, 'milliseconds')
    clearInterval(intervalId.current)

    if (data.launchDate && duration && duration.asMilliseconds() >= 0) {
      intervalId.current = setInterval(() => {
        duration = moment.duration(
          duration.asMilliseconds() - interval,
          'milliseconds',
        )
        setCountdownData(duration)
      }, interval)
    }

    return () => {
      clearInterval(intervalId.current)
    }
  }, [data.launchDate, data.createdAt])

  const [isCountdown, setIsCountdown] = useState(true)
  const intervalId = useRef(0)
  useEffect(() => {
    const interval = 1000
    clearInterval(intervalId.current)
    if (isCountdown) {
      intervalId.current = setInterval(() => {
        setIsCountdown(moment(launchDate).valueOf() > moment().valueOf())
        if (!isCountdown) {
          dispatch(reconnectProject())
          clearInterval(intervalId.current)
        }
      }, interval)
    }
  }, [dispatch, launchDate, isCountdown, intervalId])

  const onClaim = () => {
    dispatch(redeemTokens())
  }

  const [isModalVisible, setIsModalVisible] = useState(false)
  const triggerPurchaseModal = (openModal) => {
    setIsModalVisible(openModal)
  }
  const walletAddress = user?.userAccount.accounts[0]

  const onSubmitJoinLottery = useCallback(async () => {
    if (window.web3 && !!projectResult?.stakingContract) {
      const stakingContract = new window.web3.eth.Contract(
        stakingAbi,
        projectResult?.stakingContract,
      )
      const lnchxContract = new window.web3.eth.Contract(
        lnchxAbi,
        '0x6E8A641Bbe4aC56caffED5f0ec7f0C56088300dC'.toLowerCase(),
      )

      try {
        const lnchxData = await lnchxContract.methods
          .approve(projectResult?.stakingContract, Number(joinLottery))
          .send({from: walletAddress})
        console.log({lnchxData})
        const stakingData = await stakingContract.methods
          .depositToken(
            '0x6E8A641Bbe4aC56caffED5f0ec7f0C56088300dC'.toLowerCase(),
            Number(joinLottery),
          )
          .send({from: walletAddress})
        console.log({stakingData})
      } catch (error) {
        console.log({error})
      }
    }
  }, [joinLottery, projectResult?.stakingContract, walletAddress])
  const onSubmitJoinGuarantee = useCallback(async () => {
    if (window.web3 && !!projectResult?.stakingContract) {
      const stakingContract = new window.web3.eth.Contract(
        stakingAbi,
        projectResult?.stakingContract,
      )
      const lnchxpContract = new window.web3.eth.Contract(
        lnchxpAbi,
        '0x0eC83dfaa9a6Fc524742b60d3E96bfCAD47ac493'.toLowerCase(),
      )
      try {
        const lnchxpData = await lnchxpContract.methods
          .approve(projectResult?.stakingContract, Number(joinGuarantee))
          .send({from: walletAddress})
        console.log({lnchxpData})
        const stakingData = await stakingContract.methods
          .depositToken(
            '0x0eC83dfaa9a6Fc524742b60d3E96bfCAD47ac493'.toLowerCase(),
            Number(joinGuarantee),
          )
          .send({from: walletAddress})
        console.log({stakingData})
      } catch (error) {
        console.log({error})
      }
    }
  }, [joinGuarantee, projectResult?.stakingContract, walletAddress])

  useEffect(() => {
    if (projectResult?.id && user?.userAccount?.accounts[0])
      dispatch(getWhitelists(projectResult?.id, user?.userAccount?.accounts[0]))
  }, [dispatch, projectResult?.id, user?.userAccount?.accounts])

  /**
   * Checking whether the IDO Sale is live, based on IDO start & end timestamp.
   */
  const IDOSaleIsLive = moment(moment().toISOString()).isBetween(
    startIDODateTimestamp,
    endIDODateTimestamp,
  )
  const IDOSaleIsOngoing = moment(moment().toISOString()).isBefore(
    startIDODateTimestamp,
  )
  const IDOSalesIsFinished = moment(moment().toISOString()).isAfter(
    endIDODateTimestamp,
  )
  return (
    <>
      {/* <div
        className={cn(style.container, wrapperClass, {
          [style.loading]: loading,
        })}
      >
        <Form>
          <div className={style.formGroup}>
            {isCountdown && (
              <div className='h1 color-red'>
                Staking &bull;&nbsp;
                <small>
                  {`${Math.floor(
                    countdownData.asDays(),
                  )}d:${countdownData.hours()}h:${countdownData.minutes()}m:${countdownData.seconds()}s left`}
                </small>
              </div>
            )}

            <div className='h2'>LNCHX</div>
          </div>
        </Form>

        <Divider />

        <Form onChange={(e) => setJoinLottery(e?.joinLottery ?? '')}>
          <div className={style.formGroup}>
            <Field
              id={'joinLottery'}
              name={'joinLottery'}
              label={'Join Lottery Pool'}
              placeholder={'Your stake so far: 500 LNCHX'}
              type={FORM_FIELD_TYPES.TEXT}
              required
            />

            <Button
              type={FORM_FIELD_TYPES.SUBMIT}
              text={'Stake'}
              compact
              gray
              onClick={onSubmitJoinLottery}
            />
          </div>
        </Form>

        <Divider />

        <Form onChange={(e) => setJoinGuarantee(e?.joinGuarantee ?? '')}>
          <div className={style.formGroup}>
            <Field
              id={'joinGuarantee'}
              name={'joinGuarantee'}
              label={'Join Guarantee Pool'}
              placeholder={'Your stake so far: 100 LNCHXP'}
              type={FORM_FIELD_TYPES.TEXT}
              required
            />

            <Button
              type={FORM_FIELD_TYPES.SUBMIT}
              text={'Stake'}
              compact
              gray
              onClick={onSubmitJoinGuarantee}
            />
          </div>
        </Form>
      </div> */}
      {(startIDODateTimestamp === null || IDOSaleIsOngoing) && (
        <FeedbackBlock
          wrapperClass={wrapperClass}
          loading={loading}
          icon={comingSoon}
        >
          <p className={style.feedback}>Token sale coming soon.</p>
        </FeedbackBlock>
      )}
      {IDOSalesIsFinished && (
        <FeedbackBlock
          wrapperClass={wrapperClass}
          loading={loading}
          icon={saleFinished}
        >
          <p className={style.feedback}>
            The IDO is over. Thank you for participation!
          </p>
        </FeedbackBlock>
      )}
      {IDOSaleIsLive && !whitelistState?.maxAllocation ? (
        <FeedbackBlock
          wrapperClass={wrapperClass}
          loading={loading}
          icon={signSorry}
        >
          <div className='h1 textAlignCenter'>
            It appears that the whitelist has already been selected, but your
            address is not on it. Better luck next time!
          </div>
        </FeedbackBlock>
      ) : IDOSaleIsLive &&
        new BigNumber(totalTokensSoldByAddress).toFixed() ===
          web3.utils.toWei(whitelistState?.maxAllocation?.toString()) ? (
        <FeedbackBlock
          wrapperClass={wrapperClass}
          loading={loading}
          icon={limitReached}
        >
          <p className={style.feedback}>
            You have reached your purchase limits. Thank you for participating
            in this IDO.
          </p>
        </FeedbackBlock>
      ) : IDOSaleIsLive &&
        !!whitelistState?.signature &&
        totalTokensSoldByAddress !== whitelistState?.maxAllocation ? (
        <FeedbackBlock
          wrapperClass={wrapperClass}
          loading={loading}
          icon={congrats}
        >
          <p className={style.feedback}>
            Congrats! You have been white listed to purchase{' '}
            {whitelistState?.maxAllocation ?? 'NA'} tokens in total. You have
            purchased{' '}
            {web3.utils.fromWei(total?.toFixed()?.toString(), 'ether') ?? 0}{' '}
            token(s) already.
          </p>
          <Button
            type={FORM_FIELD_TYPES.SUBMIT}
            text={'Purchase'}
            primary
            blue
            onClick={() => triggerPurchaseModal(true)}
          />
        </FeedbackBlock>
      ) : null}
      {/* <FeedbackBlock
        wrapperClass={wrapperClass}
        loading={loading}
        icon={signCongrats}
      >
        <p className='h1'>Congrats!</p>
        <p className={style.statsValue}>You have won allocations.</p>
        <Button
          type={FORM_FIELD_TYPES.SUBMIT}
          text={'2500'}
          primary
          gray
          wrapperClass={style.buttonBig}
        />
      </FeedbackBlock>
      */}
      <Modal
        title='PURCHASE'
        visible={isModalVisible}
        footer={null}
        onCancel={() => triggerPurchaseModal(false)}
      >
        <SwapCoins
          onChange={onFormDataChange}
          onSubmit={onFormSubmit}
          {...{
            data,
            formData,
            walletBalance,
            requesting,
            allocations,
            onClaim,
            requestingAllocation,
          }}
        />
      </Modal>
    </>
  )
}
function FeedbackBlock({wrapperClass, loading, children, icon}) {
  return (
    <div
      className={cn(style.container, style.centered, wrapperClass, {
        [style.loading]: loading,
      })}
    >
      {icon ? (
        <p>
          <svg width='80' height='80'>
            <use href={icon + '#svg'} />
          </svg>
        </p>
      ) : null}
      {children}
    </div>
  )
}
