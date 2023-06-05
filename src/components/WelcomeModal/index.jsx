import React from 'react'
import Modal from '../Modal'

export default function WelcomeModal(props) {
  const {wrapperClass, onCancel, ...restProps} = props

  return (
    <Modal
      centered
      wrapperClass={wrapperClass}
      title={'Disclaimer'}
      width={500}
      onCancel={onCancel}
      {...restProps}
      bodyStyle={{color: 'white', fontSize: '16px'}}
    >
      In the near future{' '}
      <a href='#' style={{color: '#8585ff'}} target='_blank' rel='noreferrer'>
        LavaX.Finance
      </a>{' '}
      will be rebranding with the upcoming version 1 roll out. It is important
      to state that{' '}
      <a href='#' style={{color: '#8585ff'}} target='_blank' rel='noreferrer'>
        LavaX.finance
      </a>{' '}
      has no affiliation with{' '}
      <a href='#' style={{color: '#8585ff'}} target='_blank' rel='noreferrer'>
      LavaX.org
      </a>
      . Please stay tuned to our socials to stay up to date with the latest
      changes as it pertains to the v1 roll out.
    </Modal>
  )
}
