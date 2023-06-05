import React, {useState} from 'react'
import style from './pools.module.scss'
import {Row, Col, ProgressBar} from 'react-bootstrap'
import ProgressDetail from '../ProgressDetail'
import logo from '../../assets/svg/logo.png'
//import ProgressBar from '../ProgressBar'
import downArrow from './assets/downArrow.svg'
import PoolItem from './PoolItem'
import axios from 'axios'

const StackPools = () => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const poolsType = ['Active Pools', 'Upcoming', 'Fininshed', 'Postponed']
  const [data, setData] = useState([])

  useState(() => {
    setTimeout(() => {
      axios
        .get(httpUrl + '/api/v1/Pool/GetAllPools')
        .then((response) => {
          console.log('this  is pools data')

          const rows = response.data.data
          rows.sort(function (a, b) {
            return b.id - a.id
          })
          setData(rows)
        })
        .catch((error) => {
          console.log('this  is error data')
          console.log(error)
        })
    }, 2000)
  }, [data.length === 0])

  return (
    <>
      <p className={style.heading}> Pools</p>
      <Row style={{marginBottom: '40px'}}>
        {data?.map((item) => {
          return (
            item.adminStatus === 'Verified' && (
              <Col sm={12} md={6} lg={4}>
                <PoolItem item={item} />
              </Col>
            )
          )
        })}
      </Row>
    </>
  )
}

export default StackPools
