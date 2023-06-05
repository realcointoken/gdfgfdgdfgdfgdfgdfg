import React, {useState, useEffect} from 'react'
import style from './StakingPage.module.scss'
import logo1 from '../../assets/img/staking_page/logo-1.png'

import Stroke from '../../assets/img/staking_page/Stroke 1.png'
import Polygon from '../../assets/img/staking_page/Polygon 1.png'
import search from '../../assets/img/staking_page/Ellipse_739.png'
import Line from '../../assets/img/staking_page/Line_181.png'
import whiteDot from '../../assets/img/staking_page/whiteDot.png'
import redDot from '../../assets/img/staking_page/redDot.png'
import yellowDot from '../../assets/img/staking_page/yellowDot.png'
import blueDot from '../../assets/img/staking_page/blueDot.png'
import downArrow from '../../assets/img/staking_page/select_arrow.png'
import {Row, Col, ProgressBar} from 'react-bootstrap'
import cn from 'classnames'
import './design.css'
import axios from 'axios'
const TableRow = (props) => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const [data, setData] = useState()

  useEffect(() => {
    if (props.data) {
      setData(props.data)
    } else {
      axios
        .get(httpUrl + `/api/v1/Pool/GetPoolById?ProjectId=${props.id}`)
        .then((response) => {
          console.log('this is table data')
          console.log(response)
          props.addRow(response.data.data)
          setData(response.data.data)
        })
        .catch((error) => {
          console.log('this is error')
          console.log(error)
        })
    }
  }, [])

  return (
    <tr style={{color: '#FFFFFF'}}>
      <td className='d-flex' style={{paddingRight: '15px'}}>
        <img
          src={logo1}
          width='42px'
          height='42px'
          style={{marginRight: '8px'}}
        />
        <div className='d-flex flex-column '>
          <span className={style.project_name}>{data?.projectName}</span>
          <span className={style.project_token_name}>{data?.title}</span>
        </div>
      </td>
      <td className={'cell' + ' ' + style.price_stakes_tokensavaliable}>
        <span>$0,10</span>
      </td>
      <td className={'cell' + ' ' + style.price_stakes_tokensavaliable}>
        <span>
          {data?.supplyAmount === 0 ? '' : '$'}
          {data?.supplyAmount}
        </span>
      </td>
      <td style={{minWidth: '150px'}} className='cell'>
        <div>
          <ProgressBar now={60} style={{borderRadius: '30px'}} />
        </div>
      </td>

      <td className='cell'>
        <div
          style={{
            border: '1px solid #FFFFFF33',
            display: 'inline-block',
            borderRadius: '32px',
            padding: '2px 8px',
          }}
        >
          <div className={style.status_wrap}>
            <img style={{paddingRight: '8px'}} src={blueDot} />
            <span className={style.timevalue}>Launched</span>
          </div>
        </div>
      </td>
      <td className={'cell' + ' ' + style.price_stakes_tokensavaliable}>
        2,000,000
      </td>
    </tr>
  )
}

export default TableRow
