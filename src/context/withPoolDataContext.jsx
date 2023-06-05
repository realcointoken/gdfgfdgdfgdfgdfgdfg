import React, {PureComponent} from 'react'
import {PoolDataContextType} from './context_types'
import {getCompletedPools, getUpcomingPools} from '../services'
import {BLOCKCHAIN_TYPES} from '../constants'

export default function withPoolDataContext(WrappedComponent) {
  return class extends PureComponent {
    getUpcomingPools = (blockchainType) => {
      this.setState({
        requestingUpcomingPools: true,
      })

      return getUpcomingPools(blockchainType)
        .then((data) =>
          this.setState({
            upcomingPools: data,
            requestingUpcomingPools: false,
          }),
        )
        .catch(() =>
          this.setState({
            requestingUpcomingPools: false,
          }),
        )
    }

    getCompletedPools = (blockchainType) => {
      this.setState({
        requestingCompletedPools: true,
      })

      return getCompletedPools(blockchainType)
        .then((data) =>
          this.setState({
            completedPools: data,
            requestingCompletedPools: false,
          }),
        )
        .catch(() =>
          this.setState({
            requestingCompletedPools: false,
          }),
        )
    }

    loadPools = (blockchainType) => {
      const type = blockchainType ? blockchainType : BLOCKCHAIN_TYPES.ETHEREUM

      return Promise.all([
        this.getUpcomingPools(type),
        this.getCompletedPools(type),
      ])
        .then(() => this.setState({loaded: true}))
        .catch(() => this.setState({loaded: true}))
    }

    state = {
      load: this.loadPools,
      loaded: false,

      upcomingPools: [],
      requestingUpcomingPools: true,
      getBUpcomingPools: this.getUpcomingPools,

      completedPools: [],
      requestingCompletedPools: true,
      getBCompletedPools: this.getCompletedPools,
    }

    render() {
      return (
        <PoolDataContextType.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </PoolDataContextType.Provider>
      )
    }
  }
}
