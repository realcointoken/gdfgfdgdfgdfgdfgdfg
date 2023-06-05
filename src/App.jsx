import React, {useEffect, useState} from 'react'
import Layout from './components/Layout'
import Router from './router'
import {useDispatch, useSelector} from 'react-redux'
import {blockchain} from './store/actions/allBlockchain'
import {current} from './store/actions/current'
import {useHistory} from 'react-router-dom'

function App() {
  const dispatch = useDispatch()
  const [currentLogin, setCurrentLogin] = useState('')
  const history = useHistory()

  useEffect(() => {
    dispatch(blockchain())

    setTimeout(() => {
      dispatch(current())
        .then((res) => {
          if (!res.data?.email) {
            history.push('/login')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }, 2000)
  }, [])

  return (
    <>
      <Layout>
        <Router />
      </Layout>
    </>
  )
}

export default App
