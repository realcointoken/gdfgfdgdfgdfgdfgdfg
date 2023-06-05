import {Row} from 'antd'
import React, {useEffect, useState} from 'react'
import {Button, Modal, Col, H3} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import style from './Receipt.Module.scss'
import {
  faArrowCircleUp,
  faArrowUp,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'

export default function ReceiptModal(props) {
  const {showReceipt, receiptClose, txHash, fromCurrencyUrl} = props
  const [receiptPop, setReceiptPop] = useState()

  useEffect(() => {
    setReceiptPop(showReceipt)
  }, [showReceipt])

  const handleRecepitClose = () => {
    setReceiptPop(false)
    receiptClose(false)
  }
  const handleConfirmShow = () => setReceiptPop(true)

  const applySwapping = () => {
    // swapConfirmed(true)
    handleRecepitClose()
  }

  const RedirectToBcs = () => {
    if (txHash) {
      window.open(`${fromCurrencyUrl.blockChainURL}${txHash}`, '_blank')
    }
  }

  return (
    <>
      <Modal
        show={showReceipt}
        onHide={handleRecepitClose}
        backdrop='static'
        keyboard={false}
        centered
        size='sm'
      >
        <Modal.Header className={'border-0 p-4'} closeButton>
          <Modal.Title className={style.recepitFontTile}>
            {' '}
            Transaction Submitted
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={'ps-4 pt-0 pb-0 pe-4'}>
          <Row
            className={
              'justify-content-center p-4 flex-column align-items-center'
            }
          >
            <div className='ms-2'>
              <FontAwesomeIcon icon={faArrowCircleUp} size={'5x'} />
            </div>
          </Row>
        </Modal.Body>
        <Modal.Footer className='flex-column border-0 p-4'>
          <Button size='sm' className='' onClick={() => RedirectToBcs()}>
            View On {fromCurrencyUrl.shortName}{' '}
            <FontAwesomeIcon className={'ms-2'} icon={faExternalLinkAlt} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
