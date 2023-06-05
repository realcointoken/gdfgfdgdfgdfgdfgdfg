import {Row} from 'antd'
import React, {useEffect, useState} from 'react'
import {Button, Modal, Col, H3} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import style from './ConfirmPool.Module.scss'
import {
  faArrowDown,
  faQuestionCircle,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'

export default function ConfirmModel(props) {
  const {confirm, confirmClose, data, poolConfirmed} = props
  const [popConfirm, setPopConfirm] = useState()

  useEffect(() => {
    setPopConfirm(confirm)
  }, [confirm])

  const handleConfirmClose = () => {
    setPopConfirm(false)
    confirmClose(false)
  }
  const handleConfirmShow = () => setPopConfirm(true)

  const applyPool = () => {
    poolConfirmed(true)
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
          <Modal.Title>Confirm Pool</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'ps-4 pt-0 pb-0 pe-4'}>
          <Row className='flex-column'>
            <Row className='justify-content-between'>
              <span>
                <strong>Full Name</strong>
              </span>
              <span>{data.fullName}</span>
            </Row>
            <Row className='justify-content-between'>
              <span>
                <strong>Project Name</strong>
              </span>
              <span>{data.projectName}</span>
            </Row>
            <Row className='justify-content-between'>
              <span>
                <strong>Blockchain Name</strong>
              </span>
              <span>{data.blockchain.name}</span>
            </Row>
            <Row className='justify-content-between'>
              <span>
                <strong>Supply Amount</strong>
              </span>
              <span> {data.supplyAmount}</span>
            </Row>
            <Row className='justify-content-between'>
              <span>
                <strong>Token Rate</strong>
              </span>
              <span> {data.tokenRate}</span>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer className='flex-column border-0 p-4'>
          <Button
            variant='primary w-100'
            className={style.swapBtn}
            size='lg'
            onClick={applyPool}
          >
            Confirm Pool
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
