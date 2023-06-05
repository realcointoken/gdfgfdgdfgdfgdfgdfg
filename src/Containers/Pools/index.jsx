import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {get, chain} from 'lodash'

import PoolNav from './PoolNav'
import {PoolDataContextType} from '../../context/context_types'
import style from './Pools.module.scss'
import PoolsList from './PoolsList'
import {PAGE_OVERVIEW_PATH} from '../../router/constants'
import {BLOCKCHAIN_TYPES_LIST} from '../../constants'
import {getQueryParam} from '../../utils'

export default function Pools(props) {
  const {load, loaded} = useContext(PoolDataContextType)
  const history = useHistory()
  const blockchain = getQueryParam('blockchain')

  const [blockchainType, setBlockchainType] = useState(
    blockchain === 'ethereum' || blockchain === 'bsc'
      ? chain(BLOCKCHAIN_TYPES_LIST).find({slug: blockchain}).value()
      : BLOCKCHAIN_TYPES_LIST[0],
  )
  const [poolData, setPoolData] = useState({})

  const {isRequesting, onChange} = props

  const upComing = get(props, 'upComingPools', [])
  const live = get(props, 'livePools', [])
  const completed = get(props, 'completedPools', [])
  const upComingPools = get(poolData, 'upComing')
  const livePools = get(poolData, 'live')
  const completedPools = get(poolData, 'completed')

  useEffect(() => {
    load(blockchainType.slug)
    setPoolData({upComing, live, completed})
    // eslint-disable-next-line
  }, [load, loaded, blockchainType, upComing, live, completed])

  const onItemClick = (item) => {
    history.push(`${PAGE_OVERVIEW_PATH}/${item.id}`)
  }

  const handleOnChange = (item) => {
    onChange(item.slug)
    setBlockchainType(item)
  }

  return (
    <div className={style.container}>
      <PoolNav
        items={BLOCKCHAIN_TYPES_LIST}
        selectedItem={blockchainType && blockchainType.name}
        onChange={handleOnChange}
      />
      <PoolsList
        wrapperClass={style.pool}
        title={'Upcoming Pools'}
        items={upComingPools}
        blockchainType={blockchainType}
        loading={isRequesting}
        onItemClick={onItemClick}
        isUpcoming
      />
      <PoolsList
        wrapperClass={style.pool}
        title={'Live Pools'}
        items={livePools}
        blockchainType={blockchainType}
        loading={isRequesting}
        onItemClick={onItemClick}
        isLive
      />
      <PoolsList
        wrapperClass={style.pool}
        title={'Completed Pools'}
        items={completedPools}
        blockchainType={blockchainType}
        loading={isRequesting}
        onItemClick={onItemClick}
      />
    </div>
  )
}
