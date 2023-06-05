import React, {useState, useRef, useEffect} from 'react'
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
import TableRow from './TableRow'
import {useHistory} from 'react-router'
import NoImage from './assets/noimage.svg'
import localforage from 'localforage'
import {useDispatch, useSelector} from 'react-redux'
import {current} from '../../store/actions/current'
import {logoutClear} from '../../store/actions/logout'
import {loginRequestClear} from '../../store/actions/login'

export default function StakingPage(props) {
  const history = useHistory()
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
  const [rows, setRows] = useState([])
  const [data, setData] = useState([])
  const [searchedRows, setSearchedRows] = useState([])
  const [userLogin, setUserLogin] = useState()
  const [isBlocked, setIsBlocked] = useState(false)
  const userState = useSelector((state) => state.user)
  const loginState = useSelector((state) => state.login)

  const ref = useRef(null)
  const kycStatusData = useSelector((state) => state.current.response?.kycStatus)
  const dispatch = useDispatch()
  var totalaData
  const handleSearchChange = (e) => {
    const {value} = e.target

    const filterdData = data.filter((item) =>
      item.projectName.toLowerCase().includes(value.toLowerCase()),
    )
    setSearchedRows(filterdData)
  }

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })
  console.log(userState?.connectWallet?.isConnect,"gjyuuytu");
  React.useEffect(() => {
    var loginStatus = localStorage.getItem('isLogin')
    if (loginStatus) {
      setTimeout(() => {
        dispatch(current())
          .then((res) => {
            localStorage.setItem('isLogin', true)

            if (res?.data?.isBlocked) {
              setIsBlocked(true)
            }
          })
          .catch(() => {
            localStorage.removeItem('isLogin')
            dispatch(logoutClear())
            dispatch(loginRequestClear())

            setTimeout(() => {
              if (userState?.connectWallet?.isConnect) {
                // return history.push('/')
              }
            }, 500)
          })
      }, 2000)
    } else {
      localStorage.removeItem('isLogin')
      dispatch(logoutClear())
      dispatch(loginRequestClear())

      setTimeout(() => {
        if (userState?.connectWallet?.isConnect) {
          // return history.push('/')
        }
      }, 500)
    }

    if (
      kycStatusData == 'rejected' ||
      kycStatusData == 'pending' ||
      kycStatusData == 'submitted'
    ) {
      history.push('/kyc')
    }

    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
  }, [])

  // useEffect(() => {
  //   var loginStatus = localStorage.getItem('isLogin')
  //   if (userState?.connectWallet?.isConnect && !loginStatus) {
  //     return history.push('/login')
  //   }
  // }, [userState])

  // useEffect(() => {
  // setTimeout(() => {
  //   console.log('lllllllll', loginState)
  //   if (Object.keys(loginState?.authResponse).length == 0) {
  //     setTimeout(() => {
  //       history.push('/login')
  //     }, 1000)
  //   }
  // }, 10000)
  // }, [loginState])

  useState(() => {
    axios
      .get(httpUrl + '/api/v1/Pool/GetAllPools')
      .then((response) => {
        const rows = response.data.data
        rows.sort(function (a, b) {
          return b.id - a.id
        })
        setData(rows)
        setSearchedRows(rows);
        console.log(rows,'pppoooool;;;;;;')


      })
      .catch((error) => {
        console.log('this  is error data')
        console.log(error)
      })
  }, [])
  // useEffect(() => {
  //   setSearchedRows(searchedRows)
  // }, [searchedRows])

  const doFilterData = (value) => {
    if (value != 'All') {
      const row = data.filter((data) => data.poolStatus === value)

      setSearchedRows(row)
    } else {
      setSearchedRows(data)
    }
  }

  // const incaseOfXMLError = (id) => {
  //   axios
  //     .get(httpUrl + `/api/v1/Pool/GetPoolById?ProjectId=${id}`)
  //     .then((response) => {
  //       let resp = {...response.data.data, projectId: id}
  //       setRows((prev) => [...prev, resp])
  //       setSearchedRows((prev) => [...prev, resp])
  //     })
  //     .catch((error) => {
  //       console.log('this is my error')
  //       console.log(error)
  //     })
  // }

  return (
    <section
      style={{
        paddingTop: dimensions.width < 992 ? '100px' : '10px',
      }}
    >
    <>
      {!isBlocked ? (
        <div className={style.main}>
          <div class='row align-items-start'>
            <div className='col-lg-12 col-md-12 col-sm-12 '>
              <input
                className={style.input}
                type='text'
                placeholder='Search'
                onChange={handleSearchChange}
              />
              <img className={style.search_icon} src={search} />
              <img className={style.search_line} src={Line} />
            </div>
          </div>
          <div
            style={{
              overflowX: dimensions.width >= 768 ? 'auto' : 'scroll',
              padding: '20px',
            }}
          >
            <table style={{width: '100%'}}>
              <tr>
                <th style={{color: '#ffffff', fontWeight: 'bold'}}>
                  Pool name
                </th>
                <th style={{color: '#ffffff', fontWeight: 'bold'}}>
                  Price(USDT)
                </th>
                <th style={{color: '#ffffff', fontWeight: 'bold'}}>Staked</th>
                <th style={{color: '#ffffff', fontWeight: 'bold'}}>Progress</th>
                <th style={{color: '#ffffff', fontWeight: 'bold'}}>
                  <select
                    style={{width: '150px', backgroundColor: '#000000'}}
                    onChange={(e) => doFilterData(e.target.value)}
                  >
                    <option style={{backgroundColor: '#000000'}} hidden>
                      Status
                    </option>
                    <option style={{backgroundColor: '#000000'}} value='All'>
                      All
                    </option>
                    <option
                      style={{backgroundColor: '#000000'}}
                      value='ComingSoon'
                    >
                      Coming soon
                    </option>
                    <option style={{backgroundColor: '#000000'}} value='Live'>
                      Live
                    </option>
                    <option style={{backgroundColor: '#000000'}} value='Ended'>
                      Ended
                    </option>
                  </select>
                </th>
                <th
                  style={{width: '150px', color: '#ffffff', fontWeight: 'bold'}}
                >
                  Tokens Available
                </th>
              </tr>

              <tbody>
                {searchedRows?.map((data) => {
                  return (
                    // data.adminStatus === 'Verified' && (
                      <tr
                        style={{color: '#FFFFFF', cursor: 'pointer'}}
                        onClick={() => {
                          history.push(`/pooldetail/${data.id}`)
                        }}
                      >
                        <td className='d-flex' style={{paddingRight: '15px'}}>
                          <img
                            src={
                              data?.image
                                ? `${httpUrl}/${data?.image}`
                                : NoImage
                            }
                            alt='icon'
                            width='42px'
                            height='42px'
                            style={{marginRight: '8px'}}
                          />
                          <div
                            className='d-flex flex-column '
                            style={{width: '100%'}}
                          >
                            <span
                              className={style.project_name}
                              style={{
                                width: '80%',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {data?.projectName}
                            </span>
                            <span className={style.project_token_name}>
                              {data?.title}
                            </span>
                          </div>
                        </td>
                        <td
                          className={
                            'cell' + ' ' + style.price_stakes_tokensavaliable
                          }
                        >
                          <span>{data.tokenRate}</span>
                        </td>
                        <td
                          className={
                            'cell' + ' ' + style.price_stakes_tokensavaliable
                          }
                        >
                          <span> {data?.remainingSupplyAmount}</span>
                        </td>
                        <td
                          style={{minWidth: '150px', maxWidth: '200px'}}
                          className='cell'
                        >
                          <div
                            style={{position: 'relative', bottom: '10px'}}
                            ref={ref}
                          >
                            <div
                              style={{
                                display: 'inline-block',
                                textAlign: 'center',
                                padding: '0px',
                                width: ref.current?.offsetWidth,
                                position: 'relative',
                                bottom: '13px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  position: 'relative',
                                }}
                              >
                                <div
                                  style={{
                                    position: 'absolute',
                                    left: '-3%',
                                    bottom: '-47px',
                                  }}
                                >
                                  <p style={{fontSize: '10px'}}>Min</p>
                                  <span
                                    style={{
                                      display: 'block',
                                      position: 'relative',
                                      bottom: '25px',
                                    }}
                                  >
                                    <img
                                      src={downArrow}
                                      alt='down'
                                      width='10px'
                                      height='8px'
                                    />
                                  </span>
                                </div>

                                <div
                                  style={{
                                    position: 'absolute',
                                    left: '92%',
                                    bottom: '-47px',
                                  }}
                                >
                                  <p style={{fontSize: '10px'}}>Max</p>
                                  <span
                                    style={{
                                      display: 'block',
                                      position: 'relative',
                                      bottom: '25px',
                                    }}
                                  >
                                    <img
                                      src={downArrow}
                                      alt='down'
                                      width='10px'
                                      height='8px'
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <ProgressBar
                                now={
                                  100 -
                                  (data?.remainingSupplyAmount /
                                    data?.supplyAmount) *
                                    100
                                }
                                style={{borderRadius: '30px'}}
                              />
                            </div>
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
                              <img
                                style={{paddingRight: '8px'}}
                                src={blueDot}
                              />
                              <span className={style.timevalue}>
                                {data?.poolStatus === 'ComingSoon'
                                  ? 'Coming soon'
                                  : data?.poolStatus}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          className={
                            'cell' + ' ' + style.price_stakes_tokensavaliable
                          }
                        >
                          {data.supplyAmount}
                        </td>
                      </tr>
                    // )
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Row>
          <Col>
            <div
              style={{backgroundColor: '#050C1F'}}
              className='text-center p-5'
            >
              <h4>You are blocked, you cannot see IDO</h4>
            </div>
          </Col>
        </Row>
      )}
      </>
     </section>
  )
}

// import React, {useState, useRef} from 'react'
// import style from './StakingPage.module.scss'
// import logo1 from '../../assets/img/staking_page/logo-1.png'

// import Stroke from '../../assets/img/staking_page/Stroke 1.png'
// import Polygon from '../../assets/img/staking_page/Polygon 1.png'
// import search from '../../assets/img/staking_page/Ellipse_739.png'
// import Line from '../../assets/img/staking_page/Line_181.png'
// import whiteDot from '../../assets/img/staking_page/whiteDot.png'
// import redDot from '../../assets/img/staking_page/redDot.png'
// import yellowDot from '../../assets/img/staking_page/yellowDot.png'
// import blueDot from '../../assets/img/staking_page/blueDot.png'
// import downArrow from '../../assets/img/staking_page/select_arrow.png'
// import {Row, Col, ProgressBar} from 'react-bootstrap'
// import cn from 'classnames'
// import './design.css'
// import axios from 'axios'
// import TableRow from './TableRow'
// import {useHistory} from 'react-router'

// export default function StakingPage(props) {
//   const history = useHistory()
//   const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL
//   const [rows, setRows] = useState([])
//   const [searchedRows, setSearchedRows] = useState([])

//   const ref = useRef(null)

//   var totalaData
//   const handleSearchChange = (e) => {
//     const {value} = e.target
//     const filterdData = rows.filter((item) => item.projectName.includes(value))
//     setSearchedRows(filterdData)
//   }

//   const [dimensions, setDimensions] = React.useState({
//     height: window.innerHeight,
//     width: window.innerWidth,
//   })
//   React.useEffect(() => {
//     function handleResize() {
//       setDimensions({
//         height: window.innerHeight,
//         width: window.innerWidth,
//       })
//     }

//     window.addEventListener('resize', handleResize)
//   }, [])

//   useState(() => {
//     axios
//       .get(httpUrl + '/api/v1/Pool/GetAllPools')
//       .then((response) => {
//         const rows = response.data.data
//         rows.map((item) => {
//           axios
//             .get(
//               httpUrl + `/api/v1/Pool/GetPoolById?ProjectId=${item.projectId}`,
//             )
//             .then((response) => {
//               console.log(response.data.data)
//               let resp = {...response.data.data, projectId: item.projectId}
//               setRows((prev) => [...prev, resp])
//               setSearchedRows((prev) => [...prev, resp])
//             })
//             .catch((error) => {
//               incaseOfXMLError(item.projectId)
//               console.log('this is error')
//               console.log(error)
//             })
//         })
//       })
//       .catch((error) => {
//         console.log('this  is error data')
//         console.log(error)
//       })
//   }, [])

//   const incaseOfXMLError = (id) => {
//     axios
//       .get(httpUrl + `/api/v1/Pool/GetPoolById?ProjectId=${id}`)
//       .then((response) => {
//         let resp = {...response.data.data, projectId: id}
//         setRows((prev) => [...prev, resp])
//         setSearchedRows((prev) => [...prev, resp])
//       })
//       .catch((error) => {
//         console.log('this is my error')
//         console.log(error)
//       })
//   }

//   return (
//     <section
//       style={{
//         paddingTop: dimensions.width < 992 ? '100px' : '0px',
//       }}
//     >
//       <h1 style={{marginLeft: '12px'}}>Pools</h1>
//       <div className={style.main}>
//         <div class='row align-items-start'>
//           <div className='col-lg-9 col-md-8 col-sm-12 '>
//             <input
//               className={style.input}
//               type='text'
//               placeholder='Search'
//               onChange={handleSearchChange}
//             />
//             <img className={style.search_icon} src={search} />
//             <img className={style.search_line} src={Line} />
//           </div>
//           <div className='col-lg-3 col-md-4 col-sm-12'>
//             <div className={style.tvlBox}>
//               <p className='mt-3'>TVL: </p>
//               <p className='mt-3'>$456169</p>
//             </div>
//           </div>
//         </div>
//         <div
//           style={{
//             overflowX: dimensions.width >= 768 ? 'auto' : 'scroll',
//             padding: '20px',
//           }}
//         >
//           <table style={{width: '100%'}}>
//             <tr>
//               <th>Pool name</th>
//               <th>Price(USDT)</th>
//               <th>Staked</th>
//               <th>Progress</th>
//               <th>
//                 <select style={{width: '150px'}}>
//                   <option hidden>Status</option>
//                   <option value='1'>Coming Soon</option>
//                   <option value='2'>Whitelisting</option>
//                   <option value='3'>IDO</option>
//                   <option value='4'>Launched</option>
//                 </select>
//               </th>
//               <th style={{width: '150px'}}>Tokens Available</th>
//             </tr>

//             <tbody>
//               {/* {data.length > 0 && rows.length === data.length
//                 ? rows?.map((item, index) => <TableRow data={item} />)
//                 : data?.map((item) => (
//                     <TableRow id={item.projectId} addRow={appenRow} />
//                   ))} */}
//               {searchedRows?.map((data) => (
//                 <tr
//                   style={{color: '#FFFFFF', cursor: 'pointer'}}
//                   onClick={() => {
//                     history.push(`/pooldetail/${data.projectId}`)
//                   }}
//                 >
//                   <td className='d-flex' style={{paddingRight: '15px'}}>
//                     <img
//                       src={`http://198.187.28.244:7410/${data?.image}`}
//                       alt='icon'
//                       width='42px'
//                       height='42px'
//                       style={{marginRight: '8px'}}
//                     />
//                     <div
//                       className='d-flex flex-column '
//                       style={{width: '100%'}}
//                     >
//                       <span
//                         className={style.project_name}
//                         style={{
//                           width: '80%',
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}
//                       >
//                         {data?.projectName}
//                       </span>
//                       <span className={style.project_token_name}>
//                         {data?.title}
//                       </span>
//                     </div>
//                   </td>
//                   <td
//                     className={
//                       'cell' + ' ' + style.price_stakes_tokensavaliable
//                     }
//                   >
//                     <span>$0,10</span>
//                   </td>
//                   <td
//                     className={
//                       'cell' + ' ' + style.price_stakes_tokensavaliable
//                     }
//                   >
//                     <span>
//                       {data?.supplyAmount === 0 ? '' : '$'}
//                       {data?.supplyAmount}
//                     </span>
//                   </td>
//                   <td style={{minWidth: '150px'}} className='cell'>
//                     <div
//                       style={{position: 'relative', bottom: '10px'}}
//                       ref={ref}
//                     >
//                       <div
//                         style={{
//                           display: 'inline-block',
//                           textAlign: 'center',
//                           padding: '0px',
//                           width: ref.current?.offsetWidth,
//                           position: 'relative',
//                           bottom: '13px',
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: 'flex',
//                             flexDirection: 'row',
//                             position: 'relative',
//                           }}
//                         >
//                           <div
//                             style={{
//                               position: 'absolute',
//                               left: '-3%',
//                               bottom: '-47px',
//                             }}
//                           >
//                             <p style={{fontSize: '10px'}}>Min</p>
//                             <span
//                               style={{
//                                 display: 'block',
//                                 position: 'relative',
//                                 bottom: '25px',
//                               }}
//                             >
//                               <img
//                                 src={downArrow}
//                                 alt='down'
//                                 width='10px'
//                                 height='8px'
//                               />
//                             </span>
//                           </div>

//                           <div
//                             style={{
//                               position: 'absolute',
//                               left: '93%',
//                               bottom: '-47px',
//                             }}
//                           >
//                             <p style={{fontSize: '10px'}}>Max</p>
//                             <span
//                               style={{
//                                 display: 'block',
//                                 position: 'relative',
//                                 bottom: '25px',
//                               }}
//                             >
//                               <img
//                                 src={downArrow}
//                                 alt='down'
//                                 width='10px'
//                                 height='8px'
//                               />
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       <div>
//                         <ProgressBar now={60} style={{borderRadius: '30px'}} />
//                       </div>
//                     </div>
//                   </td>

//                   <td className='cell'>
//                     <div
//                       style={{
//                         border: '1px solid #FFFFFF33',
//                         display: 'inline-block',
//                         borderRadius: '32px',
//                         padding: '2px 8px',
//                       }}
//                     >
//                       <div className={style.status_wrap}>
//                         <img style={{paddingRight: '8px'}} src={blueDot} />
//                         <span className={style.timevalue}>Launched</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td
//                     className={
//                       'cell' + ' ' + style.price_stakes_tokensavaliable
//                     }
//                   >
//                     2,000,000
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   )
// }

// import React from 'react'
// import style from './StakingPage.module.scss'
// import logo1 from '../../assets/img/staking_page/logo-1.png'
// import logo2 from '../../assets/img/staking_page/logo-2.png'
// import logo3 from '../../assets/img/staking_page/logo-3.png'
// import logo4 from '../../assets/img/staking_page/logo-4.png'
// import logo5 from '../../assets/img/staking_page/logo-5.png'
// import logo6 from '../../assets/img/staking_page/logo-6.png'
// import Stroke from '../../assets/img/staking_page/Stroke 1.png'
// import Polygon from '../../assets/img/staking_page/Polygon 1.png'
// import search from '../../assets/img/staking_page/Ellipse_739.png'
// import Line from '../../assets/img/staking_page/Line_181.png'
// import whiteDot from '../../assets/img/staking_page/whiteDot.png'
// import redDot from '../../assets/img/staking_page/redDot.png'
// import yellowDot from '../../assets/img/staking_page/yellowDot.png'
// import blueDot from '../../assets/img/staking_page/blueDot.png'
// import downArrow from '../../assets/img/staking_page/select_arrow.png'

// export default function StakingPage(props) {
//   return (
//     <section>
//       <h1 className='pl-5'>Pools</h1>
//       <div className={style.main}>
//         <div class='row align-items-start mb-3'>
//           <div className='col-lg-9 col-md-8 col-sm-12 pb-sm-3'>
//             <input className={style.input} type='text' placeholder='Search' />
//             <img className={style.search_icon} src={search} />
//             <img className={style.search_line} src={Line} />
//           </div>
//           <div className='col-lg-3 col-md-4 col-sm-12'>
//             <div className={style.tvlBox}>
//               <p className='mt-3'>TVL: </p>
//               <p className='mt-3'>$456169</p>
//             </div>
//           </div>
//         </div>

//         <table class='table'>
//           <tr>
//             <th className='col'>Pool name</th>
//             <th className='col'>Price(USDT)</th>
//             <th className='col'>Staked</th>
//             <th className='col-2' style={{position: 'relative', left: '-30px'}}>
//               Progress
//             </th>
//             <th className='col-2 ' style={{width: '15%'}}>
//               <select
//                 style={{
//                   color: 'rgba(255, 255, 255, 0.46)',
//                   marginLeft: '30px',
//                   width: '126px',
//                 }}
//               >
//                 <option hidden>Status</option>
//                 <option value='1'>Coming Soon</option>
//                 <option value='2'>Whitelisting</option>
//                 <option value='3'>IDO</option>
//                 <option value='4'>Launched</option>
//               </select>
//             </th>
//             <th className='col' style={{position: 'relative', left: '40px'}}>
//               Tokens Available
//             </th>
//           </tr>

//           <tbody>
//             <tr style={{padding: '10px'}}>
//               <td>
//                 <div style={{margin: 'none'}} className='d-flex w-50 '>
//                   <img style={{padding: '20px 20px 20px 0px'}} src={logo1} />
//                   <div className='d-flex flex-column justify-content-center mt-2'>
//                     <td className={style.table_data}>PROJECT X</td>
//                     <span className={style.table_data_span}>Pancake(AUTO)</span>
//                   </div>
//                 </div>
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_price}>
//                 $0,10
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_staked}>
//                 $20,000
//               </td>
//               <td className={style.progress_bar}>
//                 <div>
//                   <span className={style.min}>Min</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '14%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <span className={style.max}>Max</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '89%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />

//                   <progress max='90' value='75'></progress>
//                 </div>
//               </td>
//               <td className={style.status}>
//                 <div className={style.status_wrap}>
//                   <span style={{color: '#f97474'}}>Staking</span>
//                   <img
//                     style={{paddingRight: '8px', paddingLeft: '8px'}}
//                     src={redDot}
//                   />
//                   <span style={{color: '#f97474'}}>46:15:30 left</span>
//                 </div>
//               </td>

//               <td style={{paddingTop: '35px'}} className={style.table_token}>
//                 5,000,000
//               </td>
//             </tr>

//             <tr style={{padding: '10px'}}>
//               <td style={{width: '25%'}}>
//                 <div className='d-flex w-50 '>
//                   <img style={{padding: '20px 20px 20px 0px'}} src={logo2} />
//                   <div className='d-flex flex-column justify-content-center mt-2'>
//                     <td className={style.table_data}>PROJECT A</td>
//                     <span className={style.table_data_span}>Pancake(AUTO)</span>
//                   </div>
//                 </div>
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_price}>
//                 $0,12
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_staked}>
//                 0
//               </td>
//               <td className={style.progress_bar}>
//                 <progress max='100' value=''></progress>
//               </td>
//               <td className={style.status}>
//                 <div className={style.status_wrap}>
//                   <img style={{paddingRight: '8px'}} src={yellowDot} />
//                   <span style={{color: '#FAE958'}}>Coming Soon</span>
//                 </div>
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_token}>
//                 2,000,000
//               </td>
//             </tr>
//             <tr style={{padding: '10px'}}>
//               <td style={{width: '25%'}}>
//                 <div className='d-flex w-50 '>
//                   <img style={{padding: '25px 20px 25px 0px'}} src={logo3} />
//                   <div className='d-flex flex-column justify-content-center mt-2'>
//                     <td className={style.table_data}>PROJECT B</td>
//                     <span className={style.table_data_span}>Pancake(AUTO)</span>
//                   </div>
//                 </div>
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_price}>
//                 $0,3
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_staked}>
//                 N/A
//               </td>
//               <td className={style.progress_bar}>
//                 <div>
//                   <span className={style.min}>Min</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '14%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <span className={style.max}>Max</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '89%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />

//                   <progress max='100' value='90'></progress>
//                 </div>
//               </td>
//               <td className={style.status}>
//                 <div className={style.status_wrap}>
//                   <img style={{paddingRight: '8px'}} src={yellowDot} />
//                   <span style={{color: '#FAE958'}}>Lottery</span>
//                 </div>
//               </td>

//               <td style={{paddingTop: '35px'}} className={style.table_token}>
//                 5,000,000
//               </td>
//             </tr>
//             <tr style={{padding: '10px'}}>
//               <td style={{width: '25%'}}>
//                 <div className='d-flex w-50 '>
//                   <img style={{padding: '25px 25px 25px 0px'}} src={logo4} />
//                   <div className='d-flex flex-column justify-content-center mt-2'>
//                     <td className={style.table_data}>PROJECT C</td>
//                     <span className={style.table_data_span}>Pancake(AUTO)</span>
//                   </div>
//                 </div>
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_price}>
//                 $0,01
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_staked}>
//                 $100,000
//               </td>
//               <td className={style.progress_bar}>
//                 <div>
//                   <span className={style.min}>Min</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '14%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <span className={style.max}>Max</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '89%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <progress max='100' value='75'></progress>
//                 </div>
//               </td>
//               <td className={style.status}>
//                 <div className={style.status_wrap}>
//                   <img style={{paddingRight: '8px'}} src={whiteDot} />
//                   <span style={{color: '#fff'}}>Whitelisting</span>
//                 </div>
//               </td>

//               <td style={{paddingTop: '35px'}} className={style.table_token}>
//                 500,000
//               </td>
//             </tr>
//             <tr style={{padding: '10px'}}>
//               <td style={{width: '25%'}}>
//                 <div className='d-flex w-50 '>
//                   <img style={{padding: '20px 20px 20px 0px'}} src={logo5} />
//                   <div className='d-flex flex-column justify-content-center mt-2'>
//                     <td className={style.table_data}>PROJECT D</td>
//                     <span className={style.table_data_span}>Pancake(AUTO)</span>
//                   </div>
//                 </div>
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_price}>
//                 $0,1
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_staked}>
//                 $60,000
//               </td>
//               <td className={style.progress_bar}>
//                 <div>
//                   <span className={style.min}>Min</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '14%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <span className={style.max}>Max</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '89%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <progress max='100' value='75'></progress>
//                 </div>
//               </td>
//               <td className={style.status}>
//                 <div className={style.status_wrap}>
//                   <img style={{paddingRight: '8px'}} src={whiteDot} />
//                   <span style={{color: '#fff'}}>IDO</span>
//                 </div>
//               </td>

//               <td style={{paddingTop: '35px'}} className={style.table_token}>
//                 6,000,000
//               </td>
//             </tr>

//             <tr style={{padding: '10px'}}>
//               <td style={{width: '25%'}}>
//                 <div className='d-flex w-50 '>
//                   <img style={{padding: '20px 20px 20px 0px'}} src={logo6} />
//                   <div className='d-flex flex-column justify-content-center mt-2'>
//                     <td className={style.table_data}>PROJECT E</td>
//                     <span className={style.table_data_span}>Pancake(AUTO)</span>
//                   </div>
//                 </div>
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_price}>
//                 $0,2
//               </td>
//               <td style={{paddingTop: '35px'}} className={style.table_staked}>
//                 $1,000,000
//               </td>
//               <td className={style.progress_bar}>
//                 <div>
//                   <span className={style.min}>Min</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '14%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <span className={style.max}>Max</span>
//                   <img
//                     style={{
//                       position: 'absolute',
//                       left: '89%',
//                       marginTop: '-10px',
//                     }}
//                     src={Polygon}
//                   />
//                   <progress max='100' value='75'></progress>
//                 </div>
//               </td>
//               <td className={style.status}>
//                 <div className={style.status_wrap}>
//                   <img style={{paddingRight: '8px'}} src={blueDot} />
//                   <span style={{color: '#0079FC'}}>Launched</span>
//                 </div>
//               </td>

//               <td style={{paddingTop: '35px'}} className={style.table_token}>
//                 2,000,000
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </section>
//   )
// }
