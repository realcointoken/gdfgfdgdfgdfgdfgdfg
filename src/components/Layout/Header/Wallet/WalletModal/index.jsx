import React, {useEffect, useRef} from 'react'
import ModalWithoutHeader from '../../../../ModalWithoutHeader'
import jazzicon from 'jazzicon'
import Button from '../../../../Button'
import checkIcon from './check.svg'
import {formatBlockchainAddress} from '../../../../../utils'
import CopyToClipboard from '../../../../CopyToClipboard'
import view from './view.svg'
import copy from './copy.svg'
import rise from './rise-arrow.png'

import style from './WalletModal.module.scss'
import {
  getNameFromChainId,
  viewTokenAddressUrl,
  viewTXUrl,
} from '../../../../../store/constants/web3'

export default function WalletModal(props) {
  const {
    providerType,
    chainId,
    address,
    transactionList,
    onClearTransactions,
    onChange,
    requestingClearTransactions,
    visible,
    logout,
    ...restProps
  } = props

  const iconContainerRef = useRef(null)
  useEffect(() => {
    if (iconContainerRef && iconContainerRef.current && visible) {
      const intIcon = address.replace('0x', '').slice(0, 8)
      const icon = jazzicon(18, parseInt(intIcon, 16))

      iconContainerRef.current.innerHTML = ''
      iconContainerRef.current.appendChild(icon)
    }
  }, [iconContainerRef, address, chainId, visible])

  return (
    <ModalWithoutHeader
      {...restProps}
      visible={visible}
      childrenClass={style.wrapper}
      title='Profile'
    >
      <div className={style.data}>
        <div className={style.label}>
          Connected with {providerType}
          {false && (
            <Button
              wrapperClass={style.dataButton}
              text={'Change'}
              small
              outline
              gray
            />
          )}
        </div>
        <div className={style.address}>
          <div ref={iconContainerRef} className={style.icon} />
          {formatBlockchainAddress(address, 12, 4)}
        </div>
        <div className={style.dataActions}>
          <CopyToClipboard
            buttonClass={style.dataAction}
            buttonText={'Copy Address'}
            icon={copy}
            text={address}
          />
          <Button
            wrapperClass={style.dataAction}
            text={`View on ${getNameFromChainId(chainId)}`}
            icon={view}
            gray
            iconAlignStart
            // TODO: Insert correct Etherscan link
            onClick={() =>
              window.open(viewTokenAddressUrl(chainId, address), '_blank')
            }
          />
        </div>
      </div>
      {transactionList && transactionList.length > 0 && (
        <div className={style.transaction}>
          <h4 className={style.transactionHead}>
            Recent Transaction
            <Button
              wrapperClass={style.clearButton}
              text={'Clear All'}
              onClick={onClearTransactions}
              gray
              loading={requestingClearTransactions}
            />
          </h4>
          <ul className={style.transactionList}>
            {transactionList.map((item, i) => (
              <li
                className={style.transactionItem}
                key={i}
                onClick={() =>
                  window.open(
                    viewTXUrl(item.chainId, item.transactionHash),
                    '_blank',
                  )
                }
              >
                <p>
                  {item.display} <img src={rise} alt='' />
                </p>{' '}
                <img src={checkIcon} alt='' className={style.checkIcon} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={style.walletFooter}>
        <Button
          wrapperClass={style.dataButton}
          text={'Logout'}
          small
          outline
          gray
          onClick={logout}
        />
      </div>
    </ModalWithoutHeader>
  )
}
