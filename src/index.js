import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {withAppContext, withPoolDataContext} from './context'
import TagManager from 'react-gtm-module'
import 'antd/dist/antd.compact.min.css'
import './styles/index.scss'
import App from './App'
import createStore from './configureStore'
import {ToastsProvider} from './context/ToastsContext'
import {PersistGate} from 'redux-persist/integration/react'

const {store, persistor} = createStore()

// TODO: refactor
const AppWithContext = withAppContext(withPoolDataContext(App))

const tagManagerArgs = {
  gtmId: 'GTM-T5JPMK9',
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(
  <ToastsProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <AppWithContext />
        </Router>
      </PersistGate>
    </Provider>
  </ToastsProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
