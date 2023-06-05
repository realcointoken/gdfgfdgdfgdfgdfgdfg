import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import Modal from '../../Modal'
import ProviderList from './ProviderList'
import {PROVIDER_ITEMS} from './constants'
import {LOADING_STATUSES} from '../../../constants'
import Button from '../../Button'
import style from './ConnectToWalletModal.module.scss'
import {connectMetaMask} from '../../../store/actions/user'
import {useHistory} from 'react-router-dom'
import {loginToken} from '../../../store/api/http'

export default function ConnectToWalletModal(props) {
  const {wrapperClass, onCancel, ...restProps} = props
  const [selectedItem, setSelectedItem] = useState(null)
  const [loadingStatus, setLoadingStatus] = useState(null)
  const dispatch = useDispatch()
  const dispatchConnect = () => dispatch(connectMetaMask())
  const history = useHistory()

  const onSelect = (item) => {
    setSelectedItem(item)
    if (item.connector === 'metamask') {
      setLoadingStatus(LOADING_STATUSES.LOADING)
      dispatch(connectMetaMask()).then((res) => {
        if (res) {
          setLoadingStatus(LOADING_STATUSES.LOADED)
          onCancel()
          setSelectedItem(null)
          history.push('/login')
        } else {
          setLoadingStatus(LOADING_STATUSES.ERROR)
        }
      })
    } else {
      setLoadingStatus(LOADING_STATUSES.ERROR)
    }
  }

  useEffect(() => {
    if (!selectedItem) {
      setLoadingStatus(null)
    }
  }, [selectedItem])

  return (
    <Modal
      wrapperClass={wrapperClass}
      title={renderTitle(selectedItem, setSelectedItem)}
      width={390}
      onCancel={onCancel}
      {...restProps}
    >
      <ProviderList
        items={PROVIDER_ITEMS}
        selectedItem={selectedItem}
        onSelect={onSelect}
        onRepeat={onSelect}
        requesting={loadingStatus === LOADING_STATUSES.LOADING}
        error={loadingStatus === LOADING_STATUSES.ERROR}
      />
    </Modal>
  )
}

function renderTitle(selectedItem, setSelectedItem) {
  if (selectedItem) {
    return (
      <Button
        wrapperClass={style.back}
        onClick={() => setSelectedItem(null)}
        text={'Back'}
      />
    )
  }
  return 'Connect to a Wallet'
}
