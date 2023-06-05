import React, {useState} from 'react'
import {Modal} from 'antd'
import CloseIcon from '../assets/x-circle.svg'
import USTDIcon from '../assets/ustd.svg'
import PRJIcon from '../assets/prj.svg'
import CheckIcon from '../assets/check-circle.svg'
import style from './modal.module.scss'
const UnstakeConfirm = (props) => {
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
          <span className={style.heading}>Unstake</span>

          <div
            className={style.flexdiv}
            style={{marginTop: '13px', justifyContent: 'right'}}
          >
            <span className={style.stakedtext}>Staked: 1500</span>
          </div>

          <div>
            <div className={style.flexdiv} style={{marginTop: '23px'}}>
              <span className={style.lefttext}>Number of tokens</span>
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
          </div>

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
            <div className={style.bottombtn}>
              <span style={{marginBottom: '3px'}}> Approve</span>
            </div>
            <div
              className={style.bottombtn}
              style={{
                background: 'rgba(58, 67, 90, 0.44)',
                color: 'rgba(255, 255, 255, 0.47)',
              }}
            >
              <span>Unstake</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UnstakeConfirm
