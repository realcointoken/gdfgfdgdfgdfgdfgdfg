import React from 'react'
import moment from 'moment'
import {
  formatBlockchainAddress,
  formatNumber,
  separateThousands,
} from '../../../utils'
import style from './PoolAbout.module.scss'
import CopyToClipboard from '../../../components/CopyToClipboard'
import {getNameFromBlockchain} from '../../../store/constants/web3'
import {BigNumber} from 'bignumber.js'

export function getPoolInformation(data) {
  if (!data) {
    return []
  }

  return [
    {
      label: 'Token Distribution',
      value:
        moment.utc(data.launchDate).format('DD/MM/YYYY, h:mm A UTC') || 'N/A',
    },
    {
      label: 'Audit Status',
      value: `${data.auditStatus || 'N/A'}`,
    },
    {
      label: 'Total Sale Amount',
      value: `${formatNumber(data.totalSaleAmount || 'N/A', '$')}`,
    },
    {
      label: 'Available for Purchase',
      value: `${formatNumber(data.availableForPurchase || 'N/A')} ${
        data.symbol
      }`,
    },
    {
      label: 'Initial Market Cap',
      value: `$${separateThousands(
        new BigNumber(data.initialMarketCap).toFixed(),
        ',',
      )}`,
    },
    {
      label: 'KYC Required',
      value: `${data.kycRequired ? 'Yes' : 'No'}`,
    },
  ]
}

export function getTokenInformation(data) {
  return [
    {
      label: 'Name',
      value: data.name,
    },
    {
      label: 'Symbol',
      value: data.symbol,
    },
    {
      label: 'Address',
      value: data.tokenContract && checkAddressValue(data.tokenContract),
      button: data.tokenContract && data.tokenContract !== 'undefined' && (
        <CopyToClipboard
          text={data.tokenContract}
          tooltip={'Copy From Address to clipboard'}
          wrapperClass={style.copy}
        />
      ),
    },
    {
      label: 'Blockchain',
      value: getNameFromBlockchain(data.IDOContractNetwork),
    },
    {
      label: 'Initial Supply',
      value: formatNumber(Number(data.initialSupply)),
    },
    {
      label: 'Total Supply',
      value: formatNumber(Number(data.totalSupply)),
    },
  ]
}

export function checkAddressValue(address) {
  if (address && address !== 'undefined') {
    return formatBlockchainAddress(address, 4, 7)
  }
  return 'Not Provided Yet'
}
