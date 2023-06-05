import React from 'react'
import AlertIcon from './assets/alert.png'
import {switchMetamask} from '../../../store/actions/user'
import style from './SwitchToBinancechain.module.scss'

const SwitchToBinancechain = ({chainId, chainName}) => {
  const clickToSwitchMetamask = () => {
    switchMetamask(chainId)
      .then((res) => {
        console.log('Chain Changed Success', res)

        window.location.reload()
      })
      .catch((err) => {
        console.log('Chain Changed Failed', err)
      })
  }

  return (
    <div
      style={{
        padding: '25px 50px',
        textAlign: 'center',
        background: '#000000',
        borderRadius: '16px',
        border: '1px solid #ffffff',
      }}
    >
      <img src={AlertIcon} alt='alert' width='55.68px' height='52.35px' />
      <p className={style.switchblockchain}>
        Please switch your blockchain to {chainName}
      </p>
      <button
        className={style.btnwrongchain}
        onClick={() => clickToSwitchMetamask()}
      >
        Wrong blockchain connected
      </button>
    </div>
  )
}

export default SwitchToBinancechain
