import React, {PureComponent} from 'react'
import {UserContextType} from './context_types'
import {connect} from '../services'

export default function withUserContext(WrappedComponent) {
  return class extends PureComponent {
    connect = () => {
      this.setState({
        requestingConnection: true,
      })

      return connect()
        .then((data) =>
          this.setState({
            requestingConnection: false,
            isConnected: true,
            balance: data.balance,
            address: data.address,
            symbol: data.symbol,
          }),
        )
        .catch((e) => {
          this.setState({requestingConnection: false})

          return Promise.reject(e)
        })
    }

    disconnect = () => {
      this.setState({
        isConnected: false,
        balance: 0,
        address: '',
        symbol: '',
      })
    }

    state = {
      isConnected: false,
      requestingConnection: false,
      balance: 0,
      address: null,
      connect: this.connect,
      symbol: '',
      disconnect: this.disconnect,
    }

    render() {
      return (
        <UserContextType.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </UserContextType.Provider>
      )
    }
  }
}
