import React, {useEffect, useState, useRef} from 'react'
import style from './pools.module.scss'
import {Row, Col, ProgressBar} from 'react-bootstrap'
import ProgressDetail from '../ProgressDetail'
//import logo from '../../assets/svg/logo.png'
//import ProgressBar from '../ProgressBar'
import logo from './assets/Logo.svg'
import NoImage from './assets/noimage.svg'
import downArrow from './assets/downArrow.svg'
import axios from 'axios'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import {message} from 'antd'
import Parser from 'html-react-parser'

const PoolItem = (props) => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const [data, setData] = useState(props.item)
  const history = useHistory()
  const [errorType, setErrorType] = useState()
  const [errorCount, setErrorCount] = useState(0)
  const ref = useRef(null)
  const [alert, setAlert] = useState('')
  const loginState = useSelector((state) => state.login)

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
      console.log('width', ref.current?.offsetWidth)
    }

    window.addEventListener('resize', handleResize)
  }, [])

  const popular = false
  // useEffect(() => {
  //   axios
  //     .get(httpUrl + `/api/v1/Pool/GetPoolById?ProjectId=${props.id}`)
  //     .then((response) => {
  //       console.log('this is response')
  //       console.log(response)
  //       setData(response.data.data)
  //     })
  //     .catch((error) => {
  //       console.log('this is my error')
  //       console.log(error)
  //       if (errorCount < 4) {
  //         setErrorType(error)
  //         setErrorCount(errorCount + 1)
  //       }
  //     })
  // }, [errorType])

  useEffect(() => {
    console.log('width', ref.current.offsetWidth)
  }, [])

  const checkingLoginState = (e) => {
    if (window.ethereum) {
      if (
        Object.keys(loginState?.authResponse).length == 0 &&
        loginState?.authResponse?.data?.token == undefined
      ) {
        localStorage.setItem('homeProductId', JSON.stringify(props.item.id))
        history.push('/login')
      } else {
        localStorage.removeItem('homeProductId')

        history.push(`/pooldetail/${props.item.id}`)
      }
    } else {
      const thisIsMyCopy = message.error(
        Parser(`<span>Please install and setup MetaMask Extension 
        <a style="color:#0867C6;text-decoration:none" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" 
        target="_blank"> From This Link <a> to use Application.</span>`),
      )
    }
  }

  return (
    <div className={style.main} onClick={() => checkingLoginState()}>
      {popular && (
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            right: '20px',
            background: '#0F2C4B',
            borderRadius: ' 4px',
            padding: '8px 22px',
          }}
        >
          <p className={style.popular} style={{padding: '0px', margin: '0px'}}>
            MOST POPULAR
          </p>
        </div>
      )}

      <Row className='d-flex align-items-center  '>
        <Col xs={5} className='d-flex flex-row'>
          <img
            //src={logo}
            src={data?.image ? `${httpUrl}/${data?.image}` : NoImage}
            alt='icon'
            style={{
              width: '42px',
              height: '42px',
            }}
          />
          <div className='d-flex flex-column mx-3' style={{width: '100%'}}>
            <p className={style.project_name}>
              {data?.projectName}
              {/* {data?.projectName.length > 10
                ? data?.projectName.substring(10) + '...'
                : data?.projectName} */}
            </p>
            <p className={style.currency}>{data?.title}</p>
          </div>
        </Col>
        <Col xs={7}>
          <p className={style.stacking_time}>
            End Date: {data?.endDate?.split('T')[0]}
          </p>
        </Col>
      </Row>
      <div
        style={{
          height: '1px',
          backgroundColor: '#FFFFFF22',
          marginBottom: '32px',
          marginTop: '10px',
        }}
      />

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span className={style.price_title}>Price</span>
          <span className={style.price_value}>${data?.tokenRate}</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span className={style.price_title}>Staked</span>
          <span className={style.price_value}>
            {data?.remainingSupplyAmount}
          </span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span className={style.price_title}>Tokens Available</span>
          <span className={style.price_value}>{data?.supplyAmount}</span>
        </div>
      </div>

      <div style={{margin: '20px 0px 0px 0px'}} ref={ref}>
        <div
          style={{
            // display: 'inline-block',
            textAlign: 'center',
            padding: '0px',
            // width: ref.current?.offsetWidth - 17,
          }}
        >
          <div
            className='row justify-content-between flex-row  ms-0'
            style={{marginBottom: -39, marginRight: -8}}
          >
            <div className='col-1'>
              <p style={{fontSize: '14px'}}>Min</p>
              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  bottom: '25px',
                }}
              >
                <img src={downArrow} alt='down' />
              </span>
            </div>

            <div className='col-1 me-lg-3 me-2'>
              <p style={{fontSize: '14px'}}>Max</p>
              <span
                style={{
                  display: 'block',
                  position: 'relative',
                  bottom: '25px',
                }}
              >
                <img src={downArrow} alt='down' />
              </span>
            </div>
          </div>
        </div>
        <div style={{marginTop: '16px'}}>
          <ProgressBar
            now={100 - (data?.remainingSupplyAmount / data?.supplyAmount) * 100}
            style={{
              borderRadius: '30px',
              marginLeft: '2%',
              marginRight: '2%',
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default PoolItem
