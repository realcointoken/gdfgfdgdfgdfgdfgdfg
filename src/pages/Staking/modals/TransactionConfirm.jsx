import React, {useState} from 'react'
import {Modal} from 'antd'
import CloseIcon from '../assets/x-circle.svg'
import USTDIcon from '../assets/ustd.svg'
import PRJIcon from '../assets/prj.svg'
import CheckIcon from '../assets/check-circle.svg'
import style from './modal.module.scss'
const TransactionConfirm = (props) => {
  return (
    <div>
      <Modal
        visible={props.open}
        footer={false}
        closeIcon={<img src={CloseIcon} />}
        onCancel={props.close}
        centered
        bodyStyle={{
          backgroundColor: '#262c40',
          padding: '40px 30px',
        }}
      >
        <div>
          <span className={style.heading}>Purchase</span>
          <div className={style.ustddiv}>
            {' '}
            <img src={USTDIcon} alt='icon' width='24px' height='24px' />
            <span className={style.ustdtext}>USTD</span>
          </div>
          <div>
            <div className={style.flexdiv} style={{marginTop: '23px'}}>
              <span className={style.lefttext}>Amount USDT</span>
              <span className={style.righttext}>MAX 2500 USDT</span>
            </div>
            <div
              className={style.flexdiv}
              style={{
                border: '1px solid #3a435a',
                padding: '10px',
                borderRadius: '6px',
                margin: '6px 0px',
              }}
            >
              <span className={style.vlaueleft}>100</span>
              <span
                className={style.valueright}
                style={{
                  padding: '4px 14px',
                  backgroundColor: '#3a435a',
                  borderRadius: '6px',
                }}
              >
                MAX
              </span>
            </div>
            <span className={style.bottomtext}>Balance: 2300 USDT</span>
          </div>

          <div
            style={{
              height: '1px',
              backgroundColor: '#3A435A',
              margin: '36px 0px',
            }}
          />
          <div className={style.ustddiv}>
            {' '}
            <img src={PRJIcon} alt='icon' width='26px' height='24px' />
            <span className={style.ustdtext}>PRJX</span>
          </div>
          <div>
            <div className={style.flexdiv} style={{marginTop: '23px'}}>
              <span className={style.lefttext}>Amount USDT</span>
              <span className={style.righttext}>MAX 2500 USDT</span>
            </div>
            <div
              className={style.flexdiv}
              style={{
                border: '1px solid #3a435a',
                padding: '10px',
                borderRadius: '6px',
                margin: '6px 0px',
              }}
            >
              <span className={style.vlaueleft}>100</span>
              <span
                className={style.valueright}
                style={{
                  padding: '4px 14px',
                  backgroundColor: '#3a435a',
                  borderRadius: '6px',
                }}
              >
                MAX
              </span>
            </div>
            <span className={style.bottomtext}>Balance: 2300 USDT</span>
          </div>

          <div className={style.currencyequation}>1 PRJX = 230,00 USDT</div>
          <div
            style={{
              padding: '13.5px 0px',
              background: 'rgba(91, 245, 156, 0.17)',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center',
            }}
          >
            <span className={style.confirmtext}>
              <span>
                <img
                  src={CheckIcon}
                  alt=''
                  width='22px'
                  height='22px'
                  style={{marginRight: '12px'}}
                />
              </span>
              Transaction confirmed
            </span>
          </div>
          <div
            className={style.flexdiv}
            style={{justifyContent: 'center', marginTop: '36px'}}
          >
            <div
              className={style.transactionbtn}
              style={{
                background: '#0079fc',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              <span>Super</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TransactionConfirm
