import React, {useEffect, useState} from 'react'
import {useTable} from 'react-table'
import {Table, Menu, Dropdown, Select, Progress, message} from 'antd'
import style from './SwapHistory.module.scss'
import axios from 'axios'
import {Modal, Button} from 'antd'
import {FORM_FIELD_TYPES} from '../../components/Form/constants'
import Form from 'rc-field-form/es/Form'
import {Field} from 'rc-field-form'
import {height} from 'dom-helpers'
import {useDispatch, useSelector} from 'react-redux'
import {Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'
import {useHistory} from 'react-router'
import localforage from 'localforage'
import {current} from '../../store/actions/current'

const LiquidityHistory = () => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const [fractalData, setFractalData] = useState()
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  React.useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
  }, [])

  // var d = data
  // if (filter != 'all') d = data.filter((data) => data.name === filter)

  // useEffect(() => {
  //   setTimeout(() => {
  //     axios
  //       .get(httpUrl + '/api/v1/WhiteLabelAddress/GetWhiteLabelAddress')
  //       .then((response) => {
  //         const rows = response.data.data

  //         setData(rows.reverse())

  //         setFilterData(response?.data?.data)
  //       })
  //       .catch((error) => {
  //         setData([])
  //         console.log(error)
  //       })
  //   }, 2000)
  // }, [apiResponse, filter])

  return (
    <div
      className={`${style.main} mt-4`}
      style={{overflowX: dimensions.width >= 768 ? 'auto' : 'scroll'}}
    >
      <div style={{textAlign: 'center'}}>
        <h1>Liquidity History</h1>
      </div>

      <table className={style.table_layout}>
        <thead>
          <tr>
            <th>Date</th>
            <th>From Amount</th>
            <th>To Amount</th>
            <th>From Currency</th>
            <th>To Currency</th>
            <th>Gas Fee</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((data) => {
            return (
              <tr
                style={{
                  borderBottom: 'solid 1px #AAAAAA',
                }}
              >
                <td
                  style={{paddingRight: '10px'}}
                  // onClick={() => {
                  //   claim(data.uuid)
                  // }}
                >
                  <button>Claim</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LiquidityHistory
