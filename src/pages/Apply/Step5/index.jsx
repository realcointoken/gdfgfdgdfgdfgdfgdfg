import React, {useEffect, useState} from 'react'
import {get} from 'lodash'

import Form from '../../../components/Form'
import Field from '../../../components/Form/components/Field'
import Button from '../../../components/Button'
import {blockchainData} from '../../Apply/stepData'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'
import {message} from 'antd'

import style from '../Apply.module.scss'
import {useSelector} from 'react-redux'

export default function StepFive({data, step, onContinue, onChange}) {
  const {
    shortDescription,
    raiseTarget,
    expectedLaunchDate,
    liveDate,
    supplyAmount,
    tokenRate,
  } = data

  const [supplyAmountInput, setSupplyAmountInput] = useState(supplyAmount)
  const [raiseTargetInput, setRaiseTargetInput] = useState(raiseTarget)
  const [tokenRateInput, setTokenRateInput] = useState(tokenRate)
  const [selectedBlockChain, setSelectedBlockChain] = useState('')
  const blockchainDataState = useSelector(
    (state) => state.blockchain.blockchainData,
  )

  const disabled =
    !shortDescription ||
    !(raiseTarget && raiseTarget > 0) ||
    !expectedLaunchDate ||
    !liveDate ||
    !(supplyAmount && supplyAmount > 0) ||
    !(tokenRate && tokenRate > 0)

  useEffect(() => {
    const extractedChainRecord = blockchainDataState.find(
      (record) => record.chainID == data.blockchain.blockId,
    )
    setSelectedBlockChain(extractedChainRecord)

    // console.log(SelectedBlockChain)
  }, [])

  const handleEndDateChange = (date, dateString) => {
    const now = Date.now()
    const datemili = new Date(date)
    // if (now <= datemili) {
    onChange({
      ...data,
      expectedLaunchDate: date,
    })
    // }
    // else {
    //   message.error('Select future date only')
    //   onChange({
    //     ...data,
    //     expectedLaunchDate: '',
    //   })
    // }
  }

  const handleLiveDateChange = (date, dateString) => {
    const now = Date.now()
    const datemili = new Date(date)

    onChange({
      ...data,
      liveDate: date,
    })
  }

  const handlePriceChange = (number) => {
    onChange({
      ...data,
      raiseTarget: number,
    })
  }

  const handleSupplyAmountAmountChange = (e) => {
    const {name, value} = e.target
    console.log(data)
    const re = /^[0-9\b\.]+$/

    if (value === '' || re.test(value)) {
      if (name == 'supplyAmount') {
        setSupplyAmountInput(value)
      } else if (name == 'tokenRate') {
        setTokenRateInput(value)
      } else if (name == 'raiseTarget') {
        setRaiseTargetInput(value)
      }
    }

    onChange({
      ...data,
      [name]: value,
    })
  }

  return (
    <section className={style.header}>
      <h1 className={style.title}>Step {step + 1}/6</h1>
      <p className={style.heading}>Project Description</p>
      <p className={style.description}>
        Tell us more about your project and why you think it is a good fit for
        LavaX IDO.
      </p>

      <>
        <Form
          data={data}
          wrapperClass={style.form}
          onChange={(newData) => {
            onChange({
              ...data,
              shortDescription: get(newData, 'shortDescription', ''),
              supplyAmount: get(newData, 'supplyAmount', ''),
              // raiseTarget: get(newData, 'raiseTarget', ''),
              //expectedLaunchDate: get(newData, 'expectedLaunchDate', ''),
            })
          }}
        >
          <Field
            id={'shortDescription'}
            name={'shortDescription'}
            label={'Enter Project Short description *'}
            placeholder={'description'}
            type={FORM_FIELD_TYPES.AREA}
            rows={4}
          />

          {/* <Field
            id={'supplyAmount'}
            name={'supplyAmount'}
            label={'Enter Supply Amount *'}
            placeholder={'Supply Amount'}
            type={FORM_FIELD_TYPES.TEXT}
          /> */}
          <div>
            <span className={style.label}>Enter Supply Amount (Token)*</span>

            <input
              id='supplyAmount'
              name='supplyAmount'
              type='number'
              value={supplyAmountInput}
              placeholder='Supply Amount'
              className={style.customInput}
              onChange={handleSupplyAmountAmountChange}
              defaultValue={data && data.supplyAmount}
            />
          </div>

          <div>
            <span className={style.label}>
              Enter Rate ({selectedBlockChain?.stableCoinSymbol}) *
            </span>

            <input
              id='tokenRate'
              name='tokenRate'
              type='number'
              value={tokenRateInput}
              placeholder='Token Rate'
              className={style.customInput}
              onChange={handleSupplyAmountAmountChange}
              defaultValue={data && data.tokenRate}
            />
          </div>

          <div>
            <span className={style.label}>Enter Project Raise Target *</span>

            <input
              id='raiseTarget'
              name='raiseTarget'
              type='number'
              value={raiseTargetInput}
              placeholder='Raise Target'
              className={style.customInput}
              onChange={handleSupplyAmountAmountChange}
              defaultValue={data && data.raiseTarget}
            />
          </div>

          {/* 

          <Field
            id={'raiseTarget'}
            name={'raiseTarget'}
            label={'Enter Project Riase Target ($USD) *'}
            placeholder={'Riase Target'}
            type={FORM_FIELD_TYPES.NUMBER}
            onChange={handlePriceChange}
            required
          /> */}

          <Field
            id={'liveDate'}
            name={'liveDate'}
            label={'Project Live Date *'}
            placeholder={'Live Date'}
            type={FORM_FIELD_TYPES.DATE}
            onChange={handleLiveDateChange}
            required
          />

          <Field
            id={'expectedLaunchDate'}
            name={'expectedLaunchDate'}
            label={'Project End Date *'}
            placeholder={'End Date'}
            type={FORM_FIELD_TYPES.DATE}
            onChange={handleEndDateChange}
            required
          />

          <div className={style.btnContainer}>
            <Button
              wrapperClass={style.backBtn}
              text={'BACK'}
              primary
              dark
              onClick={() => onContinue(step - 1)}
            />
            <Button
              wrapperClass={style.nextBtn}
              text={'CONTINUE'}
              disabled={disabled}
              primary
              blue
              onClick={() => onContinue(step + 1)}
            />
          </div>
        </Form>
      </>
    </section>
  )
}
