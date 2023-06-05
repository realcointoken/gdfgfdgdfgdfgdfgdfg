import {Row} from 'antd'
import React, {useEffect, useState} from 'react'
import {Button, Modal, Col, H3} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import style from './Confirm.Module.scss'
import {
  faArrowDown,
  faQuestionCircle,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'

export default function ConfirmModel(props) {
  const {confirm, confirmClose, data, swapConfirmed} = props
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
    swapConfirmed(true)
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
          <Modal.Title>Confirm Swap</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'ps-4 pt-0 pb-0 pe-4'}>
          <Row className='justify-content-between'>
            <h3 clasn>
              <img
                src={data?.fromCurrencyImage}
                width='28'
                height='34'
                className={'me-2'}
              />
              {data?.fromAmount}
            </h3>
            <h3 className={'float-end'}>{data?.fromCurrencyShortName}</h3>
          </Row>
          <Row>
            <div className='ms-2'>
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </Row>
          <Row className='justify-content-between mt-2'>
            <h3 clasn className={style.highlight}>
              <img
                src={data?.toCurrencyImage}
                width='28'
                height='34'
                className={'me-2'}
              />
              {data?.toAmount}
            </h3>
            <h3 className={`float-end ${style.highlight}`}>
              {data?.toCurrencyShortName}
            </h3>
          </Row>
          <Row className={'mt-4'}>
            Output is estimated you will receive at least{' '}
            <span className={`ms-1 fw-bold ${style.highlight}`}>
              {' '}
              {data?.toAmount} {data?.toCurrencyShortName}{' '}
            </span>{' '}
            or the transaction will revert
          </Row>
          <Row className={'mt-5 flex-column'}>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>Price</span>{' '}
              <span className={'m-0'}>
                {data?.toAmount} / {data?.toCurrencyShortName}{' '}
                <FontAwesomeIcon icon={faSyncAlt} />{' '}
              </span>
            </Row>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>
                Minimum Received <FontAwesomeIcon icon={faQuestionCircle} />
              </span>{' '}
              <span className={'m-0'}>
                {data?.toAmount} {data?.toCurrencyShortName}
              </span>
            </Row>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>
                Price Impact <FontAwesomeIcon icon={faQuestionCircle} />
              </span>{' '}
              <span className={'m-0'}>0.31%</span>
            </Row>
            <Row className={'justify-content-between'}>
              <span className={'m-0'}>
                Liquidity Provider Fee{' '}
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>{' '}
              <span className={'m-0'}>0.0005988 BNB</span>
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
            Confirm swap
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
