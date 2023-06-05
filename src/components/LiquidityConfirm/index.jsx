import {Row} from 'antd'
import React, {useEffect, useState} from 'react'
import {Button, Modal, Col, H3} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import style from './LiquidityConfirm.Module.scss'
import {
  faArrowDown,
  faQuestionCircle,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'

export default function LiquidityConfirm(props) {
  const {confirm, confirmClose, data, startLiquidity} = props
  const [popConfirm, setPopConfirm] = useState()

  useEffect(() => {
    setPopConfirm(confirm)
  }, [confirm])

  const handleConfirmClose = () => {
    setPopConfirm(false)
    confirmClose(false)
  }
  const handleConfirmShow = () => setPopConfirm(true)

  const applySwapping = () => {
    startLiquidity()
    handleConfirmClose()
  }

  return (
    <>
      <Modal
        show={popConfirm}
        onHide={handleConfirmClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header className={'border-0 p-4'} closeButton>
          <Modal.Title>You will receive</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'ps-4 pt-0 pb-0 pe-4'}>
          <Row className='justify-content-between mt-2'>
            <h3 clasn className={style.highlight}>
              {data?.liquidityCalculation?.calculation}
            </h3>

            <span>
              <img
                src={data?.firstSelectedCurrency?.image}
                width='28'
                height='34'
                className={'me-2'}
              />
              <img
                src={data?.secondSelectedCurrency?.image}
                width='28'
                height='34'
                className={'me-2'}
              />
            </span>
          </Row>
          <h4 className='mt-3'>Pool Tokens</h4>
          <Row className={'mt-4'}>
            Output is estimated. If the price changes more than 0.8% youur
            transaction will revert
          </Row>
          <Row className={'mt-5 flex-column'}>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>
                {data?.firstSelectedCurrency?.shortName} Deposited
              </span>{' '}
              <span className={'m-0'}>
                <img
                  src={data?.firstSelectedCurrency?.image}
                  width='28'
                  height='34'
                  className={'me-2'}
                />
                {data?.currencyCalculationData?.fromAmount}
              </span>
            </Row>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>
                {data?.secondSelectedCurrency?.shortName} Deposited
              </span>{' '}
              <span className={'m-0'}>
                <img
                  src={data?.secondSelectedCurrency?.image}
                  width='28'
                  height='34'
                  className={'me-2'}
                />
                {data?.currencyCalculationData?.toAmount}
              </span>
            </Row>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>Rates</span>{' '}
              <span className={'m-0'}>
                1 {data?.firstSelectedCurrency.shortName} ={' '}
                {data?.liquidityCalculation?.rateinUsd}{' '}
                {data?.secondSelectedCurrency.shortName}
              </span>
            </Row>
            <Row className={'justify-content-end'}>
              <span>
                1 {data?.secondSelectedCurrency.shortName} ={' '}
                {data?.liquidityCalculation?.rateInCurrency}{' '}
                {data?.firstSelectedCurrency.shortName}
              </span>
            </Row>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>Share of Pool</span>
              <span className={'m-0'}>
                {data?.liquidityCalculation?.shareOfPool} %
              </span>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer className='flex-column border-0 p-4'>
          <Button
            variant='primary w-100'
            className={style.swapBtn}
            size='lg'
            onClick={applySwapping}
          >
            Confirm Liquidity
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
