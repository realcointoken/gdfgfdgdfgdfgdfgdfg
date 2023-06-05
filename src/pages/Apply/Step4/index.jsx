import React, {useEffect, useState} from 'react'
import {get} from 'lodash'
import Form from '../../../components/Form'
import Button from '../../../components/Button'
import {FORM_FIELD_TYPES} from '../../../components/Form/constants'
import {blockchainData} from '../../Apply/stepData'
import {smartContracts} from '../../Apply/stepData'
import cn from 'classnames'
import Web3 from 'web3'

import style from '../Apply.module.scss'
import Field from '../../../components/Form/components/Field'
import API from '../../../store/api'
import {useSelector} from 'react-redux'

export default function StepFour({data, step, onContinue, onChange}) {
  const id = get(data, 'blockchain.id')
  const blockchainDataState = useSelector(
    (state) => state.blockchain.blockchainData,
  )
  const [blockData, setBlockData] = useState([])
  const {contractAddress, tokenName, tokenSymbol} = data
  const disabled =
    !(contractAddress?.length >= 40) || !tokenName || !tokenSymbol

  const [isInvalidAddress, setInInvalidAddress] = useState(false)
  useEffect(() => {
    console.log('dataaaa', data)
    if (data.blockchain.id === 0) {
      onChange({
        ...data,
        blockchain: {
          name: blockchainData[0].value,
          id: 0,
          blockId: blockchainData[0].id,
        },
      })
    }
  }, [])
  console.log('data', data)
  const handleOnChange = (value, index) => () => {
    onChange({
      ...data,
      blockchain: {name: value.name, id: value.chainID, blockId: value.chainID},
    })
  }

  const checkContactAddressOnBlue = (event) => {
    const {name, value} = event.target

    if (contractAddress?.length >= 40) {
      setInInvalidAddress(false)
    } else {
      setInInvalidAddress(true)
    }
  }

  useEffect(() => {
    setBlockData(blockchainDataState)
  }, [blockchainDataState])

  const renderBlockchainItem = () => {
    return (
      blockData.length > 0 &&
      blockData.map((e, i) => {
        return (
          <div
            key={i}
            onClick={handleOnChange(e, i)}
            className={cn(style.blockchainItem, {
              [style.blockchainItemActive]: id === e.chainID,
            })}
          >
            {/* <div className={style.leftBlock}>
            <img src={e.icon} alt='icon' />
          </div> */}
            <div className={style.rightBlock}>
              <h1 className={style.blockName}>{e.name}</h1>
              {/* <p className={style.blockDetail}>
              amet consectetur adipiscing elit.
            </p> */}
            </div>
          </div>
        )
      })
    )
  }

  return (
    <section className={style.header}>
      <h1 className={style.title}>Step {step + 1}/6</h1>
      <p className={style.heading}>Blockchain</p>
      <p className={style.description}>
        Choose the primary blockchain that your project is built on.
      </p>

      <>
        <Form
          data={data}
          wrapperClass={style.form}
          onChange={(newData) => {
            onChange({
              ...data,
              contractAddress: get(newData, 'contractAddress', ''),
              tokenName: get(newData, 'tokenName', ''),
              tokenSymbol: get(newData, 'tokenSymbol', ''),
            })
          }}
        >
          <div className={style.blockchainContainer}>
            <h1 className={style.blockchainText}>Blockchain to be built on</h1>
            {renderBlockchainItem()}
            <Field
              id={'contractAddress'}
              name={'contractAddress'}
              label={'Enter Project Contract Address *'}
              placeHolder={'Contract Address'}
              type={FORM_FIELD_TYPES.TEXT}
              onBlur={(e) => checkContactAddressOnBlue(e)}
              // onBlur={handleBlur}
              required
              min={40}
            />
            {isInvalidAddress && (
              <div style={{color: 'red'}}>Invalid Contact address</div>
            )}

            <Field
              id={'tokenName'}
              name={'tokenName'}
              label={'Enter The Token Name *'}
              placeHolder={'Enter The Token Name'}
              type={FORM_FIELD_TYPES.TEXT}
              required
              min={40}
            />

            <Field
              id={'tokenSymbol'}
              name={'tokenSymbol'}
              label={'Enter The Token Symbol *'}
              placeHolder={'Enter The Token Name'}
              type={FORM_FIELD_TYPES.TEXT}
              required
              min={40}
            />
          </div>

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
              type={FORM_FIELD_TYPES.SUBMIT}
              text={'CONTINUE'}
              primary
              disabled={disabled}
              blue
              onClick={() => onContinue(step + 1)}
            />
          </div>
        </Form>
      </>
    </section>
  )
}
